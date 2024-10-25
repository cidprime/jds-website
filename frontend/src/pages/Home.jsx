import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSignal, FaClock } from "react-icons/fa";

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Récupération des cours via l'API
    fetch("/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Erreur lors de la récupération des cours :", error));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-5 px-5">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Nos Cours Disponibles</h1>
        
        <div className="space-y-4">
          {courses.map((course) => (
            <Link to={`/${course._id}/info`} key={course._id} className="block">
              <div className="flex bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 p-2">
                
                <div className="max-w-64 max-h-40 object-cover">
                  <img className="object-cover w-44 h-auto sm:w-64 sm:h-40"
                    src={course.imageUrl}
                    alt={course.title}
                  />
                </div>
                
                <div className="px-4 w-auto flex flex-col">

                  <div>
                    <span className="text-xs sm:text-sm text-blue-700 uppercase font-semibold">{course.domain} - Cours</span>
                    <h2 className="text-sm sm:text-xl font-bold text-black">{course.title}</h2>
                  </div>
                  
                  <div className="mt-1 flex items-center gap-2">

                    <div className="flex items-center gap-2 text-sm sm:text-base">
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
                          {course.isFree ? "Free" : `${course.price} XOF`}
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
      </div>
    </div>
  );
}
