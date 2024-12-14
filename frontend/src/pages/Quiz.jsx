import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// les scores des quiz 

export default function Quiz() {
  const { id } = useParams(); // Récupère l'ID de la section depuis l'URL
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`${API_URL}/api/quiz/${id}`);
        const data = await response.json();
        setQuiz(data.quiz); // Assigne les données à l'état
      } catch (error) {
        console.error("Erreur lors de la récupération du quiz :", error);
      }
    };

    fetchQuiz();
  }, [id]);

  if (!quiz || !quiz.questions) return <div>Chargement du quiz...</div>;

  // Gestion de la sélection des réponses
  const handleAnswerChange = (questionIndex, optionIndex) => {
    const answers = { ...selectedAnswers };
    if (!answers[questionIndex]) answers[questionIndex] = [];
    const answerIndex = answers[questionIndex].indexOf(optionIndex);
    if (answerIndex === -1) {
      answers[questionIndex].push(optionIndex);
    } else {
      answers[questionIndex].splice(answerIndex, 1);
    }
    setSelectedAnswers(answers);
  };

  // Validation des réponses
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      {console.log("Données du quiz dans le rendu:", quiz)} {/* Vérifie que le quiz est présent ici */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{quiz.title}</h1>
        
        {quiz.questions.map((q, questionIndex) => (
          <div key={questionIndex} className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Question {questionIndex + 1}: {q.question}
            </h2>
            <div className="mt-3 space-y-2">
              {q.options.map((option, optionIndex) => {
                const isCorrect = isSubmitted && q.correctAnswer.includes(optionIndex);
                const isIncorrect = isSubmitted && !q.correctAnswer.includes(optionIndex) && selectedAnswers[questionIndex]?.includes(optionIndex);
                
                return (
                  <label
                    key={optionIndex}
                    className={`block p-3 border rounded-lg cursor-pointer ${
                      isCorrect ? "bg-green-100 border-green-400" :
                      isIncorrect ? "bg-red-100 border-red-400" : "border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedAnswers[questionIndex]?.includes(optionIndex) || false}
                      onChange={() => handleAnswerChange(questionIndex, optionIndex)}
                      disabled={isSubmitted}
                    />
                    {option}
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            className="mt-8 bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-800 transition duration-300"
          >
            Valider
          </button>
        ) : (
          <div className="mt-8 p-4 bg-gray-100 text-center rounded-lg">
            <p className="text-lg font-semibold text-gray-700">Résultats</p>
            <p className="text-gray-600">Les réponses correctes sont en vert, les incorrectes en rouge.</p>
          </div>
        )}
      </div>
    </div>
  );
}
