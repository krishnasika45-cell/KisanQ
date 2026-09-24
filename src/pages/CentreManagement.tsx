import { useState } from "react";

type Lang = "en" | "hi";
type CentreStatus = "High Load" | "Normal" | "Moderate" | "Temporarily Closed";

const S = {
  en: {
    title: "Centre Management",
    subtitle: "Monitor procurement centre capacity and workload.",
    lang: "हिन्दी",
    demoNote: "All data shown is demo/fictional — not connected to any real government system.",
    // KPIs
    totalCentres: "Total Centres",
    openCentres: "Open Centres",
    highLoad: "High Load Centres",
    availCap: "Available Capacity",
    demo: "Demo data",
    // Search
    searchPH: "Search centre by name or location",
    search: "Search",
    filters: "Filters",
    statusF: "Status",
    allStatus: "All Status",
    capacityF: "Capacity",
    allCap: "All",
    queueLevel: "Queue Level",
    allQueue: "All",
    location: "Location",
    allLoc: "All Locations",
    applyFilters: "Apply Filters",
    reset: "Reset",
    // Cards
    currentQueue: "Current Queue",
    capacity: "Capacity",
    utilization: "Utilization",
    avgProcessing: "Avg Processing",
    estWait: "Est. Queue Wait",
    availSlots: "Available Slots",
    viewCentre: "View Centre",
    manage: "Manage",
    // Chart
    centreUtil: "Centre Utilization",
    chartSub: "Current utilization across all centres · Demo data",
    // Alert
    alertMsg: "Centre A is currently at 89% utilization.",
    reviewQueue: "Review Queue",
    // Drawer
    centreDetails: "Centre Details",
    close: "Close",
    centreName: "Centre Name",
    locLabel: "Location",
    statusLabel: "Status",
    capLabel: "Capacity",
    queueLabel: "Current Queue",
    utilLabel: "Utilization",
    avgProcLabel: "Avg Processing Time",
    estWaitLabel: "Est. Waiting Time",
    availSlotsLabel: "Available Slots",
    currentQueueSec: "Current Queue",
    currentToken: "Current Token",
    nextToken: "Next Token",
    lastUpdated: "Last Updated",
    justNow: "Just now",
    viewLiveQueue: "View Live Queue",
    todaysOps: "Today's Operations",
    applications: "Applications",
    confirmedSlots: "Confirmed Slots",
    farmersArrived: "Farmers Arrived",
    qualityChecks: "Quality Checks",
    weighingDone: "Weighing Completed",
    procDone: "Procurement Completed",
    payment: "Payment",
    completed: "Completed",
    pending: "Pending",
    adminActions: "Admin Actions",
    manageSlots: "Manage Slots",
    viewQueue: "View Queue",
    updateStatus: "Update Centre Status",
    viewApps: "View Applications",
    statusControl: "Centre Status Control",
    statusNote: "Changing status is for demo coordination only — not connected to any government system.",
    open: "Open",
    tempClosed: "Temporarily Closed",
    slotAvail: "Slot Availability",
    slotNote: "Today's scheduled slots · Demo data",
    available: "Available",
    limited: "Limited",
    confirmTitle: "Confirm Status Change",
    confirmMsg: "You are about to change the centre status to",
    confirmBtn: "Confirm Change",
    cancelBtn: "Cancel",
    farmers: "farmers",
    minFarmer: "min/farmer",
    min: "min",
    slots: "slots",
    highLoadBadge: "High Load",
    normalBadge: "Normal",
    moderateBadge: "Moderate",
    closedBadge: "Closed",
    approaching: "Centre approaching capacity",
  },
  hi: {
    title: "केंद्र प्रबंधन",
    subtitle: "खरीद केंद्र की क्षमता और कार्यभार की निगरानी करें।",
    lang: "English",
    demoNote: "यहाँ दिखाया गया सभी डेटा डेमो/काल्पनिक है — किसी सरकारी प्रणाली से जुड़ा नहीं है।",
    totalCentres: "कुल केंद्र",
    openCentres: "खुले केंद्र",
    highLoad: "उच्च भार केंद्र",
    availCap: "उपलब्ध क्षमता",
    demo: "डेमो डेटा",
    searchPH: "केंद्र का नाम या स्थान खोजें",
    search: "खोजें",
    filters: "फ़िल्टर",
    statusF: "स्थिति",
    allStatus: "सभी स्थिति",
    capacityF: "क्षमता",
    allCap: "सभी",
    queueLevel: "कतार स्तर",
    allQueue: "सभी",
    location: "स्थान",
    allLoc: "सभी स्थान",
    applyFilters: "फ़िल्टर लागू करें",
    reset: "रीसेट",
    currentQueue: "वर्तमान कतार",
    capacity: "क्षमता",
    utilization: "उपयोगिता",
    avgProcessing: "औसत प्रक्रिया",
    estWait: "अनुमानित प्रतीक्षा समय",
    availSlots: "उपलब्ध स्लॉट",
    viewCentre: "केंद्र देखें",
    manage: "प्रबंधन",
    centreUtil: "केंद्र उपयोगिता",
    chartSub: "सभी केंद्रों में वर्तमान उपयोगिता · डेमो डेटा",
    alertMsg: "केंद्र A वर्तमान में 89% उपयोगिता पर है।",
    reviewQueue: "कतार की समीक्षा करें",
    centreDetails: "केंद्र विवरण",
    close: "बंद करें",
    centreName: "केंद्र का नाम",
    locLabel: "स्थान",
    statusLabel: "स्थिति",
    capLabel: "क्षमता",
    queueLabel: "वर्तमान कतार",
    utilLabel: "उपयोगिता",
    avgProcLabel: "औसत प्रक्रिया समय",
    estWaitLabel: "अनुमानित प्रतीक्षा समय",
    availSlotsLabel: "उपलब्ध स्लॉट",
    currentQueueSec: "वर्तमान कतार",
    currentToken: "वर्तमान टोकन",
    nextToken: "अगला टोकन",
    lastUpdated: "अंतिम अपडेट",
    justNow: "अभी अभी",
    viewLiveQueue: "लाइव कतार देखें",
    todaysOps: "आज के कार्य",
    applications: "आवेदन",
    confirmedSlots: "पुष्टि स्लॉट",
    farmersArrived: "आए किसान",
    qualityChecks: "गुणवत्ता जांच",
    weighingDone: "तुलाई पूर्ण",
    procDone: "खरीद पूर्ण",
    payment: "भुगतान",
    completed: "पूर्ण",
    pending: "लंबित",
    adminActions: "व्यवस्थापक क्रियाएं",
    manageSlots: "स्लॉट प्रबंधन",
    viewQueue: "कतार देखें",
    updateStatus: "केंद्र स्थिति अपडेट करें",
    viewApps: "आवेदन देखें",
    statusControl: "केंद्र स्थिति नियंत्रण",
    statusNote: "स्थिति बदलना केवल डेमो समन्वय के लिए है — किसी सरकारी प्रणाली से जुड़ा नहीं है।",
    open: "खुला",
    tempClosed: "अस्थायी रूप से बंद",
    slotAvail: "स्लॉट उपलब्धता",
    slotNote: "आज के निर्धारित स्लॉट · डेमो डेटा",
    available: "उपलब्ध",
    limited: "सीमित",
    confirmTitle: "स्थिति परिवर्तन की पुष्टि करें",
    confirmMsg: "आप केंद्र की स्थिति बदलने वाले हैं:",
    confirmBtn: "परिवर्तन की पुष्टि करें",
    cancelBtn: "रद्द करें",
    farmers: "किसान",
    minFarmer: "मिनट/किसान",
    min: "मिनट",
    slots: "स्लॉट",
    highLoadBadge: "उच्च भार",
    normalBadge: "सामान्य",
    moderateBadge: "मध्यम",
    closedBadge: "बंद",
    approaching: "केंद्र क्षमता के करीब",
  },
};

// ─── Demo data ─────────────────────────────────────────────────────────────────
const ALL_CENTRES = [
  { id: "A", name: "Gwalior Procurement Centre A", location: "Gwalior", status: "High Load" as CentreStatus, queue: 62, capacity: 70, util: 89, avg: 4, estWait: 248, slots: 3, token: "Q-062", nextToken: "Q-063" },
  { id: "B", name: "Gwalior Procurement Centre B", location: "Gwalior", status: "Normal" as CentreStatus, queue: 18, capacity: 50, util: 36, avg: 3, estWait: 54, slots: 8, token: "Q-018", nextToken: "Q-019" },
  { id: "C", name: "Gwalior Procurement Centre C", location: "Gwalior", status: "Moderate" as CentreStatus, queue: 41, capacity: 60, util: 68, avg: 4, estWait: 164, slots: 5, token: "Q-041", nextToken: "Q-042" },
  { id: "D", name: "Morena Procurement Centre D", location: "Morena", status: "Normal" as CentreStatus, queue: 26, capacity: 50, util: 52, avg: 3, estWait: 78, slots: 6, token: "Q-026", nextToken: "Q-027" },
  { id: "E", name: "Dabra Procurement Centre E", location: "Dabra", status: "Normal" as CentreStatus, queue: 22, capacity: 50, util: 44, avg: 3, estWait: 66, slots: 7, token: "Q-022", nextToken: "Q-023" },
  { id: "F", name: "Bhind Procurement Centre F", location: "Bhind", status: "Moderate" as CentreStatus, queue: 43, capacity: 60, util: 71, avg: 4, estWait: 172, slots: 4, token: "Q-043", nextToken: "Q-044" },
];

const SLOTS_TODAY = [
  { time: "09:30 AM", status: "Available" },
  { time: "10:30 AM", status: "Limited" },
  { time: "11:30 AM", status: "Available" },
  { time: "01:00 PM", status: "Available" },
];

const OPS_TODAY = [
  { label: "applications", val: 42 },
  { label: "confirmedSlots", val: 35 },
  { label: "farmersArrived", val: 28 },
  { label: "qualityChecks", val: 24 },
  { label: "weighingDone", val: 19 },
  { label: "procDone", val: 16 },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function statusStyle(status: CentreStatus) {
  if (status === "High Load") return { color: "#C8332A", bg: "#FEF2F2", bar: "#C8332A" };
  if (status === "Moderate") return { color: "#E8960A", bg: "#FEF3C7", bar: "#E8960A" };
  if (status === "Temporarily Closed") return { color: "#6B7280", bg: "#F3F4F6", bar: "#9CA3AF" };
  return { color: "#1A7A3C", bg: "#E8F5EE", bar: "#1A7A3C" };
}

function statusLabel(status: CentreStatus, s: typeof S["en"]) {
  if (status === "High Load") return s.highLoadBadge;
  if (status === "Moderate") return s.moderateBadge;
  if (status === "Temporarily Closed") return s.closedBadge;
  return s.normalBadge;
}

// ─── Utilization bar chart ─────────────────────────────────────────────────────
function UtilChart({ centres, s }: { centres: typeof ALL_CENTRES; s: typeof S["en"] }) {
  return (
    <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.centreUtil}</p>
          <p className="text-[10px] text-[#9CA3AF]">{s.chartSub}</p>
        </div>
        <div className="flex items-center gap-3 text-[9px]">
          {[{ label: s.highLoadBadge, color: "#C8332A" }, { label: s.moderateBadge, color: "#E8960A" }, { label: s.normalBadge, color: "#1A7A3C" }].map((l) => (
            <div key={l.label} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
              <span className="text-[#6B7280]">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {centres.map((c) => {
          const st = statusStyle(c.status);
          return (
            <div key={c.id} className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#1A2B4A] w-8 flex-shrink-0" style={{ fontFamily: "Poppins, sans-serif" }}>
                {c.id}
              </span>
              <div className="flex-1 h-5 bg-[#E8F5EE] rounded-full overflow-hidden relative">
                <div
                  className="h-full rounded-full transition-all flex items-center"
                  style={{ width: `${c.util}%`, background: st.bar }}
                />
              </div>
              <span className="text-xs font-bold w-10 text-right flex-shrink-0" style={{ color: st.color, fontFamily: "Poppins, sans-serif" }}>
                {c.util}%
              </span>
              <div className="flex items-center gap-1 w-16 flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: st.color }} />
                <span className="text-[9px] text-[#6B7280] truncate">{statusLabel(c.status, s)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Centre Details Drawer ─────────────────────────────────────────────────────
function CentreDrawer({
  centre,
  lang,
  onClose,
}: {
  centre: typeof ALL_CENTRES[0];
  lang: Lang;
  onClose: () => void;
}) {
  const s = S[lang];
  const st = statusStyle(centre.status);
  const [centreStatus, setCentreStatus] = useState<CentreStatus>(centre.status);
  const [pendingStatus, setPendingStatus] = useState<CentreStatus | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleStatusRequest = (newStatus: CentreStatus) => {
    if (newStatus === centreStatus) return;
    setPendingStatus(newStatus);
    setShowConfirm(true);
  };

  const confirmChange = () => {
    if (pendingStatus) setCentreStatus(pendingStatus);
    setShowConfirm(false);
    setPendingStatus(null);
  };

  const curSt = statusStyle(centreStatus);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>

        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#C8DFD0] px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.centreDetails}</p>
            <p className="text-[10px] text-[#9CA3AF]">Centre {centre.id} · Demo data</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>

        <div className="flex-1 p-5 space-y-5">

          {/* Capacity alert for High Load */}
          {centreStatus === "High Load" && (
            <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl px-4 py-3 flex items-start gap-2">
              <span className="text-sm flex-shrink-0">🔴</span>
              <div className="flex-1">
                <p className="text-xs font-bold text-[#C8332A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.approaching}</p>
                <p className="text-[10px] text-[#C8332A]/80 mt-0.5">{s.alertMsg}</p>
              </div>
              <button className="text-[10px] font-bold text-[#C8332A] border border-[#FCA5A5] rounded-lg px-2.5 py-1 hover:bg-[#FCA5A5]/20 flex-shrink-0 whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>
                {s.reviewQueue}
              </button>
            </div>
          )}

          {/* Centre info card */}
          <div className="bg-gradient-to-br from-[#1A2B4A] to-[#0F1E35] rounded-2xl p-5 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-lg font-bold leading-snug" style={{ fontFamily: "Poppins, sans-serif" }}>{centre.name}</p>
                <p className="text-sm text-white/60">{centre.location}, Madhya Pradesh</p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ml-2" style={{ color: curSt.color, background: curSt.bg, fontFamily: "Poppins, sans-serif" }}>
                {statusLabel(centreStatus, s)}
              </span>
            </div>
            {/* Util bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-white/50">{s.utilization}</span>
                <span className="text-sm font-bold" style={{ color: curSt.color, fontFamily: "Poppins, sans-serif" }}>{centre.util}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${centre.util}%`, background: curSt.bar }} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: s.queueLabel, val: `${centre.queue} ${s.farmers}` },
                { label: s.capLabel, val: `${centre.capacity} ${s.farmers}` },
                { label: s.avgProcLabel, val: `${centre.avg} ${s.minFarmer}` },
                { label: s.estWaitLabel, val: `~${centre.estWait} ${s.min}` },
                { label: s.availSlotsLabel, val: `${centre.slots} ${s.slots}` },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[9px] text-white/40 mb-0.5">{item.label}</p>
                  <p className="text-xs font-semibold text-white/90">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Current Queue */}
          <div className="bg-[#E8F5EE] rounded-2xl p-4 border border-[#C8DFD0]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.currentQueueSec}</p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-[9px] text-[#6B7280]">{s.lastUpdated}: {s.justNow}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {[
                { label: s.currentToken, val: centre.token },
                { label: s.nextToken, val: centre.nextToken },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-xl px-3 py-2.5 text-center border border-[#C8DFD0]">
                  <p className="text-[9px] text-[#9CA3AF] mb-0.5">{item.label}</p>
                  <p className="text-base font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>{item.val}</p>
                </div>
              ))}
            </div>
            <button className="w-full py-2 text-xs font-semibold text-[#1A7A3C] border border-[#C8DFD0] bg-white rounded-xl hover:bg-[#F5F9F6] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
              {s.viewLiveQueue} →
            </button>
          </div>

          {/* Today's Operations */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4">
            <p className="text-xs font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{s.todaysOps}</p>
            {/* Pipeline funnel */}
            {OPS_TODAY.map((op, i) => {
              const pct = (op.val / 42) * 100;
              const colors = ["#2563EB", "#1A7A3C", "#7C3AED", "#E8960A", "#059669", "#1A7A3C"];
              return (
                <div key={op.label} className="mb-2 last:mb-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-[#6B7280]" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {(s as Record<string, string>)[op.label]}
                    </span>
                    <span className="text-xs font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{op.val}</span>
                  </div>
                  <div className="h-1.5 bg-[#E8F5EE] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: colors[i] }} />
                  </div>
                </div>
              );
            })}
            <div className="mt-3 pt-3 border-t border-[#E8F5EE] grid grid-cols-2 gap-2">
              {[
                { label: s.completed, val: "12", color: "#1A7A3C", bg: "#E8F5EE" },
                { label: s.pending, val: "4", color: "#C8332A", bg: "#FEF2F2" },
              ].map((p) => (
                <div key={p.label} className="rounded-xl p-2.5 text-center" style={{ background: p.bg }}>
                  <p className="text-[9px] mb-0.5" style={{ color: p.color }}>{s.payment} · {p.label}</p>
                  <p className="text-base font-bold" style={{ color: p.color, fontFamily: "Poppins, sans-serif" }}>{p.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Slot Availability */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.slotAvail}</p>
                <p className="text-[9px] text-[#9CA3AF]">{s.slotNote}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {SLOTS_TODAY.map((sl) => {
                const isLim = sl.status === "Limited";
                return (
                  <div key={sl.time} className={`flex items-center justify-between px-3 py-2.5 rounded-xl border ${isLim ? "border-[#FDE68A] bg-[#FEF3C7]" : "border-[#C8DFD0] bg-[#F5F9F6]"}`}>
                    <span className="text-xs font-semibold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{sl.time}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${isLim ? "text-[#E8960A] bg-[#FDE68A]/40" : "text-[#1A7A3C] bg-[#C8DFD0]/60"}`}>
                      {isLim ? s.limited : s.available}
                    </span>
                  </div>
                );
              })}
            </div>
            <button className="w-full py-2 text-xs font-semibold text-[#1A7A3C] border border-[#C8DFD0] rounded-xl hover:bg-[#E8F5EE] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
              {s.manageSlots} →
            </button>
          </div>

          {/* Status Control */}
          <div className="bg-[#F5F9F6] rounded-2xl border border-[#C8DFD0] p-4">
            <p className="text-xs font-bold text-[#1A2B4A] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{s.statusControl}</p>
            <p className="text-[9px] text-[#9CA3AF] mb-3">{s.statusNote}</p>
            <div className="flex gap-2 flex-wrap">
              {(["Normal", "High Load", "Temporarily Closed"] as CentreStatus[]).map((opt) => {
                const optSt = statusStyle(opt);
                const isActive = centreStatus === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => handleStatusRequest(opt)}
                    className={`px-3 py-2 text-[10px] font-bold rounded-xl border transition-all ${isActive ? "border-transparent" : "border-[#C8DFD0] bg-white hover:opacity-80"}`}
                    style={isActive ? { color: optSt.color, background: optSt.bg, borderColor: optSt.color + "40", fontFamily: "Poppins, sans-serif" } : { fontFamily: "Poppins, sans-serif" }}
                  >
                    {statusLabel(opt, s)}
                    {isActive && " ✓"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Admin Actions */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4">
            <p className="text-xs font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{s.adminActions}</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: s.manageSlots, color: "#1A7A3C", bg: "#E8F5EE", border: "#C8DFD0" },
                { label: s.viewQueue, color: "#E8960A", bg: "#FEF3C7", border: "#FDE68A" },
                { label: s.updateStatus, color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE" },
                { label: s.viewApps, color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE" },
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

      {/* Status change confirmation modal */}
      {showConfirm && pendingStatus && (
        <div className="absolute inset-0 z-60 flex items-center justify-center p-6" style={{ position: "fixed" }}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-[#C8DFD0]">
            <p className="text-sm font-bold text-[#1A2B4A] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>{s.confirmTitle}</p>
            <p className="text-xs text-[#6B7280] mb-1">{s.confirmMsg}</p>
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4" style={{ color: statusStyle(pendingStatus).color, background: statusStyle(pendingStatus).bg, fontFamily: "Poppins, sans-serif" }}>
              {statusLabel(pendingStatus, s)}
            </span>
            <p className="text-[9px] text-[#9CA3AF] mb-4">{s.statusNote}</p>
            <div className="flex gap-2">
              <button onClick={() => { setShowConfirm(false); setPendingStatus(null); }} className="flex-1 py-2.5 text-xs font-semibold text-[#6B7280] border border-[#C8DFD0] rounded-xl hover:bg-[#F5F9F6] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
                {s.cancelBtn}
              </button>
              <button onClick={confirmChange} className="flex-1 py-2.5 text-xs font-semibold text-white bg-[#1A2B4A] rounded-xl hover:bg-[#0F1E35] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
                {s.confirmBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Centre Card ───────────────────────────────────────────────────────────────
function CentreCard({
  centre,
  s,
  onView,
}: {
  centre: typeof ALL_CENTRES[0];
  s: typeof S["en"];
  onView: () => void;
}) {
  const st = statusStyle(centre.status);
  return (
    <div className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Status bar */}
      <div className="h-1" style={{ background: st.bar }} />
      <div className="p-4">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#1A2B4A] leading-snug" style={{ fontFamily: "Poppins, sans-serif" }}>{centre.name}</p>
            <p className="text-[10px] text-[#9CA3AF]">{centre.location}</p>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0" style={{ color: st.color, background: st.bg, fontFamily: "Poppins, sans-serif" }}>
            {statusLabel(centre.status, s)}
          </span>
        </div>

        {/* Utilization bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-[#6B7280]">{s.utilization}</span>
            <span className="text-xs font-bold" style={{ color: st.color, fontFamily: "Poppins, sans-serif" }}>{centre.util}%</span>
          </div>
          <div className="h-2 bg-[#E8F5EE] rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${centre.util}%`, background: st.bar }} />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: s.currentQueue, val: `${centre.queue}` },
            { label: s.capacity, val: `${centre.capacity}` },
            { label: s.availSlots, val: `${centre.slots}` },
            { label: s.avgProcessing, val: `${centre.avg} ${s.minFarmer}` },
            { label: s.estWait, val: `~${centre.estWait} ${s.min}` },
          ].map((item) => (
            <div key={item.label} className="bg-[#F5F9F6] rounded-xl px-2 py-2 text-center">
              <p className="text-[8px] text-[#9CA3AF] leading-tight mb-0.5">{item.label}</p>
              <p className="text-[11px] font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{item.val}</p>
            </div>
          ))}
        </div>

        {/* Alert if high load */}
        {centre.status === "High Load" && (
          <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl px-3 py-2 mb-3 flex items-center gap-2">
            <span className="text-xs flex-shrink-0">🔴</span>
            <p className="text-[9px] text-[#C8332A] font-medium">{s.approaching}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onView}
            className="flex-1 py-2 text-[10px] font-semibold text-[#1A7A3C] border border-[#C8DFD0] rounded-xl hover:bg-[#E8F5EE] transition-colors"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {s.viewCentre}
          </button>
          <button
            onClick={onView}
            className="flex-1 py-2 text-[10px] font-semibold text-white bg-[#1A2B4A] rounded-xl hover:bg-[#0F1E35] transition-colors"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {s.manage}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function CentreManagement({ lang: initLang = "en" }: { lang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initLang);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCentre, setSelectedCentre] = useState<typeof ALL_CENTRES[0] | null>(null);
  const s = S[lang];

  const filtered = ALL_CENTRES.filter((c) => {
    const q = appliedQuery.toLowerCase();
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
    const matchStatus = !statusFilter || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleSearch = () => setAppliedQuery(searchQuery);
  const handleReset = () => { setSearchQuery(""); setAppliedQuery(""); setStatusFilter(""); };

  const highLoadCount = ALL_CENTRES.filter((c) => c.status === "High Load").length;
  const openCount = ALL_CENTRES.filter((c) => c.status !== "Temporarily Closed").length;
  const avgUtil = Math.round(ALL_CENTRES.reduce((a, c) => a + c.util, 0) / ALL_CENTRES.length);
  const availCap = 100 - avgUtil;

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

      {/* Global capacity alert */}
      {highLoadCount > 0 && (
        <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl px-4 py-3 flex items-center gap-3">
          <span className="text-lg flex-shrink-0">🔴</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-[#C8332A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.approaching}</p>
            <p className="text-[10px] text-[#C8332A]/80">{s.alertMsg}</p>
          </div>
          <button
            onClick={() => setSelectedCentre(ALL_CENTRES[0])}
            className="text-[10px] font-bold text-[#C8332A] border border-[#FCA5A5] rounded-xl px-3 py-1.5 hover:bg-[#FCA5A5]/20 flex-shrink-0 whitespace-nowrap"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {s.reviewQueue}
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: s.totalCentres, value: "6", icon: "🏭", color: "#1A7A3C", bg: "#E8F5EE" },
          { label: s.openCentres, value: `${openCount}`, icon: "✅", color: "#2563EB", bg: "#EFF6FF" },
          { label: s.highLoad, value: `${highLoadCount}`, icon: "🔴", color: "#C8332A", bg: "#FEF2F2" },
          { label: s.availCap, value: `${availCap}%`, icon: "📊", color: "#E8960A", bg: "#FEF3C7" },
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

        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 border-t border-[#E8F5EE]">
            {[
              { label: s.statusF, value: statusFilter, onChange: setStatusFilter, opts: [{ val: "", label: s.allStatus }, { val: "Normal", label: s.normalBadge }, { val: "Moderate", label: s.moderateBadge }, { val: "High Load", label: s.highLoadBadge }] },
              { label: s.capacityF, value: "", onChange: () => {}, opts: [{ val: "", label: s.allCap }, { val: "high", label: ">60" }, { val: "med", label: "30–60" }, { val: "low", label: "<30" }] },
              { label: s.queueLevel, value: "", onChange: () => {}, opts: [{ val: "", label: s.allQueue }, { val: "high", label: ">50" }, { val: "med", label: "20–50" }, { val: "low", label: "<20" }] },
              { label: s.location, value: "", onChange: () => {}, opts: [{ val: "", label: s.allLoc }, { val: "gwalior", label: "Gwalior" }, { val: "morena", label: "Morena" }, { val: "dabra", label: "Dabra" }, { val: "bhind", label: "Bhind" }] },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-[10px] font-semibold text-[#6B7280] block mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{f.label}</label>
                <select
                  value={f.value}
                  onChange={(e) => f.onChange(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]"
                >
                  {f.opts.map((o) => <option key={o.val} value={o.val}>{o.label}</option>)}
                </select>
              </div>
            ))}
            <div className="col-span-2 md:col-span-4 flex gap-2 pt-1">
              <button onClick={handleSearch} className="px-4 py-2 text-xs font-semibold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-xl transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>{s.applyFilters}</button>
              <button onClick={handleReset} className="px-4 py-2 text-xs font-semibold text-[#6B7280] border border-[#C8DFD0] rounded-xl hover:bg-[#F5F9F6] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>{s.reset}</button>
            </div>
          </div>
        )}
      </div>

      {/* Centre Cards Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <CentreCard key={c.id} centre={c} s={s} onView={() => setSelectedCentre(c)} />
        ))}
        {filtered.length === 0 && (
          <div className="md:col-span-2 xl:col-span-3 flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-[#C8DFD0]">
            <div className="text-5xl mb-4">🏭</div>
            <p className="text-base font-bold text-[#1A2B4A] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>No centres found</p>
            <p className="text-sm text-[#9CA3AF] mb-4">Try changing your search or filters.</p>
            <button onClick={handleReset} className="px-5 py-2.5 text-sm font-semibold text-[#1A7A3C] border border-[#C8DFD0] rounded-xl hover:bg-[#E8F5EE] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>Clear Filters</button>
          </div>
        )}
      </div>

      {/* Utilization Chart */}
      <UtilChart centres={ALL_CENTRES} s={s} />

      {/* Footer */}
      <div className="text-center py-2 border-t border-[#C8DFD0]">
        <p className="text-[10px] text-[#9CA3AF]">KisanQ Admin · SIH 2026 Prototype · Team Viksit Innovators · All centre data is demo only</p>
      </div>

      {/* Details drawer */}
      {selectedCentre && (
        <CentreDrawer
          centre={selectedCentre}
          lang={lang}
          onClose={() => setSelectedCentre(null)}
        />
      )}
    </div>
  );
}
