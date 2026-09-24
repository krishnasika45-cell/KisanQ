import { useState } from "react";

type Lang = "en" | "hi";
type QuickFilter = "all" | "today" | "pending" | "in_progress" | "completed" | "payment_pending";

const S = {
  en: {
    title: "Application Management",
    subtitle: "Review and track procurement applications.",
    lang: "हिन्दी",
    demo: "Demo data",
    demoNote: "All data shown is demo/fictional — not connected to any real government database.",
    // KPIs
    totalApps: "Total Applications",
    submitted: "Submitted",
    confirmed: "Confirmed",
    inProgress: "In Progress",
    completed: "Completed",
    paymentPending: "Payment Pending",
    // Search/Filter
    searchPH: "Search by Application ID, farmer name or token",
    search: "Search",
    filters: "Filters",
    centre: "Centre",
    allCentres: "All Centres",
    crop: "Crop",
    allCrops: "All Crops",
    appStatus: "Application Status",
    allStatus: "All Status",
    procStage: "Procurement Stage",
    allStages: "All Stages",
    date: "Date",
    allDates: "All Dates",
    applyFilters: "Apply Filters",
    reset: "Reset",
    // Quick filters
    all: "All",
    today: "Today",
    pending: "Pending",
    // Table
    appID: "Application ID",
    farmer: "Farmer",
    cropCol: "Crop",
    qty: "Quantity",
    centreCol: "Centre",
    slot: "Slot",
    token: "Token",
    stage: "Stage",
    statusCol: "Status",
    action: "Action",
    view: "View",
    showing: "Showing",
    of: "of",
    applications: "applications",
    prev: "Previous",
    next: "Next",
    // Empty state
    noApps: "No applications found",
    noAppsSub: "Try changing your filters or search.",
    resetFilters: "Reset Filters",
    // Stage labels
    stageSub: "Submitted",
    stageConf: "Slot Confirmed",
    stageArr: "Farmer Arrived",
    stageQC: "Quality Check",
    stageWeigh: "Weighing",
    stageProc: "Procurement",
    stagePay: "Payment",
    // Drawer
    appDetails: "Application Details",
    close: "Close",
    appIDLabel: "Application ID",
    farmerLabel: "Farmer",
    cropLabel: "Crop",
    qtyLabel: "Quantity",
    centreLabel: "Centre",
    slotLabel: "Slot",
    tokenLabel: "Virtual Token",
    currentStage: "Current Stage",
    statusLabel: "Status",
    timeline: "Application Timeline",
    stageSummary: "Stage Summary",
    adminActions: "Admin Actions",
    viewFarmer: "View Farmer",
    viewQueue: "View Queue Position",
    viewProc: "View Procurement",
    viewPay: "View Payment",
    notification: "Notification",
    notifMsg1: "Application status updated.",
    notifMsg2: "Farmer has been notified about the latest progress.",
    notifNote: "Demo notification — not sent to any real system.",
    // Status badge labels
    submittedBadge: "Submitted",
    confirmedBadge: "Confirmed",
    inProgressBadge: "In Progress",
    completedBadge: "Completed",
    paymentPendingBadge: "Payment Pending",
    // Stage status
    done: "Done",
    current: "In Progress",
    pendingStage: "Pending",
    quintal: "Quintal",
  },
  hi: {
    title: "आवेदन प्रबंधन",
    subtitle: "खरीद आवेदनों की समीक्षा करें और उन्हें ट्रैक करें।",
    lang: "English",
    demo: "डेमो डेटा",
    demoNote: "यहाँ दिखाया गया सभी डेटा डेमो/काल्पनिक है — किसी सरकारी डेटाबेस से जुड़ा नहीं है।",
    totalApps: "कुल आवेदन",
    submitted: "सबमिट किए",
    confirmed: "पुष्टि किए",
    inProgress: "प्रक्रिया में",
    completed: "पूर्ण",
    paymentPending: "भुगतान लंबित",
    searchPH: "आवेदन ID, किसान का नाम या टोकन से खोजें",
    search: "खोजें",
    filters: "फ़िल्टर",
    centre: "केंद्र",
    allCentres: "सभी केंद्र",
    crop: "फसल",
    allCrops: "सभी फसलें",
    appStatus: "आवेदन स्थिति",
    allStatus: "सभी स्थिति",
    procStage: "खरीद चरण",
    allStages: "सभी चरण",
    date: "तिथि",
    allDates: "सभी तिथियाँ",
    applyFilters: "फ़िल्टर लागू करें",
    reset: "रीसेट",
    all: "सभी",
    today: "आज",
    pending: "लंबित",
    appID: "आवेदन ID",
    farmer: "किसान",
    cropCol: "फसल",
    qty: "मात्रा",
    centreCol: "केंद्र",
    slot: "स्लॉट",
    token: "टोकन",
    stage: "चरण",
    statusCol: "स्थिति",
    action: "क्रिया",
    view: "देखें",
    showing: "दिखाया जा रहा है",
    of: "में से",
    applications: "आवेदन",
    prev: "पिछला",
    next: "अगला",
    noApps: "कोई आवेदन नहीं मिला",
    noAppsSub: "अपने फ़िल्टर या खोज बदलकर देखें।",
    resetFilters: "फ़िल्टर रीसेट करें",
    stageSub: "आवेदन जमा",
    stageConf: "स्लॉट पुष्टि",
    stageArr: "किसान पहुंचा",
    stageQC: "गुणवत्ता जांच",
    stageWeigh: "तुलाई",
    stageProc: "खरीद",
    stagePay: "भुगतान",
    appDetails: "आवेदन विवरण",
    close: "बंद करें",
    appIDLabel: "आवेदन ID",
    farmerLabel: "किसान",
    cropLabel: "फसल",
    qtyLabel: "मात्रा",
    centreLabel: "केंद्र",
    slotLabel: "स्लॉट",
    tokenLabel: "वर्चुअल टोकन",
    currentStage: "वर्तमान चरण",
    statusLabel: "स्थिति",
    timeline: "आवेदन टाइमलाइन",
    stageSummary: "चरण सारांश",
    adminActions: "व्यवस्थापक क्रियाएं",
    viewFarmer: "किसान देखें",
    viewQueue: "कतार स्थिति देखें",
    viewProc: "खरीद देखें",
    viewPay: "भुगतान देखें",
    notification: "सूचना",
    notifMsg1: "आवेदन की स्थिति अपडेट की गई।",
    notifMsg2: "किसान को नवीनतम प्रगति के बारे में सूचित किया गया है।",
    notifNote: "डेमो सूचना — किसी वास्तविक प्रणाली को नहीं भेजी गई।",
    submittedBadge: "सबमिट किया",
    confirmedBadge: "पुष्टि",
    inProgressBadge: "प्रक्रिया में",
    completedBadge: "पूर्ण",
    paymentPendingBadge: "भुगतान लंबित",
    done: "पूर्ण",
    current: "प्रक्रिया में",
    pendingStage: "लंबित",
    quintal: "क्विंटल",
  },
};

// ─── Demo data ─────────────────────────────────────────────────────────────────
const ALL_APPLICATIONS = [
  { id: "KQ-2026-00241", farmer: "Ramesh Kumar", crop: "Wheat", qty: "50 Qtl", centre: "Centre B", slot: "10:30 AM", token: "Q-024", stage: "Weighing", status: "In Progress", currentStep: 4 },
  { id: "KQ-2026-00242", farmer: "Suresh Patel", crop: "Wheat", qty: "35 Qtl", centre: "Centre C", slot: "11:00 AM", token: "Q-031", stage: "Quality Check", status: "In Progress", currentStep: 3 },
  { id: "KQ-2026-00243", farmer: "Amit Sharma", crop: "Rice", qty: "40 Qtl", centre: "Centre A", slot: "12:00 PM", token: "Q-045", stage: "Submitted", status: "Submitted", currentStep: 0 },
  { id: "KQ-2026-00244", farmer: "Mohan Singh", crop: "Wheat", qty: "30 Qtl", centre: "Centre B", slot: "01:00 PM", token: "Q-052", stage: "Procurement", status: "Completed", currentStep: 6 },
  { id: "KQ-2026-00245", farmer: "Priya Devi", crop: "Soybean", qty: "28 Qtl", centre: "Centre C", slot: "09:30 AM", token: "Q-011", stage: "Payment", status: "Payment Pending", currentStep: 5 },
  { id: "KQ-2026-00246", farmer: "Dinesh Yadav", crop: "Maize", qty: "45 Qtl", centre: "Centre A", slot: "10:00 AM", token: "Q-017", stage: "Slot Confirmed", status: "Confirmed", currentStep: 1 },
  { id: "KQ-2026-00247", farmer: "Kavita Bai", crop: "Wheat", qty: "60 Qtl", centre: "Centre B", slot: "02:00 PM", token: "Q-062", stage: "Submitted", status: "Submitted", currentStep: 0 },
  { id: "KQ-2026-00248", farmer: "Ravi Gupta", crop: "Rice", qty: "38 Qtl", centre: "Centre C", slot: "11:30 AM", token: "Q-037", stage: "Weighing", status: "In Progress", currentStep: 4 },
  { id: "KQ-2026-00249", farmer: "Santosh Prajapati", crop: "Wheat", qty: "55 Qtl", centre: "Centre A", slot: "01:30 PM", token: "Q-058", stage: "Procurement", status: "Completed", currentStep: 6 },
  { id: "KQ-2026-00250", farmer: "Asha Rani", crop: "Soybean", qty: "22 Qtl", centre: "Centre B", slot: "03:00 PM", token: "Q-071", stage: "Quality Check", status: "In Progress", currentStep: 3 },
];

const STATUS_META: Record<string, { color: string; bg: string }> = {
  "Submitted":      { color: "#6B7280", bg: "#F3F4F6" },
  "Confirmed":      { color: "#2563EB", bg: "#EFF6FF" },
  "In Progress":    { color: "#E8960A", bg: "#FEF3C7" },
  "Completed":      { color: "#1A7A3C", bg: "#E8F5EE" },
  "Payment Pending":{ color: "#C8332A", bg: "#FEF2F2" },
};

const STAGE_STEPS = [
  { keyS: "stageSub",  keyL: "stageSub" },
  { keyS: "stageConf", keyL: "stageConf" },
  { keyS: "stageArr",  keyL: "stageArr" },
  { keyS: "stageQC",   keyL: "stageQC" },
  { keyS: "stageWeigh",keyL: "stageWeigh" },
  { keyS: "stageProc", keyL: "stageProc" },
  { keyS: "stagePay",  keyL: "stagePay" },
];

const TIMELINE_TIMES = [
  "8:15 AM", "8:20 AM", "10:18 AM", "10:42 AM", "In Progress", "Pending", "Pending",
];

// ─── Application Details Drawer ────────────────────────────────────────────────
function AppDrawer({ app, s, onClose }: { app: typeof ALL_APPLICATIONS[0]; s: typeof S["en"]; onClose: () => void }) {
  const statusM = STATUS_META[app.status] ?? { color: "#6B7280", bg: "#F3F4F6" };

  const stageBadgeLabel = (st: string) => {
    if (st === "Submitted") return s.submittedBadge;
    if (st === "Confirmed") return s.confirmedBadge;
    if (st === "In Progress") return s.inProgressBadge;
    if (st === "Completed") return s.completedBadge;
    return s.paymentPendingBadge;
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>

        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#C8DFD0] px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.appDetails}</p>
            <p className="text-[10px] text-[#9CA3AF] font-mono">{app.id} · Demo data</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>

        <div className="flex-1 p-5 space-y-5">

          {/* Profile hero */}
          <div className="bg-gradient-to-br from-[#1A2B4A] to-[#0F1E35] rounded-2xl p-5 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{s.appIDLabel}</p>
                <p className="text-base font-bold font-mono" style={{ fontFamily: "Poppins, sans-serif" }}>{app.id}</p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ml-2" style={{ color: statusM.color, background: statusM.bg, fontFamily: "Poppins, sans-serif" }}>
                {stageBadgeLabel(app.status)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: s.farmerLabel, val: app.farmer },
                { label: s.cropLabel, val: app.crop },
                { label: s.qtyLabel, val: `${app.qty.replace("Qtl", s.quintal)}` },
                { label: s.centreLabel, val: `Gwalior Procurement ${app.centre}` },
                { label: s.slotLabel, val: `${app.slot} – ${app.slot.includes("AM") ? app.slot.replace("AM","").trim() + " AM" : ""}` },
                { label: s.tokenLabel, val: app.token },
                { label: s.currentStage, val: app.stage },
              ].map((item) => (
                <div key={item.label} className={item.label === s.centreLabel || item.label === s.currentStage ? "col-span-2" : ""}>
                  <p className="text-[9px] text-white/40 mb-0.5">{item.label}</p>
                  <p className="text-xs font-semibold text-white/90">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stage Summary chips */}
          <div>
            <p className="text-xs font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{s.stageSummary}</p>
            <div className="flex gap-1.5 flex-wrap">
              {STAGE_STEPS.map((st, i) => {
                const isDone = i < app.currentStep;
                const isCurrent = i === app.currentStep;
                return (
                  <div
                    key={st.keyS}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold border"
                    style={{
                      color: isDone ? "#1A7A3C" : isCurrent ? "#E8960A" : "#9CA3AF",
                      background: isDone ? "#E8F5EE" : isCurrent ? "#FEF3C7" : "#F5F9F6",
                      borderColor: isDone ? "#C8DFD0" : isCurrent ? "#FDE68A" : "#E5E7EB",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {isDone ? "✓" : isCurrent ? "→" : "○"}
                    <span>{(s as Record<string, string>)[st.keyS]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <p className="text-xs font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{s.timeline}</p>
            <div className="relative">
              {STAGE_STEPS.map((st, i) => {
                const isDone = i < app.currentStep;
                const isCurrent = i === app.currentStep;
                const isPend = i > app.currentStep;
                const timeStr = TIMELINE_TIMES[i];
                return (
                  <div key={st.keyS} className="flex gap-3 mb-3 last:mb-0">
                    <div className="flex flex-col items-center flex-shrink-0 w-5">
                      <div className={`w-4 h-4 rounded-full flex-shrink-0 border-2 flex items-center justify-center ${
                        isCurrent ? "border-[#E8960A] bg-[#FEF3C7]"
                        : isDone ? "border-[#1A7A3C] bg-[#1A7A3C]"
                        : "border-[#C8DFD0] bg-white"
                      }`}>
                        {isDone && (
                          <svg width="7" height="7" viewBox="0 0 7 7" fill="none"><path d="M1 3.5l2 2L6 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        )}
                        {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-[#E8960A]" />}
                      </div>
                      {i < STAGE_STEPS.length - 1 && (
                        <div className={`w-0.5 flex-1 mt-0.5 min-h-3 ${isDone ? "bg-[#1A7A3C]" : "bg-[#E8F5EE]"}`} />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-xs font-semibold ${isCurrent ? "text-[#E8960A]" : isDone ? "text-[#1A2B4A]" : "text-[#9CA3AF]"}`} style={{ fontFamily: "Poppins, sans-serif" }}>
                          {(s as Record<string, string>)[st.keyS]}
                        </p>
                        <span className={`text-[9px] flex-shrink-0 ${isCurrent ? "text-[#E8960A] font-semibold" : isDone ? "text-[#9CA3AF]" : "text-[#C8DFD0]"}`}>
                          {isCurrent ? s.current : isPend ? s.pendingStage : timeStr}
                        </span>
                      </div>
                      {isDone && (
                        <p className="text-[9px] text-[#9CA3AF]">{timeStr}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notification card */}
          <div className="bg-[#E8F5EE] border border-[#C8DFD0] rounded-xl p-4">
            <p className="text-xs font-bold text-[#1A7A3C] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
              🔔 {s.notification}
            </p>
            <p className="text-[10px] text-[#1A7A3C]/80 mb-0.5">{s.notifMsg1}</p>
            <p className="text-[10px] text-[#1A7A3C]/80 mb-2">{s.notifMsg2}</p>
            <p className="text-[9px] text-[#9CA3AF]">{s.notifNote}</p>
          </div>

          {/* Admin Actions */}
          <div className="bg-[#F5F9F6] rounded-2xl border border-[#C8DFD0] p-4">
            <p className="text-xs font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{s.adminActions}</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: s.viewFarmer, color: "#1A7A3C", bg: "#E8F5EE", border: "#C8DFD0" },
                { label: s.viewQueue, color: "#E8960A", bg: "#FEF3C7", border: "#FDE68A" },
                { label: s.viewProc, color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE" },
                { label: s.viewPay, color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE" },
              ].map((btn) => (
                <button
                  key={btn.label}
                  className="py-2.5 text-[10px] font-bold rounded-xl border transition-all hover:opacity-80 text-center"
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

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function ApplicationManagement({ lang: initLang = "en" }: { lang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initLang);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [centreFilter, setCentreFilter] = useState("");
  const [cropFilter, setCropFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
  const [page, setPage] = useState(1);
  const [selectedApp, setSelectedApp] = useState<typeof ALL_APPLICATIONS[0] | null>(null);
  const pageSize = 10;
  const s = S[lang];

  const QUICK_FILTERS: { id: QuickFilter; label: string }[] = [
    { id: "all", label: s.all },
    { id: "today", label: s.today },
    { id: "pending", label: s.submitted },
    { id: "in_progress", label: s.inProgress },
    { id: "completed", label: s.completed },
    { id: "payment_pending", label: s.paymentPending },
  ];

  const filtered = ALL_APPLICATIONS.filter((a) => {
    const q = appliedQuery.toLowerCase();
    const matchSearch = !q || a.id.toLowerCase().includes(q) || a.farmer.toLowerCase().includes(q) || a.token.toLowerCase().includes(q);
    const matchCentre = !centreFilter || a.centre === centreFilter;
    const matchCrop = !cropFilter || a.crop === cropFilter;
    const matchStatus = !statusFilter || a.status === statusFilter;
    const matchQuick =
      quickFilter === "all" || quickFilter === "today" ? true
      : quickFilter === "pending" ? a.status === "Submitted"
      : quickFilter === "in_progress" ? a.status === "In Progress"
      : quickFilter === "completed" ? a.status === "Completed"
      : quickFilter === "payment_pending" ? a.status === "Payment Pending"
      : true;
    return matchSearch && matchCentre && matchCrop && matchStatus && matchQuick;
  });

  const displayed = filtered.slice(0, pageSize);
  const hasFilter = appliedQuery || centreFilter || cropFilter || statusFilter || quickFilter !== "all";

  const handleSearch = () => { setAppliedQuery(searchQuery); setPage(1); };
  const handleReset = () => { setSearchQuery(""); setAppliedQuery(""); setCentreFilter(""); setCropFilter(""); setStatusFilter(""); setQuickFilter("all"); setPage(1); };

  const stageBadgeLabel = (st: string) => {
    if (st === "Submitted") return s.submittedBadge;
    if (st === "Confirmed") return s.confirmedBadge;
    if (st === "In Progress") return s.inProgressBadge;
    if (st === "Completed") return s.completedBadge;
    return s.paymentPendingBadge;
  };

  // KPI counts
  const counts = {
    total: 184,
    submitted: 42,
    confirmed: 97,
    inProgress: 31,
    completed: 98,
    paymentPending: 27,
  };

  return (
    <div className="p-4 xl:p-6 space-y-4 max-w-[1280px] mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* Demo notice */}
      <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl px-4 py-2 flex items-start gap-2">
        <span className="text-sm flex-shrink-0 mt-0.5">⚠️</span>
        <p className="text-xs text-[#92400E]"><strong>SIH 2026 Prototype</strong> — {s.demoNote}</p>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <p className="text-lg font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.title}</p>
          <p className="text-xs text-[#9CA3AF]">{s.subtitle}</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {[
          { label: s.totalApps,       value: `${counts.total}`,          icon: "📋", color: "#1A7A3C", bg: "#E8F5EE" },
          { label: s.submitted,        value: `${counts.submitted}`,       icon: "📥", color: "#6B7280", bg: "#F3F4F6" },
          { label: s.confirmed,        value: `${counts.confirmed}`,       icon: "✅", color: "#2563EB", bg: "#EFF6FF" },
          { label: s.inProgress,       value: `${counts.inProgress}`,      icon: "⚡", color: "#E8960A", bg: "#FEF3C7" },
          { label: s.completed,        value: `${counts.completed}`,       icon: "🏆", color: "#1A7A3C", bg: "#E8F5EE" },
          { label: s.paymentPending,   value: `${counts.paymentPending}`,  icon: "💰", color: "#C8332A", bg: "#FEF2F2" },
        ].map((k) => (
          <div
            key={k.label}
            className="bg-white rounded-xl border border-[#C8DFD0] p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              const qMap: Record<string, QuickFilter> = {
                [s.submitted]: "pending", [s.inProgress]: "in_progress",
                [s.completed]: "completed", [s.paymentPending]: "payment_pending",
              };
              setQuickFilter(qMap[k.label] ?? "all");
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: k.bg }}>{k.icon}</div>
              <span className="text-[9px] text-[#9CA3AF]">{s.demo}</span>
            </div>
            <p className="text-xl font-bold mb-0.5" style={{ color: k.color, fontFamily: "Poppins, sans-serif" }}>{k.value}</p>
            <p className="text-[10px] text-[#6B7280]">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4 shadow-sm space-y-3">
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
            />
          </div>
          <button onClick={handleSearch} className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-xl transition-colors flex-shrink-0" style={{ fontFamily: "Poppins, sans-serif" }}>
            {s.search}
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2.5 text-sm font-semibold rounded-xl border transition-colors flex-shrink-0 flex items-center gap-1.5 ${showFilters ? "bg-[#1A2B4A] text-white border-[#1A2B4A]" : "text-[#1A2B4A] border-[#C8DFD0] hover:bg-[#F5F9F6]"}`}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 3h11M3 6.5h7M5 10h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
            {s.filters}
          </button>
        </div>

        {/* Quick filter chips */}
        <div className="flex gap-2 flex-wrap">
          {QUICK_FILTERS.map((qf) => (
            <button
              key={qf.id}
              onClick={() => { setQuickFilter(qf.id); setPage(1); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${quickFilter === qf.id ? "bg-[#1A2B4A] text-white border-[#1A2B4A]" : "text-[#6B7280] border-[#C8DFD0] bg-white hover:border-[#1A7A3C] hover:text-[#1A7A3C]"}`}
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {qf.label}
            </button>
          ))}
        </div>

        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-2 border-t border-[#E8F5EE]">
            {[
              { label: s.centre, value: centreFilter, onChange: setCentreFilter, opts: [{ v: "", l: s.allCentres }, ...["Centre A","Centre B","Centre C","Centre D","Centre E","Centre F"].map((c) => ({ v: c, l: c }))] },
              { label: s.crop, value: cropFilter, onChange: setCropFilter, opts: [{ v: "", l: s.allCrops }, ...["Wheat","Rice","Soybean","Maize"].map((c) => ({ v: c, l: c }))] },
              { label: s.appStatus, value: statusFilter, onChange: setStatusFilter, opts: [{ v: "", l: s.allStatus }, ...["Submitted","Confirmed","In Progress","Completed","Payment Pending"].map((c) => ({ v: c, l: c }))] },
              { label: s.procStage, value: "", onChange: () => {}, opts: [{ v: "", l: s.allStages }, ...["Quality Check","Weighing","Procurement","Payment"].map((c) => ({ v: c, l: c }))] },
              { label: s.date, value: "", onChange: () => {}, opts: [{ v: "", l: s.allDates }, { v: "today", l: s.today }, { v: "week", l: "This Week" }, { v: "month", l: "This Month" }] },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{f.label}</label>
                <select
                  value={f.value}
                  onChange={(e) => f.onChange(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]"
                >
                  {f.opts.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
                </select>
              </div>
            ))}
            <div className="col-span-2 md:col-span-5 flex gap-2 pt-1">
              <button onClick={handleSearch} className="px-4 py-2 text-xs font-semibold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-xl transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>{s.applyFilters}</button>
              <button onClick={handleReset} className="px-4 py-2 text-xs font-semibold text-[#6B7280] border border-[#C8DFD0] rounded-xl hover:bg-[#F5F9F6] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>{s.reset}</button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-[#E8F5EE] flex items-center justify-between flex-wrap gap-2">
          <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>
            {s.showing} 1–{Math.min(pageSize, filtered.length)} {s.of} {hasFilter ? filtered.length : "184"} {s.applications}
          </p>
          {hasFilter && (
            <span className="text-[10px] font-semibold text-[#E8960A] bg-[#FEF3C7] px-2.5 py-1 rounded-full">{s.filters} active</span>
          )}
        </div>

        {displayed.length > 0 ? (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F5F9F6]">
                    {[s.appID, s.farmer, s.cropCol, s.qty, s.centreCol, s.slot, s.token, s.stage, s.statusCol, s.action].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8F5EE]">
                  {displayed.map((app) => {
                    const m = STATUS_META[app.status] ?? { color: "#6B7280", bg: "#F3F4F6" };
                    return (
                      <tr key={app.id} className="hover:bg-[#F5F9F6] transition-colors cursor-pointer" onClick={() => setSelectedApp(app)}>
                        <td className="px-4 py-3 font-mono text-[10px] text-[#6B7280] whitespace-nowrap">{app.id}</td>
                        <td className="px-4 py-3 font-semibold text-[#1A2B4A] whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>{app.farmer}</td>
                        <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{app.crop}</td>
                        <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{app.qty}</td>
                        <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{app.centre}</td>
                        <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{app.slot}</td>
                        <td className="px-4 py-3 font-mono text-[11px] font-bold text-[#1A7A3C] whitespace-nowrap">{app.token}</td>
                        <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{app.stage}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ color: m.color, background: m.bg, fontFamily: "Poppins, sans-serif" }}>
                            {stageBadgeLabel(app.status)}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedApp(app); }}
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
              {displayed.map((app) => {
                const m = STATUS_META[app.status] ?? { color: "#6B7280", bg: "#F3F4F6" };
                return (
                  <div key={app.id} className="p-4 hover:bg-[#F5F9F6] cursor-pointer" onClick={() => setSelectedApp(app)}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="font-mono text-[9px] text-[#9CA3AF] mb-0.5">{app.id}</p>
                        <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{app.farmer}</p>
                        <p className="text-[10px] text-[#9CA3AF]">{app.crop} · {app.qty} · {app.token}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ color: m.color, background: m.bg }}>{stageBadgeLabel(app.status)}</span>
                        <button onClick={(e) => { e.stopPropagation(); setSelectedApp(app); }} className="text-[10px] font-bold text-[#1A7A3C] border border-[#C8DFD0] rounded-lg px-2.5 py-1 hover:bg-[#E8F5EE]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.view}</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[{ l: s.centreCol, v: app.centre }, { l: s.slot, v: app.slot }, { l: s.stage, v: app.stage }].map((item) => (
                        <div key={item.l} className="bg-[#F5F9F6] rounded-lg px-2 py-1.5">
                          <p className="text-[8px] text-[#9CA3AF]">{item.l}</p>
                          <p className="text-[10px] font-semibold text-[#1A2B4A] truncate">{item.v}</p>
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
            <div className="text-5xl mb-4">📋</div>
            <p className="text-base font-bold text-[#1A2B4A] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{s.noApps}</p>
            <p className="text-sm text-[#9CA3AF] mb-4">{s.noAppsSub}</p>
            <button onClick={handleReset} className="px-5 py-2.5 text-sm font-semibold text-[#1A7A3C] border border-[#C8DFD0] rounded-xl hover:bg-[#E8F5EE] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>{s.resetFilters}</button>
          </div>
        )}

        {/* Pagination */}
        {displayed.length > 0 && (
          <div className="px-5 py-3 border-t border-[#E8F5EE] flex items-center justify-between gap-3 flex-wrap">
            <span className="text-xs text-[#9CA3AF]">
              {s.showing} {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, 184)} {s.of} 184 {s.applications}
            </span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1.5 text-[10px] font-semibold border border-[#C8DFD0] rounded-lg disabled:opacity-40 hover:bg-[#F5F9F6] disabled:cursor-not-allowed text-[#1A2B4A] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>{s.prev}</button>
              {[1, 2, 3, 4].map((p) => (
                <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 text-xs font-bold rounded-lg transition-colors ${page === p ? "bg-[#1A2B4A] text-white" : "text-[#6B7280] hover:bg-[#F5F9F6] border border-[#C8DFD0]"}`} style={{ fontFamily: "Poppins, sans-serif" }}>{p}</button>
              ))}
              <button onClick={() => setPage(Math.min(19, page + 1))} disabled={page === 19} className="px-3 py-1.5 text-[10px] font-semibold border border-[#C8DFD0] rounded-lg disabled:opacity-40 hover:bg-[#F5F9F6] disabled:cursor-not-allowed text-[#1A2B4A] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>{s.next}</button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-2 border-t border-[#C8DFD0]">
        <p className="text-[10px] text-[#9CA3AF]">KisanQ Admin · SIH 2026 Prototype · Team Viksit Innovators · All application data is demo only</p>
      </div>

      {/* Details drawer */}
      {selectedApp && <AppDrawer app={selectedApp} s={s} onClose={() => setSelectedApp(null)} />}
    </div>
  );
}
