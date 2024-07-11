import request from "@api/request";

export const AddLocation = async (body) => await request.post(`/Location/AddLocation`, body, { returnError: true });
export const GetUserLocations = async () => await request.get(`/Location/GetLocations`);
export const DeleteUserLocations = async (body) => await request.post(`/Location/DeleteLocation`, body);
export const GetProfile = async () => await request.get(`/Profile/GetProfile`);
export const AddProfileInfo = async (body) => await request.post(`/Profile/AddProfile`, body);
export const UpdateProfileInfo = async (body) => await request.post(`/Profile/UpdateProfile`, body);
export const AddFamilyMembers = async (body) => await request.post(`/Profile/AddFamilyMembers`, body);
export const UserSetPassword = async (body) => await request.put(`/user/SetPassword`, body);
export const GetProfileRelation = (): Promise<any> => request.get(`/Profile/GetRelation`);
