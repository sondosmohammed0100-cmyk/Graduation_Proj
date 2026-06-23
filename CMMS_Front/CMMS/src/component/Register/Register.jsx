import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../../assets/background.png";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] shrink-0">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const MicrosoftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] shrink-0">
    <rect x="1" y="1" width="10" height="10" fill="#F25022" />
    <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
    <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
    <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
  </svg>
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const ArrowRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const DEPARTMENTS = [
  "ICU",
  "OR",
  "ER",
  "Radiology",
  "Cardiology",
  "Surgery",
  "Administration",
];

// ── Password strength helper ──────────────────────────────────
function getStrength(pwd) {
  if (!pwd) return null;
  if (pwd.length < 6)
    return { label: "Weak", width: "w-1/3", color: "bg-red-400" };
  if (pwd.length < 10)
    return { label: "Fair", width: "w-2/3", color: "bg-amber-400" };
  return { label: "Strong", width: "w-full", color: "bg-green-400" };
}

// ── Shared input className ────────────────────────────────────
const inputCls =
  "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm " +
  "text-blue-700 bg-white placeholder-slate-300 outline-none " +
  "transition-all duration-200 focus:border-blue-400 focus:ring-2 focus:ring-teal-400/20";

// ── Component ─────────────────────────────────────────────────
export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    role: "biomedical",
    password: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRole = (value) => setForm((prev) => ({ ...prev, role: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const { firstName, lastName, email, department, password } = form;
    if (!firstName || !lastName || !email || !department || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    // TODO: replace with your real API call
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  const handleSocial = (provider) => {
    // TODO: integrate real OAuth — Google / Microsoft
    console.log(`Register with ${provider}`);
  };

  const strength = getStrength(form.password);

  return (
    <div className="relative vh-100 flex items-center justify-center px-4 font-sans overflow-hidden">
      {/* Background image */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />

      {/* ── Centered Card ── */}
      <div
        className="relative z-20 w-full max-w-[460px] bg-white/95 rounded-2xl
                   px-9 py-9
                   animate-[slideUp_0.45s_cubic-bezier(0.34,1.56,0.64,1)_both]"
        style={{
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.28),0 0 0 1px rgba(255,255,255,0.15)",
        }}
      >
        {/* Heading */}
        <h1
          className="text-[22px] font-bold text-blue-800 mb-1"
          style={{ fontFamily: "'Manrope',sans-serif" }}
        >
          Create your account
        </h1>

        {/* Social buttons */}
        <div className="flex gap-2.5 mb-4">
          <button
            type="button"
            onClick={() => handleSocial("Google")}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5
                       border border-slate-200 rounded-xl text-xs font-medium text-blue-500
                       bg-white hover:border-slate-300 hover:bg-slate-50
                       transition-all duration-200 hover:shadow-sm whitespace-nowrap"
          >
            <GoogleIcon /> Google
          </button>
          <button
            type="button"
            onClick={() => handleSocial("Microsoft")}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5
                       border border-slate-200 rounded-xl text-xs font-medium text-blue-500
                       bg-white hover:border-blue-300 hover:bg-slate-50
                       transition-all duration-200 hover:shadow-sm whitespace-nowrap"
          >
            <MicrosoftIcon /> Microsoft
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 text-xs text-blue-800 mb-4">
          <span className="flex-1 h-px bg-slate-200" />
          <span>OR</span>
          <span className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name row */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-[11px] font-semibold text-blue-800 uppercase tracking-wide mb-1.5"
              >
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Ahmed"
                className={inputCls}
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-[11px] font-semibold text-blue-800 uppercase tracking-wide mb-1.5"
              >
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Ibrahim"
                className={inputCls}
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-[11px] font-semibold text-blue-800 uppercase tracking-wide mb-1.5"
            >
              Work email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@hospital.org"
              className={inputCls}
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Department */}
          <div className="mb-4">
            <label
              htmlFor="department"
              className="block text-[11px] font-semibold text-blue-800 uppercase tracking-wide mb-1.5"
            >
              Department
            </label>
            <select
              id="department"
              name="department"
              className={
                inputCls +
                " cursor-pointer appearance-none bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238e9bad' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")] bg-no-repeat bg-[right_13px_center] pr-9"
              }
              value={form.department}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select department
              </option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label
              htmlFor="reg-password"
              className="block text-[11px] font-semibold text-blue-800 uppercase tracking-wide mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="reg-password"
                name="password"
                type={showPwd ? "text" : "password"}
                placeholder="Min. 8 characters"
                className={inputCls + " pr-10"}
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPwd((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors"
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                <EyeIcon open={showPwd} />
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3
                       text-white text-sm font-semibold rounded-xl
                       transition-all duration-200
                       hover:-translate-y-0.5 active:translate-y-0
                       disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #1e66da, #2574d4)",
              boxShadow: "0 4px 14px rgba(59, 130, 246, 0.35)",
            }}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {" "}
                <span>Create my account</span> <ArrowRightIcon />{" "}
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-5 text-center text-sm text-blue-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-800 font-medium hover:text-blue-700 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
