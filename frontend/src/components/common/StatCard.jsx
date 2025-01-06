import { motion } from 'framer-motion';

export default function StatCard({ name, icon:Icon , value, color }) {
  return (
    <motion.div
      className='bg-white backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-100'
      whileHover={{ y: -4, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)' }}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className='flex items-center text-sm font-medium text-black'>
          <Icon
            size={20}
            style={{color}}
            className="mr-2"
          />
          {name}
        </span>
        <p className='mt-1 text-2xl font-semibold text-black'>
          {value}
        </p>
      </div>
    </motion.div>
  )
}