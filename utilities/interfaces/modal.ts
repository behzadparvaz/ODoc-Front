import { AddModalAction } from "@redux/modal/modalActions";

export type ModalType = {
  id: number;
  modal: AddModalAction['payload']['modal'];
  props: AddModalAction['payload']['props'];
}[];
