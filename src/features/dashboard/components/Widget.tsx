import { Box, makeStyles, Paper, Typography } from '@material-ui/core';

interface WidgetProps {
    title: string;
    children: React.ReactNode;
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
        border: `1px solid ${theme.palette.divider}`,
    },
}));

const Widget: React.FC<WidgetProps> = ({ title, children }) => {
    const classes = useStyles();

    return (
        <Paper elevation={2} className={classes.root}>
            <Typography variant="button">{title}</Typography>

            <Box mt={2}>{children}</Box>
        </Paper>
    );
};

export default Widget;
