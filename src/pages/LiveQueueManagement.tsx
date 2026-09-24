import { useState, useEffect, useRef } from "react";

type Lang = "en" | "hi";

const S = {
  en: {
    title: "Live Queue Management",
    subtitle: "Monitor and manage the current procurement queue.",
    lang: "हिन्दी",
    demo: "Demo data",
    demoNote: "All values are demo estimates — not connected to any real government system.",
    centreOpen: "Centre Open",
    lastUpdated: "Last updated: Just now",
    // KPIs
    currentQueue: "Current Queue",
    processingNow: "Processing Now",
    avgProcessing: "Avg Processing",
    estQueueWait: "Est. Queue Wait",
    centreCapacity: "Centre Capacity",
    // Now processing card
    nowProcessing: "NOW PROCESSING",
    farmerLabel: "Farmer",
    stage: "Stage",
    started: "Started",
    estCompletion: "Est. Completion",
    markCompleted: "Mark Completed",
    openDetails: "Open Details",
    // Queue timeline
    next: "Next",
    waiting: "Waiting",
    farmerToken: "Farmer's Token",
    inProgress: "In Progress",
    completed: "Completed",
    // Queue controls
    startNext: "Start Next Token",
    markDone: "Mark Current Completed",
    pauseQueue: "Pause Queue",
    resumeQueue: "Resume Queue",
    refreshQueue: "Refresh Queue",
    queuePaused: "Queue Paused",
    // Pause modal
    pauseTitle: "Pause Queue?",
    pauseMsg: "This will pause queue progression in this demo. It does not affect any real government system.",
    pauseNote: "Demo only — no real action will be taken.",
    confirm: "Confirm Pause",
    cancel: "Cancel",
    // Table
    queueTable: "Queue Overview",
    tableSub: "Current waiting list · Demo data",
    position: "Position",
    token: "Token",
    farmer: "Farmer",
    slotCol: "Slot",
    stageCol: "Stage",
    waitTime: "Wait Time",
    statusCol: "Status",
    action: "Action",
    view: "View",
    processing: "Processing",
    // Analytics
    analyticsTitle: "Queue Performance",
    analyticsSub: "Today's queue summary · Demo data",
    avgProcTime: "Avg Processing Time",
    completedToday: "Completed Today",
    currentlyWaiting: "Currently Waiting",
    peakQueue: "Peak Queue Today",
    avgWaiting: "Avg Waiting Time",
    chartTitle: "Queue Size — Today",
    chartSub: "Hourly snapshot · Demo data",
    // Status
    centreNormal: "Centre operating normally.",
    // Farmer notifications
    notifTitle: "Farmer Notifications",
    notifSub: "Real-time update insight · Demo",
    waiting18: "farmers currently waiting",
    eta12: "farmers have received updated ETA",
    arriving6: "farmers are approaching recommended arrival time",
    viewNotif: "View Notifications",
    // Token detail panel
    tokenDetails: "Token Details",
    position2: "Position",
    estWait: "Estimated Wait",
    viewFarmer: "View Farmer",
    viewApp: "View Application",
    close: "Close",
    // Quality check stages
    qualityCheck: "Quality Check",
    weighing: "Weighing",
    min: "min",
  },
  hi: {
    title: "लाइव कतार प्रबंधन",
    subtitle: "वर्तमान खरीद कतार की निगरानी और प्रबंधन करें।",
    lang: "English",
    demo: "डेमो डेटा",
    demoNote: "सभी मान डेमो अनुमान हैं — किसी सरकारी प्रणाली से जुड़े नहीं हैं।",
    centreOpen: "केंद्र खुला",
    lastUpdated: "अंतिम अपडेट: अभी अभी",
    currentQueue: "वर्तमान कतार",
    processingNow: "अभी प्रक्रिया में",
    avgProcessing: "औसत प्रक्रिया",
    estQueueWait: "अनुमानित प्रतीक्षा समय",
    centreCapacity: "केंद्र क्षमता",
    nowProcessing: "अभी प्रक्रिया में",
    farmerLabel: "किसान",
    stage: "चरण",
    started: "शुरू",
    estCompletion: "अनुमानित समाप्ति",
    markCompleted: "पूर्ण चिह्नित करें",
    openDetails: "विवरण खोलें",
    next: "अगला",
    waiting: "प्रतीक्षा में",
    farmerToken: "किसान का टोकन",
    inProgress: "प्रक्रिया में",
    completed: "पूर्ण",
    startNext: "अगला टोकन शुरू करें",
    markDone: "वर्तमान पूर्ण करें",
    pauseQueue: "कतार रोकें",
    resumeQueue: "कतार फिर शुरू करें",
    refreshQueue: "कतार रीफ्रेश करें",
    queuePaused: "कतार रुकी हुई है",
    pauseTitle: "कतार रोकें?",
    pauseMsg: "यह डेमो में कतार को रोक देगा। यह किसी सरकारी प्रणाली को प्रभावित नहीं करता।",
    pauseNote: "केवल डेमो — कोई वास्तविक कार्रवाई नहीं होगी।",
    confirm: "रोकने की पुष्टि करें",
    cancel: "रद्द करें",
    queueTable: "कतार अवलोकन",
    tableSub: "वर्तमान प्रतीक्षा सूची · डेमो डेटा",
    position: "स्थान",
    token: "टोकन",
    farmer: "किसान",
    slotCol: "स्लॉट",
    stageCol: "चरण",
    waitTime: "प्रतीक्षा समय",
    statusCol: "स्थिति",
    action: "क्रिया",
    view: "देखें",
    processing: "प्रक्रिया में",
    analyticsTitle: "कतार प्रदर्शन",
    analyticsSub: "आज का कतार सारांश · डेमो डेटा",
    avgProcTime: "औसत प्रक्रिया समय",
    completedToday: "आज पूर्ण",
    currentlyWaiting: "अभी प्रतीक्षा में",
    peakQueue: "आज की अधिकतम कतार",
    avgWaiting: "औसत प्रतीक्षा समय",
    chartTitle: "कतार आकार — आज",
    chartSub: "प्रति घंटा स्नैपशॉट · डेमो डेटा",
    centreNormal: "केंद्र सामान्य रूप से चल रहा है।",
    notifTitle: "किसान सूचनाएं",
    notifSub: "रियल-टाइम अपडेट · डेमो",
    waiting18: "किसान वर्तमान में प्रतीक्षा में",
    eta12: "किसानों को अपडेटेड ETA मिला",
    arriving6: "किसान अपने अनुशंसित आगमन समय के करीब",
    viewNotif: "सूचनाएं देखें",
    tokenDetails: "टोकन विवरण",
    position2: "स्थान",
    estWait: "अनुमानित प्रतीक्षा",
    viewFarmer: "किसान देखें",
    viewApp: "आवेदन देखें",
    close: "बंद करें",
    qualityCheck: "गुणवत्ता जांच",
    weighing: "तुलाई",
    min: "मिनट",
  },
};

// ─── Demo queue data ────────────────────────────────────────────────────────────
const BASE_QUEUE = [
  { token: "Q-018", farmer: "Ramesh Kumar", slot: "10:30 AM", stage: "qualityCheck", waitLabel: "Processing", status: "in_progress" as const },
  { token: "Q-019", farmer: "Suresh Patel", slot: "10:30 AM", stage: "waiting", waitLabel: "~3 min", status: "waiting" as const },
  { token: "Q-020", farmer: "Amit Sharma", slot: "10:30 AM", stage: "waiting", waitLabel: "~6 min", status: "waiting" as const },
  { token: "Q-021", farmer: "Mohan Singh", slot: "10:30 AM", stage: "waiting", waitLabel: "~9 min", status: "waiting" as const },
  { token: "Q-022", farmer: "Priya Devi", slot: "11:30 AM", stage: "waiting", waitLabel: "~12 min", status: "waiting" as const },
  { token: "Q-023", farmer: "Dinesh Yadav", slot: "11:30 AM", stage: "waiting", waitLabel: "~15 min", status: "waiting" as const },
  { token: "Q-024", farmer: "Kavita Bai", slot: "11:30 AM", stage: "waiting", waitLabel: "~18 min", status: "farmer_token" as const },
];

const HOURLY_QUEUE = [
  { hour: "9AM", val: 12 }, { hour: "10AM", val: 22 }, { hour: "11AM", val: 31 },
  { hour: "12PM", val: 28 }, { hour: "1PM", val: 18 }, { hour: "2PM", val: 14 },
  { hour: "3PM", val: 8 },
];

const CENTRES = ["Centre A", "Centre B", "Centre C", "Centre D", "Centre E", "Centre F"];

// ─── Bar chart ─────────────────────────────────────────────────────────────────
function QueueChart({ s }: { s: typeof S["en"] }) {
  const maxVal = Math.max(...HOURLY_QUEUE.map((d) => d.val));
  const currentHour = 2; // 11AM is "now"
  return (
    <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
      <p className="text-sm font-bold text-[#1A2B4A] mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>{s.chartTitle}</p>
      <p className="text-[10px] text-[#9CA3AF] mb-4">{s.chartSub}</p>
      <div className="flex items-end gap-2 h-28">
        {HOURLY_QUEUE.map((d, i) => {
          const pct = (d.val / maxVal) * 100;
          const isCurrent = i === currentHour;
          return (
            <div key={d.hour} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] text-[#6B7280] font-medium">{d.val}</span>
              <div className="w-full flex flex-col justify-end" style={{ height: "80px" }}>
                <div
                  className="w-full rounded-t-md"
                  style={{
                    height: `${pct}%`,
                    background: isCurrent
                      ? "linear-gradient(180deg,#1A7A3C,#2E9952)"
                      : i < currentHour ? "#C8DFD0" : "#E8F5EE",
                    minHeight: 4,
                  }}
                />
              </div>
              <span className={`text-[9px] font-semibold ${isCurrent ? "text-[#1A7A3C]" : "text-[#9CA3AF]"}`}>{d.hour}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#E8F5EE]">
        {[{ color: "linear-gradient(180deg,#1A7A3C,#2E9952)", label: "Current hour" }, { color: "#C8DFD0", label: "Past" }, { color: "#E8F5EE", label: "Upcoming" }].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: l.color }} />
            <span className="text-[9px] text-[#9CA3AF]">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Token Detail Panel ────────────────────────────────────────────────────────
function TokenPanel({
  row,
  pos,
  s,
  onClose,
}: {
  row: typeof BASE_QUEUE[0];
  pos: number;
  s: typeof S["en"];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="w-80 bg-white h-full overflow-y-auto shadow-2xl flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="sticky top-0 bg-white border-b border-[#C8DFD0] px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.tokenDetails}</p>
            <p className="text-[10px] text-[#9CA3AF]">Demo data</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="p-5 space-y-4">
          {/* Token hero */}
          <div className="bg-gradient-to-br from-[#1A2B4A] to-[#0F1E35] rounded-2xl p-5 text-center">
            <p className="text-[10px] text-white/50 mb-1 uppercase tracking-widest">{s.token}</p>
            <p className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>{row.token}</p>
            <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${row.status === "in_progress" ? "bg-[#1A7A3C] text-white" : "bg-[#FEF3C7] text-[#E8960A]"}`}>
              {row.status === "in_progress" ? s.inProgress : s.waiting}
            </span>
          </div>
          {/* Info grid */}
          <div className="bg-[#F5F9F6] rounded-2xl p-4 space-y-3">
            {[
              { label: s.farmerLabel, val: row.farmer },
              { label: s.slotCol, val: `${row.slot} – ${row.slot.includes("AM") ? "11:00 AM" : "12:00 PM"}` },
              { label: s.position2, val: `${pos}` },
              { label: s.stageCol, val: row.stage === "qualityCheck" ? s.qualityCheck : s.waiting },
              { label: s.estWait, val: row.waitLabel },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-[10px] text-[#9CA3AF]">{item.label}</span>
                <span className="text-xs font-semibold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{item.val}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <button className="w-full py-2.5 text-xs font-bold text-[#1A7A3C] border border-[#C8DFD0] rounded-xl hover:bg-[#E8F5EE] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
              {s.viewFarmer}
            </button>
            <button className="w-full py-2.5 text-xs font-bold text-white bg-[#1A2B4A] rounded-xl hover:bg-[#0F1E35] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
              {s.viewApp}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Pause Modal ───────────────────────────────────────────────────────────────
function PauseModal({ s, onConfirm, onCancel }: { s: typeof S["en"]; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-[#C8DFD0] p-6" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center text-xl flex-shrink-0">⏸️</div>
          <div>
            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.pauseTitle}</p>
          </div>
        </div>
        <p className="text-xs text-[#6B7280] mb-2 leading-relaxed">{s.pauseMsg}</p>
        <p className="text-[9px] text-[#9CA3AF] bg-[#F5F9F6] rounded-xl p-3 mb-5">{s.pauseNote}</p>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 py-2.5 text-sm font-semibold text-[#6B7280] border border-[#C8DFD0] rounded-xl hover:bg-[#F5F9F6] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>{s.cancel}</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#E8960A] rounded-xl hover:opacity-80 transition-opacity" style={{ fontFamily: "Poppins, sans-serif" }}>{s.confirm}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function LiveQueueManagement({ lang: initLang = "en" }: { lang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initLang);
  const [centre, setCentre] = useState("Centre B");
  const [queueOffset, setQueueOffset] = useState(0); // how many tokens have been completed
  const [paused, setPaused] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedToken, setSelectedToken] = useState<{ row: typeof BASE_QUEUE[0]; pos: number } | null>(null);
  const [showCurrentDetails, setShowCurrentDetails] = useState(false);

  const s = S[lang];

  // Current queue = BASE_QUEUE shifted by offset, excluding completed
  const queue = BASE_QUEUE.slice(queueOffset);
  const currentItem = queue[0];
  const nextItems = queue.slice(1);
  const queueSize = Math.max(0, 18 - queueOffset);
  const estWait = Math.max(0, 54 - queueOffset * 3);

  const handleMarkCompleted = () => {
    if (queueOffset < BASE_QUEUE.length - 1) setQueueOffset((o) => o + 1);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 900);
  };

  const handlePauseConfirm = () => { setPaused(true); setShowPauseModal(false); };

  // Token colour/label helpers
  const tokenStyle = (status: string) => {
    if (status === "in_progress") return { color: "#1A7A3C", bg: "#E8F5EE", label: s.inProgress };
    if (status === "farmer_token") return { color: "#2563EB", bg: "#EFF6FF", label: s.farmerToken };
    return { color: "#E8960A", bg: "#FEF3C7", label: s.waiting };
  };

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
        </div>
      </div>

      {/* Centre selector + status bar */}
      <div className="bg-white rounded-2xl border border-[#C8DFD0] px-4 py-3 shadow-sm flex flex-wrap items-center gap-3 justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={centre}
            onChange={(e) => setCentre(e.target.value)}
            className="px-3 py-2 text-sm font-semibold border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {CENTRES.map((c) => <option key={c}>Gwalior Procurement {c}</option>)}
          </select>
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${paused ? "bg-[#E8960A]" : "bg-[#22C55E] animate-pulse"}`} />
            <span className={`text-xs font-bold ${paused ? "text-[#E8960A]" : "text-[#1A7A3C]"}`} style={{ fontFamily: "Poppins, sans-serif" }}>
              {paused ? s.queuePaused : s.centreOpen}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-[#9CA3AF]">{s.lastUpdated}</span>
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-lg border border-[#C8DFD0] hover:bg-[#F5F9F6] transition-colors text-[#6B7280] ${isRefreshing ? "animate-spin" : ""}`}
            title={s.refreshQueue}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12 7A5 5 0 112 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M12 3v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {[
          { label: s.currentQueue, value: `${queueSize}`, icon: "👥", color: "#1A7A3C", bg: "#E8F5EE" },
          { label: s.processingNow, value: currentItem?.token ?? "—", icon: "⚡", color: "#2563EB", bg: "#EFF6FF" },
          { label: s.avgProcessing, value: `3 ${s.min}`, icon: "⏱️", color: "#7C3AED", bg: "#F5F3FF" },
          { label: s.estQueueWait, value: `~${estWait} ${s.min}`, icon: "🕐", color: "#E8960A", bg: "#FEF3C7" },
          { label: s.centreCapacity, value: "36%", icon: "📊", color: "#1A7A3C", bg: "#E8F5EE" },
        ].map((k) => (
          <div key={k.label} className="bg-white rounded-xl border border-[#C8DFD0] p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: k.bg }}>{k.icon}</div>
              <span className="text-[9px] text-[#9CA3AF]">{s.demo}</span>
            </div>
            <p className="text-xl font-bold mb-0.5" style={{ color: k.color, fontFamily: "Poppins, sans-serif" }}>{k.value}</p>
            <p className="text-[10px] text-[#6B7280]">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Main 2-col layout */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* Left col: NOW PROCESSING + Queue timeline */}
        <div className="lg:col-span-2 space-y-4">

          {/* Queue Controls */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4 shadow-sm">
            <p className="text-xs font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>Queue Controls</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleMarkCompleted}
                disabled={paused || !currentItem}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#1A7A3C] rounded-xl hover:bg-[#145F2F] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="white" strokeWidth="1.3" /><path d="M4 6.5l2 2 3-3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {s.markDone}
              </button>
              <button
                onClick={handleMarkCompleted}
                disabled={paused || !nextItems[0]}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#2563EB] border border-[#BFDBFE] bg-[#EFF6FF] rounded-xl hover:bg-[#DBEAFE] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 6.5h8M7.5 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {s.startNext}
              </button>
              {!paused ? (
                <button
                  onClick={() => setShowPauseModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#E8960A] border border-[#FDE68A] bg-[#FEF3C7] rounded-xl hover:bg-[#FDE68A] transition-colors"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="2" y="2" width="3" height="8" rx="1" fill="currentColor" /><rect x="7" y="2" width="3" height="8" rx="1" fill="currentColor" /></svg>
                  {s.pauseQueue}
                </button>
              ) : (
                <button
                  onClick={() => setPaused(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#1A7A3C] border border-[#C8DFD0] bg-[#E8F5EE] rounded-xl hover:bg-[#D1FAE5] transition-colors"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 2l7 4-7 4V2z" fill="currentColor" /></svg>
                  {s.resumeQueue}
                </button>
              )}
              <button onClick={handleRefresh} className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#6B7280] border border-[#C8DFD0] rounded-xl hover:bg-[#F5F9F6] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
                {s.refreshQueue}
              </button>
            </div>
            {paused && (
              <div className="mt-3 bg-[#FEF3C7] border border-[#FDE68A] rounded-xl px-3 py-2 flex items-center gap-2">
                <span className="text-sm">⏸️</span>
                <p className="text-xs text-[#E8960A] font-semibold">{s.queuePaused} — Demo only</p>
              </div>
            )}
          </div>

          {/* NOW PROCESSING */}
          {currentItem ? (
            <div className="bg-gradient-to-br from-[#1A2B4A] to-[#0F1E35] rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{s.nowProcessing}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-5">
                <div className="flex-shrink-0">
                  <p className="text-6xl font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>{currentItem.token}</p>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-3">
                  {[
                    { label: s.farmerLabel, val: currentItem.farmer },
                    { label: s.stage, val: s.qualityCheck },
                    { label: s.started, val: "10:42 AM" },
                    { label: s.estCompletion, val: "10:45 AM" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[9px] text-white/40 mb-0.5">{item.label}</p>
                      <p className="text-sm font-semibold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleMarkCompleted}
                  disabled={paused}
                  className="flex-1 py-2.5 text-sm font-bold text-[#1A7A3C] bg-white rounded-xl hover:bg-[#E8F5EE] disabled:opacity-40 transition-colors"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  ✓ {s.markCompleted}
                </button>
                <button
                  onClick={() => setShowCurrentDetails(true)}
                  className="flex-1 py-2.5 text-sm font-bold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-colors"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {s.openDetails}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#F5F9F6] rounded-2xl border border-[#C8DFD0] p-8 text-center">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>Queue cleared</p>
              <p className="text-xs text-[#9CA3AF]">All demo tokens processed.</p>
            </div>
          )}

          {/* Queue timeline */}
          {queue.length > 1 && (
            <div className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-[#E8F5EE]">
                <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>Upcoming Tokens</p>
              </div>
              <div className="divide-y divide-[#E8F5EE]">
                {queue.slice(1, 7).map((item, i) => {
                  const st = tokenStyle(item.status);
                  const isFarmer = item.status === "farmer_token";
                  return (
                    <div key={item.token} className={`flex items-center gap-3 px-4 py-3 ${isFarmer ? "bg-[#EFF6FF]" : "hover:bg-[#F5F9F6]"} transition-colors`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${isFarmer ? "bg-[#2563EB] text-white" : "bg-[#F5F9F6] text-[#6B7280]"}`} style={{ fontFamily: "Poppins, sans-serif" }}>
                        {i + 2}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{item.token}</p>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ color: st.color, background: st.bg, fontFamily: "Poppins, sans-serif" }}>
                            {i === 0 ? s.next : st.label}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#9CA3AF]">{item.farmer} · {item.slot}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: "Poppins, sans-serif" }}>{item.waitLabel}</p>
                        <button
                          onClick={() => setSelectedToken({ row: item, pos: i + 2 })}
                          className="text-[9px] font-semibold text-[#1A7A3C] hover:underline"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {s.view}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Queue Table */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E8F5EE] flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.queueTable}</p>
                <p className="text-[10px] text-[#9CA3AF]">{s.tableSub}</p>
              </div>
              <span className="text-[10px] font-bold text-[#1A7A3C] bg-[#E8F5EE] px-2.5 py-1 rounded-full">{queue.length} in queue</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F5F9F6]">
                    {[s.position, s.token, s.farmer, s.slotCol, s.stageCol, s.waitTime, s.statusCol, s.action].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8F5EE]">
                  {queue.slice(0, 6).map((row, i) => {
                    const isFirst = i === 0;
                    const isFarmer = row.status === "farmer_token";
                    return (
                      <tr key={row.token} className={`transition-colors cursor-pointer ${isFarmer ? "bg-[#EFF6FF]" : isFirst ? "bg-[#E8F5EE]" : "hover:bg-[#F5F9F6]"}`}>
                        <td className="px-4 py-3 font-bold text-[#1A2B4A] whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>#{i + 1}</td>
                        <td className="px-4 py-3 font-mono text-[11px] font-bold text-[#1A7A3C] whitespace-nowrap">{row.token}</td>
                        <td className="px-4 py-3 font-semibold text-[#1A2B4A] whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>{row.farmer}</td>
                        <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{row.slot}</td>
                        <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{isFirst ? s.qualityCheck : "—"}</td>
                        <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{row.waitLabel}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                            style={{
                              color: isFirst ? "#1A7A3C" : isFarmer ? "#2563EB" : "#E8960A",
                              background: isFirst ? "#E8F5EE" : isFarmer ? "#EFF6FF" : "#FEF3C7",
                              fontFamily: "Poppins, sans-serif",
                            }}
                          >
                            {isFirst ? s.inProgress : isFarmer ? s.farmerToken : s.waiting}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedToken({ row, pos: i + 1 })}
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
          </div>
        </div>

        {/* Right col: Analytics + Notifications */}
        <div className="space-y-4">

          {/* Centre status */}
          <div className="bg-[#E8F5EE] border border-[#C8DFD0] rounded-2xl px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1A7A3C] flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.centreNormal}</p>
              <p className="text-[9px] text-[#6B7280]">Centre B · 36% capacity · Demo</p>
            </div>
          </div>

          {/* Queue Performance */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-[#E8F5EE]">
              <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.analyticsTitle}</p>
              <p className="text-[10px] text-[#9CA3AF]">{s.analyticsSub}</p>
            </div>
            <div className="p-4 space-y-3">
              {[
                { label: s.avgProcTime, val: `3 ${s.min}`, color: "#7C3AED" },
                { label: s.completedToday, val: `${19 + queueOffset}`, color: "#1A7A3C" },
                { label: s.currentlyWaiting, val: `${queueSize}`, color: "#E8960A" },
                { label: s.peakQueue, val: "31", color: "#C8332A" },
                { label: s.avgWaiting, val: `~47 ${s.min}`, color: "#6B7280" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-[#E8F5EE] last:border-0">
                  <span className="text-[10px] text-[#6B7280]">{item.label}</span>
                  <span className="text-sm font-bold" style={{ color: item.color, fontFamily: "Poppins, sans-serif" }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Queue chart */}
          <QueueChart s={s} />

          {/* Farmer Notifications insight */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-[#E8F5EE]">
              <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.notifTitle}</p>
              <p className="text-[10px] text-[#9CA3AF]">{s.notifSub}</p>
            </div>
            <div className="p-4 space-y-3">
              {[
                { count: queueSize, text: s.waiting18, color: "#E8960A", bg: "#FEF3C7" },
                { count: 12, text: s.eta12, color: "#2563EB", bg: "#EFF6FF" },
                { count: 6, text: s.arriving6, color: "#1A7A3C", bg: "#E8F5EE" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ color: item.color, background: item.bg, fontFamily: "Poppins, sans-serif" }}>
                    {item.count}
                  </div>
                  <p className="text-[10px] text-[#6B7280] leading-relaxed">{item.text}</p>
                </div>
              ))}
              <button className="w-full mt-2 py-2 text-xs font-semibold text-[#1A7A3C] border border-[#C8DFD0] rounded-xl hover:bg-[#E8F5EE] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
                {s.viewNotif} →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-2 border-t border-[#C8DFD0]">
        <p className="text-[10px] text-[#9CA3AF]">KisanQ Admin · SIH 2026 Prototype · Team Viksit Innovators · All queue data is demo only — times are estimates</p>
      </div>

      {/* Modals & panels */}
      {showPauseModal && (
        <PauseModal s={s} onConfirm={handlePauseConfirm} onCancel={() => setShowPauseModal(false)} />
      )}
      {selectedToken && (
        <TokenPanel row={selectedToken.row} pos={selectedToken.pos} s={s} onClose={() => setSelectedToken(null)} />
      )}
      {showCurrentDetails && currentItem && (
        <TokenPanel row={currentItem} pos={1} s={s} onClose={() => setShowCurrentDetails(false)} />
      )}
    </div>
  );
}
