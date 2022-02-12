import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, FetchStatus } from '../../models';
import { RootState } from '../../app/store';

interface CityState {
    status: FetchStatus;
    list: City[];
}

const initialState: CityState = {
    status: 'fetch_success',
    list: [],
};

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        fetchCity(state) {
            state.status = 'fetch_request';
        },
        fetchCitySuccess(state, action: PayloadAction<City[]>) {
            state.status = 'fetch_success';
            state.list = action.payload;
        },
        fetchCityFail(state, _action: PayloadAction<string>) {
            state.status = 'fetch_error';
        },
    },
});

// actions
export const cityActions = citySlice.actions;

// selectors
export const cityStatus = (state: RootState): FetchStatus => state.city.status;
export const cityList = (state: RootState): City[] => state.city.list;
export const cityObjectList = createSelector(cityList, citys => {
    return citys.reduce((previous: { [key: string]: City }, current) => {
        previous[current.code] = current;
        return previous;
    }, {});
});
export const citySelectList = createSelector(cityList, citys =>
    citys.map(el => ({ key: el.code, value: el.name }))
);

const reducer = citySlice.reducer;

export default reducer;
