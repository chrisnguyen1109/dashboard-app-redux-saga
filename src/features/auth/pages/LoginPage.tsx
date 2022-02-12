import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { authStatus, loginRequest } from '../authSlice';
import { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },

    box: {
        padding: theme.spacing(3),
    },
}));

const LoginPage: React.FC = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const loginStatus = useAppSelector(authStatus);

    useEffect(() => {
        if (loginStatus === 'login_request') {
            setLoading(true);
        }
    }, [loginStatus]);

    const loginHanlder = () => {
        dispatch(
            loginRequest({
                email: 'chrisnguyen@gmail.com',
                password: '123456',
            })
        );
    };

    return (
        <div className={classes.root}>
            <Paper elevation={2} className={classes.box}>
                <Typography variant="h5" component="h1">
                    Student Management
                </Typography>

                <Box marginTop="30px">
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={loginHanlder}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress color="inherit" size={20} />
                        ) : (
                            'Login'
                        )}
                    </Button>
                </Box>
            </Paper>
        </div>
    );
};

export default LoginPage;
