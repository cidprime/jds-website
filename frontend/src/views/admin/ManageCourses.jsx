import { motion } from 'framer-motion'
import { AlertTriangle, PiggyBank, TrendingUp, Upload, Zap } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import CoursesTable from '../../components/Courses/CoursesTable';
import CategoryDistributionChart from '../../components/overview/CategoryDistributionChart';
import CoursesAddedChart from '../../components/Courses/CoursesAddedChart';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function ManageUsers() {
  const [totalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/api/courses/`)
      .then((response) => response.json())
      .then((data) => {
        setTotalCourses(data.totalCourses)
      })
      .catch((error) => console.error("Erreur lors de la récupération du nombre total de cours :", error))
  });

  return (
    <div>
      <h1 className="text-base sm:text-2xl font-bold mb-4">Gestion des cours</h1>

      <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Cours en ligne" icon={Upload} value={totalCourses} color="#f35b04" />
          <StatCard name="Revenu total" icon={PiggyBank} value={"12.000 FCFA"} color="#10B981" />
          <StatCard name="top tendance" icon={TrendingUp} value={8} color="#885CF6" />
          <StatCard name="Cours peu suivis" icon={AlertTriangle} value={3} color="#ef233c" />
        </motion.div>

        {/* COURSES TABLE */}
        <CoursesTable />

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CoursesAddedChart />
            <CategoryDistributionChart ColSpan2={false}/>
        </div>
      </div>
    </div>
  );
}
