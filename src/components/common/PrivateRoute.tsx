import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { authIsLoggedIn } from '../../features/auth/authSlice';

const PrivateRoute: React.FC = () => {
    const isLoggedin = useAppSelector(authIsLoggedIn);

    return isLoggedin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
