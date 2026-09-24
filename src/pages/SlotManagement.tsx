import { useState } from "react";

type Lang = "en" | "hi";
type SlotStatus = "Available" | "Limited" | "Full" | "Closed";
type CalView = "week" | "day";

const S = {
  en: {
    title: "Slot Management",
    subtitle: "Manage procurement slots and monitor booking capacity.",
    lang: "हिन्दी",
    demo: "Demo data",
    demoNote: "All data shown is demo/fictional — not connected to any real government system.",
    centreSelector: "Centre",
    dateSelected: "24 September 2026",
    // Slot cards
    capacity: "Capacity",
    booked: "Booked",
    available: "Available",
    statusLabel: "Status",
    viewBookings: "View Bookings",
    editSlot: "Edit Slot",
    available_badge: "Available",
    limited_badge: "Limited",
    full_badge: "Full",
    closed_badge: "Closed",
    // Create slot
    createSlot: "+ Create New Slot",
    createTitle: "Create New Slot",
    createSub: "Add a new procurement slot for this centre.",
    centreLabel: "Centre",
    dateLabel: "Date",
    startTime: "Start Time",
    endTime: "End Time",
    maxFarmers: "Maximum Farmers",
    slotStatus: "Slot Status",
    createBtn: "Create Slot",
    cancelBtn: "Cancel",
    // Edit slot
    editTitle: "Edit Slot",
    saveBtn: "Save Changes",
    // Booking table
    bookingsTitle: "Slot Bookings",
    bookingsSub: "Farmers booked in selected slot · Demo data",
    allSlots: "All Slots",
    token: "Token",
    farmer: "Farmer",
    crop: "Crop",
    qty: "Quantity",
    slot: "Slot",
    statusCol: "Status",
    confirmed: "Confirmed",
    pending: "Pending",
    // Capacity insight
    insightTitle: "Slot Capacity Insight",
    currentBookings: "Current Bookings",
    estQueue: "Estimated Queue",
    estWait: "Estimated Waiting",
    insightNote: "Slot availability may change as bookings and centre workload change.",
    utilization: "Utilization",
    // Smart alert
    alertTitle: "Smart Slot Recommendation",
    alertMsg: "Centre B has higher availability during the 1:00 PM slot.",
    viewRec: "View Recommendation",
    recNote: "This is a demo recommendation. Not based on live data.",
    // Calendar
    calTitle: "Weekly Overview",
    week: "Week",
    day: "Day",
    bookingsCount: "bookings",
    today: "Today",
    // Overview KPIs
    totalSlots: "Total Slots",
    totalBooked: "Total Booked",
    totalAvail: "Total Available",
    avgUtil: "Avg Utilization",
  },
  hi: {
    title: "स्लॉट प्रबंधन",
    subtitle: "खरीद स्लॉट प्रबंधित करें और बुकिंग क्षमता की निगरानी करें।",
    lang: "English",
    demo: "डेमो डेटा",
    demoNote: "यहाँ दिखाया गया सभी डेटा डेमो/काल्पनिक है — किसी सरकारी प्रणाली से जुड़ा नहीं है।",
    centreSelector: "केंद्र",
    dateSelected: "24 सितंबर 2026",
    capacity: "क्षमता",
    booked: "बुक",
    available: "उपलब्ध",
    statusLabel: "स्थिति",
    viewBookings: "बुकिंग देखें",
    editSlot: "स्लॉट संपादित करें",
    available_badge: "उपलब्ध",
    limited_badge: "सीमित",
    full_badge: "भरा",
    closed_badge: "बंद",
    createSlot: "+ नया स्लॉट बनाएं",
    createTitle: "नया स्लॉट बनाएं",
    createSub: "इस केंद्र के लिए एक नया खरीद स्लॉट जोड़ें।",
    centreLabel: "केंद्र",
    dateLabel: "तिथि",
    startTime: "शुरू समय",
    endTime: "समाप्ति समय",
    maxFarmers: "अधिकतम किसान",
    slotStatus: "स्लॉट स्थिति",
    createBtn: "स्लॉट बनाएं",
    cancelBtn: "रद्द करें",
    editTitle: "स्लॉट संपादित करें",
    saveBtn: "बदलाव सहेजें",
    bookingsTitle: "स्लॉट बुकिंग",
    bookingsSub: "चयनित स्लॉट में बुक किए गए किसान · डेमो डेटा",
    allSlots: "सभी स्लॉट",
    token: "टोकन",
    farmer: "किसान",
    crop: "फसल",
    qty: "मात्रा",
    slot: "स्लॉट",
    statusCol: "स्थिति",
    confirmed: "पुष्टि",
    pending: "लंबित",
    insightTitle: "स्लॉट क्षमता अंतर्दृष्टि",
    currentBookings: "वर्तमान बुकिंग",
    estQueue: "अनुमानित कतार",
    estWait: "अनुमानित प्रतीक्षा",
    insightNote: "बुकिंग और केंद्र कार्यभार के अनुसार स्लॉट उपलब्धता बदल सकती है।",
    utilization: "उपयोगिता",
    alertTitle: "स्मार्ट स्लॉट सुझाव",
    alertMsg: "केंद्र B में 1:00 PM स्लॉट पर अधिक उपलब्धता है।",
    viewRec: "सुझाव देखें",
    recNote: "यह एक डेमो सुझाव है। लाइव डेटा पर आधारित नहीं है।",
    calTitle: "साप्ताहिक अवलोकन",
    week: "सप्ताह",
    day: "दिन",
    bookingsCount: "बुकिंग",
    today: "आज",
    totalSlots: "कुल स्लॉट",
    totalBooked: "कुल बुक",
    totalAvail: "कुल उपलब्ध",
    avgUtil: "औसत उपयोगिता",
  },
};

// ─── Demo data ─────────────────────────────────────────────────────────────────
const CENTRES = ["Centre A", "Centre B", "Centre C", "Centre D", "Centre E", "Centre F"];

const DATES = [
  { label: "23 Sep", dayName: "Mon", bookings: 52 },
  { label: "24 Sep", dayName: "Tue", bookings: 59, isSelected: true },
  { label: "25 Sep", dayName: "Wed", bookings: 44 },
  { label: "26 Sep", dayName: "Thu", bookings: 38 },
  { label: "27 Sep", dayName: "Fri", bookings: 47 },
  { label: "28 Sep", dayName: "Sat", bookings: 21 },
];

const SLOTS_DATA = [
  { id: "s1", time: "09:30 AM – 10:00 AM", timeShort: "09:30 AM", capacity: 20, booked: 12, status: "Available" as SlotStatus },
  { id: "s2", time: "10:30 AM – 11:00 AM", timeShort: "10:30 AM", capacity: 25, booked: 17, status: "Available" as SlotStatus },
  { id: "s3", time: "11:30 AM – 12:00 PM", timeShort: "11:30 AM", capacity: 25, booked: 20, status: "Limited" as SlotStatus },
  { id: "s4", time: "01:00 PM – 01:30 PM", timeShort: "01:00 PM", capacity: 20, booked: 10, status: "Available" as SlotStatus },
];

const BOOKINGS = [
  { token: "Q-018", farmer: "Ramesh Kumar", crop: "Wheat", qty: "50 Qtl", slot: "10:30 AM", status: "Confirmed" },
  { token: "Q-019", farmer: "Suresh Patel", crop: "Wheat", qty: "35 Qtl", slot: "10:30 AM", status: "Confirmed" },
  { token: "Q-020", farmer: "Amit Sharma", crop: "Rice", qty: "40 Qtl", slot: "11:30 AM", status: "Pending" },
  { token: "Q-021", farmer: "Mohan Singh", crop: "Wheat", qty: "28 Qtl", slot: "09:30 AM", status: "Confirmed" },
  { token: "Q-022", farmer: "Priya Devi", crop: "Soybean", qty: "32 Qtl", slot: "01:00 PM", status: "Confirmed" },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function slotStyle(status: SlotStatus) {
  if (status === "Available") return { color: "#1A7A3C", bg: "#E8F5EE", bar: "#1A7A3C" };
  if (status === "Limited") return { color: "#E8960A", bg: "#FEF3C7", bar: "#E8960A" };
  if (status === "Full") return { color: "#C8332A", bg: "#FEF2F2", bar: "#C8332A" };
  return { color: "#6B7280", bg: "#F3F4F6", bar: "#9CA3AF" };
}

function statusBadgeLabel(status: string, s: typeof S["en"]) {
  if (status === "Available") return s.available_badge;
  if (status === "Limited") return s.limited_badge;
  if (status === "Full") return s.full_badge;
  if (status === "Closed") return s.closed_badge;
  if (status === "Confirmed") return s.confirmed;
  return s.pending;
}

// ─── Create/Edit Slot Modal ────────────────────────────────────────────────────
function SlotModal({
  mode,
  slot,
  centre,
  s,
  onClose,
}: {
  mode: "create" | "edit";
  slot?: typeof SLOTS_DATA[0];
  centre: string;
  s: typeof S["en"];
  onClose: () => void;
}) {
  const isEdit = mode === "edit";
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(onClose, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-[#C8DFD0]" style={{ fontFamily: "Inter, sans-serif" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8F5EE]">
          <div>
            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>
              {isEdit ? s.editTitle : s.createTitle}
            </p>
            {!isEdit && <p className="text-[10px] text-[#9CA3AF]">{s.createSub}</p>}
            {isEdit && slot && <p className="text-[10px] text-[#9CA3AF]">{slot.time}</p>}
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>

        {showSuccess ? (
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#E8F5EE] flex items-center justify-center text-2xl mb-3">✅</div>
            <p className="text-sm font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>
              {isEdit ? "Slot Updated" : "Slot Created"}
            </p>
            <p className="text-xs text-[#9CA3AF] mt-1">Demo only — no data was actually saved.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Centre */}
            <div>
              <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>{s.centreLabel}</label>
              <select defaultValue={centre} className="w-full px-3 py-2.5 text-sm border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]">
                {CENTRES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            {/* Date */}
            <div>
              <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>{s.dateLabel}</label>
              <input type="date" defaultValue="2026-09-24" className="w-full px-3 py-2.5 text-sm border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]" />
            </div>
            {/* Time row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>{s.startTime}</label>
                <input type="time" defaultValue={slot ? slot.timeShort.replace(" AM","").replace(" PM","") : "09:30"} className="w-full px-3 py-2.5 text-sm border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>{s.endTime}</label>
                <input type="time" defaultValue="10:00" className="w-full px-3 py-2.5 text-sm border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]" />
              </div>
            </div>
            {/* Max farmers + status row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>{s.maxFarmers}</label>
                <input type="number" defaultValue={slot?.capacity ?? 25} min={1} max={100} className="w-full px-3 py-2.5 text-sm border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>{s.slotStatus}</label>
                <select defaultValue={slot?.status ?? "Available"} className="w-full px-3 py-2.5 text-sm border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]">
                  {["Available","Limited","Full","Closed"].map((opt) => <option key={opt}>{opt}</option>)}
                </select>
              </div>
            </div>
            <p className="text-[9px] text-[#9CA3AF]">Demo prototype — no data will be saved.</p>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={onClose} className="flex-1 py-2.5 text-sm font-semibold text-[#6B7280] border border-[#C8DFD0] rounded-xl hover:bg-[#F5F9F6] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>{s.cancelBtn}</button>
              <button type="submit" className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-xl transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
                {isEdit ? s.saveBtn : s.createBtn}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Recommendation Panel ──────────────────────────────────────────────────────
function RecPanel({ s, onClose }: { s: typeof S["en"]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-[#C8DFD0] p-6" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>💡 {s.alertTitle}</p>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="bg-[#E8F5EE] rounded-xl p-4 mb-4">
          <p className="text-sm font-semibold text-[#1A7A3C] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>{s.alertMsg}</p>
          <div className="space-y-2">
            {[
              { time: "10:30 AM", util: 68, color: "#E8960A" },
              { time: "01:00 PM", util: 50, color: "#1A7A3C" },
            ].map((slot) => (
              <div key={slot.time} className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#1A2B4A] w-16">{slot.time}</span>
                <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${slot.util}%`, background: slot.color }} />
                </div>
                <span className="text-[10px] font-bold" style={{ color: slot.color, fontFamily: "Poppins, sans-serif" }}>{slot.util}%</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[9px] text-[#9CA3AF] mb-4">{s.recNote}</p>
        <button onClick={onClose} className="w-full py-2.5 text-sm font-semibold text-[#1A7A3C] border border-[#C8DFD0] rounded-xl hover:bg-[#E8F5EE] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>Close</button>
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function SlotManagement({ lang: initLang = "en" }: { lang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initLang);
  const [selectedCentre, setSelectedCentre] = useState("Centre B");
  const [selectedDate, setSelectedDate] = useState(1); // index in DATES
  const [calView, setCalView] = useState<CalView>("week");
  const [activeBookingSlot, setActiveBookingSlot] = useState<string>("all");
  const [modal, setModal] = useState<null | { mode: "create" | "edit"; slot?: typeof SLOTS_DATA[0] }>(null);
  const [showRec, setShowRec] = useState(false);

  const s = S[lang];

  // Filtered bookings
  const filteredBookings = activeBookingSlot === "all"
    ? BOOKINGS
    : BOOKINGS.filter((b) => b.slot === activeBookingSlot);

  // Aggregate stats
  const totalBooked = SLOTS_DATA.reduce((a, sl) => a + sl.booked, 0);
  const totalCap = SLOTS_DATA.reduce((a, sl) => a + sl.capacity, 0);
  const totalAvail = totalCap - totalBooked;
  const avgUtil = Math.round((totalBooked / totalCap) * 100);

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
        <div className="flex items-center gap-2">
          <button
            onClick={() => setModal({ mode: "create" })}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white bg-[#1A7A3C] hover:bg-[#145F2F] transition-colors shadow-sm"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {s.createSlot}
          </button>
        </div>
      </div>

      {/* Smart Slot Alert */}
      <div className="bg-gradient-to-r from-[#E8F5EE] to-[#EFF6FF] border border-[#C8DFD0] rounded-xl px-4 py-3 flex items-center gap-3">
        <span className="text-xl flex-shrink-0">💡</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.alertTitle}</p>
          <p className="text-[10px] text-[#6B7280]">{s.alertMsg}</p>
        </div>
        <button
          onClick={() => setShowRec(true)}
          className="flex-shrink-0 text-[10px] font-bold text-[#1A7A3C] border border-[#C8DFD0] bg-white rounded-xl px-3 py-1.5 hover:bg-[#E8F5EE] transition-colors whitespace-nowrap"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {s.viewRec}
        </button>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: s.totalSlots, value: `${SLOTS_DATA.length}`, icon: "🕐", color: "#1A7A3C", bg: "#E8F5EE" },
          { label: s.totalBooked, value: `${totalBooked}`, icon: "📋", color: "#2563EB", bg: "#EFF6FF" },
          { label: s.totalAvail, value: `${totalAvail}`, icon: "✅", color: "#1A7A3C", bg: "#E8F5EE" },
          { label: s.avgUtil, value: `${avgUtil}%`, icon: "📊", color: "#E8960A", bg: "#FEF3C7" },
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

      {/* Centre + Date selector row */}
      <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4 shadow-sm space-y-4">
        {/* Centre selector */}
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-xs font-bold text-[#1A2B4A] flex-shrink-0" style={{ fontFamily: "Poppins, sans-serif" }}>{s.centreSelector}:</label>
          <select
            value={selectedCentre}
            onChange={(e) => setSelectedCentre(e.target.value)}
            className="px-3 py-2 text-sm font-semibold border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {CENTRES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <span className="text-[10px] text-[#9CA3AF]">Gwalior, Madhya Pradesh · Demo</span>
        </div>

        {/* Date strip */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {DATES.map((d, i) => (
            <button
              key={d.label}
              onClick={() => setSelectedDate(i)}
              className={`flex flex-col items-center px-4 py-2.5 rounded-xl border transition-all flex-shrink-0 ${
                selectedDate === i
                  ? "bg-[#1A2B4A] border-[#1A2B4A] text-white"
                  : "border-[#C8DFD0] text-[#6B7280] hover:border-[#1A7A3C] hover:bg-[#E8F5EE]"
              }`}
            >
              <span className={`text-[9px] font-semibold ${selectedDate === i ? "text-white/60" : "text-[#9CA3AF]"}`}>{d.dayName}</span>
              <span className="text-sm font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>{d.label}</span>
              <span className={`text-[9px] mt-0.5 ${selectedDate === i ? "text-white/70" : "text-[#9CA3AF]"}`}>{d.bookings} bk</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-col layout */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* Left: Slot cards */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>
              Slots — {DATES[selectedDate].label}, {selectedCentre}
            </p>
            <span className="text-[10px] text-[#9CA3AF]">{SLOTS_DATA.length} slots · Demo</span>
          </div>

          {SLOTS_DATA.map((slot) => {
            const st = slotStyle(slot.status);
            const util = Math.round((slot.booked / slot.capacity) * 100);
            return (
              <div key={slot.id} className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {/* Color top stripe */}
                <div className="h-1" style={{ background: st.bar }} />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{slot.time}</p>
                      <p className="text-[10px] text-[#9CA3AF]">{selectedCentre} · {DATES[selectedDate].label}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0" style={{ color: st.color, background: st.bg, fontFamily: "Poppins, sans-serif" }}>
                      {statusBadgeLabel(slot.status, s)}
                    </span>
                  </div>

                  {/* Stats + bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-[#6B7280]">{s.utilization}</span>
                      <span className="text-xs font-bold" style={{ color: st.color, fontFamily: "Poppins, sans-serif" }}>{util}%</span>
                    </div>
                    <div className="h-2 bg-[#E8F5EE] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${util}%`, background: st.bar }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {[
                      { label: s.capacity, val: `${slot.capacity}` },
                      { label: s.booked, val: `${slot.booked}` },
                      { label: s.available, val: `${slot.capacity - slot.booked}` },
                    ].map((item) => (
                      <div key={item.label} className="bg-[#F5F9F6] rounded-xl px-3 py-2 text-center">
                        <p className="text-[9px] text-[#9CA3AF] mb-0.5">{item.label}</p>
                        <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{item.val}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveBookingSlot(slot.timeShort)}
                      className="flex-1 py-2 text-[10px] font-semibold text-[#1A7A3C] border border-[#C8DFD0] rounded-xl hover:bg-[#E8F5EE] transition-colors"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {s.viewBookings}
                    </button>
                    <button
                      onClick={() => setModal({ mode: "edit", slot })}
                      className="flex-1 py-2 text-[10px] font-semibold text-white bg-[#1A2B4A] rounded-xl hover:bg-[#0F1E35] transition-colors"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {s.editSlot}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Capacity insight + Calendar */}
        <div className="space-y-4">
          {/* Capacity Insight */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-[#E8F5EE] flex items-center justify-between">
              <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.insightTitle}</p>
              <span className="text-[9px] text-[#9CA3AF]">{s.demo}</span>
            </div>
            <div className="p-4 space-y-4">
              {/* Main ring-ish display */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="30" fill="none" stroke="#E8F5EE" strokeWidth="10" />
                    <circle
                      cx="40" cy="40" r="30" fill="none" stroke="#1A7A3C" strokeWidth="10"
                      strokeDasharray={`${(17 / 25) * 188.5} 188.5`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-base font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>68%</span>
                    <span className="text-[8px] text-[#9CA3AF]">{s.utilization}</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  {[
                    { label: s.currentBookings, val: "17 / 25", color: "#1A7A3C" },
                    { label: s.available, val: "8", color: "#2563EB" },
                    { label: s.estQueue, val: "18", color: "#E8960A" },
                    { label: s.estWait, val: "~54 min", color: "#6B7280" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-[10px] text-[#9CA3AF]">{item.label}</span>
                      <span className="text-xs font-bold" style={{ color: item.color, fontFamily: "Poppins, sans-serif" }}>{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Slot fill bars */}
              <div className="space-y-2">
                {SLOTS_DATA.map((sl) => {
                  const st = slotStyle(sl.status);
                  const pct = Math.round((sl.booked / sl.capacity) * 100);
                  return (
                    <div key={sl.id}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[9px] text-[#6B7280]">{sl.timeShort}</span>
                        <span className="text-[9px] font-bold" style={{ color: st.color }}>{sl.booked}/{sl.capacity}</span>
                      </div>
                      <div className="h-1.5 bg-[#E8F5EE] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: st.bar }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-[9px] text-[#9CA3AF] leading-relaxed border-t border-[#E8F5EE] pt-3">{s.insightNote}</p>
            </div>
          </div>

          {/* Calendar overview */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-[#E8F5EE] flex items-center justify-between">
              <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.calTitle}</p>
              <div className="flex gap-1">
                {(["week", "day"] as CalView[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setCalView(v)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-colors ${calView === v ? "bg-[#1A2B4A] text-white" : "text-[#6B7280] hover:bg-[#F5F9F6]"}`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {v === "week" ? s.week : s.day}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4">
              {calView === "week" ? (
                <div className="grid grid-cols-6 gap-1.5">
                  {DATES.filter((_, i) => i < 6).map((d, i) => {
                    const isSelected = selectedDate === i;
                    const maxBk = Math.max(...DATES.map((x) => x.bookings));
                    const pct = (d.bookings / maxBk) * 100;
                    const barColor = d.bookings > 50 ? "#E8960A" : "#1A7A3C";
                    return (
                      <button
                        key={d.label}
                        onClick={() => setSelectedDate(i)}
                        className={`flex flex-col items-center p-2 rounded-xl border transition-all ${isSelected ? "border-[#1A2B4A] bg-[#1A2B4A]" : "border-[#E8F5EE] hover:border-[#C8DFD0] hover:bg-[#F5F9F6]"}`}
                      >
                        <span className={`text-[9px] font-semibold mb-1 ${isSelected ? "text-white/60" : "text-[#9CA3AF]"}`}>{d.dayName}</span>
                        {/* mini bar */}
                        <div className="w-full h-8 flex flex-col justify-end mb-1">
                          <div className="w-full rounded-t-sm" style={{ height: `${pct}%`, background: isSelected ? "rgba(255,255,255,0.3)" : barColor, minHeight: 3 }} />
                        </div>
                        <span className={`text-[9px] font-bold ${isSelected ? "text-white" : "text-[#1A2B4A]"}`} style={{ fontFamily: "Poppins, sans-serif" }}>{d.bookings}</span>
                        <span className={`text-[8px] ${isSelected ? "text-white/50" : "text-[#9CA3AF]"}`}>{s.bookingsCount}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{DATES[selectedDate].label} — {selectedCentre}</p>
                  {SLOTS_DATA.map((sl) => {
                    const st = slotStyle(sl.status);
                    return (
                      <div key={sl.id} className="flex items-center gap-2 p-2 rounded-xl bg-[#F5F9F6] border border-[#E8F5EE]">
                        <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ background: st.bar }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-[#1A2B4A] truncate" style={{ fontFamily: "Poppins, sans-serif" }}>{sl.time}</p>
                          <p className="text-[9px] text-[#9CA3AF]">{sl.booked}/{sl.capacity}</p>
                        </div>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ color: st.color, background: st.bg }}>
                          {statusBadgeLabel(sl.status, s)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Table */}
      <div className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E8F5EE] flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.bookingsTitle}</p>
            <p className="text-[10px] text-[#9CA3AF]">{s.bookingsSub}</p>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            <button
              onClick={() => setActiveBookingSlot("all")}
              className={`px-3 py-1.5 text-[10px] font-bold rounded-xl border transition-colors ${activeBookingSlot === "all" ? "bg-[#1A2B4A] text-white border-[#1A2B4A]" : "text-[#6B7280] border-[#C8DFD0] hover:bg-[#F5F9F6]"}`}
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {s.allSlots}
            </button>
            {SLOTS_DATA.map((sl) => (
              <button
                key={sl.id}
                onClick={() => setActiveBookingSlot(sl.timeShort)}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-xl border transition-colors ${activeBookingSlot === sl.timeShort ? "bg-[#1A2B4A] text-white border-[#1A2B4A]" : "text-[#6B7280] border-[#C8DFD0] hover:bg-[#F5F9F6]"}`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {sl.timeShort}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F5F9F6]">
                {[s.token, s.farmer, s.crop, s.qty, s.slot, s.statusCol].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8F5EE]">
              {filteredBookings.map((b) => {
                const isConf = b.status === "Confirmed";
                return (
                  <tr key={b.token} className="hover:bg-[#F5F9F6] transition-colors">
                    <td className="px-4 py-3 font-mono text-[11px] font-bold text-[#1A7A3C] whitespace-nowrap">{b.token}</td>
                    <td className="px-4 py-3 font-semibold text-[#1A2B4A] whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>{b.farmer}</td>
                    <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{b.crop}</td>
                    <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{b.qty}</td>
                    <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap font-medium">{b.slot}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                        style={{
                          color: isConf ? "#1A7A3C" : "#E8960A",
                          background: isConf ? "#E8F5EE" : "#FEF3C7",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        {statusBadgeLabel(b.status, s)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-[#E8F5EE] flex items-center justify-between">
          <span className="text-xs text-[#9CA3AF]">Showing {filteredBookings.length} of {BOOKINGS.length} bookings</span>
          <span className="text-[9px] text-[#9CA3AF]">Demo data only</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-2 border-t border-[#C8DFD0]">
        <p className="text-[10px] text-[#9CA3AF]">KisanQ Admin · SIH 2026 Prototype · Team Viksit Innovators · All slot data is demo only</p>
      </div>

      {/* Modals */}
      {modal && (
        <SlotModal
          mode={modal.mode}
          slot={modal.slot}
          centre={selectedCentre}
          s={s}
          onClose={() => setModal(null)}
        />
      )}
      {showRec && <RecPanel s={s} onClose={() => setShowRec(false)} />}
    </div>
  );
}
