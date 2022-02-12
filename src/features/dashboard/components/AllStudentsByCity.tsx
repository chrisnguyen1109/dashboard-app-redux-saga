import { Box, Grid, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
    dashboardActions,
    dashboardRankingByCityListData,
    dashboardRankingByCityListStatus,
} from '../dashboardSlice';
import StudentList from './StudentList';
import Widget from './Widget';

const AllStudentsByCity: React.FC = () => {
    const dispatch = useAppDispatch();
    const rankingByCityList = useAppSelector(dashboardRankingByCityListData);

    const statusRankingByCityList = useAppSelector(
        dashboardRankingByCityListStatus
    );

    useEffect(() => {
        dispatch(dashboardActions.fetchRankingByCityList());
    }, []);

    return (
        <>
            <Typography variant="h4">Ranking by city</Typography>
            <Box mt={2}>
                <Grid container spacing={3} justifyContent="center">
                    {rankingByCityList?.map(el => (
                        <Grid key={el.cityId} item xs={12} md={6} lg={4}>
                            <Widget title={el.cityName}>
                                <StudentList
                                    studentList={el.rankingList}
                                    status={statusRankingByCityList}
                                />
                            </Widget>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default AllStudentsByCity;
