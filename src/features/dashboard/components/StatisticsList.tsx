import Grid from '@material-ui/core/Grid';
import ChatBubble from '@material-ui/icons/ChatBubble';
import ChatRounded from '@material-ui/icons/ChatRounded';
import LinearScaleSharp from '@material-ui/icons/LinearScaleSharp';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
    dashboardActions,
    dashboardStatisticsData,
    dashboardStatisticsStatus,
} from '../dashboardSlice';
import StatisticsItem from './StatisticsItem';

const StatisticsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(dashboardStatisticsStatus);
    const statistics = useAppSelector(dashboardStatisticsData);

    useEffect(() => {
        dispatch(dashboardActions.fetchStatistics());
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
                <StatisticsItem
                    icon={<PeopleAlt fontSize="large" color="primary" />}
                    label="male"
                    value={statistics.maleCount}
                    status={status}
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <StatisticsItem
                    icon={<ChatRounded fontSize="large" color="primary" />}
                    label="female"
                    value={statistics.femaleCount}
                    status={status}
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <StatisticsItem
                    icon={<ChatBubble fontSize="large" color="primary" />}
                    label="mark >= 8"
                    value={statistics.highMarkCount}
                    status={status}
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <StatisticsItem
                    icon={<LinearScaleSharp fontSize="large" color="primary" />}
                    label="mark <= 5"
                    value={statistics.lowMarkCount}
                    status={status}
                />
            </Grid>
        </Grid>
    );
};

export default StatisticsList;
