import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-100 py-10 shadow-2xl mt-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        <div className="flex">
          <img src="https://i.ibb.co/cQ68nnZ/Arts-Institute-removebg-preview-1.png" alt="Theater Art" className="h-10" />
        </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Contact</h3>
            <p className="">123 Woodland Street, Wonderland</p>
            <p className="">Email: info@theaterarts.com</p>
            <div className="flex space-x-2 mt-2">
              <a href="https://facebook.com"><FaFacebook className="text-blue-500 hover:text-gray-300 text-xl" /></a>
              <a href="https://twitter.com"><FaTwitter className="text-blue-500 hover:text-gray-300 text-xl" /></a>
              <a href="https://instagram.com"><FaInstagram className="text-red-600 hover:text-gray-300 text-xl" /></a>
            </div>
          </div>
        </div>
    </footer>
  );
}

export default Footer;
