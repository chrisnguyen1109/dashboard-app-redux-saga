import {
    Box,
    Button,
    LinearProgress,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { cityActions } from '../../city/citySlice';
import StudentFilter from '../components/StudentFilter';
import StudentTable from '../components/StudentTable';
import {
    studentActions,
    studentFilter,
    studentList,
    studentPagination,
    studentStatus,
} from '../studentSlice';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1),
    },
    titleContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: theme.spacing(4),
    },

    loading: {
        position: 'absolute',
        top: theme.spacing(-1),
        width: '100%',
    },
}));

const Student: React.FC = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const filterSelector = useAppSelector(studentFilter);
    const students = useAppSelector(studentList);
    const status = useAppSelector(studentStatus);
    const pagination = useAppSelector(studentPagination);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        status === 'fetch_request' ? setLoading(true) : setLoading(false);
    }, [status]);

    useEffect(() => {
        dispatch(studentActions.fetchStudent(filterSelector));
        dispatch(cityActions.fetchCity());
    }, [filterSelector]);

    return (
        <Box className={classes.root}>
            {loading && <LinearProgress className={classes.loading} />}

            <Box className={classes.titleContainer}>
                <Typography variant="h4">Students</Typography>

                <Link to="new" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">
                        Add new student
                    </Button>
                </Link>
            </Box>

            <Box mt={3}>
                <StudentFilter />
            </Box>

            <Box mt={3}>
                <StudentTable studentList={students} pagination={pagination} />
            </Box>
        </Box>
    );
};

export default Student;
