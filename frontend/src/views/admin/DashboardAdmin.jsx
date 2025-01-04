import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

export default function DashboardAdmin() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar role={2584} />
      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
