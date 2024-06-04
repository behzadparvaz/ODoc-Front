import request from "@api/request";

export const oDocUrl = 'https://sap.okcs.com/td/'

export const AddLocation = async (body) => await request.post(`${oDocUrl}Location/AddLocation`, body);
export const GetUserLocations = async () => await request.get(`${oDocUrl}Location/GetLocations`);
export const DeleteUserLocations = async (body) => await request.post(`${oDocUrl}Location/DeleteLocation`, body);