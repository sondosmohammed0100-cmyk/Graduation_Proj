import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import bgImage from "../../assets/background.png";
import api from "../../axios/Axios";

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14 text-green-500">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

function getStrength(pwd) {
  if (!pwd) return null;
  if (pwd.length < 6)  return { label: "Weak",   width: "w-1/3",  color: "bg-red-400"   };
  if (pwd.length < 10) return { label: "Fair",   width: "w-2/3",  color: "bg-amber-400" };
  return                      { label: "Strong", width: "w-full", color: "bg-green-400" };
}

const inputCls =
  "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm " +
  "text-blue-700 bg-white placeholder-slate-300 outline-none " +
  "transition-all duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20";

export default function ResetPassword() {
  const { token }    = useParams();          // token جاي من URL: /reset/:token
  const navigate     = useNavigate();

  const [newPassword,  setNewPassword]  = useState("");
  const [cPassword,    setCPassword]    = useState("");
  const [showPwd,      setShowPwd]      = useState(false);
  const [showCPwd,     setShowCPwd]     = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState("");
  const [success,      setSuccess]      = useState(false);

  const strength = getStrength(newPassword);

  const validate = () => {
    if (!newPassword || !cPassword) return "Please fill in all fields.";
    if (newPassword.length < 8)     return "Password must be at least 8 characters.";
    if (newPassword !== cPassword)  return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setLoading(true);
    try {
      await api.post(`/reset/${token}`, { newPassword });
      setSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (success) {
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
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
              <CheckIcon />
            </div>
          </div>

          <h2 className="text-xl font-bold text-blue-800 mb-2"
            style={{ fontFamily: "'Manrope',sans-serif" }}>
            Password updated!
          </h2>

          <p className="text-sm text-slate-400 mb-8 leading-relaxed">
            Your password has been reset successfully.
            You can now sign in with your new password.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="w-full flex items-center justify-center gap-2 py-3
                       text-white text-sm font-semibold rounded-xl
                       transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
            }}
          >
            <span>Go to Sign in</span>
            <ArrowRightIcon />
          </button>
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
        <h1 className="text-[22px] font-bold text-blue-800 mb-2"
          style={{ fontFamily: "'Manrope',sans-serif" }}>
          Reset your password
        </h1>

        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          Enter your new password below.
        </p>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>

          {/* New Password */}
          <div className="mb-4">
            <label htmlFor="newPassword"
              className="block text-[11px] font-semibold text-blue-800 uppercase tracking-wide mb-1.5">
              New password
            </label>
            <div className="relative">
              <input
                id="newPassword" name="newPassword"
                type={showPwd ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                className={inputCls + " pr-10"}
              />
              <button type="button" tabIndex={-1} onClick={() => setShowPwd((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors"
                aria-label={showPwd ? "Hide password" : "Show password"}>
                <EyeIcon open={showPwd}/>
              </button>
            </div>

            {/* Strength bar */}
            {strength && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-300 ${strength.width} ${strength.color}`}/>
                </div>
                <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">
                  {strength.label}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label htmlFor="cPassword"
              className="block text-[11px] font-semibold text-blue-800 uppercase tracking-wide mb-1.5">
              Confirm new password
            </label>
            <div className="relative">
              <input
                id="cPassword" name="cPassword"
                type={showCPwd ? "text" : "password"}
                placeholder="Re-enter password"
                value={cPassword} onChange={(e) => setCPassword(e.target.value)}
                className={
                  inputCls + " pr-10 " +
                  (cPassword && newPassword !== cPassword
                    ? "border-red-300 focus:border-red-400 focus:ring-red-400/20"
                    : cPassword && newPassword === cPassword
                    ? "border-green-300 focus:border-green-400 focus:ring-green-400/20"
                    : "")
                }
              />
              <button type="button" tabIndex={-1} onClick={() => setShowCPwd((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors"
                aria-label={showCPwd ? "Hide password" : "Show password"}>
                <EyeIcon open={showCPwd}/>
              </button>
            </div>
            {cPassword && (
              <p className={`text-[11px] mt-1.5 font-medium ${
                newPassword === cPassword ? "text-green-500" : "text-red-400"
              }`}>
                {newPassword === cPassword ? "Passwords match" : "Passwords do not match"}
              </p>
            )}
          </div>

          {/* Submit */}
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
              <><span>Reset password</span><ArrowRightIcon/></>
            )}
          </button>
        </form>

        <div className="mt-5 text-center">
          <Link to="/login"
            className="text-sm text-blue-500 font-medium hover:text-blue-700 transition-colors">
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
