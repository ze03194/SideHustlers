import {Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import secureLocalStorage from "react-secure-storage";

const RequireAuth = () => {
    const {auth} = useAuth();
    const location = useLocation();
    const isLoggedIn = secureLocalStorage.getItem("isLoggedIn");

    return (
        isLoggedIn
            ? <Outlet/>
            : <Navigate to="/login" state={{from: location}} replace/>
    );
}

export default RequireAuth;