import { getLocalStorageToken } from '@utilities/localStorageUtils';
import { routeList } from '@routes/routeList';
import axios from 'axios';
import router from 'next/router';
import { v4 as uuidv4 } from 'uuid';

interface optionsLayout {
  auth?;
  err?: boolean;
  withOutToken?: boolean;
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

class Request {
  token: string;

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

  axiosInstance(options?: optionsLayout) {
    const instance = axios.create({
      baseURL: API_URL,
    });
    // ---------request interceptor----------
    instance.interceptors.request.use((req) => {
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
      async (error) => {
        if (typeof window === 'undefined') {
          console.log('Server-Side Logs:');
          this.logError('API error: ', error);
        }
        if (error?.response?.status >= 400) {
          try {
            console.log(
              `Frontend log: API error occurred with status of ${error?.response?.status}`,
            );
            if (error?.response?.status === 401) {
              router.push(routeList.logoutRoute);
            }
          } catch {
            console.log(
              `Frontend log: API error occurred with status of ${error?.response?.status} - serverside`,
              error,
            );
          }
        }
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

  get(url: string, options?: optionsLayout) {
    return new Promise<{ data: any }>((resolve, reject) => {
      const config: any = {};

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

  delete(url: string, options?: optionsLayout) {
    return new Promise<{ data: any }>((resolve, reject) => {
      const config: any = {};

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
