import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { FetchStatus, Student } from '../../models';

export interface DashboardStatistics {
    maleCount: number;
    femaleCount: number;
    highMarkCount: number;
    lowMarkCount: number;
}

export interface RankingByCity {
    cityId: string;
    cityName: string;
    rankingList: Student[];
}

interface DashboardState {
    statistics: {
        status: FetchStatus;
        data: DashboardStatistics;
    };
    highestStudentList: {
        status: FetchStatus;
        data: Student[];
    };
    lowestStudentList: {
        status: FetchStatus;
        data: Student[];
    };
    rankingByCityList: {
        status: FetchStatus;
        data: RankingByCity[];
    };
}

const initialState: DashboardState = {
    statistics: {
        status: 'fetch_success',
        data: {
            maleCount: 0,
            femaleCount: 0,
            highMarkCount: 0,
            lowMarkCount: 0,
        },
    },
    highestStudentList: {
        status: 'fetch_success',
        data: [],
    },
    lowestStudentList: {
        status: 'fetch_success',
        data: [],
    },
    rankingByCityList: {
        status: 'fetch_success',
        data: [],
    },
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fetchStatistics(state) {
            state.statistics.status = 'fetch_request';
        },
        fetchStatisticsSuccess(
            state,
            action: PayloadAction<DashboardStatistics>
        ) {
            state.statistics.status = 'fetch_success';
            state.statistics.data = action.payload;
        },
        fetchStatisticsFail(state, _action: PayloadAction<string>) {
            state.statistics.status = 'fetch_error';
        },
        fetchHighestStudentList(state) {
            state.highestStudentList.status = 'fetch_request';
        },
        fetchHighestStudentListSuccess(
            state,
            action: PayloadAction<Student[]>
        ) {
            state.highestStudentList.status = 'fetch_success';
            state.highestStudentList.data = action.payload;
        },
        fetchHighestStudentListFail(state, _action: PayloadAction<string>) {
            state.highestStudentList.status = 'fetch_error';
        },
        fetchLowestStudentList(state) {
            state.lowestStudentList.status = 'fetch_request';
        },
        fetchLowestStudentListSuccess(state, action: PayloadAction<Student[]>) {
            state.lowestStudentList.status = 'fetch_success';
            state.lowestStudentList.data = action.payload;
        },
        fetchLowestStudentListFail(state, _action: PayloadAction<string>) {
            state.lowestStudentList.status = 'fetch_error';
        },
        fetchRankingByCityList(state) {
            state.rankingByCityList.status = 'fetch_request';
        },
        fetchRankingByCityListSuccess(
            state,
            action: PayloadAction<RankingByCity[]>
        ) {
            state.rankingByCityList.status = 'fetch_success';
            state.rankingByCityList.data = action.payload;
        },
        fetchRankingByCityListFail(state, _action: PayloadAction<string>) {
            state.rankingByCityList.status = 'fetch_error';
        },
    },
});

// actions
export const dashboardActions = dashboardSlice.actions;

// selectors
export const dashboardStatisticsStatus = (state: RootState): FetchStatus =>
    state.dashboard.statistics.status;
export const dashboardStatisticsData = (
    state: RootState
): DashboardStatistics => state.dashboard.statistics.data;
export const dashboardHighestStudentListStatus = (
    state: RootState
): FetchStatus => state.dashboard.highestStudentList.status;
export const dashboardHighestStudentListData = (state: RootState): Student[] =>
    state.dashboard.highestStudentList.data;
export const dashboardLowestStudentListStatus = (
    state: RootState
): FetchStatus => state.dashboard.lowestStudentList.status;
export const dashboardLowestStudentListData = (state: RootState): Student[] =>
    state.dashboard.lowestStudentList.data;
export const dashboardRankingByCityListStatus = (
    state: RootState
): FetchStatus => state.dashboard.rankingByCityList.status;
export const dashboardRankingByCityListData = (
    state: RootState
): RankingByCity[] => state.dashboard.rankingByCityList.data;

const reducer = dashboardSlice.reducer;

export default reducer;
