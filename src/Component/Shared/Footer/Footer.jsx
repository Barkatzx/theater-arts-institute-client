import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-100 shadow-2xl mt-6">
        <div className="flex flex-col md:flex-row justify-between items-center p-10">
          <div className="items-center">
            <img
              src="https://i.ibb.co/cQ68nnZ/Arts-Institute-removebg-preview-1.png"
              alt="Theater Art"
              className="h-10"
            />
            <p className="text-lg mt-3">
              Experience the magic of theater arts. The Theater Art Institute is a prestigious <br />
              institution dedicated to the study and practice of theater arts. We offer <br />
              comprehensive programs in acting, directing, stage design, and more.
            </p>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div>
              <h3 className="text-xl font-bold mb-2 uppercase">Quick Links</h3>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/shows">Shows</Link>
                </li>
                <li>
                  <Link to="/tickets">Tickets</Link>
                </li>
                <li>
                  <Link to="/gallery">Gallery</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 uppercase">Contact</h3>
              <p className="text-gray-700">123 Woodland Street, Wonderland</p>
              <p className="text-gray-700">Email: info@theaterarts.com</p>
              <div className="flex space-x-2 mt-2">
                <a href="https://facebook.com">
                  <FaFacebook className="text-blue-500 hover:text-gray-300 text-2xl" />
                </a>
                <a href="https://twitter.com">
                  <FaTwitter className="text-blue-500 hover:text-gray-300 text-2xl" />
                </a>
                <a href="https://instagram.com">
                  <FaInstagram className="text-red-600 hover:text-gray-300 text-2xl" />
                </a>
              </div>
            </div>
            <div className="">
              <h3 className="text-xl font-bold mb-2 uppercase">Newsletter</h3>
              <p>Enter your email</p>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Enter email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-indigo-500"
                />
                <button className="bg-indigo-500 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
