import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"

const CoursesAddedData = [
  {namex: "Juil", cours: "16"},
  {namex: "Août", cours: "33"},
  {namex: "Sept", cours: "59"},
  {namex: "Oct", cours: "25"},
  {namex: "Nov", cours: "48"},
  {namex: "Déc", cours: "28"},
  {namex: "Janv", cours: "68"},
  {namex: "Févr", cours: "10"},
  {namex: "Mars", cours: "37"},
  {namex: "Avr", cours: "31"},
  {namex: "Mai", cours: "75"},
  {namex: "Juin", cours: "85"}
]

export default function CoursesAddedChart() {
  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white backdrop-blur-md p-6 shadow-lg rounded-xl border border-black-100"
      >
        <h2 className="text-lg font-medium mb-4 text-black"
        >Nouveaux cours ajoutés</h2>
  
        <div className="h-80">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart 
              data={CoursesAddedData}
              margin={{
                top: 10,
                right: 0,
                left: -28,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis dataKey={"namex"} />
                <YAxis stroke="#9Ca3af" domain={[0, 100]} tickCount={10} />
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
                  dataKey="cours"
                  stroke="#6166F1"
                  strokeWidth={3}
                  dot={{ fill: "#6166F1", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, strokeWidth: 2 }}
                />
               
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    )
}