import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Lun', connexions: 4000, nouveaux_inscrits: 2400, cours_commences: 2400, cours_termines: 25,},
  { name: 'Mar', connexions: 3000, nouveaux_inscrits: 1398, cours_commences: 2210, cours_termines: 40,},
  { name: 'Mer', connexions: 2000, nouveaux_inscrits: 9800, cours_commences: 2290, cours_termines: 20,},
  { name: 'Jeu', connexions: 2780, nouveaux_inscrits: 3908, cours_commences: 2000, cours_termines: 37,},
  { name: 'Ven', connexions: 1890, nouveaux_inscrits: 4800, cours_commences: 2181, cours_termines: 63,},
  { name: 'Sam', connexions: 2390, nouveaux_inscrits: 3800, cours_commences: 2500, cours_termines: 58,},
  { name: 'Dim', connexions: 3490, nouveaux_inscrits: 4300, cours_commences: 2100, cours_termines: 82,},
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
          <option>Aujourd'hui</option>
          <option>Cette semaine</option>
          <option>Cet mois</option>
          <option>Cet trimestre</option>
          <option>Cette année</option>
        </select>
      </div>

      <div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="connexions" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="nouveaux_inscrits" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}