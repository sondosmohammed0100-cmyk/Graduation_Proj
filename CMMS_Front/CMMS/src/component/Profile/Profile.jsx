import { useState, useEffect, useRef } from "react";
import api from "../../axios/Axios";
import imgdefault from "../../assets/imgdefault.png";


const CameraIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

const ROLE_COLOR = {
  Admin:              "bg-purple-100 text-purple-700",
  BiomedicalEngineer: "bg-blue-100   text-blue-700",
  Technician:         "bg-amber-100  text-amber-700",
  Staff:              "bg-green-100  text-green-700",
};

export default function Profile() {
  const [user,        setUser]        = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [uploading,   setUploading]   = useState(false);
  const [uploadMsg,   setUploadMsg]   = useState("");
  const fileRef = useRef(null);

 
  useEffect(() => {
    api.get("/profile")
      .then(({ data }) => setUser(data.user))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

 
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile", file);

    setUploading(true);
    setUploadMsg("");
    try {
      const { data } = await api.post("/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(data.userUpdated);
      setUploadMsg("Profile picture updated!");
    } catch {
      setUploadMsg("Failed to upload. Please try again.");
    } finally {
      setUploading(false);
     
      setTimeout(() => setUploadMsg(""), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"/>
      </div>
    );
  }

  const avatarSrc  = user?.profile?.secure_url || imgdefault;
  const fullName   = user ? `${user.Fname} ${user.Lname}` : "—";
  const roleColor  = ROLE_COLOR[user?.role] || "bg-slate-100 text-slate-600";

  return (
    <div className="relative min-h-[calc(100vh-64px)] font-sans">

    

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-10">

        {/* Card */}
        <div
          className="bg-white/95 rounded-2xl overflow-hidden
                     animate-[slideUp_0.4s_cubic-bezier(0.34,1.56,0.64,1)_both]"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)" }}
        >

          {/* Header banner */}
          <div className="h-28 bg-gradient-to-r from-blue-600 to-blue-400 relative">
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundSize: "30px 30px"
              }}/>
          </div>

          {/* Avatar */}
          <div className="px-8 pb-8">
            <div className="flex items-end justify-between -mt-12 mb-6">
              <div className="relative">
                <img
                  src={avatarSrc}
                  alt="profile"
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-lg"
                />
                {/* Camera button */}
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-xl
                             flex items-center justify-center shadow-md
                             hover:bg-blue-700 transition-colors disabled:opacity-60"
                  title="Change profile picture"
                >
                  {uploading
                    ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>
                    : <CameraIcon />
                  }
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Role badge */}
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-xl ${roleColor}`}>
                {user?.role}
              </span>
            </div>

            {/* Upload feedback */}
            {uploadMsg && (
              <p className={`text-xs mb-4 font-medium ${
                uploadMsg.startsWith("Failed") ? "text-red-400" : "text-green-500"
              }`}>
                {uploadMsg}
              </p>
            )}

            {/* Name */}
            <h1 className="text-2xl font-bold text-blue-800 mb-1"
              style={{ fontFamily: "'Manrope', sans-serif" }}>
              {fullName}
            </h1>
            <p className="text-sm text-slate-400 mb-6">{user?.email}</p>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <InfoCard label="First Name"  value={user?.Fname} />
              <InfoCard label="Last Name"   value={user?.Lname} />
              <InfoCard label="Email"       value={user?.email} full />
              <InfoCard label="Role"        value={user?.role} />
              <InfoCard
                label="Email Confirmed"
                value={user?.confirmEmail ? "✓ Confirmed" : "✗ Not confirmed"}
                valueClass={user?.confirmEmail ? "text-green-600" : "text-red-400"}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </div>
  );
}

function InfoCard({ label, value, full, valueClass = "text-blue-800" }) {
  return (
    <div className={`bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 ${full ? "sm:col-span-2" : ""}`}>
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-sm font-medium ${valueClass}`}>{value || "—"}</p>
    </div>
  );
}
