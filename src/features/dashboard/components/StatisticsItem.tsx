import {
    Box,
    Paper,
    Typography,
    makeStyles,
    CircularProgress,
} from '@material-ui/core';
import { FetchStatus } from '../../../models';

interface StatisticsItemProps {
    icon: React.ReactElement;
    label: string;
    value: number;
    status: FetchStatus;
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
    },

    boxInfor: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '55px',
    },
}));

const StatisticsItem: React.FC<StatisticsItemProps> = ({
    icon,
    label,
    value,
    status,
}) => {
    const classes = useStyles();

    return (
        <Paper elevation={2} className={classes.root}>
            <Box>{icon}</Box>

            <Box className={classes.boxInfor}>
                {status === 'fetch_request' && <CircularProgress size={25} />}
                {status === 'fetch_success' && (
                    <Typography variant="h5" align="right">
                        {value}
                    </Typography>
                )}

                <Typography variant="caption">{label}</Typography>
            </Box>
        </Paper>
    );
};

export default StatisticsItem;
