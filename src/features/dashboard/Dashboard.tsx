import { makeStyles, Box } from '@material-ui/core';
import AllStudents from './components/AllStudents';
import AllStudentsByCity from './components/AllStudentsByCity';
import StatisticsList from './components/StatisticsList';

const useStyles = makeStyles(theme => ({
    root: {},
}));

const Dashboard: React.FC = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <StatisticsList />

            <Box mt={5}>
                <AllStudents />
            </Box>

            <Box mt={5}>
                <AllStudentsByCity />
            </Box>
        </Box>
    );
};

export default Dashboard;
