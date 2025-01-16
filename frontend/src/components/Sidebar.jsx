import { Link } from "react-router-dom";
import { BarChart2, Library, Menu, TrendingUp, UserPen, Users } from "lucide-react"
import { useState } from "react";
import { AnimatePresence, color, motion } from "framer-motion";

export default function Sidebar({ role }) {
  const [ isSidebarOpen, setIsSidebarOpen ] = useState(true);
  // Navigation spécifique à chaque rôle
  const links = {
    2584: [
      { path: "/admin/dashboard/overview", label: "Aperçu", icon: BarChart2, color: "#6355f1" },
      { path: "/admin/dashboard/manage-courses", label: "Gérer les cours", icon: Library, color: "#10B981" },
      { path: "/admin/dashboard/manage-users", label: "Gérer les utilisateurs", icon: Users, color: "#EC4899" },
      { path: "/admin/dashboard/analytics", label: "Analytique", icon: TrendingUp, color: "#3B82F6" },
      { path: "/profile", label: "Profile", icon: UserPen, color: "#F59E0B" },
    ],
    4987: [
      { path: "/superUser/dashboard/overview", label: "Aperçu", icon: BarChart2, color: "#6355f1" },
      { path: "/superUser/dashboard/my-courses", label: "Mes cours", icon: BarChart2, color: "#6355f1" },
      { path: "/superUser/dashboard/students", label: "Students", icon: BarChart2, color: "#6355f1" },
      { path: "/profile", label: "Profile", icon: UserPen, color: "#F59E0B" },
    ],
    4181: [
      { path: "/user/dashboard/overview", label: "Aperçu", icon: BarChart2, color: "#6355f1" },
      { path: "/user/dashboard/courses-taken", label: "Cours suivis", icon: BarChart2, color: "#6355f1" },
      { path: "/profile", label: "Profile", icon: UserPen, color: "#F59E0B" },
    ],
  };

  return (
    <motion.aside 
      className={`bg-gray-800 text-white relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${ isSidebarOpen ? 'w-1/5' : 'w-16' }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
      >
      
      <div className="h-full flex flex-col p-4 overflow-hidden">

        <div className="flex flex-row items-center gap-2 bg-gray-800 bg-opacity-50 backdrop-blur-m">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
          >
            <Menu size={24} />
          </motion.button>

          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2, delay: 0.3 }}
                className="text-lg font-semibold"
              >
                Dashboard
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="mt-8 flex-grow">  
          <ul>
            {links[role]?.map((link, index) => (
              <li key={index} className="mb-4">
                <Link to={link.path}>
                  <motion.div 
                    className="flex items-center text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 p-4">
                      <link.icon size={20} style={{ color: link.color, minWidth: '20px' }} />

                      <AnimatePresence>
                        {isSidebarOpen && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2, delay: 0.3 }}
                            className="ml-4 whitespace-nowrap"
                          >
                            {link.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                  </motion.div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      </div>
      

    </motion.aside>
  );
}