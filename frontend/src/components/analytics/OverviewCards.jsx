import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, DollarSign, Eye, LibraryBig, Users } from 'lucide-react'

const overviewData = [
  {name: "Revenu", value: "984.000 CFA", change: 12.4, icon: DollarSign},
  {name: "Users", value: "43000", change: 8.2, icon: Users},
  {name: "Cours ajoutés", value: "12", change: -3.1, icon: LibraryBig},
  {name: "Pages vues", value: "3000", change: 16.3, icon: Eye}
]

export default function OverviewCards() {
  return (
    <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'>
      {overviewData?.map((item, index) => (
        <motion.div
          className='bg-white overflow-hidden backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-100'
          key={item?.name}
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className='text-sm font-medium text-black'>{item?.name}</h3>
              <p className="mt-1 text-xl font-semibold text-black">
                {item?.value}
              </p>
            </div>
            <div className={`p-3 rounded-full bg-opacity-20 ${item?.change >= 0 ? 'bg-green-600' : 'bg-red-600 '}`}>
              <item.icon className={`size-6 ${item?.change >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </div>
          <div className={`mt-4 flex items-center ${item?.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {item?.change >= 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
            <span className='ml-1 text-sm font-medium'>{Math.abs(item?.change)}%</span>
            <span className='ml-2 text-xs font-medium text-gray-400'>{ item?.change >= 0 ? 'de plus' : 'de moins'}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
