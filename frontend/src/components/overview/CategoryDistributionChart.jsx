import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

const categoryData = [
  { name: 'Bureautique', value: 120 },
  { name: 'Marketing', value: 350 },
  { name: 'Graphisme', value: 329 },
  { name: 'Audiovisuel', value: 200 },
  { name: 'Developpement web', value: 283 },
  { name: 'Communication digitale', value: 200 },
  { name: 'Developpement mobile', value: 83},
  { name: 'Gestion de projet', value: 76 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#344CB7', '#FF748B', '#4DA1A9'];

export default function CategoryDistributionChart({ColSpan2}) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`bg-white backdrop-blur-md p-6 shadow-lg rounded-xl border border-black-100 ${ColSpan2 ? 'lg:col-span-2' : ''}`}
    >
      <h2 className="text-lg font-medium mb-4 text-black">
        Répartition des cours par catégories
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}% `}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#485563"
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}