import { useState } from "react";

type Lang = "en" | "hi";
type QuickF = "all" | "today" | "quality" | "weighing" | "procurement" | "completed";

const S = {
  en: {
    title: "Procurement Management",
    subtitle: "Monitor procurement progress from verification to completion.",
    lang: "हिन्दी",
    demo: "Demo data",
    demoNote: "All data is demo/fictional — not connected to any real government system. Payment values are demo estimates only.",
    centreSelector: "Centre",
    date: "24 September 2026",
    // KPIs
    totalToday: "Total Today",
    qualityCheck: "Quality Check",
    weighing: "Weighing",
    procInProgress: "Procurement In Progress",
    completed: "Completed",
    paymentPending: "Payment Pending",
    // Pipeline
    pipeline: "Procurement Pipeline",
    pipelineSub: "Today's workflow · Click a stage to filter",
    application: "Application",
    procurement: "Procurement",
    // Table
    tableTitle: "Active Procurement Records",
    tableSub: "Current records · Demo data",
    appID: "Application ID",
    farmer: "Farmer",
    crop: "Crop",
    qty: "Quantity",
    centre: "Centre",
    currentStage: "Current Stage",
    statusCol: "Status",
    updated: "Updated",
    action: "Action",
    view: "View",
    inProgress: "In Progress",
    completedBadge: "Completed",
    // Quick filters
    all: "All",
    today: "Today",
    // Drawer
    procDetails: "Procurement Details",
    close: "Close",
    appIDLabel: "Application ID",
    farmerLabel: "Farmer",
    cropLabel: "Crop",
    qtyLabel: "Quantity",
    centreLabel: "Centre",
    tokenLabel: "Token",
    currentStageLabel: "Current Stage",
    timeline: "Progress Timeline",
    stageSub: "Application Submitted",
    stageConf: "Slot Confirmed",
    stageArr: "Farmer Arrived",
    stageQC: "Quality Check",
    stageWeigh: "Weighing",
    stageProc: "Procurement",
    stagePay: "Payment",
    done: "Done",
    current: "In Progress",
    pending: "Pending",
    // QC section
    qcTitle: "Quality Check",
    qcStatus: "Status",
    qcQuality: "Quality",
    qcMoisture: "Moisture Content",
    qcGrade: "Grade",
    qcAccepted: "Accepted",
    qcDemoResult: "Demo result — not an official government quality assessment.",
    // Weighing
    weighTitle: "Weighing",
    expectedQty: "Expected Quantity",
    weighedQty: "Weighed Quantity",
    notYet: "—",
    updateWeighing: "Update Weighing",
    // Procurement
    procTitle: "Procurement",
    procAmount: "Procurement Amount",
    demoEstimate: "Demo estimate — not the official MSP or guaranteed payment.",
    // Payment
    payTitle: "Payment",
    payAmount: "Payment Amount",
    payDemoNote: "Demo value — KisanQ does not determine official payment amounts.",
    // Admin actions
    adminActions: "Admin Actions",
    updateStage: "Update Stage",
    markProcComplete: "Mark Procurement Complete",
    viewPayment: "View Payment",
    // Recent activity
    recentActivity: "Recent Activity",
    // Queue card
    queueToken: "Queue Token",
    queuePos: "Current Position",
    queueStatus: "Status",
    viewLiveQueue: "View Live Queue",
    // Analytics
    analyticsTitle: "Today's Procurement Progress",
    analyticsSub: "Demo statistics · Estimated values",
    avgProcTitle: "Average Processing Time",
    avgProcSub: "Demo estimates only",
    minLabel: "min",
    // Filters
    filters: "Filters",
    applyFilters: "Apply Filters",
    reset: "Reset",
    allCentres: "All Centres",
    allStages: "All Stages",
    allStatus: "All Status",
    allDates: "All Dates",
    // Pagination
    showing: "Showing",
    of: "of",
    records: "records",
    prev: "Previous",
    next: "Next",
    // Modal
    updateStageTitle: "Update Procurement Stage",
    confirmComplete: "Confirm Procurement Complete",
    confirmMsg: "Mark this procurement as complete? This is a demo action — no real data will be changed.",
    confirmBtn: "Confirm",
    cancelBtn: "Cancel",
    demoAction: "Demo only — no real data will be modified.",
    selectStage: "Select new stage",
    updateBtn: "Update Stage",
    noRecords: "No records found",
    noRecordsSub: "Try changing your filters or search.",
    resetFilters: "Reset Filters",
  },
  hi: {
    title: "खरीद प्रबंधन",
    subtitle: "सत्यापन से लेकर समापन तक खरीद प्रगति की निगरानी करें।",
    lang: "English",
    demo: "डेमो डेटा",
    demoNote: "सभी डेटा डेमो/काल्पनिक है — किसी सरकारी प्रणाली से जुड़ा नहीं है। भुगतान मान केवल डेमो अनुमान हैं।",
    centreSelector: "केंद्र",
    date: "24 सितंबर 2026",
    totalToday: "आज कुल",
    qualityCheck: "गुणवत्ता जांच",
    weighing: "तौल",
    procInProgress: "खरीद प्रक्रिया में",
    completed: "पूर्ण",
    paymentPending: "भुगतान लंबित",
    pipeline: "खरीद पाइपलाइन",
    pipelineSub: "आज का कार्यप्रवाह · चरण पर क्लिक करें",
    application: "आवेदन",
    procurement: "खरीद",
    tableTitle: "सक्रिय खरीद रिकॉर्ड",
    tableSub: "वर्तमान रिकॉर्ड · डेमो डेटा",
    appID: "आवेदन ID",
    farmer: "किसान",
    crop: "फसल",
    qty: "मात्रा",
    centre: "केंद्र",
    currentStage: "वर्तमान चरण",
    statusCol: "स्थिति",
    updated: "अपडेट",
    action: "क्रिया",
    view: "देखें",
    inProgress: "प्रक्रिया में",
    completedBadge: "पूर्ण",
    all: "सभी",
    today: "आज",
    procDetails: "खरीद विवरण",
    close: "बंद करें",
    appIDLabel: "आवेदन ID",
    farmerLabel: "किसान",
    cropLabel: "फसल",
    qtyLabel: "मात्रा",
    centreLabel: "केंद्र",
    tokenLabel: "टोकन",
    currentStageLabel: "वर्तमान चरण",
    timeline: "प्रगति टाइमलाइन",
    stageSub: "आवेदन जमा",
    stageConf: "स्लॉट पुष्टि",
    stageArr: "किसान पहुंचा",
    stageQC: "गुणवत्ता जांच",
    stageWeigh: "तौल",
    stageProc: "खरीद",
    stagePay: "भुगतान",
    done: "पूर्ण",
    current: "प्रक्रिया में",
    pending: "लंबित",
    qcTitle: "गुणवत्ता जांच",
    qcStatus: "स्थिति",
    qcQuality: "गुणवत्ता",
    qcMoisture: "नमी",
    qcGrade: "ग्रेड",
    qcAccepted: "स्वीकृत",
    qcDemoResult: "डेमो परिणाम — यह कोई आधिकारिक सरकारी गुणवत्ता मूल्यांकन नहीं है।",
    weighTitle: "तौल",
    expectedQty: "अपेक्षित मात्रा",
    weighedQty: "तौली गई मात्रा",
    notYet: "—",
    updateWeighing: "तौल अपडेट करें",
    procTitle: "खरीद",
    procAmount: "खरीद राशि",
    demoEstimate: "डेमो अनुमान — यह आधिकारिक MSP या गारंटीड भुगतान नहीं है।",
    payTitle: "भुगतान",
    payAmount: "भुगतान राशि",
    payDemoNote: "डेमो मान — KisanQ आधिकारिक भुगतान राशि निर्धारित नहीं करता।",
    adminActions: "व्यवस्थापक क्रियाएं",
    updateStage: "चरण अपडेट करें",
    markProcComplete: "खरीद पूर्ण चिह्नित करें",
    viewPayment: "भुगतान देखें",
    recentActivity: "हाल की गतिविधि",
    queueToken: "कतार टोकन",
    queuePos: "वर्तमान स्थिति",
    queueStatus: "स्थिति",
    viewLiveQueue: "लाइव कतार देखें",
    analyticsTitle: "आज की खरीद प्रगति",
    analyticsSub: "डेमो आंकड़े · अनुमानित मान",
    avgProcTitle: "औसत प्रक्रिया समय",
    avgProcSub: "केवल डेमो अनुमान",
    minLabel: "मिनट",
    filters: "फ़िल्टर",
    applyFilters: "फ़िल्टर लागू करें",
    reset: "रीसेट",
    allCentres: "सभी केंद्र",
    allStages: "सभी चरण",
    allStatus: "सभी स्थिति",
    allDates: "सभी तिथियाँ",
    showing: "दिखाया जा रहा है",
    of: "में से",
    records: "रिकॉर्ड",
    prev: "पिछला",
    next: "अगला",
    updateStageTitle: "खरीद चरण अपडेट करें",
    confirmComplete: "खरीद पूर्ण की पुष्टि करें",
    confirmMsg: "इस खरीद को पूर्ण चिह्नित करें? यह एक डेमो क्रिया है — कोई वास्तविक डेटा नहीं बदला जाएगा।",
    confirmBtn: "पुष्टि करें",
    cancelBtn: "रद्द करें",
    demoAction: "केवल डेमो — कोई वास्तविक डेटा संशोधित नहीं किया जाएगा।",
    selectStage: "नया चरण चुनें",
    updateBtn: "चरण अपडेट करें",
    noRecords: "कोई रिकॉर्ड नहीं मिला",
    noRecordsSub: "अपने फ़िल्टर या खोज बदलकर देखें।",
    resetFilters: "फ़िल्टर रीसेट करें",
  },
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const APPLICATIONS = [
  { id: "KQ-2026-00241", farmer: "Ramesh Kumar",     crop: "Wheat",   qty: "50 Qtl", centre: "Centre B", stage: "Weighing",      status: "In Progress", updated: "10:55 AM", step: 4, token: "Q-024" },
  { id: "KQ-2026-00242", farmer: "Suresh Patel",     crop: "Wheat",   qty: "35 Qtl", centre: "Centre C", stage: "Quality Check", status: "In Progress", updated: "10:48 AM", step: 3, token: "Q-031" },
  { id: "KQ-2026-00243", farmer: "Amit Sharma",      crop: "Rice",    qty: "40 Qtl", centre: "Centre A", stage: "Procurement",   status: "In Progress", updated: "11:02 AM", step: 5, token: "Q-045" },
  { id: "KQ-2026-00244", farmer: "Mohan Singh",      crop: "Wheat",   qty: "30 Qtl", centre: "Centre B", stage: "Completed",     status: "Completed",   updated: "10:35 AM", step: 6, token: "Q-052" },
  { id: "KQ-2026-00245", farmer: "Priya Devi",       crop: "Soybean", qty: "28 Qtl", centre: "Centre C", stage: "Weighing",      status: "In Progress", updated: "11:08 AM", step: 4, token: "Q-037" },
  { id: "KQ-2026-00246", farmer: "Dinesh Yadav",     crop: "Maize",   qty: "45 Qtl", centre: "Centre A", stage: "Quality Check", status: "In Progress", updated: "10:52 AM", step: 3, token: "Q-058" },
  { id: "KQ-2026-00247", farmer: "Kavita Bai",       crop: "Wheat",   qty: "60 Qtl", centre: "Centre B", stage: "Completed",     status: "Completed",   updated: "09:55 AM", step: 6, token: "Q-019" },
  { id: "KQ-2026-00248", farmer: "Ravi Gupta",       crop: "Rice",    qty: "38 Qtl", centre: "Centre C", stage: "Procurement",   status: "In Progress", updated: "11:15 AM", step: 5, token: "Q-062" },
];

const STAGE_STEPS = ["stageSub","stageConf","stageArr","stageQC","stageWeigh","stageProc","stagePay"] as const;
const TIMELINE_TIMES = ["8:15 AM","8:20 AM","10:18 AM","10:42 AM","In Progress","Pending","Pending"];

const PIPELINE_STAGES = [
  { key: "application", count: 98, color: "#6B7280", bg: "#F3F4F6" },
  { key: "qualityCheck", count: 24, color: "#7C3AED", bg: "#F5F3FF" },
  { key: "weighing", count: 19, color: "#E8960A", bg: "#FEF3C7" },
  { key: "procurement", count: 11, color: "#2563EB", bg: "#EFF6FF" },
  { key: "completed", count: 44, color: "#1A7A3C", bg: "#E8F5EE" },
];

const RECENT_ACTIVITY = [
  { time: "10:55 AM", event: "Weighing stage started." },
  { time: "10:42 AM", event: "Quality check completed." },
  { time: "10:18 AM", event: "Farmer arrival recorded." },
  { time: "8:20 AM", event: "Slot confirmed." },
];

const AVG_TIMES = [
  { label: "stageQC", val: 5, color: "#7C3AED" },
  { label: "stageWeigh", val: 3, color: "#E8960A" },
  { label: "stageProc", val: 4, color: "#2563EB" },
];

const STATUS_M: Record<string, { color: string; bg: string }> = {
  "In Progress": { color: "#E8960A", bg: "#FEF3C7" },
  "Completed":   { color: "#1A7A3C", bg: "#E8F5EE" },
  "Pending":     { color: "#6B7280", bg: "#F3F4F6" },
};

const STAGE_M: Record<string, { color: string; bg: string }> = {
  "Quality Check": { color: "#7C3AED", bg: "#F5F3FF" },
  "Weighing":      { color: "#E8960A", bg: "#FEF3C7" },
  "Procurement":   { color: "#2563EB", bg: "#EFF6FF" },
  "Completed":     { color: "#1A7A3C", bg: "#E8F5EE" },
  "Submitted":     { color: "#6B7280", bg: "#F3F4F6" },
};

// ─── Update Stage Modal ────────────────────────────────────────────────────────
function UpdateModal({
  mode, app, s, onClose,
}: {
  mode: "stage" | "complete" | "weighing";
  app: typeof APPLICATIONS[0];
  s: typeof S["en"];
  onClose: () => void;
}) {
  const [success, setSuccess] = useState(false);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSuccess(true); setTimeout(onClose, 1000); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-[#C8DFD0]" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8F5EE]">
          <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>
            {mode === "stage" ? s.updateStageTitle : mode === "complete" ? s.confirmComplete : s.updateWeighing}
          </p>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
        {success ? (
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#E8F5EE] flex items-center justify-center text-2xl mb-3">✅</div>
            <p className="text-sm font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>Updated (Demo)</p>
            <p className="text-xs text-[#9CA3AF] mt-1">{s.demoAction}</p>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 space-y-4">
            <div className="bg-[#F5F9F6] rounded-xl p-3 text-xs text-[#6B7280] font-mono">{app.id} · {app.farmer}</div>
            {mode === "stage" && (
              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>{s.selectStage}</label>
                <select className="w-full px-3 py-2.5 text-sm border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]">
                  {["Quality Check","Weighing","Procurement","Completed"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            )}
            {mode === "weighing" && (
              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>{s.weighedQty} (Qtl)</label>
                <input type="number" placeholder="e.g. 48.5" className="w-full px-3 py-2.5 text-sm border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]" />
              </div>
            )}
            {mode === "complete" && <p className="text-xs text-[#6B7280] leading-relaxed">{s.confirmMsg}</p>}
            <p className="text-[9px] text-[#9CA3AF]">{s.demoAction}</p>
            <div className="flex gap-2 pt-1">
              <button type="button" onClick={onClose} className="flex-1 py-2.5 text-sm font-semibold text-[#6B7280] border border-[#C8DFD0] rounded-xl hover:bg-[#F5F9F6]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.cancelBtn}</button>
              <button type="submit" className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>
                {mode === "complete" ? s.confirmBtn : mode === "weighing" ? s.updateWeighing : s.updateBtn}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Procurement Details Drawer ────────────────────────────────────────────────
function ProcDrawer({ app, s, onClose }: { app: typeof APPLICATIONS[0]; s: typeof S["en"]; onClose: () => void }) {
  const [modal, setModal] = useState<"stage" | "complete" | "weighing" | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>

        <div className="sticky top-0 z-10 bg-white border-b border-[#C8DFD0] px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.procDetails}</p>
            <p className="text-[10px] font-mono text-[#9CA3AF]">{app.id} · Demo data</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>

        <div className="flex-1 p-5 space-y-5">

          {/* Hero card */}
          <div className="bg-gradient-to-br from-[#1A2B4A] to-[#0F1E35] rounded-2xl p-5 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">{s.currentStageLabel}</p>
                <p className="text-xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>{app.stage}</p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0" style={{ color: (STAGE_M[app.stage] ?? { color: "#9CA3AF" }).color, background: (STAGE_M[app.stage] ?? { bg: "#F3F4F6" }).bg, fontFamily: "Poppins, sans-serif" }}>
                {app.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: s.appIDLabel, val: app.id },
                { label: s.tokenLabel, val: app.token },
                { label: s.farmerLabel, val: app.farmer },
                { label: s.cropLabel, val: app.crop },
                { label: s.qtyLabel, val: app.qty },
                { label: s.centreLabel, val: `GPC ${app.centre}` },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[9px] text-white/40 mb-0.5">{item.label}</p>
                  <p className="text-xs font-semibold text-white/90">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Queue connection */}
          <div className="bg-[#E8F5EE] border border-[#C8DFD0] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>🎫 {s.queueToken}: {app.token}</p>
              <button className="text-[10px] font-bold text-[#1A7A3C] border border-[#C8DFD0] rounded-lg px-2.5 py-1 bg-white hover:bg-[#E8F5EE] transition-colors flex-shrink-0" style={{ fontFamily: "Poppins, sans-serif" }}>
                {s.viewLiveQueue}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[{ l: s.queuePos, v: "19" }, { l: s.queueStatus, v: app.stage }].map((item) => (
                <div key={item.l}>
                  <p className="text-[9px] text-[#9CA3AF] mb-0.5">{item.l}</p>
                  <p className="text-xs font-semibold text-[#1A2B4A]">{item.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <p className="text-xs font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{s.timeline}</p>
            {STAGE_STEPS.map((key, i) => {
              const isDone = i < app.step;
              const isCurrent = i === app.step;
              return (
                <div key={key} className="flex gap-3 mb-2.5 last:mb-0">
                  <div className="flex flex-col items-center w-5 flex-shrink-0">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isCurrent ? "border-[#E8960A] bg-[#FEF3C7]" : isDone ? "border-[#1A7A3C] bg-[#1A7A3C]" : "border-[#C8DFD0] bg-white"}`}>
                      {isDone && <svg width="7" height="7" viewBox="0 0 7 7" fill="none"><path d="M1 3.5l2 2L6 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-[#E8960A]" />}
                    </div>
                    {i < STAGE_STEPS.length - 1 && <div className={`w-0.5 flex-1 mt-0.5 min-h-3 ${isDone ? "bg-[#1A7A3C]" : "bg-[#E8F5EE]"}`} />}
                  </div>
                  <div className="flex-1 pb-1.5">
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-semibold ${isCurrent ? "text-[#E8960A]" : isDone ? "text-[#1A2B4A]" : "text-[#9CA3AF]"}`} style={{ fontFamily: "Poppins, sans-serif" }}>
                        {(s as Record<string, string>)[key]}
                      </p>
                      <span className={`text-[9px] flex-shrink-0 ml-2 ${isCurrent ? "text-[#E8960A] font-semibold" : isDone ? "text-[#9CA3AF]" : "text-[#C8DFD0]"}`}>
                        {isCurrent ? s.current : i > app.step ? s.pending : TIMELINE_TIMES[i]}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quality Check result */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.qcTitle}</p>
              <span className="text-[9px] font-bold text-[#1A7A3C] bg-[#E8F5EE] px-2 py-0.5 rounded-full">{s.done}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {[{ l: s.qcQuality, v: s.qcAccepted }, { l: s.qcMoisture, v: "12.5%" }, { l: s.qcGrade, v: "A" }].map((item) => (
                <div key={item.l} className="bg-[#E8F5EE] rounded-xl p-2.5 text-center">
                  <p className="text-[8px] text-[#1A7A3C]/60 mb-0.5">{item.l}</p>
                  <p className="text-sm font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>{item.v}</p>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-[#9CA3AF]">{s.qcDemoResult}</p>
          </div>

          {/* Weighing */}
          <div className={`bg-white rounded-2xl border p-4 ${app.stage === "Weighing" ? "border-[#FDE68A]" : "border-[#C8DFD0]"}`}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.weighTitle}</p>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ color: app.stage === "Weighing" ? "#E8960A" : "#9CA3AF", background: app.stage === "Weighing" ? "#FEF3C7" : "#F3F4F6" }}>
                {app.stage === "Weighing" ? s.current : s.pending}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[{ l: s.expectedQty, v: app.qty }, { l: s.weighedQty, v: s.notYet }].map((item) => (
                <div key={item.l} className="bg-[#F5F9F6] rounded-xl p-3">
                  <p className="text-[9px] text-[#9CA3AF] mb-0.5">{item.l}</p>
                  <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{item.v}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setModal("weighing")} className="w-full py-2 text-xs font-bold text-[#E8960A] border border-[#FDE68A] rounded-xl hover:bg-[#FEF3C7] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
              {s.updateWeighing}
            </button>
          </div>

          {/* Procurement */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.procTitle}</p>
              <span className="text-[9px] font-bold text-[#9CA3AF] bg-[#F3F4F6] px-2 py-0.5 rounded-full">{s.pending}</span>
            </div>
            <div className="bg-[#F5F9F6] rounded-xl p-3 mb-2">
              <p className="text-[9px] text-[#9CA3AF] mb-0.5">{s.procAmount}</p>
              <p className="text-xl font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>₹10,250</p>
            </div>
            <p className="text-[9px] text-[#9CA3AF]">{s.demoEstimate}</p>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.payTitle}</p>
              <span className="text-[9px] font-bold text-[#C8332A] bg-[#FEF2F2] px-2 py-0.5 rounded-full">{s.pending}</span>
            </div>
            <div className="bg-[#FEF2F2] rounded-xl p-3 mb-2">
              <p className="text-[9px] text-[#9CA3AF] mb-0.5">{s.payAmount}</p>
              <p className="text-xl font-bold text-[#C8332A]" style={{ fontFamily: "Poppins, sans-serif" }}>₹10,250</p>
            </div>
            <p className="text-[9px] text-[#9CA3AF]">{s.payDemoNote}</p>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4">
            <p className="text-xs font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{s.recentActivity}</p>
            <div className="space-y-2">
              {RECENT_ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-[9px] font-bold text-[#9CA3AF] w-14 flex-shrink-0 pt-0.5">{a.time}</span>
                  <div className="flex-1 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1A7A3C] mt-1.5 flex-shrink-0" />
                    <p className="text-xs text-[#1A2B4A]">{a.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Actions */}
          <div className="bg-[#F5F9F6] rounded-2xl border border-[#C8DFD0] p-4">
            <p className="text-xs font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{s.adminActions}</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: s.updateStage, action: () => setModal("stage"), color: "#1A7A3C", bg: "#E8F5EE", border: "#C8DFD0" },
                { label: s.updateWeighing, action: () => setModal("weighing"), color: "#E8960A", bg: "#FEF3C7", border: "#FDE68A" },
                { label: s.markProcComplete, action: () => setModal("complete"), color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE" },
                { label: s.viewPayment, action: () => {}, color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE" },
              ].map((btn) => (
                <button
                  key={btn.label}
                  onClick={btn.action}
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

      {modal && <UpdateModal mode={modal} app={app} s={s} onClose={() => setModal(null)} />}
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function ProcurementManagement({ lang: initLang = "en" }: { lang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initLang);
  const [centre, setCentre] = useState("Centre B");
  const [quickFilter, setQuickFilter] = useState<QuickF>("all");
  const [stageFilter, setStageFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedApp, setSelectedApp] = useState<typeof APPLICATIONS[0] | null>(null);
  const s = S[lang];

  const QUICK_LABELS: { id: QuickF; label: string }[] = [
    { id: "all", label: s.all },
    { id: "today", label: s.today },
    { id: "quality", label: s.qualityCheck },
    { id: "weighing", label: s.weighing },
    { id: "procurement", label: s.procurement },
    { id: "completed", label: s.completed },
  ];

  const stageForQuick: Record<QuickF, string> = {
    all: "", today: "", quality: "Quality Check", weighing: "Weighing",
    procurement: "Procurement", completed: "Completed",
  };

  const filtered = APPLICATIONS.filter((a) => {
    const qs = stageForQuick[quickFilter];
    const matchQ = !qs || a.stage === qs;
    const matchS = !stageFilter || a.stage === stageFilter;
    return matchQ && matchS;
  });

  return (
    <div className="p-4 xl:p-6 space-y-4 max-w-[1280px] mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* Demo notice */}
      <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl px-4 py-2 flex items-start gap-2">
        <span className="text-sm flex-shrink-0 mt-0.5">⚠️</span>
        <p className="text-xs text-[#92400E]"><strong>SIH 2026 Prototype</strong> — {s.demoNote}</p>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-lg font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.title}</p>
          <p className="text-xs text-[#9CA3AF]">{s.subtitle}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#C8DFD0] bg-[#F5F9F6]">
            <select value={centre} onChange={(e) => setCentre(e.target.value)} className="text-xs font-semibold bg-transparent focus:outline-none text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>
              {["Centre A","Centre B","Centre C","Centre D","Centre E","Centre F"].map((c) => <option key={c}>Gwalior PC {c}</option>)}
            </select>
          </div>
          <span className="text-[10px] text-[#9CA3AF] hidden sm:block">{s.date}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {[
          { label: s.totalToday, value: "98", icon: "📋", color: "#1A7A3C", bg: "#E8F5EE", qf: "today" },
          { label: s.qualityCheck, value: "24", icon: "🔍", color: "#7C3AED", bg: "#F5F3FF", qf: "quality" },
          { label: s.weighing, value: "19", icon: "⚖️", color: "#E8960A", bg: "#FEF3C7", qf: "weighing" },
          { label: s.procInProgress, value: "11", icon: "⚡", color: "#2563EB", bg: "#EFF6FF", qf: "procurement" },
          { label: s.completed, value: "44", icon: "✅", color: "#1A7A3C", bg: "#E8F5EE", qf: "completed" },
          { label: s.paymentPending, value: "27", icon: "💰", color: "#C8332A", bg: "#FEF2F2", qf: "all" },
        ].map((k) => (
          <div key={k.label} className="bg-white rounded-xl border border-[#C8DFD0] p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setQuickFilter(k.qf as QuickF)}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: k.bg }}>{k.icon}</div>
              <span className="text-[9px] text-[#9CA3AF]">{s.demo}</span>
            </div>
            <p className="text-2xl font-bold mb-0.5" style={{ color: k.color, fontFamily: "Poppins, sans-serif" }}>{k.value}</p>
            <p className="text-[10px] text-[#6B7280]">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Procurement Pipeline */}
      <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.pipeline}</p>
            <p className="text-[10px] text-[#9CA3AF]">{s.pipelineSub}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {PIPELINE_STAGES.map((stage, i) => {
            const qfMap: Record<string, QuickF> = { application:"today", qualityCheck:"quality", weighing:"weighing", procurement:"procurement", completed:"completed" };
            const label = (s as Record<string, string>)[stage.key] ?? stage.key;
            const isActive = quickFilter === qfMap[stage.key];
            return (
              <div key={stage.key} className="flex items-center gap-2">
                <button
                  onClick={() => setQuickFilter(qfMap[stage.key] ?? "all")}
                  className={`flex flex-col items-center px-5 py-3.5 rounded-2xl border-2 transition-all hover:shadow-md ${isActive ? "shadow-md scale-105" : ""}`}
                  style={{ borderColor: isActive ? stage.color : "#C8DFD0", background: isActive ? stage.bg : "white" }}
                >
                  <p className="text-2xl font-bold mb-0.5" style={{ color: stage.color, fontFamily: "Poppins, sans-serif" }}>{stage.count}</p>
                  <p className="text-[10px] font-semibold text-[#6B7280] text-center whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>{label}</p>
                </button>
                {i < PIPELINE_STAGES.length - 1 && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-[#C8DFD0]">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main 2-col */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* Left: Table */}
        <div className="lg:col-span-2 space-y-3">
          {/* Filter chips */}
          <div className="flex gap-2 flex-wrap">
            {QUICK_LABELS.map((qf) => (
              <button
                key={qf.id}
                onClick={() => { setQuickFilter(qf.id); setPage(1); }}
                className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${quickFilter === qf.id ? "bg-[#1A2B4A] text-white border-[#1A2B4A]" : "text-[#6B7280] border-[#C8DFD0] bg-white hover:border-[#1A7A3C] hover:text-[#1A7A3C]"}`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >{qf.label}</button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-[#E8F5EE] flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.tableTitle}</p>
                <p className="text-[10px] text-[#9CA3AF]">{s.tableSub}</p>
              </div>
              <span className="text-[10px] font-bold text-[#1A7A3C] bg-[#E8F5EE] px-2.5 py-1 rounded-full">{filtered.length} {s.records}</span>
            </div>

            {filtered.length > 0 ? (
              <>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-[#F5F9F6]">
                        {[s.appID, s.farmer, s.crop, s.qty, s.centre, s.currentStage, s.statusCol, s.updated, s.action].map((h) => (
                          <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8F5EE]">
                      {filtered.map((app) => {
                        const sm = STAGE_M[app.stage] ?? { color: "#6B7280", bg: "#F3F4F6" };
                        const stm = STATUS_M[app.status] ?? { color: "#6B7280", bg: "#F3F4F6" };
                        return (
                          <tr key={app.id} className="hover:bg-[#F5F9F6] transition-colors cursor-pointer" onClick={() => setSelectedApp(app)}>
                            <td className="px-4 py-3 font-mono text-[10px] text-[#6B7280] whitespace-nowrap">{app.id}</td>
                            <td className="px-4 py-3 font-semibold text-[#1A2B4A] whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>{app.farmer}</td>
                            <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{app.crop}</td>
                            <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{app.qty}</td>
                            <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{app.centre}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: sm.color, background: sm.bg, fontFamily: "Poppins, sans-serif" }}>{app.stage}</span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: stm.color, background: stm.bg, fontFamily: "Poppins, sans-serif" }}>{app.status}</span>
                            </td>
                            <td className="px-4 py-3 text-[#9CA3AF] whitespace-nowrap text-[10px]">{app.updated}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <button onClick={(e) => { e.stopPropagation(); setSelectedApp(app); }} className="px-3 py-1.5 text-[10px] font-bold text-[#1A7A3C] border border-[#C8DFD0] rounded-lg hover:bg-[#E8F5EE] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>{s.view}</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {/* Mobile cards */}
                <div className="md:hidden divide-y divide-[#E8F5EE]">
                  {filtered.map((app) => {
                    const sm = STAGE_M[app.stage] ?? { color: "#6B7280", bg: "#F3F4F6" };
                    return (
                      <div key={app.id} className="p-4 hover:bg-[#F5F9F6] cursor-pointer" onClick={() => setSelectedApp(app)}>
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <div>
                            <p className="font-mono text-[9px] text-[#9CA3AF]">{app.id}</p>
                            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{app.farmer}</p>
                            <p className="text-[10px] text-[#9CA3AF]">{app.crop} · {app.qty} · {app.token}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1.5">
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ color: sm.color, background: sm.bg }}>{app.stage}</span>
                            <button onClick={(e) => { e.stopPropagation(); setSelectedApp(app); }} className="text-[10px] font-bold text-[#1A7A3C] border border-[#C8DFD0] rounded-lg px-2.5 py-1 hover:bg-[#E8F5EE]">{s.view}</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-14 text-center px-4">
                <div className="text-4xl mb-3">📦</div>
                <p className="text-sm font-bold text-[#1A2B4A] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{s.noRecords}</p>
                <p className="text-xs text-[#9CA3AF] mb-4">{s.noRecordsSub}</p>
                <button onClick={() => { setQuickFilter("all"); setStageFilter(""); }} className="px-4 py-2 text-xs font-semibold text-[#1A7A3C] border border-[#C8DFD0] rounded-xl hover:bg-[#E8F5EE]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.resetFilters}</button>
              </div>
            )}

            {filtered.length > 0 && (
              <div className="px-5 py-3 border-t border-[#E8F5EE] flex items-center justify-between gap-3 flex-wrap">
                <span className="text-xs text-[#9CA3AF]">{s.showing} 1–{filtered.length} {s.of} 98 {s.records}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1.5 text-[10px] font-semibold border border-[#C8DFD0] rounded-lg disabled:opacity-40 hover:bg-[#F5F9F6] text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.prev}</button>
                  {[1, 2, 3].map((p) => (
                    <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 text-xs font-bold rounded-lg ${page === p ? "bg-[#1A2B4A] text-white" : "text-[#6B7280] hover:bg-[#F5F9F6] border border-[#C8DFD0]"}`} style={{ fontFamily: "Poppins, sans-serif" }}>{p}</button>
                  ))}
                  <button onClick={() => setPage(Math.min(10, page + 1))} disabled={page === 10} className="px-3 py-1.5 text-[10px] font-semibold border border-[#C8DFD0] rounded-lg disabled:opacity-40 hover:bg-[#F5F9F6] text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.next}</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Analytics */}
        <div className="space-y-4">

          {/* Progress chart */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
            <p className="text-sm font-bold text-[#1A2B4A] mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>{s.analyticsTitle}</p>
            <p className="text-[10px] text-[#9CA3AF] mb-4">{s.analyticsSub}</p>
            <div className="space-y-3">
              {PIPELINE_STAGES.map((stage) => {
                const label = (s as Record<string, string>)[stage.key] ?? stage.key;
                const pct = (stage.count / 98) * 100;
                return (
                  <div key={stage.key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-[#6B7280]">{label}</span>
                      <span className="text-xs font-bold" style={{ color: stage.color, fontFamily: "Poppins, sans-serif" }}>{stage.count}</span>
                    </div>
                    <div className="h-2 bg-[#E8F5EE] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: stage.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Avg processing time chart */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
            <p className="text-sm font-bold text-[#1A2B4A] mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>{s.avgProcTitle}</p>
            <p className="text-[10px] text-[#9CA3AF] mb-4">{s.avgProcSub}</p>
            <div className="flex items-end gap-3 h-24 mb-2">
              {AVG_TIMES.map((item) => {
                const label = (s as Record<string, string>)[item.label] ?? item.label;
                const pct = (item.val / 5) * 100;
                return (
                  <div key={item.label} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[9px] font-bold" style={{ color: item.color }}>{item.val}{s.minLabel}</span>
                    <div className="w-full flex flex-col justify-end" style={{ height: "64px" }}>
                      <div className="w-full rounded-t-md" style={{ height: `${pct}%`, background: item.color, minHeight: 6 }} />
                    </div>
                    <span className="text-[8px] text-[#9CA3AF] text-center leading-tight">{label}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-[9px] text-[#9CA3AF] text-center pt-2 border-t border-[#E8F5EE]">{s.demo}</p>
          </div>

          {/* Filters card */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.filters}</p>
              <button onClick={() => setShowFilters(!showFilters)} className="text-[10px] font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                {showFilters ? "Hide" : "Show"}
              </button>
            </div>
            {showFilters && (
              <div className="space-y-2">
                {[
                  { label: s.centre, opts: ["All Centres","Centre A","Centre B","Centre C"] },
                  { label: s.currentStage, opts: ["All Stages","Quality Check","Weighing","Procurement","Completed"] },
                  { label: s.statusCol, opts: ["All Status","In Progress","Completed"] },
                  { label: "Date", opts: ["All Dates","Today","This Week"] },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-1">{f.label}</label>
                    <select className="w-full px-2.5 py-2 text-xs border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]">
                      {f.opts.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
                <div className="flex gap-2 pt-1">
                  <button className="flex-1 py-2 text-[10px] font-bold text-white bg-[#1A7A3C] rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>{s.applyFilters}</button>
                  <button onClick={() => { setQuickFilter("all"); setStageFilter(""); }} className="flex-1 py-2 text-[10px] font-bold text-[#6B7280] border border-[#C8DFD0] rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>{s.reset}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-2 border-t border-[#C8DFD0]">
        <p className="text-[10px] text-[#9CA3AF]">KisanQ Admin · SIH 2026 Prototype · Team Viksit Innovators · All procurement data is demo only</p>
      </div>

      {selectedApp && <ProcDrawer app={selectedApp} s={s} onClose={() => setSelectedApp(null)} />}
    </div>
  );
}
