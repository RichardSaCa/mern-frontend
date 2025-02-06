import { Navigate } from "react-router-dom"
import { useAuth } from "./authContext";
import { jwtDecode } from "jwt-decode";


export const ProtectedRoutes = ({children, allowedRoles}) => {
    const { token } = useAuth();
    let decoded = null;
    if(token != null){ decoded = jwtDecode(token);}
    //return token ? <Outlet /> : <Navigate to="/login" />;
    if (!token) return <Navigate to="/login" />;
    if (!allowedRoles.includes(decoded.role)) return <Navigate to="/unauthorized" />;

    return children;
}