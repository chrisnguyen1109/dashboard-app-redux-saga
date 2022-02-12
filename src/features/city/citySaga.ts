import { call, put, takeLatest } from 'redux-saga/effects';
import { getAllCities } from '../../api/cityApi';
import { cityActions } from './citySlice';
import { ListResponse, City } from '../../models';

function* fetchCityList() {
    try {
        const response: ListResponse<City> = yield call(getAllCities);

        yield put(cityActions.fetchCitySuccess(response.data));
    } catch (err: any) {
        console.log(err);
        yield put(cityActions.fetchCityFail(err.message));
    }
}

export default function* citySaga() {
    yield takeLatest(cityActions.fetchCity.type, fetchCityList);
}
