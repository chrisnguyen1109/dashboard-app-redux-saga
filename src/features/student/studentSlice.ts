import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
    FetchStatus,
    ListParams,
    ListResponse,
    Pagination,
    Student,
} from '../../models';

export interface StudentParams extends ListParams {
    _sort: keyof Student;
}

interface StudentState {
    status: FetchStatus;
    filter: StudentParams;
    response: ListResponse<Student>;
}

const initialState: StudentState = {
    status: 'fetch_success',
    filter: {
        _page: 1,
        _limit: 10,
        _order: 'asc',
        _sort: 'name',
    },
    response: {
        data: [],
        pagination: {
            _page: 1,
            _limit: 10,
            _totalRows: 0,
        },
    },
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        setFilterSearch(_state, _action: PayloadAction<StudentParams>) {},
        setFilter(state, action: PayloadAction<StudentParams>) {
            state.filter = action.payload;
        },
        fetchStudent(state, _action: PayloadAction<StudentParams>) {
            state.status = 'fetch_request';
        },
        fetchStudentSuccess(
            state,
            action: PayloadAction<ListResponse<Student>>
        ) {
            state.status = 'fetch_success';
            state.response = action.payload;
        },
        fetchStudentFail(state, _action: PayloadAction<string>) {
            state.status = 'fetch_error';
        },
    },
});

// actions
export const studentActions = studentSlice.actions;

// selectors
export const studentStatus = (state: RootState): FetchStatus =>
    state.student.status;
export const studentFilter = (state: RootState): StudentParams =>
    state.student.filter;
export const studentList = (state: RootState): Student[] =>
    state.student.response.data;
export const studentPagination = (state: RootState): Pagination =>
    state.student.response.pagination;

const reducer = studentSlice.reducer;

export default reducer;
