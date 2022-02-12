import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import SideBar from '../common/Sidebar';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '240px 1fr',
        gridTemplateAreas: `"header header" "sidebar main"`,

        minHeight: '100vh',
    },

    header: {
        gridArea: 'header',
    },
    sidebar: {
        gridArea: 'sidebar',
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
    },
    main: {
        gridArea: 'main',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 3),
    },
}));

const Admin: React.FC = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.header}>
                <Header />
            </Box>

            <Box className={classes.sidebar}>
                <SideBar />
            </Box>

            <Box className={classes.main}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default Admin;
