import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useAppDispatch } from '../../app/hooks';
import { logOut } from '../../features/auth/authSlice';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header: React.FC = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Student Management
                    </Typography>
                    <Button color="inherit" onClick={() => dispatch(logOut())}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
