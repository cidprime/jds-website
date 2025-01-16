import { motion } from 'framer-motion'
import StatCard from '../../components/common/StatCard';
import { UserCheck, UserIcon, UserPlus, UserX } from 'lucide-react';
import UsersTable from '../../components/users/UsersTable';
import UserGrowthChart from '../../components/users/UserGrowthChart';
import UserDemographicsChart from '../../components/users/UserDemographicsChart';


const userStats = {
  totalUser: 210784,
  newUsers: 362,
  activeUsers: 103349,
  churnRate: "2.6%",
}

export default function ManageUsers() {
  return (
    <div>
      <h1 className="text-base sm:text-2xl font-bold mb-4">Gestion des utilisateurs</h1>

      <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Utilisateurs totaux" icon={UserIcon} value={userStats.totalUser.toLocaleString()} color="#6366F1" />
          <StatCard name="Nouveaux utilisateurs" icon={UserPlus} value={userStats.newUsers.toLocaleString()} color="#10B9B1" />
          <StatCard name="utilisateurs actifs" icon={UserCheck} value={userStats.activeUsers.toLocaleString()} color="#F59E0B" />
          <StatCard name="Taux d'attrition" icon={UserX} value={userStats.churnRate} color="#FF4444" />
        </motion.div>

        {/* COURSES TABLE */}
        <UsersTable />

        {/* USERS CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <UserGrowthChart />
            <UserDemographicsChart />
        </div>
      </div>
    </div>
  );
}
