import { useMutation } from "react-query";
import { AddLocation } from "./user";

export const useAddLocation = () => {
  return useMutation(AddLocation);
};