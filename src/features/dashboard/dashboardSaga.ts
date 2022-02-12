import { call, put, takeLatest } from 'redux-saga/effects';
import { getAllCities } from '../../api/cityApi';
import {
    getHighestStudentList,
    getLowestStudentList,
    getStudentsByCity,
    getStudentStatistics,
} from '../../api/studentApi';
import { City, ListResponse, Student } from '../../models';
import { dashboardActions, RankingByCity } from './dashboardSlice';

function* fetchStatistics() {
    try {
        const responseList: Array<ListResponse<Student>> = yield call(
            getStudentStatistics
        );

        const [maleCount, femaleCount, highMarkCount, lowMarkCount] =
            responseList.map(el => el.pagination!._totalRows);

        yield put(
            dashboardActions.fetchStatisticsSuccess({
                maleCount,
                femaleCount,
                highMarkCount,
                lowMarkCount,
            })
        );
    } catch (err: any) {
        console.log(err);
        yield put(dashboardActions.fetchStatisticsFail(err.message));
    }
}

function* fetchHighestStudentList() {
    try {
        const responseList: ListResponse<Student> = yield call(
            getHighestStudentList
        );

        yield put(
            dashboardActions.fetchHighestStudentListSuccess(responseList.data)
        );
    } catch (err: any) {
        console.log(err);
        yield put(dashboardActions.fetchHighestStudentListFail(err.message));
    }
}

function* fetchLowestStudentList() {
    try {
        const responseList: ListResponse<Student> = yield call(
            getLowestStudentList
        );

        yield put(
            dashboardActions.fetchLowestStudentListSuccess(responseList.data)
        );
    } catch (err: any) {
        console.log(err);
        yield put(dashboardActions.fetchLowestStudentListFail(err.message));
    }
}

function* fetchRankingByCityList() {
    try {
        const responseCityList: ListResponse<City> = yield call(getAllCities);

        const codes = responseCityList.data.map(el => el.code);
        const responseList: Array<ListResponse<Student>> = yield call(
            getStudentsByCity,
            codes
        );

        const rankingCityList: RankingByCity[] = responseList.map((el, i) => ({
            cityId: codes[i],
            cityName: responseCityList.data[i].name,
            rankingList: el.data,
        }));

        yield put(
            dashboardActions.fetchRankingByCityListSuccess(rankingCityList)
        );
    } catch (err: any) {
        console.log(err);
        yield put(dashboardActions.fetchRankingByCityListFail(err.message));
    }
}

export default function* dashboardSaga() {
    yield takeLatest(dashboardActions.fetchStatistics.type, fetchStatistics);
    yield takeLatest(
        dashboardActions.fetchHighestStudentList.type,
        fetchHighestStudentList
    );
    yield takeLatest(
        dashboardActions.fetchLowestStudentList.type,
        fetchLowestStudentList
    );
    yield takeLatest(
        dashboardActions.fetchRankingByCityList.type,
        fetchRankingByCityList
    );
}
