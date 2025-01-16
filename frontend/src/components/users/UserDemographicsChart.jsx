import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion'

const userDemographicsData = [
  {name: "18-24", value: 20},
  {name: "25-34", value: 30},
  {name: "35-44", value: 25},
  {name: "45-54", value: 15},
  {name: "55+", value: 10}
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

export default function UserDemographicsChart() {
  return (
    <motion.div
      className="bg-white backdrop-blur-md p-6 shadow-lg rounded-xl border border-black-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-black">
        Données démographiques
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={userDemographicsData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}% `}
            >
              {userDemographicsData?.map((entry, index) => (
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
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
