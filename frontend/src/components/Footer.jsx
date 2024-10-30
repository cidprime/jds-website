import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 py-4 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex flex-wrap justify-between">
          {/* Logo et description */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            
            <h2 className='font-bold text-base sm:text-lg flex flex-wrap'>
              <span className='text-blue-900'>JED</span>
              <span className='text-yellow-500'>DIGITAL</span>
              <span className='text-blue-900'>SOLUTIONS</span>
            </h2>
            
            <p className="mt-4 text-gray-700">
              Plateforme d'apprentissage en ligne dédiée à la formation continue, accessible à tous, partout et à tout moment.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold text-black mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-blue-700">À propos</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-700">Cours</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-blue-700">Tarifs</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-blue-700">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-700">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact et réseaux sociaux */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Contactez-nous</h3>
            <p className="text-gray-700">contact@plateforme.com</p>
            <p className="text-gray-700">+226 76 12 56 79</p>
            <div className="mt-4 flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700">
                <FaFacebook/>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700">
                <FaTwitter/>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700">
                <FaLinkedin/>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700">
                <FaInstagram/>
              </a>
            </div>
          </div>
        </div>

        {/* Mentions légales et droits réservés */}
        <div className="mt-6 border-t border-gray-200 pt-6 text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} Jed Digital Solutions. Tous droits réservés.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy-policy" className="hover:text-blue-700">Politique de confidentialité</Link>
            <Link to="/terms" className="hover:text-blue-700">Conditions d'utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}