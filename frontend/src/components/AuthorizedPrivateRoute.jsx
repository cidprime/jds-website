import React from 'react'

export default function AuthorizedPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  const isAuthorized = currentUser && currentUser.role !== 4181;

  return isAuthorized ? <Outlet /> : <Navigate to={'/'} />
}