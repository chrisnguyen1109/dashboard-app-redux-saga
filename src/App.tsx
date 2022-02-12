import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import NotFound from './components/common/NotFound';
import PrivateRoute from './components/common/PrivateRoute';
import Admin from './components/layout/Admin';
import {
    authIsAuthReady,
    authIsLoggedIn,
    getCurrentUser,
    setAuthReady,
} from './features/auth/authSlice';
import LoginPage from './features/auth/pages/LoginPage';
import Dashboard from './features/dashboard/Dashboard';
import AddEditStudent from './features/student/pages/AddEditStudent';
import Student from './features/student/pages/Student';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const isAuthReady = useAppSelector(authIsAuthReady);
    const isLoggedIn = useAppSelector(authIsLoggedIn);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');

        if (accessToken) {
            dispatch(getCurrentUser(accessToken));
        } else {
            dispatch(setAuthReady());
        }
    }, []);

    return (
        <>
            {isAuthReady && (
                <>
                    <ToastContainer />
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate replace to="/admin" />}
                        />

                        <Route
                            path="/login"
                            element={
                                isLoggedIn ? (
                                    <Navigate to="/admin" />
                                ) : (
                                    <LoginPage />
                                )
                            }
                        />

                        <Route path="/admin" element={<PrivateRoute />}>
                            <Route path="" element={<Admin />}>
                                <Route
                                    path=""
                                    element={
                                        <Navigate to="dashboard" replace />
                                    }
                                />
                                <Route
                                    path="dashboard"
                                    element={<Dashboard />}
                                />
                                <Route path="student" element={<Student />} />
                                <Route
                                    path="student/new"
                                    element={<AddEditStudent />}
                                />
                                <Route
                                    path="student/edit/:studentId"
                                    element={<AddEditStudent />}
                                />
                            </Route>
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </>
            )}
        </>
    );
};

export default App;
