import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User, UserRequest } from '../../models';

interface AuthState {
    currentUser: User | null;
    isLoggedIn: boolean;
    isAuthReady: boolean;
    status:
        | 'log_out'
        | 'login_request'
        | 'login_success'
        | 'login_error'
        | 'login_cancel';
}

const initialState: AuthState = {
    currentUser: null,
    isLoggedIn: false,
    isAuthReady: false,
    status: 'log_out',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthReady(state) {
            state.isAuthReady = true;
        },
        loginRequest(state, _action: PayloadAction<UserRequest>) {
            state.status = 'login_request';
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.currentUser = action.payload;
            state.isLoggedIn = true;
            state.status = 'login_success';
        },
        loginError(state, _action: PayloadAction<string>) {
            state.currentUser = null;
            state.status = 'login_error';
        },
        loginCancel(state) {
            state.status = 'login_cancel';
        },
        getCurrentUser(state, _action: PayloadAction<string>) {
            state.status = 'login_request';
        },
        logOut(state) {
            state.currentUser = null;
            state.isLoggedIn = false;
            state.status = 'log_out';
        },
    },
});

// actions
export const {
    setAuthReady,
    loginRequest,
    loginSuccess,
    loginError,
    loginCancel,
    getCurrentUser,
    logOut,
} = authSlice.actions;

// selectors
export const authIsAuthReady = (state: RootState): boolean =>
    state.auth.isAuthReady;
export const authCurrentUser = (state: RootState): User | null =>
    state.auth.currentUser;
export const authIsLoggedIn = (state: RootState): boolean =>
    state.auth.isLoggedIn;
export const authStatus = (state: RootState): string => state.auth.status;

const reducer = authSlice.reducer;

export default reducer;
