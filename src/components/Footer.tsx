import { MessageSquare } from "lucide-react";
import { Link } from "react-router";
import { useFeedback } from "../hooks/useFeedback";

const Footer = () => {
  const { openFeedbackModal } = useFeedback();
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="shrink-0">
            <div className="text-lg md:text-2xl font-bold bg-linear-to-r from-red-500 to-pink-500 bg-clip-text text-transparent whitespace-nowrap">
              ChwiiX
            </div>
          </Link>
            <p className="text-sm text-gray-400">
              Your gateway to unlimited entertainment
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-red-500 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/movies" className="hover:text-red-500 transition-colors">
                  Movies
                </a>
              </li>
              <li>
                <a href="/series" className="hover:text-red-500 transition-colors">
                  TV Series
                </a>
              </li>
              <li>
                <a href="/favourites" className="hover:text-red-500 transition-colors">
                  Favourites
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
           <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-sm text-gray-400 mb-2">
              Have questions or feedback?
            </p>
            <button
              onClick={openFeedbackModal}
              className="text-red-500 hover:text-red-400 transition-colors text-sm flex items-center gap-2"
            >
              <MessageSquare size={16} />
              Send Feedback
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Disclaimer */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <p className="text-xs text-gray-300 leading-relaxed">
            <strong>Disclaimer:</strong> All videos and pictures on StreamX are
            from the Internet, and their copyrights belong to the original
            creators. We only provide webpage services and do not store,
            record, or upload any content.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Chwiix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
