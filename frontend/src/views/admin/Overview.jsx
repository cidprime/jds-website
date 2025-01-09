import { motion } from "framer-motion";
import { BarChart2, Upload, Users, Zap } from "lucide-react";
import StatCard from "../../components/common/StatCard"
import IncomeOverviewChart from "../../components/overview/IncomeOverviewChart";
import EnrollmentOverviewChart from "../../components/overview/EnrollmentOverviewChart";
import CategoryOverviewChart from "../../components/overview/CategoryOverviewChart";

export default function Overview() {
  return (
    <div>
      <h1 className="text-base sm:text-2xl font-bold mb-4">Aperçu</h1>

      <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard 
            name="Revenu total" icon={Zap} value="12.000 XOF" color="#6366F1"
          />
          <StatCard
            name="Nouveaux utilisateurs" icon={Users} value="12" color="#885CF6"
          />
          <StatCard
            name="Cours en ligne" icon={Upload} value="12" color="#EC4899"
          />
          <StatCard
            name="Taux de conversion" icon={BarChart2} value="12%" color="#10B981"
          />
        </motion.div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <IncomeOverviewChart/>
          <EnrollmentOverviewChart/>
          <CategoryOverviewChart/>
        </div>
      </div>
    </div>

  );
}
