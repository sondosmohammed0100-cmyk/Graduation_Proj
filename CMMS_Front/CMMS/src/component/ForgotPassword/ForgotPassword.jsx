import { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../../assets/background.png";
import api from "../../axios/Axios";

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14 text-blue-500">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14 text-blue-500">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

export default function ForgotPassword() {
  const [email,   setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [sent,    setSent]    = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) { setError("Please enter your email address."); return; }

    setLoading(true);
    try {
      await api.post("/forget", { email });
      setSent(true);
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (sent) {
    return (
      <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 font-sans">
        <div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}/>

        <div
          className="relative z-20 w-full max-w-[420px] bg-white/95 rounded-2xl px-9 py-10 text-center
                     animate-[slideUp_0.45s_cubic-bezier(0.34,1.56,0.64,1)_both]"
          style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.28),0 0 0 1px rgba(255,255,255,0.15)" }}
        >
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
              <MailIcon />
            </div>
          </div>

          <h2 className="text-xl font-bold text-blue-800 mb-2"
            style={{ fontFamily: "'Manrope',sans-serif" }}>
            Check your email!
          </h2>

          <p className="text-sm text-slate-500 mb-1">
            We sent a link to change your password:
          </p>
          <p className="text-sm font-semibold text-blue-700 mb-6 break-all">
            {email}
          </p>

          <p className="text-xs text-slate-400 mb-8 leading-relaxed">
            Click the link in the email to reset your password
          </p>

          <Link
            to="/login"
            className="w-full flex items-center justify-center gap-2 py-3
                       text-white text-sm font-semibold rounded-xl
                       transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
            }}
          >
            <span>Back to Sign in</span>
            <ArrowRightIcon />
          </Link>

          <p className="mt-5 text-xs text-slate-400">
            Didn&apos;t receive the email?{" "}
            <button
              onClick={() => { setSent(false); setError(""); }}
              className="text-blue-500 font-medium hover:text-blue-700 transition-colors"
            >
              Try again
            </button>
          </p>
        </div>

        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(28px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 font-sans">
      <div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}/>

      <div
        className="relative z-20 w-full max-w-[460px] bg-white/95 rounded-2xl px-9 py-9
                   animate-[slideUp_0.45s_cubic-bezier(0.34,1.56,0.64,1)_both]"
        style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.28),0 0 0 1px rgba(255,255,255,0.15)" }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
            <LockIcon />
          </div>
        </div>

        <h1 className="text-[22px] font-bold text-blue-800 mb-2 text-center"
          style={{ fontFamily: "'Manrope',sans-serif" }}>
          Forgot your password?
        </h1>

        <p className="text-sm text-slate-400 text-center mb-6 leading-relaxed">
          No worries! Enter your work email and we&apos;ll send you a reset link.
        </p>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-6">
            <label htmlFor="email"
              className="block text-[11px] font-semibold text-blue-800 uppercase tracking-wide mb-1.5">
              Work email
            </label>
            <input
              id="email" name="email" type="email"
              autoComplete="email" placeholder="you@hospital.org"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm
                         text-blue-700 bg-white placeholder-slate-300 outline-none
                         transition-all duration-200
                         focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
            />
          </div>

          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3
                       text-white text-sm font-semibold rounded-xl
                       transition-all duration-200
                       hover:-translate-y-0.5 active:translate-y-0
                       disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
            }}>
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"/>
            ) : (
              <><span>Send reset link</span><ArrowRightIcon/></>
            )}
          </button>
        </form>

        <div className="mt-5 text-center">
          <Link to="/login"
            className="inline-flex items-center gap-1.5 text-sm text-blue-500 font-medium hover:text-blue-700 transition-colors">
            <ArrowLeftIcon />
            Back to Sign in
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
