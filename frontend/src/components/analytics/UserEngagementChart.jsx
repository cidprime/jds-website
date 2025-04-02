import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Lun', connexions: "4000", nouveaux_inscrits: "2400", cours_commences: "2400", cours_termines: "25",},
  { name: 'Mar', connexions: "3000", nouveaux_inscrits: "1398", cours_commences: "2210", cours_termines: "40",},
  { name: 'Mer', connexions: "2000", nouveaux_inscrits: "9800", cours_commences: "2290", cours_termines: "20",},
  { name: 'Jeu', connexions: "2780", nouveaux_inscrits: "3908", cours_commences: "2000", cours_termines: "37",},
  { name: 'Ven', connexions: "1890", nouveaux_inscrits: "4800", cours_commences: "2181", cours_termines: "63",},
  { name: 'Sam', connexions: "2390", nouveaux_inscrits: "3800", cours_commences: "2500", cours_termines: "58",},
  { name: 'Dim', connexions: "3490", nouveaux_inscrits: "4300", cours_commences: "2100", cours_termines: "82",},
];
export default function UserEngagementChart() {
  return (
    <motion.div
      className='bg-white overflow-hidden backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-100 mb-8'
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium mb-4 text-black">Engagement</h2>
        <select className='bg-gray-200 text-black rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500'>
          <option>Cette semaine</option>
          <option>Cet mois</option>
          <option>Cet trimestre</option>
          <option>Cette année</option>
        </select>
      </div>

      <div className="h-60">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 0,
              left: -18,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 200]} tickCount={10} />
            <Tooltip />
            <Area type="monotone" dataKey="connexions" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            <Area type="monotone" dataKey="nouveaux_inscrits" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
            <Area type="monotone" dataKey="cours_commences" stroke="#8F87F1" fill="#8F87F1" fillOpacity={0.3} />
            <Area type="monotone" dataKey="cours_termines" stroke="#E9A5F1" fill="#E9A5F1" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}