import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"

const IncomeData = [
  {namex: "Juil", revenu: "10000"},
  {namex: "Août", revenu: "13000"},
  {namex: "Sept", revenu: "9000"},
  {namex: "Oct", revenu: "31500"},
  {namex: "Nov", revenu: "7820"},
  {namex: "Déc", revenu: "20500"},
  {namex: "Janv", revenu: "50200"},
  {namex: "Févr", revenu: "100000"},
  {namex: "Mars", revenu: "57800"},
  {namex: "Avr", revenu: "90900"},
  {namex: "Mai", revenu: "80750"},
  {namex: "Juin", revenu: "30400"}
]
export default function IncomeOverviewChart() {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white backdrop-blur-md p-6 shadow-lg rounded-xl border border-black-100"
    >
      <h2 className="text-lg font-medium mb-4 text-black"
      >Revenus générés</h2>

      <div className="h-60">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={IncomeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey={"namex"} />
              <YAxis stroke="#9Ca3af" domain={[0, 110000]} tickCount={12}/>
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
                dataKey="revenu"
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