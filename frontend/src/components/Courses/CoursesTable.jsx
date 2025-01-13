import { motion } from 'framer-motion'
import { Edit, Search, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL;

export default function CoursesTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [coursesData, setCoursesData] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/courses/`)
      .then((response) => response.json())
      .then((data) => {
        setCoursesData(data.courses)
      })
      .catch((error) => console.error("Erreur lors de la récupération des cours :", error))
  }, []);

  useEffect(() => {
    setFilteredCourses(coursesData);
  }, [coursesData]);
  
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = coursesData.filter(course => course.title.toLowerCase().includes(term) || course.domain.toLowerCase().includes(term));

    setFilteredCourses(filtered);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white backdrop-blur-md p-6 mb-8 shadow-lg rounded-xl border border-black-100"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-black">Liste des cours</h2>
        <div className="relative">
          <input 
            type="text"
            placeholder='Search courses...'
            className='bg-gray-100 placeholder-gray-400 text-black rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className='absolute left-3 top-2.5 text-gray-500' size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-500">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inscrits</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {filteredCourses.map((course) => (
                <motion.tr 
                  key={course._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black-400 flex gap-2 items-center truncate">
                    <img src={course?.imageUrl} className='size-10 rounded-full' />
                    {course?.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-black-400 uppercase">
                    {course?.domain}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-black-400 ${course?.isFree && 'text-green-700'}`}>
                    {course?.isFree ? 'Free' : course?.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-black-400 uppercase">
                    {22}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-black-400 uppercase">
                    <button className='text-indigo-500 hover:text-indigo-700 mr-2'>
                      <Edit size={18}/>
                    </button>
                    <button className='text-red-500 hover:text-red-700'>
                      <Trash2 size={18}/>
                    </button>
                  </td>
                  
                </motion.tr>
              ))}
          </tbody>
        </table>
      </div>
      
    </motion.div>
  )
}