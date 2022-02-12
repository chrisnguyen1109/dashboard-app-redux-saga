import { PayloadAction } from '@reduxjs/toolkit';
import { Task } from 'redux-saga';
import {
    call,
    cancel,
    cancelled,
    CancelledEffect,
    delay,
    fork,
    put,
    select,
    take,
    TakeEffect,
} from 'redux-saga/effects';
import { User, UserRequest } from '../../models';
import {
    authIsLoggedIn,
    getCurrentUser,
    loginCancel,
    loginError,
    loginRequest,
    loginSuccess,
    logOut,
    setAuthReady,
} from './authSlice';

const fakeLogin = async (_user: UserRequest) => {
    return new Promise<User>((resolve, _reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                displayName: 'Chris Nguyen',
                accessToken: '123456789',
            });
        }, 1000);
    });
};

const fakeGetUser = async (_token: string) => {
    return new Promise<User>((resolve, _reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                displayName: 'Chris Nguyen',
            });
        }, 1000);
    });
};

function* loginHandler(user: UserRequest) {
    try {
        const responseUser: User = yield call(fakeLogin, user);

        yield put(loginSuccess(responseUser));
        localStorage.setItem('access_token', responseUser.accessToken!);
    } catch (error: any) {
        console.log(error);
        yield put(loginError(error.message));
    } finally {
        const checkCancelled: CancelledEffect = yield cancelled();

        if (checkCancelled) {
            yield put(loginCancel());
        }
    }
}

function* getCurrentUserHandler(token: string) {
    try {
        const responseUser: User = yield call(fakeGetUser, token);

        yield put(loginSuccess(responseUser));
    } catch (error: any) {
        console.log(error);
        yield put(loginError(error.message));
    } finally {
        yield put(setAuthReady());

        const checkCancelled: CancelledEffect = yield cancelled();

        if (checkCancelled) {
            yield put(loginCancel());
        }
    }
}

function* logoutHandler() {
    yield delay(500);
    localStorage.removeItem('access_token');
}

function* watchLoginFlow() {
    while (true) {
        const loggedIn: boolean = yield select(authIsLoggedIn);

        let task: Task | undefined = undefined;

        if (!loggedIn) {
            const action: PayloadAction<UserRequest> | PayloadAction<string> =
                yield take([loginRequest.type, getCurrentUser.type]);

            if (action.type === loginRequest.type) {
                task = yield fork(loginHandler, action.payload as UserRequest);
            }

            if (action.type === getCurrentUser.type) {
                task = yield fork(
                    getCurrentUserHandler,
                    action.payload as string
                );
            }
        }

        const actionLogout: TakeEffect = yield take(logOut.type);
        if (actionLogout) {
            if (task) yield cancel(task);
            yield call(logoutHandler);
        }
    }
}

export default function* authSaga() {
    yield fork(watchLoginFlow);
}
