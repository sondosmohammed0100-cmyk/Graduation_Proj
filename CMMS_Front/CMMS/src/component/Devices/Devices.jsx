import { useState, useEffect } from "react";
import api from "../../axios/Axios";


const STATUS_STYLE = {
  Working:     "bg-green-200  text-green-800",
  Maintenance: "bg-amber-100  text-amber-700",
  Down:        "bg-red-100    text-red-600",
};

const PRIORITY_STYLE = {
  Critical: "bg-red-200  text-red-800",
  Normal:   "bg-slate-200 text-blue-800",
};

const DOT = {
  Working:     "bg-green-800",
  Maintenance: "bg-amber-800",
  Down:        "bg-red-800",
};

function Badge({ label, styleMap }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styleMap[label] || "bg-slate-100 text-blue-600"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${DOT[label] || "bg-slate-400"}`}/>
      {label}
    </span>
  );
}

const TABS = ["All Devices", "Working", "Maintenance", "Not Working", "Critical"];


function DeviceModal({ device, departments, contracts, onClose, onSaved }) {
  const isEdit = !!device;
  const [form, setForm] = useState({
    name:         device?.name         || "",
    serialNumber: device?.serialNumber || "",
    manufacturer: device?.manufacturer || "",
    supplier:     device?.supplier     || "",
    status:       device?.status       || "Working",
    priority:     device?.priority     || "Normal",
    purchaseDate: device?.purchaseDate ? device.purchaseDate.slice(0, 10) : "",
    department:   device?.department?.name || "",
    maintContract: device?.maintContract?.nameCompany || "",
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isEdit) {
        await api.patch(`/device/${device._id}`, form);
      } else {
        await api.post("/device", form);
      }
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-blue-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all";
  const labelCls = "block text-[11px] font-semibold text-blue-800 uppercase tracking-wide mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.4)" }}>
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl
                      animate-[slideUp_0.3s_cubic-bezier(0.34,1.56,0.64,1)_both]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-blue-800" style={{ fontFamily: "'Manrope',sans-serif" }}>
            {isEdit ? "Edit Device" : "Add New Device"}
          </h2>
          <button onClick={onClose} className="text-blue-400 hover:text-blue-600 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">{error}</p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Device Name *</label>
              <input name="name" value={form.name} onChange={handle} required className={inputCls} placeholder="Ventilator"/>
            </div>
            <div>
              <label className={labelCls}>Serial Number</label>
              <input name="serialNumber" value={form.serialNumber} onChange={handle} className={inputCls} placeholder="SN-XX-0000"/>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Manufacturer</label>
              <input name="manufacturer" value={form.manufacturer} onChange={handle} className={inputCls} placeholder="Philips"/>
            </div>
            <div>
              <label className={labelCls}>Supplier</label>
              <input name="supplier" value={form.supplier} onChange={handle} className={inputCls} placeholder="MedSupply Co."/>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Status</label>
              <select name="status" value={form.status} onChange={handle} className={inputCls}>
                <option>Working</option>
                <option>Maintenance</option>
                <option>Down</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Priority</label>
              <select name="priority" value={form.priority} onChange={handle} className={inputCls}>
                <option>Normal</option>
                <option>Critical</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Department *</label>
              <select name="department" value={form.department} onChange={handle} required className={inputCls}>
                <option value="">Select department</option>
                {departments.map((d) => (
                  <option key={d._id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Contract</label>
              <select name="maintContract" value={form.maintContract} onChange={handle} className={inputCls}>
                <option value="">Select contract</option>
                {contracts.map((c) => (
                  <option key={c._id} value={c.nameCompany}>{c.nameCompany}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Purchase Date</label>
            <input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handle} className={inputCls}/>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-blue-600 hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60"
              style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)", boxShadow: "0 4px 14px rgba(37,99,235,0.3)" }}>
              {loading
                ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block"/>
                : isEdit ? "Save Changes" : "Add Device"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


function DeleteConfirm({ device, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/device/${device._id}`);
      onDeleted();
    } catch {
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.4)" }}>
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl text-center
                      animate-[slideUp_0.3s_cubic-bezier(0.34,1.56,0.64,1)_both]">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-red-500">
            <path strokeLinecap="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          </svg>
        </div>
        <h3 className="text-lg font-bold text-blue-800 mb-1">Delete Device?</h3>
        <p className="text-sm text-blue-400 mb-6">
          Are you sure you want to delete <span className="font-semibold text-blue-600">{device.name}</span>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-blue-600 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleDelete} disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-60">
            {loading ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block"/> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}


export default function Devices() {
  const [devices,     setDevices]     = useState([]);
  const [departments, setDepartments] = useState([]);
  const [contracts,   setContracts]   = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [activeTab,   setActiveTab]   = useState("All Devices");
  const [search,      setSearch]      = useState("");
  const [deptFilter,  setDeptFilter]  = useState("All Departments");
  const [showModal,   setShowModal]   = useState(false);
  const [editDevice,  setEditDevice]  = useState(null);
  const [deleteDevice,setDeleteDevice]= useState(null);


  const fetchAll = async () => {
    setLoading(true);
    try {
      const [devRes, depRes, conRes] = await Promise.all([
        api.get("/device"),
        api.get("/department"),
        api.get("/contract"),
      ]);
      setDevices(devRes.data.All_Devices || []);
      setDepartments(depRes.data.All_Department || []);
      setContracts(conRes.data.All_Contracts || []);
    } catch {
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  // Stats
  const stats = {
    total:       devices.length,
    working:     devices.filter((d) => d.status === "Working").length,
    maintenance: devices.filter((d) => d.status === "Maintenance").length,
    down:        devices.filter((d) => d.status === "Down").length,
  };

  // Filter
  const filtered = devices.filter((d) => {
    const matchTab =
      activeTab === "All Devices"  ? true :
      activeTab === "Working"      ? d.status === "Working" :
      activeTab === "Maintenance"  ? d.status === "Maintenance" :
      activeTab === "Not Working"  ? d.status === "Down" :
      activeTab === "Critical"     ? d.priority === "Critical" : true;

    const matchSearch =
      !search ||
      d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.serialNumber?.toLowerCase().includes(search.toLowerCase());

    const matchDept =
      deptFilter === "All Departments" ||
      d.department?.name === deptFilter ||
      d.department === deptFilter;

    return matchTab && matchSearch && matchDept;
  });

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  let isAdmin = false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    isAdmin = payload.role === "Admin";
  } catch {}

  return (
    <div className="p-6 max-w-screen-xl mx-auto font-sans">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-800" style={{ fontFamily: "'Manrope',sans-serif" }}>
          Devices
        </h1>
        {isAdmin && (
          <button
            onClick={() => { setEditDevice(null); setShowModal(true); }}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl
                       transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)", boxShadow: "0 4px 14px rgba(37,99,235,0.3)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Device
          </button>
        )}
      </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

  {/* Total */}
  <div className="rounded-2xl p-5  border border-blue-600 shadow-sm hover:shadow-md transition-all">
    <p className="text-sm font-medium text-black-800">Total</p>
    <h2 className="text-3xl font-bold text-black-800 mt-2">
      {stats.total}
    </h2>
  </div>

  {/* Working */}
  <div className="rounded-2xl p-5 border border-blue-600 shadow-sm hover:shadow-md transition-all">
    <p className="text-sm font-medium text-black-800">Working</p>
    <h2 className="text-3xl font-bold text-black-800 mt-2">
      {stats.working}
    </h2>
  </div>

  {/* Maintenance */}
  <div className="rounded-2xl p-5  border border-blue-600 shadow-sm hover:shadow-md transition-all">
    <p className="text-sm font-medium text-black-800">Maintenance</p>
    <h2 className="text-3xl font-bold text-black-800 mt-2">
      {stats.maintenance}
    </h2>
  </div>

  {/* Not Working */}
  <div className="rounded-2xl p-5  border border-blue-600 shadow-sm hover:shadow-md transition-all">
    <p className="text-sm font-medium text-black-800">Not Working</p>
    <h2 className="text-3xl font-bold text-black-800 mt-2">
      {stats.down}
    </h2>
  </div>

</div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-blue-800 overflow-hidden"
        style={{ boxShadow: "0 4px 24px rgba(17, 25, 171, 0.06)" }}>

        {/* Tabs + search + dept filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 pt-4 pb-0 gap-3 border-b border-blue-800">
          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 text-sm font-medium rounded-t-xl whitespace-nowrap transition-colors border-b-2
                  ${activeTab === tab
                    ? "text-blue-600 border-blue-800 bg-blue-50/50"
                    : "text-blue-700 border-transparent hover:text-blue-500"}`}>
                {tab}
              </button>
            ))}
          </div>

          {/* Search + dept */}
          <div className="flex items-center gap-2 pb-2">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-blue-400"
                fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
              </svg>
              <input
                value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search devices..."
                className="pl-8 pr-3 py-2 border border-black-500 rounded-xl text-sm text-blue-700
                           outline-none focus:border-black-400 focus:ring-2 focus:ring-blue-400/20 transition-all w-44"
              />
            </div>
            <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}
              className="px-3 py-2 border border-slate-600 rounded-xl text-sm text-blue-800 outline-none
                         focus:border-blue-400 transition-all">
              <option>All Departments</option>
              {departments.map((d) => (
                <option key={d._id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="w-8 h-8 border-2 border-blue-500 border-t-blue-800 rounded-full animate-spin"/>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-blue-800 text-sm">No devices found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-400 text-left">
                  {["Device",  "Department", "Status", "Priority", "Manufacturer", "Purchase Date", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-[11px] font-semibold text-black-800 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.map((device) => (
                  <tr key={device._id} className="hover:bg-blue-200/80 transition-colors group">

                    {/* Device name + serial */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-300 flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                            className="w-4 h-4 text-blue-600">
                            <rect x="2" y="3" width="20" height="14" rx="2"/>
                            <path d="M8 21h8M12 17v4"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-blue-700 capitalize">{device.name}</p>
                          <p className="text-[11px] text-blue-400">{device.serialNumber || "—"}</p>
                        </div>
                      </div>
                    </td>

                    

                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 capitalize">
                        {device.department?.name || "—"}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <Badge label={device.status} styleMap={STATUS_STYLE}/>
                    </td>

                    <td className="px-4 py-3">
                      <Badge label={device.priority} styleMap={PRIORITY_STYLE}/>
                    </td>

                    <td className="px-4 py-3 text-blue-500 capitalize">{device.manufacturer || "—"}</td>

                    <td className="px-4 py-3 text-blue-500">
                      {device.purchaseDate ? new Date(device.purchaseDate).toLocaleDateString("en-GB", { month:"short", year:"numeric" }) : "—"}
                    </td>

                    {/* Actions — Admin only */}
                    <td className="px-4 py-3">
                      {isAdmin && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setEditDevice(device); setShowModal(true); }}
                            className="p-1.5 rounded-lg text-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Edit">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                          </button>
                          <button onClick={() => setDeleteDevice(device)}
                            className="p-1.5 rounded-lg text-blue-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Delete">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6l-1 14H6L5 6"/>
                              <path d="M10 11v6M14 11v6"/>
                              <path d="M9 6V4h6v2"/>
                            </svg>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        {!loading && (
          <div className="px-4 py-3 border-t border-slate-100 text-xs text-blue-400">
            Showing {filtered.length} of {devices.length} devices
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal && (
        <DeviceModal
          device={editDevice}
          departments={departments}
          contracts={contracts}
          onClose={() => { setShowModal(false); setEditDevice(null); }}
          onSaved={() => { setShowModal(false); setEditDevice(null); fetchAll(); }}
        />
      )}
      {deleteDevice && (
        <DeleteConfirm
          device={deleteDevice}
          onClose={() => setDeleteDevice(null)}
          onDeleted={() => { setDeleteDevice(null); fetchAll(); }}
        />
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity:0; transform:translateY(20px) scale(0.98); }
          to   { opacity:1; transform:translateY(0)    scale(1);    }
        }
      `}</style>
    </div>
  );
}

function StatItem({ label, value, color }) {
  return (
    <div>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-blue-400 mt-0.5">{label}</p>
    </div>
  );
}