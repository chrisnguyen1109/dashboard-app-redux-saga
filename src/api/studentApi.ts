import { Student, ListResponse, ListParams } from '../models';
import axiosClient from './axiosClient';

const RESOURCE = '/students';

export const getAllStudents = (
    params: ListParams
): Promise<ListResponse<Student>> => {
    const url = RESOURCE;

    return axiosClient.get(url, { params });
};

export const getStudentStatistics = (): Promise<
    Array<ListResponse<Student>>
> => {
    return Promise.all([
        getAllStudents({ _page: 1, _limit: 1, gender: 'male' }),
        getAllStudents({ _page: 1, _limit: 1, gender: 'female' }),
        getAllStudents({ _page: 1, _limit: 1, mark_gte: 8 }),
        getAllStudents({ _page: 1, _limit: 1, mark_gte: 5 }),
    ]);
};

export const getHighestStudentList = (): Promise<ListResponse<Student>> => {
    return getAllStudents({
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'desc',
    });
};

export const getLowestStudentList = (): Promise<ListResponse<Student>> => {
    return getAllStudents({
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'asc',
    });
};

export const getStudentsByCity = (
    code: string[]
): Promise<Array<ListResponse<Student>>> => {
    const promises = code.map(el =>
        getAllStudents({
            _page: 1,
            _limit: 5,
            _sort: 'mark',
            _order: 'desc',
            city: el,
        })
    );

    return Promise.all(promises);
};

export const getStudentById = (id: string): Promise<Student> => {
    const url = `${RESOURCE}/${id}`;

    return axiosClient.get(url);
};

export const addStudent = (data: Student): Promise<Student> => {
    const url = RESOURCE;

    return axiosClient.post(url, data);
};

export const updateStudent = (data: Student): Promise<Student> => {
    const url = `${RESOURCE}/${data.id}`;

    return axiosClient.patch(url, data);
};

export const deleteStudent = (id: string): Promise<any> => {
    const url = `${RESOURCE}/${id}`;

    return axiosClient.delete(url);
};
