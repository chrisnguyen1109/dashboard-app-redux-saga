import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface AlertDialogProps {
    open: boolean;
    title: string;
    content: React.ReactNode;
    submitDialog: (value: boolean) => void;
    loading: boolean;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
    open,
    title,
    content,
    submitDialog,
    loading,
}) => {
    const handleClose = () => {
        submitDialog(false);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="primary"
                        disabled={loading}
                    >
                        Disagree
                    </Button>
                    <Button
                        onClick={() => submitDialog(true)}
                        color="primary"
                        autoFocus
                        disabled={loading}
                    >
                        Agree
                    </Button>
                    {loading && <CircularProgress size={20} />}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AlertDialog;
