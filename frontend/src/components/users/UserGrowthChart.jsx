import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { motion } from 'framer-motion'

const usersGrowthData = [
  {month: "Juil", users: "1000"},
  {month: "Août", users: "1500"},
  {month: "Sept", users: "2000"},
  {month: "Oct", users: "3000"},
  {month: "Nov", users: "4000"},
  {month: "Déc", users: "4500"},
  {month: "Janv", users: "5000"},
  {month: "Févr", users: "5500"},
  {month: "Mars", users: "5900"},
  {month: "Avr", users: "6000"},
  {month: "Mai", users: "6100"},
  {month: "Juin", users: "6400"}
]

export default function UserGrowthChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white backdrop-blur-md p-6 shadow-lg rounded-xl border border-black-100"
    >
        <h2 className="text-lg font-medium mb-4 text-black">Croissance des utilisateurs</h2>

        <div className="h-[320px]">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart 
              data={usersGrowthData}
              margin={{
                top: 10,
                right: 0,
                left: -10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey={"month"} stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" domain={[0, 7000]} tickCount={1000} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(31, 41, 55, 0.8)",
                    borderColor: "#485563"
                  }}
                  itemStyle={{
                    color: "#E5E7EB"
                  }}
                />
                <Line 
                  type="monotone"
                  dataKey="users"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 8 }}
                />
                
            </LineChart>
          </ResponsiveContainer>
        </div>
    </motion.div>
  )
}
