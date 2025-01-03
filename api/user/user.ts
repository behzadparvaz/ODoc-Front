import request from '@api/request';

export const AddLocation = async (body) =>
  await request.post(`/Location/AddLocation`, body, { returnError: true });

export const UpdateLocation = async (body) =>
  await request.put(`/Location/UpdateLocation`, body, { returnError: true });

export const GetUserLocations = async () =>
  await request.get(`/Location/GetLocations`);

export const GetUserLocation = async (locationId: string) =>
  await request.get(`/Location/${locationId}`);

export const DeleteUserLocations = async (body) =>
  await request.post(`/Location/DeleteLocation`, body);

export const GetProfile = async () => await request.get(`/Profile/GetProfile`);

export const AddProfileInfo = async (body) =>
  await request.post(`/Profile/AddProfile`, body, { isFormData: true });

export const UpdateProfileInfo = async (body) =>
  await request.post(`/Profile/UpdateProfile`, body, { isFormData: true });

export const AddFamilyMembers = async (body) =>
  await request.post(`/Profile/AddFamilyMembers`, body);

export const UserSetPassword = async (body) =>
  await request.put(`/user/SetPassword`, body);

export const GetProfileRelation = (): Promise<any> =>
  request.get(`/Profile/GetRelation`);

export const LoginWithTapsiSSO = async (body) =>
  await request.post(`user/LoginWithTapsiSSO`, body);
