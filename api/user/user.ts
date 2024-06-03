import request from "@api/request";

export const oDocUrl = 'https://sap.okcs.com/td/'
export const AddLocation = async (body) => await request.post(`${oDocUrl}Location/AddLocation`, body);