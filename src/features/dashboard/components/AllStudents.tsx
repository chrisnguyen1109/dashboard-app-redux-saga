import { Box, Grid, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
    dashboardActions,
    dashboardHighestStudentListData,
    dashboardHighestStudentListStatus,
    dashboardLowestStudentListData,
    dashboardLowestStudentListStatus,
} from '../dashboardSlice';
import StudentList from './StudentList';
import Widget from './Widget';

const AllStudents: React.FC = () => {
    const dispatch = useAppDispatch();
    const highestStudentList = useAppSelector(dashboardHighestStudentListData);
    const lowestStudentList = useAppSelector(dashboardLowestStudentListData);
    const statusHighestStudentList = useAppSelector(
        dashboardHighestStudentListStatus
    );
    const statusLowestStudentList = useAppSelector(
        dashboardLowestStudentListStatus
    );

    useEffect(() => {
        dispatch(dashboardActions.fetchHighestStudentList());
        dispatch(dashboardActions.fetchLowestStudentList());
    }, []);

    return (
        <>
            <Typography variant="h4">All Students</Typography>
            <Box mt={2}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Widget title="Student with highest mark">
                            <StudentList
                                studentList={highestStudentList}
                                status={statusHighestStudentList}
                            />
                        </Widget>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Widget title="Student with lowest mark">
                            <StudentList
                                studentList={lowestStudentList}
                                status={statusLowestStudentList}
                            />
                        </Widget>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default AllStudents;
