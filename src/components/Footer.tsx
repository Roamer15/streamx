import { MessageSquare } from "lucide-react";
import { Link } from "react-router";
import { useFeedback } from "../hooks/useFeedback";

const Footer = () => {
  const { openFeedbackModal } = useFeedback();

  return (
    <footer
      style={{
        background: "#0e0e0e",
        borderTop: "1px solid rgba(72,72,71,0.18)",
        marginTop: "5.5rem",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-14">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-3">
            <Link to="/">
              <span
                className="text-2xl font-extrabold tracking-tight"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                <span className="text-white">Chwii</span>
                <span style={{ color: "#ff8d8f" }}>X</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "#adaaaa" }}>
              Elevating your cinematic journey with premium content and
              unparalleled quality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-white font-bold text-sm tracking-widest uppercase mb-5"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "Movies", path: "/movies" },
                { label: "TV Series", path: "/series" },
                { label: "Favourites", path: "/favourites" },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm transition-colors"
                    style={{ color: "#adaaaa" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#ff8d8f";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#adaaaa";
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white font-bold text-sm tracking-widest uppercase mb-5"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Contact
            </h4>
            <p className="text-sm mb-4" style={{ color: "#adaaaa" }}>
              Have questions or feedback?
            </p>
            <button
              onClick={openFeedbackModal}
              className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full transition-all hover:opacity-90"
              style={{
                background: "rgba(255,141,143,0.10)",
                color: "#ff8d8f",
                border: "1px solid rgba(255,141,143,0.2)",
              }}
            >
              <MessageSquare size={15} />
              Send Feedback
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(72,72,71,0.18)", marginBottom: "2rem" }} />

        {/* Disclaimer */}
        <div
          className="rounded-2xl p-4 mb-8"
          style={{
            background: "#131313",
            border: "1px solid rgba(72,72,71,0.12)",
          }}
        >
          <p className="text-xs leading-relaxed" style={{ color: "#adaaaa" }}>
            <strong className="text-white">Disclaimer:</strong> All videos and
            pictures on ChwiiX are from the Internet, and their copyrights
            belong to the original creators. We only provide webpage services
            and do not store, record, or upload any content.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "#484847" }}>
            &copy; {new Date().getFullYear()} ChwiiX. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Contact Us"].map((item) => (
              <span
                key={item}
                className="text-xs cursor-pointer transition-colors"
                style={{ color: "#484847" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.color = "#adaaaa";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.color = "#484847";
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
