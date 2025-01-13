import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { motion } from "framer-motion"

const EnrollmentData = [
  {namex: "juil", inscription: "24"},
  {namex: "Août", inscription: "43"},
  {namex: "Sept", inscription: "48"},
  {namex: "Oct", inscription: "173"},
  {namex: "Nov", inscription: "83"},
  {namex: "Déc", inscription: "29"},
  {namex: "Janv", inscription: "53"},
  {namex: "Févr", inscription: "54"},
  {namex: "Mars", inscription: "59"},
  {namex: "Avr", inscription: "92"},
  {namex: "Mai", inscription: "88"},
  {namex: "Juin", inscription: "78"}
]
export default function EnrollmentOverviewChart() {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
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
            <YAxis domain={[0, 200]} tickCount={10} />
            <Tooltip />
            <Area type="monotone" dataKey="inscription" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}