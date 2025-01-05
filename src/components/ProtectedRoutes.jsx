import { Outlet, Navigate } from "react-router-dom";
import { useStoreContext } from "../context/Context";

function ProtectedRoutes() {
    const { user } = useStoreContext();

    return (
        user ? <Outlet /> : <Navigate to="/signin" />
    )
}

export default ProtectedRoutes;