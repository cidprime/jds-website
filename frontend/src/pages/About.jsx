import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function About() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-10 px-5">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">À propos de nous</h1>

        <p className="text-lg text-gray-700 mb-6">
          Bienvenue sur notre plateforme d'apprentissage en ligne, où nous visons à rendre le savoir accessible à tous. 
          Que vous soyez un étudiant, un professionnel, ou une entreprise, nos cours couvrent plusieurs domaines pour répondre à vos besoins.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notre Mission</h2>
        <p className="text-lg text-gray-700 mb-6">
          Nous souhaitons offrir une expérience d'apprentissage enrichissante, flexible et accessible. Avec des contenus variés, nous sommes convaincus que chacun 
          peut atteindre ses objectifs d'apprentissage à son rythme.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pourquoi nous choisir ?</h2>
        <ul className="list-disc pl-6 text-lg text-gray-700 mb-6">
          <li className="mb-3">Des cours créés par des experts dans leur domaine</li>
          <li className="mb-3">Un suivi de vos progrès pour améliorer votre apprentissage</li>
          <li className="mb-3">Une plateforme accessible et facile à utiliser</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Commencez dès aujourd'hui</h2>
        <p className="text-lg text-gray-700 mb-6">
          Rejoignez-nous dès aujourd'hui et commencez à développer vos compétences avec nos cours. 
          Inscrivez-vous ou connectez-vous pour accéder à notre large catalogue de formations.
        </p>

        {currentUser ? (
          <div className="text-center">
            <Link to="/" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-800">
              Explorer les cours
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <Link to="/sign-up" className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-800">
              Créer un compte
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
