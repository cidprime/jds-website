import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { motion } from "framer-motion"

const EnrollmentData = [
  {namex: "juil", inscription: "10"},
  {namex: "Août", inscription: "23"},
  {namex: "Sept", inscription: "48"},
  {namex: "Oct", inscription: "100"},
  {namex: "Nov", inscription: "83"},
  {namex: "Déc", inscription: "29"},
  {namex: "Janv", inscription: "33"},
  {namex: "Févr", inscription: "54"},
  {namex: "Mars", inscription: "59"},
  {namex: "Avr", inscription: "62"},
  {namex: "Mai", inscription: "48"},
  {namex: "Juin", inscription: "48"}
]
export default function EnrollmentOverviewChart() {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white backdrop-blur-md p-6 shadow-lg rounded-xl border border-black-100"
    >
      <h2 className="text-lg font-medium mb-4 text-black"
      >Nombre d’inscriptions</h2>

      <div className="h-60">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <AreaChart
            width={500}
            height={400}
            data={EnrollmentData}
            margin={{
              top: 10,
              right: 0,
              left: -28,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="namex" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="inscription" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}