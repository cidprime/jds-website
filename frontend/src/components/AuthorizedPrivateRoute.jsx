import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  const isAuthorized = currentUser && currentUser.role !== 4181;

  return isAuthorized ? <Outlet /> : <Navigate to={'/'} />
}