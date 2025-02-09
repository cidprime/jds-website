import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSignal, FaClock, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const coursesPerPage = 10;
  const location = useLocation();
  const navigate = useNavigate();
  const totalPages = Math.ceil(totalCourses / coursesPerPage);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const queryFromUrl = urlParams.get('query');

    setLoading(true);
    const startIndex = (currentPage - 1) * coursesPerPage;

    const fetchUrl = queryFromUrl 
      ? `${API_URL}/api/courses/?query=${queryFromUrl}&limit=${coursesPerPage}&startIndex=${startIndex}` 
      : `${API_URL}/api/courses/?limit=${coursesPerPage}&startIndex=${startIndex}`;
      
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.courses); 
        setTotalCourses(data.totalCourses);
        setLoading(false);
      })
      .catch((error) => console.error("Erreur lors de la récupération des cours :", error));
  
  }, [location.search, currentPage]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(urlParams.get('page')) || 1;
    setCurrentPage(pageFromUrl);
  }, [location.search]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('page', currentPage);
    navigate(`?${urlParams.toString()}`, { replace: true });
  }, [currentPage]);

  return (
    <div className="bg-gray-50 min-h-screen py-5 px-5">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Nos Cours Disponibles</h1>
        
        <div className="space-y-4">
          {courses.map((course) => (
            <Link to={`/${course._id}/info`} key={course._id} className="block">
              <div className="flex bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 p-2">
                
                <div className="w-1/3 max-w-64 max-h-40 object-cover">
                  <img className="object-cover w-44 h-auto sm:w-64 sm:h-40"
                    src={course.imageUrl}
                    alt={course.title}
                  />
                </div>
                
                <div className="w-2/3 px-4 flex flex-col">

                  <div>
                    <div className="flex flex-row text-xs sm:text-sm text-blue-700 uppercase font-semibold gap-1">
                      <span> {course.domain} </span>
                      <span className="hidden sm:block"> - Cours</span>
                    </div>
                    <h2 className="text-sm sm:text-xl font-bold text-black truncate">{course.title}</h2>
                  </div>
                  
                  <div className="mt-1 flex items-center gap-2">

                    <div className="flex items-center gap-2 text-xs sm:text-base">
                      <FaSignal title="Niveau"/>
                      <span>{course.level}</span>
                    </div>

                    <div className="hidden sm:block">
                      <div className="flex items-center gap-2 text-sm sm:text-base">
                        <FaClock />
                        <span>{course.duration} heures</span>
                      </div>
                    </div>
                    
                    <div className="hidden sm:block">
                      <div className="flex items-center gap-2 text-sm sm:text-base">
                        <span className="text-gray-500">Prix :</span>
                        <span className="text-green-600">
                          {course.isFree ? "Free" : `${course.price} CFA`}
                        </span>
                      </div>
                    </div>

                  </div>

                  <p className="hidden sm:block text-gray-600 mt-1">
                    {course.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {courses && totalPages > 1 && 
          <div className="flex items-center justify-center mt-8 space-x-2">
            {/* Bouton Précédent */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`w-10 h-12 flex items-center justify-center rounded-md ${
                currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-700'
              }`}>
              <FaChevronLeft />
            </button>

            {/* Numéros des pages */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-md ${
                  page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-blue-700 hover:text-white'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Bouton Suivant */}
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage >= totalPages}
              className={`w-10 h-12 flex items-center justify-center rounded-md ${
                currentPage >= totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-700'
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        }
      </div>
    </div>
  );
}
