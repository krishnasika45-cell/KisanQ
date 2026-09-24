import { useState, useRef, useEffect } from "react";

type Lang = "en" | "hi";

const S = {
  en: {
    title: "Farmer Management",
    subtitle: "View and manage registered farmer records.",
    demoNote: "All data shown is demo/fictional — not connected to any real government database.",
    lang: "हिन्दी",
    // KPIs
    totalFarmers: "Total Farmers",
    activeFarmers: "Active Farmers",
    todayReg: "Today's Registrations",
    pendingApps: "Pending Applications",
    demo: "Demo data",
    // Search
    searchPH: "Search by farmer name, mobile number or application ID",
    search: "Search",
    filters: "Filters",
    crop: "Crop",
    allCrops: "All Crops",
    centre: "Centre",
    allCentres: "All Centres",
    status: "Status",
    allStatus: "All Status",
    regDate: "Registration Date",
    allDates: "All Dates",
    langFilter: "Language",
    allLang: "All Languages",
    applyFilters: "Apply Filters",
    reset: "Reset",
    // Table
    farmerID: "Farmer ID",
    farmerName: "Farmer Name",
    mobile: "Mobile",
    location: "Location",
    cropCol: "Crop",
    centreCol: "Centre",
    applications: "Applications",
    statusCol: "Status",
    action: "Action",
    view: "View",
    showing: "Showing",
    of: "of",
    farmers: "farmers",
    prev: "Previous",
    next: "Next",
    // Empty
    noFarmer: "No farmer found",
    noFarmerSub: "Try changing your search or filters.",
    clearFilters: "Clear Filters",
    // Drawer
    farmerDetails: "Farmer Details",
    close: "Close",
    farmerIDLabel: "Farmer ID",
    name: "Name",
    locationLabel: "Location",
    prefLang: "Preferred Language",
    regCrop: "Registered Crop",
    totalQty: "Total Quantity",
    regDate2: "Registration Date",
    statusLabel: "Status",
    procHistory: "Procurement History",
    appID: "Application ID",
    qty: "Quantity",
    slot: "Slot",
    currentApp: "Current Application",
    currentCentre: "Centre",
    token: "Token",
    slotTime: "Slot",
    currentStage: "Current Stage",
    estQueue: "Estimated Queue",
    paymentSummary: "Payment Summary",
    procurement: "Procurement",
    payStatus: "Payment Status",
    viewPayment: "View Payment Details",
    activityHistory: "Activity History",
    adminActions: "Admin Actions",
    viewApp: "View Application",
    viewQueue: "View Queue Position",
    viewProc: "View Procurement",
    viewPay: "View Payment",
    active: "Active",
    pending: "Pending",
    confirmed: "Confirmed",
    completed: "Completed",
    weighing: "Weighing",
    hindi: "Hindi",
    english: "English",
  },
  hi: {
    title: "किसान प्रबंधन",
    subtitle: "पंजीकृत किसानों के रिकॉर्ड देखें और प्रबंधित करें।",
    demoNote: "यहाँ दिखाया गया सभी डेटा डेमो/काल्पनिक है — किसी सरकारी डेटाबेस से जुड़ा नहीं है।",
    lang: "English",
    totalFarmers: "कुल किसान",
    activeFarmers: "सक्रिय किसान",
    todayReg: "आज के पंजीकरण",
    pendingApps: "लंबित आवेदन",
    demo: "डेमो डेटा",
    searchPH: "किसान का नाम, मोबाइल नंबर या आवेदन आईडी खोजें",
    search: "खोजें",
    filters: "फ़िल्टर",
    crop: "फसल",
    allCrops: "सभी फसलें",
    centre: "केंद्र",
    allCentres: "सभी केंद्र",
    status: "स्थिति",
    allStatus: "सभी स्थिति",
    regDate: "पंजीकरण तिथि",
    allDates: "सभी तिथियाँ",
    langFilter: "भाषा",
    allLang: "सभी भाषाएं",
    applyFilters: "फ़िल्टर लागू करें",
    reset: "रीसेट",
    farmerID: "किसान ID",
    farmerName: "किसान का नाम",
    mobile: "मोबाइल",
    location: "स्थान",
    cropCol: "फसल",
    centreCol: "केंद्र",
    applications: "आवेदन",
    statusCol: "स्थिति",
    action: "क्रिया",
    view: "देखें",
    showing: "दिखाया जा रहा है",
    of: "में से",
    farmers: "किसान",
    prev: "पिछला",
    next: "अगला",
    noFarmer: "कोई किसान नहीं मिला",
    noFarmerSub: "अपनी खोज या फ़िल्टर बदलकर देखें।",
    clearFilters: "फ़िल्टर साफ़ करें",
    farmerDetails: "किसान विवरण",
    close: "बंद करें",
    farmerIDLabel: "किसान ID",
    name: "नाम",
    locationLabel: "स्थान",
    prefLang: "पसंदीदा भाषा",
    regCrop: "पंजीकृत फसल",
    totalQty: "कुल मात्रा",
    regDate2: "पंजीकरण तिथि",
    statusLabel: "स्थिति",
    procHistory: "खरीद इतिहास",
    appID: "आवेदन ID",
    qty: "मात्रा",
    slot: "स्लॉट",
    currentApp: "वर्तमान आवेदन",
    currentCentre: "केंद्र",
    token: "टोकन",
    slotTime: "स्लॉट",
    currentStage: "वर्तमान चरण",
    estQueue: "अनुमानित कतार",
    paymentSummary: "भुगतान सारांश",
    procurement: "खरीद",
    payStatus: "भुगतान स्थिति",
    viewPayment: "भुगतान विवरण देखें",
    activityHistory: "गतिविधि इतिहास",
    adminActions: "व्यवस्थापक क्रियाएं",
    viewApp: "आवेदन देखें",
    viewQueue: "कतार स्थिति देखें",
    viewProc: "खरीद देखें",
    viewPay: "भुगतान देखें",
    active: "सक्रिय",
    pending: "लंबित",
    confirmed: "पुष्टि",
    completed: "पूर्ण",
    weighing: "तुलाई",
    hindi: "हिन्दी",
    english: "अंग्रेज़ी",
  },
};

// ─── Demo data ─────────────────────────────────────────────────────────────────
const ALL_FARMERS = [
  { id: "F-1001", name: "Ramesh Kumar", mobile: "98XXXXXX21", location: "Gwalior", crop: "Wheat", centre: "Centre B", apps: 2, status: "Active" },
  { id: "F-1002", name: "Suresh Patel", mobile: "97XXXXXX45", location: "Gwalior", crop: "Wheat", centre: "Centre C", apps: 1, status: "Active" },
  { id: "F-1003", name: "Amit Sharma", mobile: "99XXXXXX18", location: "Dabra", crop: "Rice", centre: "Centre A", apps: 3, status: "Active" },
  { id: "F-1004", name: "Mohan Singh", mobile: "96XXXXXX73", location: "Morar", crop: "Wheat", centre: "Centre B", apps: 1, status: "Pending" },
  { id: "F-1005", name: "Priya Devi", mobile: "95XXXXXX62", location: "Gwalior", crop: "Soybean", centre: "Centre C", apps: 2, status: "Active" },
  { id: "F-1006", name: "Dinesh Yadav", mobile: "94XXXXXX38", location: "Lashkar", crop: "Maize", centre: "Centre A", apps: 1, status: "Active" },
  { id: "F-1007", name: "Kavita Bai", mobile: "93XXXXXX55", location: "Gwalior", crop: "Wheat", centre: "Centre B", apps: 2, status: "Pending" },
  { id: "F-1008", name: "Ravi Gupta", mobile: "92XXXXXX14", location: "Bhind", crop: "Rice", centre: "Centre C", apps: 1, status: "Active" },
  { id: "F-1009", name: "Santosh Prajapati", mobile: "91XXXXXX80", location: "Gwalior", crop: "Wheat", centre: "Centre A", apps: 3, status: "Active" },
  { id: "F-1010", name: "Asha Rani", mobile: "90XXXXXX97", location: "Morena", crop: "Soybean", centre: "Centre B", apps: 1, status: "Active" },
];

const ACTIVITY = [
  { label: "Registration completed", date: "15 Sep, 2026", done: true },
  { label: "Application submitted", date: "24 Sep, 2026", done: true },
  { label: "Slot confirmed", date: "24 Sep, 2026", done: true },
  { label: "Farmer arrived", date: "24 Sep, 2026", done: true },
  { label: "Quality check completed", date: "24 Sep, 2026", done: true },
  { label: "Weighing in progress", date: "24 Sep, 2026", done: false, active: true },
];

const PROC_HISTORY = [
  { id: "KQ-2026-00241", crop: "Wheat", qty: "50 Qtl", centre: "Centre B", slot: "10:30 AM", status: "Confirmed", statusColor: "#1A7A3C", statusBg: "#E8F5EE" },
  { id: "KQ-2026-00182", crop: "Wheat", qty: "35 Qtl", centre: "Centre C", slot: "—", status: "Completed", statusColor: "#2563EB", statusBg: "#EFF6FF" },
];

// ─── Farmer Details Drawer ─────────────────────────────────────────────────────
function FarmerDrawer({ farmer, lang, onClose }: { farmer: typeof ALL_FARMERS[0]; lang: Lang; onClose: () => void }) {
  const s = S[lang];
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const statusColor = farmer.status === "Active" ? "#1A7A3C" : "#E8960A";
  const statusBg = farmer.status === "Active" ? "#E8F5EE" : "#FEF3C7";

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      {/* Drawer */}
      <div
        ref={drawerRef}
        className="w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl flex flex-col"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#C8DFD0] px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.farmerDetails}</p>
            <p className="text-[10px] text-[#9CA3AF]">{farmer.id} · Demo data</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>

        <div className="flex-1 p-5 space-y-5">
          {/* Profile card */}
          <div className="bg-gradient-to-br from-[#1A2B4A] to-[#0F1E35] rounded-2xl p-5 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold flex-shrink-0" style={{ fontFamily: "Poppins, sans-serif" }}>
                {farmer.name.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>{farmer.name}</p>
                <p className="text-sm text-white/70">{farmer.id}</p>
                <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full mt-1" style={{ background: statusBg, color: statusColor }}>
                  {farmer.status === "Active" ? s.active : s.pending}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: s.locationLabel, val: `${farmer.location}, Madhya Pradesh` },
                { label: s.prefLang, val: s.hindi },
                { label: s.regCrop, val: farmer.crop },
                { label: s.totalQty, val: "85 Quintal" },
                { label: s.regDate2, val: "15 Sep 2026" },
                { label: s.applications, val: `${farmer.apps}` },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[9px] text-white/50 mb-0.5">{item.label}</p>
                  <p className="text-xs font-semibold text-white/90">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Current Application */}
          <div className="bg-[#E8F5EE] rounded-2xl p-4 border border-[#C8DFD0]">
            <p className="text-xs font-bold text-[#1A7A3C] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{s.currentApp}</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Application", val: "KQ-2026-00241" },
                { label: s.currentCentre, val: "Gwalior Centre B" },
                { label: s.token, val: "Q-024" },
                { label: s.slotTime, val: "10:30 – 11:00 AM" },
                { label: s.currentStage, val: s.weighing },
                { label: s.estQueue, val: "18 farmers" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[9px] text-[#1A7A3C]/70 mb-0.5">{item.label}</p>
                  <p className="text-xs font-semibold text-[#1A2B4A]">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Procurement History */}
          <div>
            <p className="text-xs font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{s.procHistory}</p>
            <div className="overflow-x-auto rounded-xl border border-[#C8DFD0]">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F5F9F6]">
                    {[s.appID, s.cropCol, s.qty, s.centreCol, s.slot, s.statusCol].map((h) => (
                      <th key={h} className="px-3 py-2 text-left text-[9px] font-bold text-[#6B7280] uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8F5EE]">
                  {PROC_HISTORY.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F5F9F6]">
                      <td className="px-3 py-2 font-mono text-[9px] text-[#6B7280] whitespace-nowrap">{row.id}</td>
                      <td className="px-3 py-2 text-[#1A2B4A] whitespace-nowrap">{row.crop}</td>
                      <td className="px-3 py-2 text-[#6B7280] whitespace-nowrap">{row.qty}</td>
                      <td className="px-3 py-2 text-[#6B7280] whitespace-nowrap">{row.centre}</td>
                      <td className="px-3 py-2 text-[#6B7280] whitespace-nowrap">{row.slot}</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ color: row.statusColor, background: row.statusBg }}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4">
            <p className="text-xs font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{s.paymentSummary}</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-[#F5F9F6] rounded-xl p-3">
                <p className="text-[9px] text-[#9CA3AF] mb-0.5">{s.procurement}</p>
                <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>50 Quintal</p>
              </div>
              <div className="bg-[#FEF3C7] rounded-xl p-3">
                <p className="text-[9px] text-[#92400E] mb-0.5">{s.payStatus}</p>
                <p className="text-sm font-bold text-[#E8960A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.pending}</p>
              </div>
            </div>
            <button className="w-full py-2 text-xs font-semibold text-[#1A7A3C] border border-[#C8DFD0] rounded-xl hover:bg-[#E8F5EE] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
              {s.viewPayment}
            </button>
          </div>

          {/* Activity Timeline */}
          <div>
            <p className="text-xs font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{s.activityHistory}</p>
            <div className="relative">
              {ACTIVITY.map((item, i) => (
                <div key={i} className="flex gap-3 mb-3 last:mb-0">
                  {/* Dot + line */}
                  <div className="flex flex-col items-center flex-shrink-0 w-5">
                    <div className={`w-3.5 h-3.5 rounded-full flex-shrink-0 border-2 flex items-center justify-center ${
                      item.active
                        ? "border-[#E8960A] bg-[#FEF3C7]"
                        : item.done
                        ? "border-[#1A7A3C] bg-[#1A7A3C]"
                        : "border-[#C8DFD0] bg-white"
                    }`}>
                      {item.done && !item.active && (
                        <svg width="6" height="6" viewBox="0 0 6 6" fill="none"><path d="M1 3l1.5 1.5L5 1.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      )}
                      {item.active && <div className="w-1.5 h-1.5 rounded-full bg-[#E8960A]" />}
                    </div>
                    {i < ACTIVITY.length - 1 && (
                      <div className={`w-0.5 flex-1 mt-0.5 min-h-4 ${item.done ? "bg-[#1A7A3C]" : "bg-[#E8F5EE]"}`} />
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex-1 pb-3">
                    <p className={`text-xs font-semibold ${item.active ? "text-[#E8960A]" : item.done ? "text-[#1A2B4A]" : "text-[#9CA3AF]"}`} style={{ fontFamily: "Poppins, sans-serif" }}>
                      {item.label}
                    </p>
                    <p className="text-[10px] text-[#9CA3AF]">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Actions */}
          <div className="bg-[#F5F9F6] rounded-2xl p-4 border border-[#C8DFD0]">
            <p className="text-xs font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{s.adminActions}</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: s.viewApp, color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE" },
                { label: s.viewQueue, color: "#E8960A", bg: "#FEF3C7", border: "#FDE68A" },
                { label: s.viewProc, color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE" },
                { label: s.viewPay, color: "#1A7A3C", bg: "#E8F5EE", border: "#C8DFD0" },
              ].map((btn) => (
                <button
                  key={btn.label}
                  className="py-2.5 px-3 text-[10px] font-bold rounded-xl border transition-all hover:opacity-80 text-center"
                  style={{ color: btn.color, background: btn.bg, borderColor: btn.border, fontFamily: "Poppins, sans-serif" }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function FarmerManagement({ lang: initLang = "en" }: { lang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initLang);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [cropFilter, setCropFilter] = useState("");
  const [centreFilter, setCentreFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedFarmer, setSelectedFarmer] = useState<typeof ALL_FARMERS[0] | null>(null);
  const pageSize = 10;
  const s = S[lang];

  const filtered = ALL_FARMERS.filter((f) => {
    const q = appliedQuery.toLowerCase();
    const matchSearch = !q || f.name.toLowerCase().includes(q) || f.id.toLowerCase().includes(q) || f.mobile.includes(q);
    const matchCrop = !cropFilter || f.crop === cropFilter;
    const matchCentre = !centreFilter || f.centre === centreFilter;
    const matchStatus = !statusFilter || f.status === statusFilter;
    return matchSearch && matchCrop && matchCentre && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(2486 / pageSize)); // simulated total
  const displayed = filtered.slice(0, pageSize);
  const hasFilters = appliedQuery || cropFilter || centreFilter || statusFilter;

  const handleSearch = () => { setAppliedQuery(searchQuery); setPage(1); };
  const handleReset = () => { setSearchQuery(""); setAppliedQuery(""); setCropFilter(""); setCentreFilter(""); setStatusFilter(""); setPage(1); };

  const statusBadge = (status: string) => {
    if (status === "Active") return { color: "#1A7A3C", bg: "#E8F5EE" };
    return { color: "#E8960A", bg: "#FEF3C7" };
  };

  return (
    <div className="p-4 xl:p-6 space-y-4 max-w-[1280px] mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* Demo notice */}
      <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl px-4 py-2 flex items-start gap-2">
        <span className="text-sm flex-shrink-0 mt-0.5">⚠️</span>
        <p className="text-xs text-[#92400E]"><strong>SIH 2026 Prototype</strong> — {s.demoNote}</p>
      </div>

      {/* Header row */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <p className="text-lg font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.title}</p>
          <p className="text-xs text-[#9CA3AF]">{s.subtitle}</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: s.totalFarmers, value: "2,486", icon: "👥", color: "#1A7A3C", bg: "#E8F5EE" },
          { label: s.activeFarmers, value: "1,842", icon: "✅", color: "#2563EB", bg: "#EFF6FF" },
          { label: s.todayReg, value: "34", icon: "📝", color: "#E8960A", bg: "#FEF3C7" },
          { label: s.pendingApps, value: "42", icon: "⏳", color: "#C8332A", bg: "#FEF2F2" },
        ].map((k) => (
          <div key={k.label} className="bg-white rounded-xl border border-[#C8DFD0] p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: k.bg }}>{k.icon}</div>
              <span className="text-[9px] text-[#9CA3AF]">{s.demo}</span>
            </div>
            <p className="text-2xl font-bold mb-0.5" style={{ color: k.color, fontFamily: "Poppins, sans-serif" }}>{k.value}</p>
            <p className="text-[10px] text-[#6B7280]">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4 shadow-sm space-y-3">
        {/* Search bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder={s.searchPH}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-[#C8DFD0] rounded-xl focus:outline-none focus:border-[#1A7A3C] focus:ring-2 focus:ring-[#1A7A3C]/10 bg-[#F5F9F6] placeholder-[#9CA3AF]"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-xl transition-colors flex-shrink-0"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {s.search}
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2.5 text-sm font-semibold rounded-xl border transition-colors flex-shrink-0 flex items-center gap-1.5 ${showFilters ? "bg-[#1A2B4A] text-white border-[#1A2B4A]" : "text-[#1A2B4A] border-[#C8DFD0] hover:bg-[#F5F9F6]"}`}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1 3h11M3 6.5h7M5 10h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            {s.filters}
          </button>
        </div>

        {/* Filter row */}
        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-2 border-t border-[#E8F5EE]">
            <div>
              <label className="text-[10px] font-semibold text-[#6B7280] block mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{s.crop}</label>
              <select
                value={cropFilter}
                onChange={(e) => setCropFilter(e.target.value)}
                className="w-full px-2.5 py-2 text-xs border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]"
              >
                <option value="">{s.allCrops}</option>
                <option value="Wheat">Wheat</option>
                <option value="Rice">Rice</option>
                <option value="Soybean">Soybean</option>
                <option value="Maize">Maize</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-[#6B7280] block mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{s.centre}</label>
              <select
                value={centreFilter}
                onChange={(e) => setCentreFilter(e.target.value)}
                className="w-full px-2.5 py-2 text-xs border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]"
              >
                <option value="">{s.allCentres}</option>
                <option value="Centre A">Centre A</option>
                <option value="Centre B">Centre B</option>
                <option value="Centre C">Centre C</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-[#6B7280] block mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{s.status}</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-2.5 py-2 text-xs border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]"
              >
                <option value="">{s.allStatus}</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-[#6B7280] block mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{s.regDate}</label>
              <select className="w-full px-2.5 py-2 text-xs border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]">
                <option>{s.allDates}</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-[#6B7280] block mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{s.langFilter}</label>
              <select className="w-full px-2.5 py-2 text-xs border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]">
                <option>{s.allLang}</option>
                <option>Hindi</option>
                <option>English</option>
              </select>
            </div>
            <div className="col-span-2 md:col-span-5 flex gap-2 pt-1">
              <button
                onClick={handleSearch}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-xl transition-colors"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {s.applyFilters}
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-xs font-semibold text-[#6B7280] border border-[#C8DFD0] rounded-xl hover:bg-[#F5F9F6] transition-colors"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {s.reset}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table / Cards */}
      <div className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-[#E8F5EE] flex items-center justify-between">
          <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>
            {s.showing} 1–{Math.min(pageSize, filtered.length)} {s.of} {hasFilters ? filtered.length : "2,486"} {s.farmers}
          </p>
          {hasFilters && (
            <span className="text-[10px] font-semibold text-[#E8960A] bg-[#FEF3C7] px-2.5 py-1 rounded-full">Filtered</span>
          )}
        </div>

        {/* Desktop table */}
        {displayed.length > 0 ? (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F5F9F6]">
                    {[s.farmerID, s.farmerName, s.mobile, s.location, s.cropCol, s.centreCol, s.applications, s.statusCol, s.action].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8F5EE]">
                  {displayed.map((f) => {
                    const badge = statusBadge(f.status);
                    return (
                      <tr key={f.id} className="hover:bg-[#F5F9F6] transition-colors cursor-pointer" onClick={() => setSelectedFarmer(f)}>
                        <td className="px-4 py-3 font-mono text-[10px] text-[#6B7280] whitespace-nowrap">{f.id}</td>
                        <td className="px-4 py-3 font-semibold text-[#1A2B4A] whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>{f.name}</td>
                        <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap font-mono text-[10px]">{f.mobile}</td>
                        <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{f.location}</td>
                        <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{f.crop}</td>
                        <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{f.centre}</td>
                        <td className="px-4 py-3 text-center text-[#1A2B4A] font-semibold whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>{f.apps}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ color: badge.color, background: badge.bg, fontFamily: "Poppins, sans-serif" }}>
                            {f.status === "Active" ? s.active : s.pending}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedFarmer(f); }}
                            className="px-3 py-1.5 text-[10px] font-bold text-[#1A7A3C] border border-[#C8DFD0] rounded-lg hover:bg-[#E8F5EE] transition-colors"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {s.view}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-[#E8F5EE]">
              {displayed.map((f) => {
                const badge = statusBadge(f.status);
                return (
                  <div key={f.id} className="p-4 hover:bg-[#F5F9F6] cursor-pointer" onClick={() => setSelectedFarmer(f)}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-mono text-[9px] text-[#9CA3AF]">{f.id}</span>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ color: badge.color, background: badge.bg }}>
                            {f.status === "Active" ? s.active : s.pending}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{f.name}</p>
                        <p className="text-[10px] text-[#6B7280] font-mono">{f.mobile}</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedFarmer(f); }}
                        className="px-3 py-1.5 text-[10px] font-bold text-[#1A7A3C] border border-[#C8DFD0] rounded-lg hover:bg-[#E8F5EE] transition-colors flex-shrink-0"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {s.view}
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: s.location, val: f.location },
                        { label: s.cropCol, val: f.crop },
                        { label: s.centreCol, val: f.centre },
                      ].map((item) => (
                        <div key={item.label} className="bg-[#F5F9F6] rounded-lg px-2 py-1.5">
                          <p className="text-[9px] text-[#9CA3AF]">{item.label}</p>
                          <p className="text-[10px] font-semibold text-[#1A2B4A]">{item.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-base font-bold text-[#1A2B4A] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{s.noFarmer}</p>
            <p className="text-sm text-[#9CA3AF] mb-4">{s.noFarmerSub}</p>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 text-sm font-semibold text-[#1A7A3C] border border-[#C8DFD0] rounded-xl hover:bg-[#E8F5EE] transition-colors"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {s.clearFilters}
            </button>
          </div>
        )}

        {/* Pagination */}
        {displayed.length > 0 && (
          <div className="px-5 py-3 border-t border-[#E8F5EE] flex items-center justify-between gap-3 flex-wrap">
            <span className="text-xs text-[#9CA3AF]">
              {s.showing} {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, 2486)} {s.of} 2,486 {s.farmers}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-[10px] font-semibold border border-[#C8DFD0] rounded-lg disabled:opacity-40 hover:bg-[#F5F9F6] disabled:cursor-not-allowed text-[#1A2B4A] transition-colors"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {s.prev}
              </button>
              {[1, 2, 3, 4].map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 text-xs font-bold rounded-lg transition-colors ${page === p ? "bg-[#1A2B4A] text-white" : "text-[#6B7280] hover:bg-[#F5F9F6] border border-[#C8DFD0]"}`}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-[10px] font-semibold border border-[#C8DFD0] rounded-lg disabled:opacity-40 hover:bg-[#F5F9F6] disabled:cursor-not-allowed text-[#1A2B4A] transition-colors"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {s.next}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-2 border-t border-[#C8DFD0]">
        <p className="text-[10px] text-[#9CA3AF]">KisanQ Admin · SIH 2026 Prototype · Team Viksit Innovators · All farmer data is demo only</p>
      </div>

      {/* Farmer details drawer */}
      {selectedFarmer && (
        <FarmerDrawer
          farmer={selectedFarmer}
          lang={lang}
          onClose={() => setSelectedFarmer(null)}
        />
      )}
    </div>
  );
}
