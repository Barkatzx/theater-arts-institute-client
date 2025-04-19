import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 md:px-40 px-4 py-10 mt-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        
        {/* Logo and About */}
        <div className="flex-1">
          <img
            src="https://i.ibb.co/cQ68nnZ/Arts-Institute-removebg-preview-1.png"
            alt="Theater Art"
            className="h-12 mb-4"
          />
          <p className="text-base leading-relaxed">
            Experience the magic of theater arts. The Theater Art Institute is a prestigious
            institution dedicated to the study and practice of theater arts. We offer
            comprehensive programs in acting, directing, stage design, and more.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-3 uppercase">Contact</h3>
          <p className="mb-1">123 Woodland Street, Wonderland</p>
          <p className="mb-2">Email: info@theaterarts.com</p>
          <div className="flex space-x-4 mt-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-2xl hover:text-blue-600 transition duration-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-2xl hover:text-sky-500 transition duration-300" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl hover:text-pink-500 transition duration-300" />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex-1 w-full">
          <h3 className="text-xl font-bold mb-3 uppercase">Newsletter</h3>
          <p className="mb-2">Enter your email</p>
          <div className="flex w-full max-w-md">
            <input
              type="text"
              placeholder="Enter email"
              className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} Theater Art Institute. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
