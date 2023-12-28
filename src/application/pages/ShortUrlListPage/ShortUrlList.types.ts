export type TDeleteUrlDialogProps = {
  openState: boolean;
  onDialogClose: () => void;
  onCancelBtnClick: () => void;
  onConfirmBtnClick: () => void;
  urlIdList: string[];
};
