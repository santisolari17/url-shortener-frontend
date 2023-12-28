import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  Typography,
  ListItemIcon,
} from '@mui/material';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { TDeleteUrlDialogProps } from './ShortUrlList.types';

export const DeleteUrlDialog = (props: TDeleteUrlDialogProps) => {
  const title = props.urlIdList.length > 1 ? 'Delete Shortened Urls' : 'Delete Shortened Url';
  const description =
    props.urlIdList.length > 1
      ? 'Are you sure you want to delete the following short Urls?'
      : 'Are you sure you want to delete the following short Url?';
  const confirmBtnLabel = props.urlIdList.length > 1 ? 'Delete Urls' : 'Delete Url';

  return (
    <Dialog
      open={props.openState}
      onClose={props.onDialogClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          <Typography variant="body1">{description}</Typography>
          <List dense>
            {props.urlIdList.map(id => (
              <ListItem key={id}>
                <ListItemIcon>
                  <LinkOffIcon />
                </ListItemIcon>
                {id}
              </ListItem>
            ))}
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancelBtnClick}>Cancel</Button>
        <Button onClick={props.onConfirmBtnClick} autoFocus>
          {confirmBtnLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
