import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaClock, FaSignal } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function CourseContent() {
  const { id } = useParams(); // ID du cours à partir de l'URL
  const [course, setCourse] = useState(null);
  const [hasAccess, setHasAccess] = useState(false); // Vérifie si l'utilisateur a accès au contenu

  useEffect(() => {
    // Récupère les informations du cours, sections, chapitres, etc.
    fetch(`${API_URL}/api/courses/${id}/content`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
        // Vérifie si l'utilisateur a accès (si le cours est gratuit ou s'il est déjà payé)
        setHasAccess(data.isFree || data.userHasAccess);
      })
      .catch((error) => console.error("Erreur lors de la récupération du contenu du cours :", error));
  }, [id]);

  if (!course) return <div>Chargement...</div>;

  // Si l'accès est restreint et le cours est payant
  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Accès restreint</h2>
          <p className="text-lg text-gray-600 mb-6">
            Ce cours est payant. Veuillez effectuer le paiement pour y accéder.
          </p>
          <button className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600">
            Acheter le cours pour {course.price} XOF
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-100 py-5 sm:px-10">
        <div className="max-w-6xl mx-auto flex">
          <div className="px-4">
            <Link to={`/${course._id}/info`} className="flex gap-2 items-center text-sm font-semibold mb-2">
              <FaArrowLeft/>
              <span>Retour</span>
            </Link>
            <h1 className="text-2xl sm:text-4xl font-bold text-black mt-10">{course.title}</h1>
            <div className="flex gap-10 items-center mt-8 text-gray-700">
              <span className="flex gap-2 items-center text-md">
                <FaClock/>
                {course.duration} heures
              </span>
              <span className="flex gap-2 items-center text-md">
                <FaSignal/>
                {course.level}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Div main Contenu */}
      <div className="bg-white">
        {/* date de mise a jour */}
        <div className="flex justify-end px-2 pt-2">
          <p className="text-xs sm:text-sm text-gray-500">
            Mise à jour le {new Date(course.updatedAt).toLocaleDateString("fr-FR")}
          </p>
        </div>
        {/* Section all Contenu */}
        <div className="max-w-6xl mx-auto flex py-6 px-4">
          {/* Panneau latéral */}
          <div className="hidden sm:block w-1/4 bg-gray-50 rounded-lg p-6 top-10 h-full mr-4">
            <h2 className="text-xl font-semibold text-black mb-4">Table des matières</h2>
            <ul className="space-y-3 text-gray-700 transition-colors duration-300">
              {course.sections.map((section, index) => (
                <li key={index}>
                  <a href={`#section-${index}`} className="hover:text-blue-700">
                    {`Parie ${index + 1}: ${section.title}`}
                  </a>
                  <ul className="ml-4 mt-2 space-y-1">
                    {section.chapters.map((chapter, i) => (
                      <li key={i} className="hover:underline">
                        <a href={`#chapter-${index}-${i}`} className="hover:text-blue-600">
                          {chapter.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          {/* Contenu du cours */}
          <div className="sm:w-3/4">
            {course.sections.map((section, index) => (
              <div key={index} id={`section-${index}`} className="mb-10">
                <h2 className="text-2xl font-bold text-black">{`Partie ${index + 1}: ${section.title}`}</h2>
                {section.chapters.map((chapter, i) => (
                  <div key={i} id={`chapter-${index}-${i}`} className="mt-6">
                    <h3 className="text-xl font-semibold text-black">{chapter.title}</h3>
                    <div className="mt-4 space-y-4">
                      {chapter.segments.map((segment, idx) => (
                        <div key={idx} className="mb-6">
                          {segment.type === 'text' && (
                            <p className="text-md sm:text-lg text-black">{segment.content}</p>
                          )}
                          {segment.type === 'video' && (
                            <video
                              src={segment.content}
                              controls
                              className="w-full sm:w-auto h-80 object-cover rounded-lg my-4"
                            ></video>
                          )}
                          {segment.type === 'file' && (
                            <a
                              href={segment.content}
                              download
                              className="text-blue-700 hover:underline block mt-3"
                            >
                              Télécharger le fichier
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {/* Quiz après chaque section */}
                {section.quiz && (
                  <div className="mt-6">
                    <Link
                      to={`/quiz/${section.quiz}`}
                      className="text-white bg-green-700 px-5 py-2 rounded-lg hover:bg-green-800"
                    >
                      Passer le quiz de la partie
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
