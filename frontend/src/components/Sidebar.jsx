import { Link } from "react-router-dom";

export default function Sidebar({ role }) {
  // Navigation spécifique à chaque rôle
  const links = {
    2584: [
      { path: "/admin/dashboard/overview", label: "Overview" },
      { path: "/admin/dashboard/users", label: "Manage Users" },
      { path: "/profile", label: "Profile" }, // Commun
    ],
    4987: [
      { path: "/superUser/dashboard/overview", label: "Overview" },
      { path: "/superUser/dashboard/courses", label: "Manage Courses" },
      { path: "/profile", label: "Profile" }, // Commun
    ],
    4181: [
      { path: "/user/dashboard/overview", label: "Overview" },
      { path: "/user/dashboard/my-courses", label: "My Courses" },
      { path: "/profile", label: "Profile" }, // Commun
    ],
  };

  return (
    <aside className="w-1/5 bg-gray-800 text-white">
      <div className="p-4 text-lg font-bold">Dashboard</div>
      
        <nav className="mt-6">  
          <ul className="space-y-4">
            {links[role]?.map((link, index) => (
              <li key={index} className="mb-4">
                <Link to={link.path} className="block px-4 py-2 hover:bg-gray-700">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
    </aside>
  );
}