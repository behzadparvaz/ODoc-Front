import {
  getLocalStorageToken,
  setLocalStorageToken,
} from '@utilities/localStorageUtils';
import { routeList } from '@routes/routeList';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import router from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { clearLastSelectedAddressTimeStamp } from '@utilities/addressUtils';

interface optionsLayout {
  auth?;
  err?: boolean;
  withOutToken?: boolean;
  returnError?: boolean;
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

class Request {
  token: string;
  private isRefreshing: boolean = false;
  private pendingRequests: Array<{ resolve: Function; reject: Function }> = [];

  constructor() {
    axios.defaults.headers.common['Content-Type'] = 'application/json;';
  }

  setToken(token: string) {
    axios.defaults.headers.common['Authorization'] = token
      ? `Bearer ${token}`
      : null;
  }
  // Show user the correct error message upon unsuccessful requests
  handleError(e: any, showErr = true) {
    // console.log(e);
  }

  logError(title: string, error: any) {
    console.log(title, {
      data: error.response
        ? {
            url: `${error?.response?.config?.baseURL}${error?.response?.config?.url}`,
            data: error?.response?.data,
            status: error?.response?.status,
          }
        : {
            url: `${error?.config?.baseURL ? error?.config?.baseURL : ''}${error?.config?.url}`,
            status: 'no status',
            error: JSON.stringify(error),
          },
    });
  }

  private processQueue(error: any, token: string | null = null) {
    this.pendingRequests.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    this.pendingRequests = [];
  }

  private async refreshToken(): Promise<string | null> {
    const token = getLocalStorageToken();
    try {
      if (token) {
        const response = await axios.patch(
          `${API_URL}/auth/RefreshToken`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const newAccessToken = response.data.data.token;
        setLocalStorageToken(newAccessToken);
        this.setToken(newAccessToken);
        return newAccessToken;
      }
    } catch (error) {
      console.error('Failed to refresh token', error);
      setLocalStorageToken(null);
      return null;
    }
  }

  axiosInstance(options?: optionsLayout) {
    const instance = axios.create({
      baseURL: API_URL,
    });
    // ---------request interceptor----------
    instance.interceptors.request.use((req: any) => {
      req.headers['X-Correlation-Id'] = uuidv4();
      req.headers['ui-version'] = '1.0';

      const token = getLocalStorageToken();

      if (options?.withOutToken) {
        delete req.headers.common.Authorization;
      } else {
        req.headers['Authorization'] = `Bearer ${token}`;
      }

      return req;
    });
    // ---------response interceptor----------
    instance.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error: AxiosError) => {
        // Log server-side errors
        if (typeof window === 'undefined') {
          console.log('Server-Side Logs:');
          this.logError('API error: ', error);
        }

        // Check if the response status indicates an error
        if (error?.response?.status >= 400) {
          console.log(
            `Frontend log: API error occurred with status of ${error?.response?.status}`,
          );
          if (error?.response?.status === 403) {
            router.push(routeList.forbidden);
          }
          // Handle unauthorized access
          if (error?.response?.status === 401) {
            if (!this.isRefreshing) {
              this.isRefreshing = true;

              try {
                const refreshToken = await this.refreshToken();
                if (refreshToken) {
                  this.setToken(refreshToken);
                  error.config.headers['Authorization'] =
                    `Bearer ${refreshToken}`;
                  this.processQueue(null, refreshToken);
                  return instance(error.config); // Retry original request
                } else {
                  // If no token is returned, redirect to login
                  clearLastSelectedAddressTimeStamp();
                  router.push({
                    pathname: routeList.loginRoute,
                    query: { redirect: router.asPath },
                  });
                }
              } catch (refreshError) {
                clearLastSelectedAddressTimeStamp();
                console.error('Token refresh failed:', refreshError);
                // Redirect to login on refresh token failure
              } finally {
                this.isRefreshing = false;
              }

              // If we are waiting for a token refresh, handle pending requests
              return new Promise((resolve, reject) => {
                this.pendingRequests.push({ resolve, reject });
              }).then((token) => {
                error.config.headers['Authorization'] = `Bearer ${token}`;
                return instance(error.config); // Retry original request
              });
            }
          }

          // Log additional errors on the frontend
          console.log(
            `Frontend log: API error occurred with status of ${error?.response?.status} - serverside`,
            error,
          );
        }

        return Promise.reject(error);
      },
    );

    return instance;
  }

  post(
    url: string,
    params: any,
    options?: optionsLayout & { isFormData?: boolean },
  ) {
    return new Promise<{ data: any }>((resolve, reject) => {
      let data = params;
      if (options?.isFormData) {
        data = new FormData();
        Object.keys(params).forEach((key) => {
          data.append(key, params[key]);
        });
      }
      const config: any = {};

      this.axiosInstance(options)
        .post(`${url}`, data, config)
        .then((response) => {
          resolve(response?.data);
        })
        .catch((e) => {
          this.handleError(e);
          reject(e);
        });
    });
  }

  put(
    url: string,
    params: any,
    options?: optionsLayout & { isFormData?: boolean },
  ) {
    return new Promise<{ data: any }>((resolve, reject) => {
      let data = params;
      if (options?.isFormData) {
        data = new FormData();
        Object.keys(params).forEach((key) => {
          data.append(key, params[key]);
        });
      }
      const config: any = {};

      this.axiosInstance(options)
        .put(`${url}`, data, config)
        .then((response) => {
          resolve(response?.data);
        })
        .catch((e) => {
          this.handleError(e);
          reject(e);
        });
    });
  }

  get(url: string, options?: optionsLayout, config: AxiosRequestConfig = {}) {
    return new Promise<{ data: any }>((resolve, reject) => {
      this.axiosInstance(options)
        .get(`${url}`, config)
        .then((response) => {
          resolve(response?.data);
        })
        .catch((e) => {
          if (options && options.err === false) {
            this.handleError(e, false);
          } else {
            this.handleError(e);
          }
          reject(e);
        });
    });
  }

  patch(url: string, params: any, options?: optionsLayout) {
    return new Promise<{ data: any }>((resolve, reject) => {
      const config: any = {};

      this.axiosInstance(options)
        .patch(`${url}`, params, config)
        .then((response) => {
          resolve(response?.data);
        })
        .catch((e) => {
          this.handleError(e);
          reject(e);
        });
    });
  }

  delete(
    url: string,
    options?: optionsLayout,
    config: AxiosRequestConfig = {},
  ) {
    return new Promise<{ data: any }>((resolve, reject) => {
      this.axiosInstance(options)
        .delete(`${url}`, config)
        .then((response) => {
          resolve(response?.data);
        })
        .catch((e) => {
          this.handleError(e);
          reject(e);
        });
    });
  }
}

export default new Request();
