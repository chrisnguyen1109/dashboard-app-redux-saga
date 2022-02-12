import { City, ListResponse } from '../models';
import axiosClient from './axiosClient';

const RESOURCE = '/cities';

export const getAllCities = (): Promise<ListResponse<City>> => {
    const url = RESOURCE;
    return axiosClient.get(url, { params: { _page: 1, _limit: 10 } });
};
