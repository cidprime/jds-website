import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

const API_URL = import.meta.env.VITE_API_URL;

export default function CourseInfo() {
  const { id } = useParams(); // Récupère l'ID du cours depuis l'URL
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // Récupération des informations détaillées d'un cours via l'API
    fetch(`${API_URL}/api/courses/${id}/info`)
      .then((response) => response.json())
      .then((data) => setCourse(data))
      .catch((error) => console.error("Erreur lors de la récupération des informations du cours :", error));
  }, [id]);

  // Vérifie si l'utilisateur est déjà inscrit
  useEffect(() => {
    if (currentUser && currentUser._id) {
      fetch(`${API_URL}/api/enrollments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser._id, courseId: id }),
      })
        .then((response) => response.json())
        .then((data) => setIsEnrolled(data.isEnrolled))
        .catch((error) =>
          console.error("Erreur lors de la vérification de l'inscription :", error)
        );
    }
  }, [id, currentUser]);  

  // Gère l'inscription ou le démarrage du cours
  const handleStartCourse = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/enrollments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser._id, courseId: id }),
      });

      const data = await response.json();

      if (data.status === "registered") {
        setIsEnrolled(true);
      } else if (data.status === "payment_required") {
        // Logique de paiement pour les cours payants
        alert("Ce cours est payant, veuillez effectuer le paiement pour commencer!!!.");
      }
    } catch (error) {
      console.error("Erreur lors du démarrage du cours :", error);
    }
    setLoading(false);
  };


  if (!course) {
    return <p className="text-center text-gray-600">Chargement des informations du cours...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-100 py-5 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row">
          {/* Partie gauche avec les informations principales */}
          <div className="px-6 pr-28 mb-12 sm:w-2/3">
            <Link to="/" className="flex gap-2 items-center text-sm font-semibold mb-2">
              <FaArrowLeft/>
              <span>Tous les cours</span>
            </Link>
            <div className="mt-4">
              <span className="text-xs sm:text-sm text-blue-700 uppercase font-semibold">{course.domain}</span>
              <h1 className="text-1xl sm:text-2xl font-bold text-black mt-2">{course.title}</h1>
              <p className="text-sm sm:text-lg text-gray-700 mt-4">{course.description}</p>
            </div>
            <div className="mt-6 flex gap-4 items-center">
              <span className="text-black font-bold text-sm">Ce cours vous intéresse ?</span>
              {course.isFree ? (

                <Link to={`/${course._id}/course-content`}>
                  {isEnrolled ? (
                    <button onClick={handleStartCourse} className="bg-blue-700 text-center text-white px-8 py-2 rounded-lg hover:bg-blue-800">
                      Repprendre
                    </button>
                  ) : (
                    <button onClick={handleStartCourse} className="bg-blue-800 text-center text-white px-8 py-2 rounded-lg hover:bg-blue-900">
                      Commencer
                    </button>
                  ) }
                </Link>

                ) : (

                  <Link onClick={handleStartCourse} to={`/${course._id}/course-content`}>
                    <button className="bg-green-700 text-center text-white px-8 py-2 rounded-lg hover:bg-green-800">
                      Acheter
                    </button>
                  </Link>
                  
                )
              }
            </div>
          </div>

          {/* Partie droite avec la carte d'information */}
          <div className="sm:w-1/3 bg-white shadow-md rounded-lg p-6 mx-6">
            {/* <h2 className="text-1xl sm:text-2xl font-semibold text-gray-800 mb-4">Détails du cours</h2> */}
            <ul className="space-y-3 font-bold">
              <li className="flex flex-col justify-between text-gray-700">
                <span className="text-1xl sm:text-lg text-black font-bold">Cours - serie de {course.sections.length} parties</span>
                <span className="text-sm font-normal text-gray-500">Approfondisser votre connaissance d'un sujet</span>
              </li>
              <hr className="border-solid border-1 border-black"/>
              <li className="flex text-black">
                <span className="flex items-center gap-2">
                  <span>{course.rating}</span>
                  <FaStar/>
                  <span>(14227 avis)</span>
                  {/* {course.rating} / 5 ({course.reviews.length} avis) */}
                </span>
              </li>
              <li className="flex flex-col text-black">
                <div className="flex gap-2">
                  <span>niveau </span>
                  <span>{course.level}</span>
                </div>
                {course.level === "Beginner" ? <span className="text-sm font-normal text-gray-500">Aucune connaissance prérequise</span> : ""}
              </li>
              <li className="flex gap-1 text-gray-900">
                <span>Temps estimé pour terminer le cours : </span>
                <span>{course.duration} heures</span>
              </li>
              <hr className="border-solid border-1 border-black"/>
              <li className="flex gap-2 text-gray-900 font-medium text-sm">
                <span>3247</span>
                <span>déjà inscrits</span>
                {/* <span>{course.enrolledStudents} personnes</span> */}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-4xl sm:px-10">
        {/* Aperçu du cours */}
        <div className="py-5 bg-white">
          <div className="px-5">
            <h2 className="text-1xl font-bold text-black mb-1">Aperçu du cours</h2>
            <hr className="border-solid border-1 border-gray-300 mb-5"/>
            <div className="mb-6">

              <iframe className="w-full h-96 object-cover rounded-lg" src={course.previewVideoUrl} title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"allowFullScreen></iframe>

            </div>
            <p className="text-base text-black ">{course.previewText}</p>
          </div>
        </div>

        {/* Table des matières */}
        <div className="bg-gray-50 py-5">
          <div className="mx-auto px-5">
            <h2 className="text-1xl font-bold text-black mb-1">Table des matières</h2>
            <hr className="border-solid border-1 border-gray-300 mb-5"/>
            {course.sections.map((section, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-800">{`Partie ${index + 1}: ${section.title}`}</h3>
                <ul className="mt-3 ml-5 list-disc text-gray-700">
                  {section.chapters.map((chapter, i) => (
                    <li key={i}>{chapter.title}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contributeurs */}
        <div className="bg-white py-5">
          <div className="mx-auto px-5">
            <h2 className="text-1xl font-bold text-black mb-1">Contributeurs</h2>
            <hr className="border-solid border-1 border-gray-300 mb-5"/>
            <ul className="space-y-4">
              {course.createdBy.map((contributor, index) => (
                <li key={index} className="flex gap-2 text-base text-gray-700">
                  <img src={contributor.avatar} alt="avatar" className="rounded-full h-7 w-7 object-cover" />
                  <span>{contributor.lastname}</span>
                  <span>{contributor.firstname}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
