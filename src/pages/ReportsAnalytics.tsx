import { useState } from "react";

type Lang = "en" | "hi";
type DateF = "today" | "week" | "month" | "custom";
type ReportType = "daily" | "weekly" | "monthly" | "centre" | "procurement" | "payment";

const S = {
  en: {
    title: "Reports & Analytics",
    subtitle: "Understand procurement operations and centre performance.",
    lang: "हिन्दी",
    demoNote: "All analytics are based on demo/prototype data only — not connected to any real government database or system. These numbers do not represent actual government procurement statistics.",
    demo: "Demo Data",
    // Date filters
    today: "Today", week: "Last 7 Days", month: "Last 30 Days", custom: "Custom Range",
    // Centre filter
    allCentres: "All Centres",
    // KPIs
    regFarmers: "Registered Farmers", applications: "Applications",
    completedProc: "Completed Procurement", avgProcessing: "Avg Processing Time",
    slotUtil: "Slot Utilization", paymentPending: "Payment Pending",
    // Charts
    dailyApps: "Daily Applications", appPerDay: "Applications per day",
    centreUtil: "Centre Utilization", procStages: "Procurement Stage Distribution",
    avgTime: "Average Processing Time", demoStats: "Demo statistics",
    queueTrend: "Queue Trend", peakInsight: "Peak queue observed around 11:00 AM.",
    peakNote: "Based on prototype demo data.",
    slotAnalytics: "Slot Analytics",
    morningSlots: "Morning Slots", afternoonSlots: "Afternoon Slots",
    mostBooked: "Most Booked Slot", availCap: "Available Capacity",
    payAnalytics: "Payment Status", viewPayRecords: "View Payment Records",
    processed: "Processed", pending: "Pending", underReview: "Under Review", failed: "Failed",
    // Centre table
    centreComp: "Centre Comparison",
    centreCol: "Centre", appsCol: "Applications", queueCol: "Queue",
    utilCol: "Utilization", avgProcCol: "Avg Processing", statusCol: "Status",
    highLoad: "High Load", normal: "Normal", moderate: "Moderate",
    // Insights
    insightsTitle: "Prototype Data Insights",
    insightNote: "These insights are based on demo data only and should not be used for operational decisions.",
    i1: "Centre A has the highest demo utilization at 89%.",
    i2: "Centre B currently shows lower demo queue waiting (~54 min).",
    i3: "10:30 AM is the most booked demo slot today.",
    // Reports
    reportTypes: "Report Types",
    rDaily: "Daily Report", rWeekly: "Weekly Report", rMonthly: "Monthly Report",
    rCentre: "Centre Performance", rProcurement: "Procurement Report", rPayment: "Payment Report",
    // Export
    exportReport: "Export Report", downloadPDF: "Download PDF", downloadCSV: "Download CSV",
    exportTitle: "Export Demo Report",
    exportNote: "This is a prototype export. No real report data will be generated or transmitted.",
    exportCancel: "Cancel",
    exportConfirm: "Confirm Demo Export",
    exportSuccess: "Export Simulated (Demo)",
    exportSuccessNote: "No real data was exported.",
    min: "min",
  },
  hi: {
    title: "रिपोर्ट और विश्लेषण",
    subtitle: "खरीद संचालन और केंद्र प्रदर्शन को समझें।",
    lang: "English",
    demoNote: "सभी विश्लेषण केवल डेमो/प्रोटोटाइप डेटा पर आधारित हैं — किसी वास्तविक सरकारी डेटाबेस या प्रणाली से जुड़े नहीं हैं।",
    demo: "डेमो डेटा",
    today: "आज", week: "पिछले 7 दिन", month: "पिछले 30 दिन", custom: "कस्टम",
    allCentres: "सभी केंद्र",
    regFarmers: "पंजीकृत किसान", applications: "आवेदन",
    completedProc: "पूर्ण खरीद", avgProcessing: "औसत प्रक्रिया समय",
    slotUtil: "स्लॉट उपयोग", paymentPending: "भुगतान लंबित",
    dailyApps: "दैनिक आवेदन", appPerDay: "प्रति दिन आवेदन",
    centreUtil: "केंद्र उपयोग", procStages: "खरीद चरण वितरण",
    avgTime: "औसत प्रक्रिया समय", demoStats: "डेमो आंकड़े",
    queueTrend: "कतार रुझान", peakInsight: "सर्वाधिक कतार 11:00 AM के आसपास देखी गई।",
    peakNote: "प्रोटोटाइप डेमो डेटा पर आधारित।",
    slotAnalytics: "स्लॉट विश्लेषण",
    morningSlots: "सुबह के स्लॉट", afternoonSlots: "दोपहर के स्लॉट",
    mostBooked: "सर्वाधिक बुक स्लॉट", availCap: "उपलब्ध क्षमता",
    payAnalytics: "भुगतान स्थिति", viewPayRecords: "भुगतान रिकॉर्ड देखें",
    processed: "संसाधित", pending: "लंबित", underReview: "समीक्षाधीन", failed: "असफल",
    centreComp: "केंद्र तुलना",
    centreCol: "केंद्र", appsCol: "आवेदन", queueCol: "कतार",
    utilCol: "उपयोग", avgProcCol: "औसत प्रक्रिया", statusCol: "स्थिति",
    highLoad: "उच्च लोड", normal: "सामान्य", moderate: "मध्यम",
    insightsTitle: "प्रोटोटाइप डेटा अंतर्दृष्टि",
    insightNote: "ये अंतर्दृष्टि केवल डेमो डेटा पर आधारित हैं।",
    i1: "Centre A का डेमो उपयोग सबसे अधिक 89% है।",
    i2: "Centre B में वर्तमान में कम डेमो कतार प्रतीक्षा (~54 मिनट) है।",
    i3: "आज 10:30 AM सबसे अधिक बुक किया गया डेमो स्लॉट है।",
    reportTypes: "रिपोर्ट प्रकार",
    rDaily: "दैनिक रिपोर्ट", rWeekly: "साप्ताहिक रिपोर्ट", rMonthly: "मासिक रिपोर्ट",
    rCentre: "केंद्र प्रदर्शन", rProcurement: "खरीद रिपोर्ट", rPayment: "भुगतान रिपोर्ट",
    exportReport: "रिपोर्ट निर्यात करें", downloadPDF: "PDF डाउनलोड", downloadCSV: "CSV डाउनलोड",
    exportTitle: "डेमो रिपोर्ट निर्यात करें",
    exportNote: "यह एक प्रोटोटाइप निर्यात है। कोई वास्तविक डेटा उत्पन्न या प्रेषित नहीं किया जाएगा।",
    exportCancel: "रद्द करें",
    exportConfirm: "डेमो निर्यात पुष्टि",
    exportSuccess: "निर्यात सिम्युलेटेड (डेमो)",
    exportSuccessNote: "कोई वास्तविक डेटा निर्यात नहीं किया गया।",
    min: "मिनट",
  },
};

// ─── Static data ───────────────────────────────────────────────────────────────
const DAILY_APPS = [
  { day: "Mon", val: 18 }, { day: "Tue", val: 24 }, { day: "Wed", val: 21 },
  { day: "Thu", val: 31 }, { day: "Fri", val: 28 }, { day: "Sat", val: 35 },
  { day: "Sun", val: 27 },
];
const CENTRES_UTIL = [
  { name: "Centre A", util: 89, status: "highLoad",  apps: 52, queue: 62, avgProc: "4" },
  { name: "Centre B", util: 36, status: "normal",    apps: 42, queue: 18, avgProc: "3" },
  { name: "Centre C", util: 68, status: "moderate",  apps: 38, queue: 41, avgProc: "4" },
  { name: "Centre D", util: 52, status: "normal",    apps: 21, queue: 20, avgProc: "3" },
  { name: "Centre E", util: 44, status: "normal",    apps: 16, queue: 14, avgProc: "3" },
  { name: "Centre F", util: 71, status: "moderate",  apps: 15, queue: 32, avgProc: "4" },
];
const PROC_STAGES = [
  { label: "Submitted",     count: 42, color: "#6B7280" },
  { label: "Quality Check", count: 24, color: "#7C3AED" },
  { label: "Weighing",      count: 19, color: "#E8960A" },
  { label: "Procurement",   count: 11, color: "#2563EB" },
  { label: "Completed",     count: 98, color: "#1A7A3C" },
];
const AVG_TIMES = [
  { label: "Quality Check", val: 5, color: "#7C3AED" },
  { label: "Weighing",      val: 3, color: "#E8960A" },
  { label: "Procurement",   val: 4, color: "#2563EB" },
  { label: "Total Avg",     val: 12, color: "#1A2B4A" },
];
const QUEUE_TREND = [
  { t: "9AM", v: 12 }, { t: "10AM", v: 18 }, { t: "11AM", v: 24 },
  { t: "12PM", v: 19 }, { t: "1PM", v: 15 }, { t: "2PM", v: 10 },
];
const PAY_DATA = [
  { label: "processed", count: 71, color: "#1A7A3C", bg: "#E8F5EE" },
  { label: "pending",   count: 27, color: "#E8960A", bg: "#FEF3C7" },
  { label: "underReview", count: 6, color: "#7C3AED", bg: "#F5F3FF" },
  { label: "failed",    count: 2,  color: "#C8332A", bg: "#FEF2F2" },
];

const STATUS_STYLE: Record<string, { color: string; bg: string }> = {
  highLoad: { color: "#C8332A", bg: "#FEF2F2" },
  normal:   { color: "#1A7A3C", bg: "#E8F5EE" },
  moderate: { color: "#E8960A", bg: "#FEF3C7" },
};

const UTIL_COLOR = (u: number) => u >= 80 ? "#C8332A" : u >= 60 ? "#E8960A" : "#1A7A3C";

// ─── Export Modal ──────────────────────────────────────────────────────────────
function ExportModal({ s, format, onClose }: { s: typeof S["en"]; format: string; onClose: () => void }) {
  const [success, setSuccess] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-[#C8DFD0]" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8F5EE]">
          <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.exportTitle}</p>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
        {success ? (
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#E8F5EE] flex items-center justify-center text-2xl mb-3">📄</div>
            <p className="text-sm font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.exportSuccess}</p>
            <p className="text-xs text-[#9CA3AF] mt-1">{s.exportSuccessNote}</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div className="bg-[#F5F9F6] rounded-xl p-3 text-xs text-[#6B7280] font-mono">Format: {format} · Demo Data Only</div>
            <p className="text-xs text-[#6B7280] leading-relaxed">{s.exportNote}</p>
            <div className="flex gap-2 pt-1">
              <button onClick={onClose} className="flex-1 py-2.5 text-sm font-semibold text-[#6B7280] border border-[#C8DFD0] rounded-xl hover:bg-[#F5F9F6]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.exportCancel}</button>
              <button onClick={() => { setSuccess(true); setTimeout(onClose, 1200); }} className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>{s.exportConfirm}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SVG Line Chart ────────────────────────────────────────────────────────────
function LineChart({ data, color = "#1A7A3C" }: { data: { t: string; v: number }[]; color?: string }) {
  const W = 300; const H = 80; const pad = 10;
  const maxV = Math.max(...data.map((d) => d.v));
  const pts = data.map((d, i) => ({
    x: pad + (i / (data.length - 1)) * (W - 2 * pad),
    y: H - pad - (d.v / maxV) * (H - 2 * pad),
  }));
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const areaD = `${pathD} L${pts[pts.length - 1].x.toFixed(1)},${H - pad} L${pts[0].x.toFixed(1)},${H - pad} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 80 }}>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#lg)" />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={color} stroke="white" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function ReportsAnalytics({ lang: initLang = "en" }: { lang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initLang);
  const [dateFilter, setDateFilter] = useState<DateF>("week");
  const [centreFilter, setCentreFilter] = useState("all");
  const [activeReport, setActiveReport] = useState<ReportType | null>(null);
  const [exportModal, setExportModal] = useState<string | null>(null);
  const s = S[lang];

  const DATE_OPTS: { id: DateF; label: string }[] = [
    { id: "today", label: s.today }, { id: "week", label: s.week },
    { id: "month", label: s.month }, { id: "custom", label: s.custom },
  ];

  const REPORT_CARDS: { id: ReportType; label: string; icon: string; color: string; bg: string }[] = [
    { id: "daily",       label: s.rDaily,       icon: "📅", color: "#1A2B4A", bg: "#E8F0FF" },
    { id: "weekly",      label: s.rWeekly,      icon: "📆", color: "#1A7A3C", bg: "#E8F5EE" },
    { id: "monthly",     label: s.rMonthly,     icon: "🗓️", color: "#7C3AED", bg: "#F5F3FF" },
    { id: "centre",      label: s.rCentre,      icon: "🏛️", color: "#E8960A", bg: "#FEF3C7" },
    { id: "procurement", label: s.rProcurement, icon: "📦", color: "#2563EB", bg: "#EFF6FF" },
    { id: "payment",     label: s.rPayment,     icon: "💰", color: "#C8332A", bg: "#FEF2F2" },
  ];

  const maxDailyApp = Math.max(...DAILY_APPS.map((d) => d.val));
  const maxQueueVal = Math.max(...QUEUE_TREND.map((d) => d.v));
  const totalProc = PROC_STAGES.reduce((a, b) => a + b.count, 0);
  const totalPay = PAY_DATA.reduce((a, b) => a + b.count, 0);

  return (
    <div className="p-4 xl:p-6 space-y-4 max-w-[1280px] mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* Demo notice */}
      <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl px-4 py-2 flex items-start gap-2">
        <span className="text-sm flex-shrink-0 mt-0.5">⚠️</span>
        <p className="text-xs text-[#92400E]"><strong>SIH 2026 Prototype</strong> — {s.demoNote}</p>
      </div>

      {/* Header + controls */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-lg font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.title}</p>
          <p className="text-xs text-[#9CA3AF]">{s.subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Date filter */}
          <div className="flex items-center bg-[#F5F9F6] border border-[#C8DFD0] rounded-xl overflow-hidden">
            {DATE_OPTS.map((d) => (
              <button key={d.id} onClick={() => setDateFilter(d.id)} className={`px-3 py-2 text-[10px] font-bold transition-colors ${dateFilter === d.id ? "bg-[#1A2B4A] text-white" : "text-[#6B7280] hover:bg-white"}`} style={{ fontFamily: "Poppins, sans-serif" }}>{d.label}</button>
            ))}
          </div>
          {/* Centre filter */}
          <select value={centreFilter} onChange={(e) => setCentreFilter(e.target.value)} className="px-3 py-2 text-xs font-semibold border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>
            <option value="all">{s.allCentres}</option>
            {["A","B","C","D","E","F"].map((c) => <option key={c} value={c}>Centre {c}</option>)}
          </select>
          {/* Export buttons */}
          <button onClick={() => setExportModal("Report")} className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold text-[#1A2B4A] border border-[#C8DFD0] bg-white rounded-xl hover:bg-[#F5F9F6]" style={{ fontFamily: "Poppins, sans-serif" }}>📤 {s.exportReport}</button>
          <button onClick={() => setExportModal("PDF")} className="px-3 py-2 text-[10px] font-bold text-[#C8332A] border border-[#FECACA] bg-[#FEF2F2] rounded-xl hover:opacity-80" style={{ fontFamily: "Poppins, sans-serif" }}>📄 {s.downloadPDF}</button>
          <button onClick={() => setExportModal("CSV")} className="px-3 py-2 text-[10px] font-bold text-[#1A7A3C] border border-[#C8DFD0] bg-[#E8F5EE] rounded-xl hover:opacity-80" style={{ fontFamily: "Poppins, sans-serif" }}>📊 {s.downloadCSV}</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {[
          { label: s.regFarmers,    value: "2,486", icon: "👨‍🌾", color: "#1A7A3C", bg: "#E8F5EE" },
          { label: s.applications,  value: "184",   icon: "📋", color: "#2563EB", bg: "#EFF6FF" },
          { label: s.completedProc, value: "98",    icon: "✅", color: "#1A7A3C", bg: "#E8F5EE" },
          { label: s.avgProcessing, value: "12 " + s.min, icon: "⏱️", color: "#7C3AED", bg: "#F5F3FF" },
          { label: s.slotUtil,      value: "68%",   icon: "📅", color: "#E8960A", bg: "#FEF3C7" },
          { label: s.paymentPending,value: "27",    icon: "💰", color: "#C8332A", bg: "#FEF2F2" },
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

      {/* Charts row 1: Daily Apps + Centre Utilization */}
      <div className="grid lg:grid-cols-2 gap-4">

        {/* Daily Applications bar chart */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.dailyApps}</p>
              <p className="text-[10px] text-[#9CA3AF]">{s.appPerDay} · {s.demo}</p>
            </div>
            <span className="text-xs font-bold text-[#1A7A3C] bg-[#E8F5EE] px-2 py-0.5 rounded-full">7d</span>
          </div>
          <div className="flex items-end gap-2" style={{ height: 100 }}>
            {DAILY_APPS.map((d, i) => {
              const pct = (d.val / maxDailyApp) * 100;
              const isLast = i === DAILY_APPS.length - 1;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] font-bold" style={{ color: isLast ? "#1A7A3C" : "#9CA3AF" }}>{d.val}</span>
                  <div className="w-full flex flex-col justify-end" style={{ height: 72 }}>
                    <div className="w-full rounded-t-lg transition-all" style={{ height: `${pct}%`, background: isLast ? "#1A7A3C" : "#C8DFD0", minHeight: 4 }} />
                  </div>
                  <span className="text-[8px] text-[#9CA3AF]">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Centre utilization horizontal bars */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.centreUtil}</p>
              <p className="text-[10px] text-[#9CA3AF]">{s.demo}</p>
            </div>
          </div>
          <div className="space-y-3">
            {CENTRES_UTIL.map((c) => {
              const col = UTIL_COLOR(c.util);
              return (
                <div key={c.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-[#1A2B4A]">{c.name}</span>
                    <span className="text-xs font-bold" style={{ color: col, fontFamily: "Poppins, sans-serif" }}>{c.util}%</span>
                  </div>
                  <div className="h-2.5 bg-[#E8F5EE] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${c.util}%`, background: col }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Charts row 2: Proc stages + Avg time + Queue trend */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* Procurement stage distribution */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
          <p className="text-sm font-bold text-[#1A2B4A] mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>{s.procStages}</p>
          <p className="text-[10px] text-[#9CA3AF] mb-4">{s.demo}</p>
          {/* SVG donut */}
          <div className="flex items-center gap-3 mb-4">
            <svg viewBox="0 0 100 100" className="w-20 h-20 flex-shrink-0 -rotate-90">
              {(() => {
                let offset = 0;
                return PROC_STAGES.map((st) => {
                  const pct = st.count / totalProc;
                  const circ = 2 * Math.PI * 36;
                  const dash = pct * circ;
                  const el = <circle key={st.label} cx="50" cy="50" r="36" fill="none" stroke={st.color} strokeWidth="14" strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-offset * circ} />;
                  offset += pct;
                  return el;
                });
              })()}
              <circle cx="50" cy="50" r="29" fill="white" />
            </svg>
            <div className="flex-1 space-y-1.5">
              {PROC_STAGES.map((st) => (
                <div key={st.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: st.color }} />
                    <span className="text-[9px] text-[#6B7280]">{st.label}</span>
                  </div>
                  <span className="text-[10px] font-bold" style={{ color: st.color, fontFamily: "Poppins, sans-serif" }}>{st.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Avg processing time */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
          <p className="text-sm font-bold text-[#1A2B4A] mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>{s.avgTime}</p>
          <p className="text-[10px] text-[#9CA3AF] mb-4">{s.demoStats}</p>
          <div className="space-y-3">
            {AVG_TIMES.map((t) => (
              <div key={t.label} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style={{ background: t.color, fontFamily: "Poppins, sans-serif" }}>{t.val}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-[#6B7280]">{t.label}</span>
                    <span className="text-[10px] font-bold" style={{ color: t.color }}>{t.val} {s.min}</span>
                  </div>
                  <div className="h-1.5 bg-[#E8F5EE] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(t.val / 12) * 100}%`, background: t.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Queue trend */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
          <p className="text-sm font-bold text-[#1A2B4A] mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>{s.queueTrend}</p>
          <p className="text-[10px] text-[#9CA3AF] mb-3">{s.demo}</p>
          {/* X labels */}
          <div className="mb-1">
            <LineChart data={QUEUE_TREND} color="#1A7A3C" />
          </div>
          <div className="flex justify-between">
            {QUEUE_TREND.map((d) => (
              <span key={d.t} className="text-[8px] text-[#9CA3AF]">{d.t}</span>
            ))}
          </div>
          {/* Value labels */}
          <div className="flex items-center gap-2 mt-1">
            {QUEUE_TREND.map((d) => (
              <span key={d.t} className="flex-1 text-center text-[8px] font-bold" style={{ color: d.v === maxQueueVal ? "#C8332A" : "#9CA3AF" }}>{d.v}</span>
            ))}
          </div>
          <div className="mt-3 bg-[#FEF3C7] border border-[#FDE68A] rounded-xl p-3">
            <p className="text-[10px] font-bold text-[#92400E]">⚡ {s.peakInsight}</p>
            <p className="text-[9px] text-[#B45309] mt-0.5">{s.peakNote}</p>
          </div>
        </div>
      </div>

      {/* Slot + Payment analytics */}
      <div className="grid lg:grid-cols-2 gap-4">

        {/* Slot analytics */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.slotAnalytics}</p>
              <p className="text-[10px] text-[#9CA3AF]">{s.demo}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: s.morningSlots,   value: "72%", icon: "🌅", color: "#E8960A", bg: "#FEF3C7" },
              { label: s.afternoonSlots, value: "54%", icon: "☀️", color: "#2563EB", bg: "#EFF6FF" },
              { label: s.mostBooked,     value: "10:30 AM", icon: "⭐", color: "#7C3AED", bg: "#F5F3FF" },
              { label: s.availCap,       value: "32%", icon: "📊", color: "#1A7A3C", bg: "#E8F5EE" },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-xl border border-[#C8DFD0]" style={{ background: item.bg }}>
                <p className="text-lg mb-1">{item.icon}</p>
                <p className="text-lg font-bold" style={{ color: item.color, fontFamily: "Poppins, sans-serif" }}>{item.value}</p>
                <p className="text-[9px] text-[#6B7280]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment analytics */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.payAnalytics}</p>
              <p className="text-[10px] text-[#9CA3AF]">{s.demo}</p>
            </div>
            <button className="text-[10px] font-bold text-[#1A7A3C] border border-[#C8DFD0] rounded-lg px-2.5 py-1 hover:bg-[#E8F5EE] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>{s.viewPayRecords}</button>
          </div>
          <div className="flex items-center gap-4">
            {/* Mini donut */}
            <svg viewBox="0 0 100 100" className="w-20 h-20 flex-shrink-0 -rotate-90">
              {(() => {
                let offset = 0;
                return PAY_DATA.map((pd) => {
                  const pct = pd.count / totalPay;
                  const circ = 2 * Math.PI * 36;
                  const dash = pct * circ;
                  const el = <circle key={pd.label} cx="50" cy="50" r="36" fill="none" stroke={pd.color} strokeWidth="14" strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-offset * circ} />;
                  offset += pct;
                  return el;
                });
              })()}
              <circle cx="50" cy="50" r="29" fill="white" />
            </svg>
            <div className="flex-1 space-y-2">
              {PAY_DATA.map((pd) => (
                <div key={pd.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: pd.color }} />
                    <span className="text-[10px] text-[#6B7280] capitalize">{(s as Record<string, string>)[pd.label] ?? pd.label}</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: pd.color, fontFamily: "Poppins, sans-serif" }}>{pd.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Centre comparison table */}
      <div className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E8F5EE] flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.centreComp}</p>
            <p className="text-[10px] text-[#9CA3AF]">{s.demo}</p>
          </div>
          <span className="text-[10px] font-bold text-[#1A7A3C] bg-[#E8F5EE] px-2.5 py-1 rounded-full">{CENTRES_UTIL.length} Centres</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F5F9F6]">
                {[s.centreCol, s.appsCol, s.queueCol, s.utilCol, s.avgProcCol, s.statusCol].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8F5EE]">
              {CENTRES_UTIL.map((c) => {
                const ss = STATUS_STYLE[c.status];
                const sl = (s as Record<string, string>)[c.status] ?? c.status;
                return (
                  <tr key={c.name} className="hover:bg-[#F5F9F6] transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#1A2B4A] whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>{c.name}</td>
                    <td className="px-4 py-3 text-[#1A2B4A] font-bold">{c.apps}</td>
                    <td className="px-4 py-3 text-[#6B7280]">{c.queue}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-[#E8F5EE] rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${c.util}%`, background: UTIL_COLOR(c.util) }} />
                        </div>
                        <span className="font-bold text-[10px]" style={{ color: UTIL_COLOR(c.util), fontFamily: "Poppins, sans-serif" }}>{c.util}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#6B7280]">{c.avgProc} {s.min}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ color: ss.color, background: ss.bg, fontFamily: "Poppins, sans-serif" }}>{sl}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights + Report types */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* Insights */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
          <div className="flex items-start justify-between mb-1">
            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>💡 {s.insightsTitle}</p>
          </div>
          <p className="text-[10px] text-[#9CA3AF] mb-4">{s.insightNote}</p>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { icon: "🏛️", text: s.i1, color: "#C8332A", bg: "#FEF2F2", border: "#FECACA" },
              { icon: "🔢", text: s.i2, color: "#1A7A3C", bg: "#E8F5EE", border: "#C8DFD0" },
              { icon: "📅", text: s.i3, color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE" },
            ].map((ins) => (
              <div key={ins.text} className="p-4 rounded-xl border-2" style={{ borderColor: ins.border, background: ins.bg }}>
                <p className="text-lg mb-2">{ins.icon}</p>
                <p className="text-xs leading-relaxed" style={{ color: ins.color }}>{ins.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Report types */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
          <p className="text-sm font-bold text-[#1A2B4A] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>{s.reportTypes}</p>
          <div className="grid grid-cols-2 gap-2">
            {REPORT_CARDS.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveReport(activeReport === r.id ? null : r.id)}
                className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all text-center ${activeReport === r.id ? "border-[#1A2B4A] shadow-md" : "border-[#C8DFD0] hover:border-[#1A7A3C]"}`}
                style={{ background: activeReport === r.id ? r.bg : "white" }}
              >
                <span className="text-xl mb-1">{r.icon}</span>
                <span className="text-[9px] font-bold" style={{ color: activeReport === r.id ? r.color : "#6B7280", fontFamily: "Poppins, sans-serif" }}>{r.label}</span>
              </button>
            ))}
          </div>
          {activeReport && (
            <div className="mt-3 bg-[#E8F5EE] rounded-xl p-3">
              <p className="text-[10px] font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                {REPORT_CARDS.find((r) => r.id === activeReport)?.label} selected
              </p>
              <p className="text-[9px] text-[#1A7A3C]/70 mt-0.5">Demo report — no real data</p>
              <button onClick={() => setExportModal(REPORT_CARDS.find((r) => r.id === activeReport)?.label ?? "Report")} className="mt-2 w-full py-1.5 text-[10px] font-bold text-white bg-[#1A7A3C] rounded-lg" style={{ fontFamily: "Poppins, sans-serif" }}>{s.exportReport}</button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-2 border-t border-[#C8DFD0]">
        <p className="text-[10px] text-[#9CA3AF]">KisanQ Admin · SIH 2026 Prototype · Team Viksit Innovators · All analytics are demo only · {s.demo}</p>
      </div>

      {exportModal && <ExportModal s={s} format={exportModal} onClose={() => setExportModal(null)} />}
    </div>
  );
}
