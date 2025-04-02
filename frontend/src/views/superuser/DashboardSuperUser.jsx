import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

export default function DashboardSuperUser() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar role={4987} />
      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
}
