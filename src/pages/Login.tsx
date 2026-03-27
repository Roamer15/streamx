import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate("/");
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setGoogleLoading(true);
    const { error } = await signInWithGoogle();
    setGoogleLoading(false);
    if (error) setError(error.message);
  };

  const inputStyle = {
    background: "#1a1919",
    border: "1px solid rgba(72,72,71,0.3)",
    color: "#ffffff",
  };

  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.boxShadow = "0 0 0 2px rgba(233,0,58,0.15)";
    e.currentTarget.style.borderColor = "rgba(255,141,143,0.4)";
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.borderColor = "rgba(72,72,71,0.3)";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#0e0e0e" }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{
          background: "#131313",
          border: "1px solid rgba(72,72,71,0.2)",
          boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
        }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <span
              className="text-3xl font-extrabold tracking-tight"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              <span className="text-white">Chwii</span>
              <span style={{ color: "#ff8d8f" }}>X</span>
            </span>
          </Link>
          <p className="mt-2 text-sm" style={{ color: "#adaaaa" }}>
            Sign in to your account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            className="mb-5 px-4 py-3 rounded-2xl text-sm"
            style={{
              background: "rgba(233,0,58,0.08)",
              border: "1px solid rgba(255,141,143,0.25)",
              color: "#ff8d8f",
            }}
          >
            {error}
          </div>
        )}

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          style={{
            background: "#1a1919",
            border: "1px solid rgba(72,72,71,0.3)",
            color: "#ffffff",
          }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          {googleLoading ? "Redirecting..." : "Continue with Google"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px" style={{ background: "rgba(72,72,71,0.3)" }} />
          <span className="text-xs" style={{ color: "#484847" }}>or</span>
          <div className="flex-1 h-px" style={{ background: "rgba(72,72,71,0.3)" }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1.5 font-medium" style={{ color: "#adaaaa" }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all placeholder-[#484847]"
              style={inputStyle}
              onFocus={inputFocus}
              onBlur={inputBlur}
            />
          </div>
          <div>
            <label className="block text-sm mb-1.5 font-medium" style={{ color: "#adaaaa" }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all placeholder-[#484847]"
              style={inputStyle}
              onFocus={inputFocus}
              onBlur={inputBlur}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full text-sm font-bold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            style={{
              background: "linear-gradient(135deg, #ff8d8f 0%, #e9003a 100%)",
              color: "#000000",
              boxShadow: "0 8px 24px rgba(233,0,58,0.3)",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: "#484847" }}>
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold" style={{ color: "#ff8d8f" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
