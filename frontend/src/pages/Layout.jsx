import { useLocation, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function Layout() {
  const location = useLocation();

  // Routes où le Footer ne doit pas apparaître
  const noFooterRoutes = [
    "/admin/dashboard",
    "/admin/dashboard/overview",
    "/admin/dashboard/manage-users",
    "/admin/dashboard/manage-courses",
    "/admin/dashboard/analytics",
    "/superUser/dashboard",
    "/user/dashboard",
  ];

  const showFooter = !noFooterRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <>
      <Header />
      <Outlet /> {/* Les enfants de Layout */}
      {showFooter && <Footer />}
    </>
  );
}