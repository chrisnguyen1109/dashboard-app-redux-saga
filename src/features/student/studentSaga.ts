import { PayloadAction } from '@reduxjs/toolkit';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { getAllStudents } from '../../api/studentApi';
import { ListResponse, Student } from '../../models';
import { studentActions, StudentParams } from './studentSlice';

function* fetchStudentList(action: PayloadAction<StudentParams>) {
    try {
        const response: ListResponse<Student> = yield call(
            getAllStudents,
            action.payload
        );

        yield put(studentActions.fetchStudentSuccess(response));
    } catch (err: any) {
        console.log(err);
        yield put(studentActions.fetchStudentFail(err.message));
    }
}

function* setSearchWithDebounce(action: PayloadAction<StudentParams>) {
    yield put(studentActions.setFilter(action.payload));
}

export default function* studentSaga() {
    yield takeLatest(studentActions.fetchStudent.type, fetchStudentList);

    yield debounce(
        500,
        studentActions.setFilterSearch.type,
        setSearchWithDebounce
    );
}
