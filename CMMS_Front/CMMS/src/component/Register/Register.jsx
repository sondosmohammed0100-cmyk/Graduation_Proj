import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../../assets/background.png";
import api from "../../axios/Axios";
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] shrink-0">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);


const MicrosoftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] shrink-0">
    <rect x="1"  y="1"  width="10" height="10" fill="#F25022"/>
    <rect x="13" y="1"  width="10" height="10" fill="#7FBA00"/>
    <rect x="1"  y="13" width="10" height="10" fill="#00A4EF"/>
    <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
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

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14 text-blue-500">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const ROLES = [
  { value: "BiomedicalEngineer", label: " Biomedical Eng." },
  { value: "Technician",         label: " Technician"        },
  { value: "Staff",              label: " Staff"              },
];

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

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Fname: "", Lname: "", email: "",
    password: "", cpassword: "", role: "Staff",
  });
  const [showPwd,       setShowPwd]       = useState(false);
  const [showCPwd,      setShowCPwd]      = useState(false);
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState("");

  const [registered,    setRegistered]    = useState(false);
  const [userEmail,     setUserEmail]     = useState("");
  const [confirmToken,  setConfirmToken]  = useState("");   
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMsg,     setResendMsg]     = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRole = (value) =>
    setForm((prev) => ({ ...prev, role: value }));

  const validate = () => {
    const { Fname, Lname, email, password, cpassword } = form;
    if (!Fname || !Lname || !email || !password || !cpassword)
      return "Please fill in all required fields.";
    if (password.length < 8)
      return "Password must be at least 8 characters.";
    if (password !== cpassword)
      return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setLoading(true);
    try {
      const { data } = await api.post("/register", {
        Fname:     form.Fname,
        Lname:     form.Lname,
        email:     form.email,
        password:  form.password,
        cpassword: form.cpassword,
        role:      form.role,
      });

      setUserEmail(form.email);
      setConfirmToken(data.newConfirmToken);  
      setRegistered(true);

    } catch (err) {
      const msg = err.response?.data?.message || "Email already exist";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  
  const handleResend = async () => {
    if (!confirmToken) return;
    setResendLoading(true);
    setResendMsg("");
    try {
      await api.get(`/newconfirmEmail/${confirmToken}`);
      setResendMsg("Email sent! Check your inbox.");
    } catch {
      setResendMsg("Failed to resend. Please register again.");
    } finally {
      setResendLoading(false);
    }
  };

  const handleSocial = (provider) => {
    console.log(`Register with ${provider}`);
  };

  const strength = getStrength(form.password);

  
  if (registered) {
    return (
      <div className="relative min-h-[calc(100vh-64px)] overflow-hidden flex items-center justify-center px-4 py-8 font-sans">
        <div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}/>

        <div
          className="relative z-20 w-full max-w-[420px] bg-white/95 rounded-2xl px-9 py-10 text-center
                     animate-[slideUp_0.45s_cubic-bezier(0.34,1.56,0.64,1)_both]"
          style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.28),0 0 0 1px rgba(255,255,255,0.15)" }}
        >
          {/* Mail icon */}
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
            We sent a confirmation link to:
          </p>
          <p className="text-sm font-semibold text-blue-700 mb-6 break-all">
            {userEmail}
          </p>

          <p className="text-xs text-slate-400 mb-8 leading-relaxed">
            Click the link in the email to confirm your account,
            then you can sign in.
          </p>

          {/* resend feedback message */}
          {resendMsg && (
            <p className={`text-xs mb-4 font-medium ${
              resendMsg.startsWith("Failed") ? "text-red-400" : "text-green-500"
            }`}>
              {resendMsg}
            </p>
          )}

          {/* Go to login */}
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

          
          <p className="mt-5 text-xs text-slate-400">
            Didn&apos;t receive the email?{" "}
            <button
              onClick={handleResend}
              disabled={resendLoading}
              className="text-blue-500 font-medium hover:text-blue-700 transition-colors disabled:opacity-50"
            >
              {resendLoading ? "Sending..." : "Try again"}
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

  // Register form
  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden flex items-center justify-center px-4 py-8 font-sans">

      <div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}/>

      <div
        className="relative z-20 w-full max-w-[460px] bg-white/95 rounded-2xl px-9 py-9
                   animate-[slideUp_0.45s_cubic-bezier(0.34,1.56,0.64,1)_both]"
        style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.28),0 0 0 1px rgba(255,255,255,0.15)" }}
      >

        <h1 className="text-[22px] font-bold text-blue-800 mb-4"
          style={{ fontFamily: "'Manrope',sans-serif" }}>
          Create your account
        </h1>

        {/* Social */}
        <div className="flex gap-2.5 mb-4">
          <button type="button" onClick={() => handleSocial("Google")}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5
                       border border-slate-200 rounded-xl text-xs font-medium text-blue-500
                       bg-white hover:border-slate-300 hover:bg-slate-50
                       transition-all duration-200 hover:shadow-sm whitespace-nowrap">
            <GoogleIcon /> Google
          </button>
          <button type="button" onClick={() => handleSocial("Microsoft")}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5
                       border border-slate-200 rounded-xl text-xs font-medium text-blue-500
                       bg-white hover:border-blue-300 hover:bg-slate-50
                       transition-all duration-200 hover:shadow-sm whitespace-nowrap">
            <MicrosoftIcon /> Microsoft
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs mb-4">
          <span className="flex-1 h-px bg-blue-800" />
          <span className="text-blue-800 font-semibold">OR</span>
          <span className="flex-1 h-px bg-blue-800" />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-[11px] font-semibold text-blue-800 uppercase tracking-wide mb-1.5">
              Role
            </label>
            <div className="flex gap-2">
              {ROLES.map((r) => (
                <button key={r.value} type="button" onClick={() => handleRole(r.value)}
                  className={`flex-1 py-2 px-1.5 rounded-xl text-[11.5px] font-medium border
                              transition-all duration-150 text-center whitespace-nowrap
                              ${form.role === r.value
                                ? "border-blue-500 text-blue-700 bg-blue-50 font-semibold"
                                : "border-slate-200 text-slate-500 bg-white hover:border-slate-300 hover:bg-slate-50"
                              }`}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label htmlFor="Fname"
                className="block text-[11px] font-semibold text-blue-800 uppercase tracking-wide mb-1.5">
                First name
              </label>
              <input id="Fname" name="Fname" type="text" placeholder="Ahmed"
                className={inputCls} value={form.Fname} onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="Lname"
                className="block text-[11px] font-semibold text-blue-800 uppercase tracking-wide mb-1.5">
                Last name
              </label>
              <input id="Lname" name="Lname" type="text" placeholder="Ibrahim"
                className={inputCls} value={form.Lname} onChange={handleChange}/>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email"
              className="block text-[11px] font-semibold text-blue-800 uppercase tracking-wide mb-1.5">
              Work email
            </label>
            <input id="email" name="email" type="email" placeholder="you@hospital.org"
              className={inputCls} value={form.email} onChange={handleChange}/>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password"
              className="block text-[11px] font-semibold text-blue-800 uppercase tracking-wide mb-1.5">
              Password
            </label>
            <div className="relative">
              <input id="password" name="password"
                type={showPwd ? "text" : "password"} placeholder="Min. 8 characters"
                className={inputCls + " pr-10"} value={form.password} onChange={handleChange}/>
              <button type="button" tabIndex={-1} onClick={() => setShowPwd((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors"
                aria-label={showPwd ? "Hide password" : "Show password"}>
                <EyeIcon open={showPwd}/>
              </button>
            </div>
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
          <div className="mb-5">
            <label htmlFor="cpassword"
              className="block text-[11px] font-semibold text-blue-800 uppercase tracking-wide mb-1.5">
              Confirm password
            </label>
            <div className="relative">
              <input id="cpassword" name="cpassword"
                type={showCPwd ? "text" : "password"} placeholder="Re-enter password"
                className={
                  inputCls + " pr-10 " +
                  (form.cpassword && form.password !== form.cpassword
                    ? "border-red-300 focus:border-red-400 focus:ring-red-400/20"
                    : form.cpassword && form.password === form.cpassword
                    ? "border-green-300 focus:border-green-400 focus:ring-green-400/20"
                    : "")
                }
                value={form.cpassword} onChange={handleChange}/>
              <button type="button" tabIndex={-1} onClick={() => setShowCPwd((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors"
                aria-label={showCPwd ? "Hide password" : "Show password"}>
                <EyeIcon open={showCPwd}/>
              </button>
            </div>
            {form.cpassword && (
              <p className={`text-[11px] mt-1.5 font-medium ${
                form.password === form.cpassword ? "text-green-500" : "text-red-400"
              }`}>
                {form.password === form.cpassword ? "Passwords match" : "Passwords do not match"}
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
              background: "linear-gradient(135deg, #1e66da, #2574d4)",
              boxShadow: "0 4px 14px rgba(59,130,246,0.35)",
            }}>
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"/>
            ) : (
              <><span>Create my account</span><ArrowRightIcon/></>
            )}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-blue-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-800 font-medium hover:text-blue-700 transition-colors">
            Sign in
          </Link>
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
