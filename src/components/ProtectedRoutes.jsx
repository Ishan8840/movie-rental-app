import { Outlet, Navigate } from "react-router-dom";
import { useStoreContext } from "../context/Context";

function ProtectedRoutes() {
    const { signedIn } = useStoreContext();

    return (
        signedIn ? <Outlet /> : <Navigate to="/signin" />
    )
}

export default ProtectedRoutes;