import { useState } from "react";

type Lang = "en" | "hi";
type Step = "booking" | "confirming" | "token";

// ─── Strings ─────────────────────────────────────────────────────────────────
const S = {
  en: {
    title: "Book Your Procurement Slot",
    subtitle: "Choose a suitable time and get your virtual token.",
    langToggle: "हिन्दी",
    // Centre card
    centre: "Gwalior Procurement Centre B",
    distLabel: "Distance",
    distVal: "8.2 km",
    travelLabel: "Est. Travel",
    travelVal: "25 min",
    queueLabel: "Current Queue",
    queueVal: "18 farmers",
    waitLabel: "Est. Waiting",
    waitVal: "~54 min",
    capacityLabel: "Capacity",
    capacityVal: "36%",
    changeCentre: "Change Centre",
    // Date
    dateTitle: "Select Date",
    dates: [
      { label: "23 Sep", sub: "Wed" },
      { label: "24 Sep", sub: "Thu" },
      { label: "25 Sep", sub: "Fri" },
      { label: "26 Sep", sub: "Sat" },
    ],
    // Slots
    slotsTitle: "Available Time Slots",
    slotsAvail: "slots available",
    estQueue: "Est. queue",
    farmers: "farmers",
    slots: [
      { time: "09:30 AM – 10:00 AM", avail: 12, queue: 12 },
      { time: "10:30 AM – 11:00 AM", avail: 8, queue: 18 },
      { time: "11:30 AM – 12:00 PM", avail: 5, queue: 27 },
      { time: "01:00 PM – 01:30 PM", avail: 10, queue: 14 },
    ],
    // Confirmation card
    confirmTitle: "Selected Slot",
    confirmDate: "24 September 2026",
    arrivalLabel: "Est. arrival",
    arrivalVal: "10:20 AM",
    waitEstLabel: "Est. waiting",
    waitEstVal: "~54 min",
    estimateNote: "Times are estimates and may change based on centre workload.",
    confirmBtn: "Confirm Slot",
    confirming: "Confirming...",
    // Token screen
    tokenLabel: "Virtual Token",
    tokenNum: "Q-024",
    statusLabel: "Slot Confirmed",
    centreLabel: "Centre",
    dateLabel: "Date",
    slotLabel: "Slot",
    queuePosLabel: "Queue Position",
    queuePos: "19",
    aheadLabel: "Farmers Ahead",
    aheadVal: "18",
    travelTimeLabel: "Est. Travel",
    departureLabel: "Recommended Departure",
    departureVal: "Leave around 9:35 AM",
    departureNote:
      "Based on estimated travel time and current queue.",
    uspMsg:
      "Your token helps you plan your visit instead of waiting unnecessarily at the centre.",
    viewQueue: "View Live Queue",
    viewDetails: "View Booking Details",
    qrTitle: "Show at Centre",
    qrNote:
      "Show this token at the procurement centre. (Demo — not connected to any government system.)",
    notif: "Your slot and virtual token have been confirmed.",
    backBtn: "← Back to Slots",
    estimate: "* Queue and waiting times are estimates, not guarantees.",
  },
  hi: {
    title: "अपना खरीद स्लॉट बुक करें",
    subtitle: "उपयुक्त समय चुनें और अपना वर्चुअल टोकन प्राप्त करें।",
    langToggle: "English",
    centre: "ग्वालियर खरीद केंद्र B",
    distLabel: "दूरी",
    distVal: "8.2 km",
    travelLabel: "अनुमानित यात्रा",
    travelVal: "25 मिनट",
    queueLabel: "वर्तमान कतार",
    queueVal: "18 किसान",
    waitLabel: "अनुमानित प्रतीक्षा",
    waitVal: "~54 मिनट",
    capacityLabel: "क्षमता",
    capacityVal: "36%",
    changeCentre: "केंद्र बदलें",
    dateTitle: "तारीख चुनें",
    dates: [
      { label: "23 सित", sub: "बुध" },
      { label: "24 सित", sub: "गुरु" },
      { label: "25 सित", sub: "शुक्र" },
      { label: "26 सित", sub: "शनि" },
    ],
    slotsTitle: "उपलब्ध समय स्लॉट",
    slotsAvail: "स्लॉट उपलब्ध",
    estQueue: "अनुमानित कतार",
    farmers: "किसान",
    slots: [
      { time: "09:30 AM – 10:00 AM", avail: 12, queue: 12 },
      { time: "10:30 AM – 11:00 AM", avail: 8, queue: 18 },
      { time: "11:30 AM – 12:00 PM", avail: 5, queue: 27 },
      { time: "01:00 PM – 01:30 PM", avail: 10, queue: 14 },
    ],
    confirmTitle: "चुना हुआ स्लॉट",
    confirmDate: "24 सितंबर 2026",
    arrivalLabel: "अनुमानित पहुंच",
    arrivalVal: "10:20 AM",
    waitEstLabel: "अनुमानित प्रतीक्षा",
    waitEstVal: "~54 मिनट",
    estimateNote: "समय अनुमानित हैं और केंद्र के कार्यभार के आधार पर बदल सकते हैं।",
    confirmBtn: "स्लॉट कन्फर्म करें",
    confirming: "कन्फर्म हो रहा है...",
    tokenLabel: "वर्चुअल टोकन",
    tokenNum: "Q-024",
    statusLabel: "स्लॉट पुष्टि",
    centreLabel: "केंद्र",
    dateLabel: "तारीख",
    slotLabel: "स्लॉट",
    queuePosLabel: "कतार स्थिति",
    queuePos: "19",
    aheadLabel: "आगे किसान",
    aheadVal: "18",
    travelTimeLabel: "अनुमानित यात्रा",
    departureLabel: "अनुशंसित प्रस्थान",
    departureVal: "लगभग 9:35 AM पर निकलें",
    departureNote: "अनुमानित यात्रा समय और वर्तमान कतार के आधार पर।",
    uspMsg:
      "आपका टोकन केंद्र पर अनावश्यक प्रतीक्षा के बजाय अपनी यात्रा की योजना बनाने में मदद करता है।",
    viewQueue: "लाइव कतार देखें",
    viewDetails: "बुकिंग विवरण देखें",
    qrTitle: "केंद्र पर दिखाएं",
    qrNote: "खरीद केंद्र पर यह टोकन दिखाएं। (डेमो — किसी सरकारी प्रणाली से जुड़ा नहीं।)",
    notif: "आपका स्लॉट और वर्चुअल टोकन पुष्टि हो गए हैं।",
    backBtn: "← स्लॉट पर वापस",
    estimate: "* कतार और प्रतीक्षा समय अनुमानित हैं, गारंटी नहीं।",
  },
};

// ─── Demo QR SVG (decorative, not a real QR code) ────────────────────────────
function DemoQR() {
  const size = 7;
  const pattern = [
    [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,0,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,0,1,0,1,1,0,1,0,1],
    [0,1,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0],
    [1,1,0,1,0,1,1,1,0,0,1,1,0,0,1,0,1],
    [0,0,0,0,0,0,0,0,1,1,0,0,1,0,1,1,0],
    [1,1,1,1,1,1,1,0,0,1,0,1,0,1,0,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0],
    [1,0,1,1,1,0,1,0,0,0,1,1,0,1,0,1,1],
    [1,0,1,1,1,0,1,0,1,0,0,0,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,0,1,0,1,0],
    [1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,0,1],
  ];
  return (
    <svg
      width={pattern[0].length * size}
      height={pattern.length * size}
      viewBox={`0 0 ${pattern[0].length * size} ${pattern.length * size}`}
    >
      {pattern.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect
              key={`${r}-${c}`}
              x={c * size}
              y={r * size}
              width={size}
              height={size}
              fill="#1A2B4A"
            />
          ) : null
        )
      )}
    </svg>
  );
}

// ─── Capacity bar ─────────────────────────────────────────────────────────────
function CapBar({ pct }: { pct: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex-1 h-1.5 rounded-full bg-[#E8F5EE] overflow-hidden">
        <div className="h-full rounded-full bg-[#1A7A3C]" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins,sans-serif" }}>
        {pct}%
      </span>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function SlotBooking({
  onBack,
  onViewQueue,
  initialLang = "en",
}: {
  onBack: () => void;
  onViewQueue?: () => void;
  initialLang?: Lang;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [step, setStep] = useState<Step>("booking");
  const [selectedDate, setSelectedDate] = useState(1); // 24 Sep default
  const [selectedSlot, setSelectedSlot] = useState<number | null>(1); // 10:30 default
  const [confirming, setConfirming] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const s = S[lang];

  const handleConfirm = async () => {
    setConfirming(true);
    await new Promise((r) => setTimeout(r, 1500));
    setConfirming(false);
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 4000);
    setStep("token");
  };

  const chosenSlot = selectedSlot !== null ? s.slots[selectedSlot] : null;

  // ── Availability colour helper
  const availColor = (n: number) =>
    n >= 10 ? "text-[#1A7A3C]" : n >= 6 ? "text-[#E8960A]" : "text-[#C8332A]";
  const availBg = (n: number) =>
    n >= 10 ? "bg-[#E8F5EE]" : n >= 6 ? "bg-[#FEF3C7]" : "bg-[#FEF2F2]";

  // ── TOKEN SCREEN ──────────────────────────────────────────────────────────
  if (step === "token") {
    return (
      <div className="pb-6">
        {/* Header */}
        <div className="bg-white border-b border-[#C8DFD0] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep("booking")}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280]"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
              {s.tokenLabel}
            </p>
          </div>
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="px-3 py-1.5 rounded-full border border-[#C8DFD0] text-xs font-semibold text-[#1A7A3C] hover:bg-[#E8F5EE] transition-colors"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            {s.langToggle}
          </button>
        </div>

        {/* Toast */}
        {showNotif && (
          <div className="mx-4 mt-3 flex items-center gap-3 px-4 py-3 bg-[#1A7A3C] text-white rounded-xl text-xs font-medium">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="8" fill="rgba(255,255,255,0.2)" />
              <path d="M4 8l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {s.notif}
          </div>
        )}

        <div className="px-4 pt-4 space-y-4 max-w-lg mx-auto">
          {/* Token hero card */}
          <div
            className="rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(26,122,60,0.2)]"
            style={{ background: "linear-gradient(145deg,#145F2F 0%,#1A7A3C 50%,#2E9952 100%)" }}
          >
            {/* Status bar */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                <span
                  className="text-xs font-bold text-white"
                  style={{ fontFamily: "Poppins,sans-serif" }}
                >
                  {s.statusLabel}
                </span>
              </div>
              <span className="text-[10px] text-white/60 font-medium">KisanQ · SIH26032</span>
            </div>

            {/* Token number */}
            <div className="px-5 pb-4 flex items-end justify-between">
              <div>
                <p className="text-[10px] text-white/60 mb-1 uppercase tracking-widest">
                  {s.tokenLabel}
                </p>
                <p
                  className="text-6xl font-bold text-white tracking-tight leading-none"
                  style={{ fontFamily: "Poppins,sans-serif" }}
                >
                  {s.tokenNum}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-white/60 mb-1">{s.queuePosLabel}</p>
                <p className="text-3xl font-bold text-white" style={{ fontFamily: "Poppins,sans-serif" }}>
                  #{s.queuePos}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="mx-5 border-t border-white/20 mb-4" />

            {/* Details grid */}
            <div className="px-5 pb-5 grid grid-cols-2 gap-y-3 gap-x-4">
              {[
                { label: s.centreLabel, val: s.centre },
                { label: s.dateLabel, val: s.confirmDate },
                { label: s.slotLabel, val: chosenSlot?.time ?? s.slots[1].time },
                { label: s.aheadLabel, val: `${s.aheadVal} ${lang === "en" ? "farmers" : "किसान"}` },
                { label: s.waitLabel, val: s.waitVal },
                { label: s.travelTimeLabel, val: s.travelVal },
              ].map((row) => (
                <div key={row.label}>
                  <p className="text-[9px] text-white/50 mb-0.5 uppercase tracking-wider">{row.label}</p>
                  <p className="text-xs font-semibold text-white leading-tight" style={{ fontFamily: "Poppins,sans-serif" }}>
                    {row.val}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* USP message */}
          <div className="bg-[#E8F5EE] border border-[#C8DFD0] rounded-2xl px-4 py-3 flex gap-3">
            <span className="text-xl flex-shrink-0 mt-0.5">💡</span>
            <p className="text-xs text-[#1A7A3C] leading-relaxed" style={{ fontFamily: "Poppins,sans-serif" }}>
              {s.uspMsg}
            </p>
          </div>

          {/* Departure card */}
          <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🕐</span>
              <p className="text-xs font-bold text-[#92400E]" style={{ fontFamily: "Poppins,sans-serif" }}>
                {s.departureLabel}
              </p>
            </div>
            <p className="text-xl font-bold text-[#92400E] mb-1" style={{ fontFamily: "Poppins,sans-serif" }}>
              {s.departureVal}
            </p>
            <p className="text-[10px] text-[#92400E]/70">{s.departureNote}</p>
          </div>

          {/* Queue stats */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4">
            <p className="text-xs font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins,sans-serif" }}>
              {s.queueLabel}
            </p>
            <div className="flex items-center gap-3 mb-3">
              {/* Queue visual */}
              <div className="flex gap-1 flex-wrap flex-1">
                {Array.from({ length: 19 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-sm ${
                      i < 18
                        ? "bg-[#E8F5EE] border border-[#C8DFD0]"
                        : "bg-[#1A7A3C] border border-[#1A7A3C]"
                    }`}
                    title={i === 18 ? "You" : `#${i + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#E8F5EE] border border-[#C8DFD0]" />
                <span className="text-[#6B7280]">{lang === "en" ? "Others" : "अन्य"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#1A7A3C]" />
                <span className="text-[#6B7280]">{lang === "en" ? "You (Q-024)" : "आप (Q-024)"}</span>
              </div>
            </div>
            <p className="text-[10px] text-[#9CA3AF] mt-2 italic">{s.estimate}</p>
          </div>

          {/* QR section */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 flex flex-col items-center">
            <p className="text-xs font-bold text-[#1A2B4A] mb-4" style={{ fontFamily: "Poppins,sans-serif" }}>
              🏭 {s.qrTitle}
            </p>
            <div className="p-3 bg-white border-2 border-[#C8DFD0] rounded-xl mb-3">
              <DemoQR />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-2xl font-bold text-[#1A7A3C] tracking-widest"
                style={{ fontFamily: "Poppins,sans-serif" }}
              >
                {s.tokenNum}
              </span>
            </div>
            <p className="text-[10px] text-[#9CA3AF] text-center max-w-[220px] leading-relaxed">
              {s.qrNote}
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={onViewQueue}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.99]"
              style={{
                fontFamily: "Poppins,sans-serif",
                background: "linear-gradient(135deg,#145F2F 0%,#1A7A3C 100%)",
                boxShadow: "0 2px 12px rgba(26,122,60,0.3)",
              }}
            >
              {s.viewQueue}
            </button>
            <button
              onClick={() => setStep("booking")}
              className="w-full py-3 rounded-xl text-sm font-semibold text-[#1A7A3C] border-2 border-[#C8DFD0] hover:bg-[#E8F5EE] transition-colors"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              {s.viewDetails}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── BOOKING SCREEN ────────────────────────────────────────────────────────
  return (
    <div className="pb-6">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#C8DFD0]">
        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBack}
              className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280]"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#1A2B4A] truncate" style={{ fontFamily: "Poppins,sans-serif" }}>
                {s.title}
              </p>
              <p className="text-[10px] text-[#6B7280] truncate">{s.subtitle}</p>
            </div>
          </div>
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex-shrink-0 px-3 py-1.5 rounded-full border border-[#C8DFD0] text-xs font-semibold text-[#1A7A3C] hover:bg-[#E8F5EE] transition-colors"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            {s.langToggle}
          </button>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4 max-w-lg mx-auto">
        {/* ── Selected Centre card ── */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] overflow-hidden shadow-sm">
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#E8F5EE] flex items-center justify-center text-lg flex-shrink-0">
                  🏭
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
                    {s.centre}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[10px] text-[#1A7A3C] font-semibold bg-[#E8F5EE] px-2 py-0.5 rounded-full">
                      ✦ {lang === "en" ? "Recommended" : "अनुशंसित"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onBack}
                className="text-[10px] text-[#6B7280] hover:text-[#1A7A3C] font-medium flex-shrink-0 pt-1"
                style={{ fontFamily: "Poppins,sans-serif" }}
              >
                {s.changeCentre}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              {[
                { label: s.distLabel, val: s.distVal, icon: "📍" },
                { label: s.travelLabel, val: s.travelVal, icon: "🚗" },
                { label: s.queueLabel, val: "18", icon: "👥" },
              ].map((st) => (
                <div key={st.label} className="bg-[#F5F9F6] rounded-xl px-2 py-2 text-center">
                  <span className="text-sm block mb-0.5">{st.icon}</span>
                  <p className="text-[9px] text-[#6B7280] mb-0.5">{st.label}</p>
                  <p className="text-xs font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
                    {st.val}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#6B7280]">{s.capacityLabel}</span>
                <span className="text-[10px] font-bold text-[#1A7A3C]">{s.capacityVal}</span>
              </div>
              <CapBar pct={36} />
            </div>
          </div>
        </div>

        {/* ── Date selector ── */}
        <div>
          <p className="text-xs font-bold text-[#1A2B4A] mb-2" style={{ fontFamily: "Poppins,sans-serif" }}>
            {s.dateTitle}
          </p>
          <div className="flex gap-2">
            {s.dates.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelectedDate(i)}
                className={`flex-1 py-3 rounded-xl flex flex-col items-center transition-all border-2 ${
                  selectedDate === i
                    ? "border-[#1A7A3C] bg-[#1A7A3C] text-white shadow-[0_2px_12px_rgba(26,122,60,0.25)]"
                    : "border-[#C8DFD0] bg-white text-[#1A2B4A] hover:border-[#1A7A3C]/50"
                }`}
              >
                <span
                  className="text-xs font-bold leading-none"
                  style={{ fontFamily: "Poppins,sans-serif" }}
                >
                  {d.label}
                </span>
                <span
                  className={`text-[9px] mt-0.5 ${selectedDate === i ? "text-white/70" : "text-[#9CA3AF]"}`}
                >
                  {d.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Slot cards ── */}
        <div>
          <p className="text-xs font-bold text-[#1A2B4A] mb-2" style={{ fontFamily: "Poppins,sans-serif" }}>
            {s.slotsTitle}
          </p>
          <div className="space-y-2.5">
            {s.slots.map((slot, i) => {
              const isSelected = selectedSlot === i;
              const avColor = availColor(slot.avail);
              const avBg = availBg(slot.avail);
              return (
                <button
                  key={i}
                  onClick={() => setSelectedSlot(i)}
                  className={`w-full text-left rounded-2xl border-2 p-4 transition-all ${
                    isSelected
                      ? "border-[#1A7A3C] bg-[#E8F5EE] shadow-[0_0_0_4px_rgba(26,122,60,0.08)]"
                      : "border-[#C8DFD0] bg-white hover:border-[#1A7A3C]/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Radio indicator */}
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? "border-[#1A7A3C] bg-[#1A7A3C]"
                            : "border-[#C8DFD0]"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-bold ${isSelected ? "text-[#1A7A3C]" : "text-[#1A2B4A]"}`}
                          style={{ fontFamily: "Poppins,sans-serif" }}
                        >
                          🕐 {slot.time}
                        </p>
                        <p className="text-[10px] text-[#6B7280] mt-0.5">
                          {s.estQueue}: {slot.queue} {s.farmers}
                        </p>
                      </div>
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${avBg} ${avColor}`}>
                      {slot.avail} {s.slotsAvail}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-[#C8DFD0]/60 grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-[9px] text-[#6B7280]">{s.arrivalLabel}</p>
                        <p className="text-xs font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins,sans-serif" }}>
                          {s.arrivalVal}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] text-[#6B7280]">{s.waitEstLabel}</p>
                        <p className="text-xs font-bold text-[#E8960A]" style={{ fontFamily: "Poppins,sans-serif" }}>
                          {s.waitEstVal}
                        </p>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Confirmation summary ── */}
        {selectedSlot !== null && (
          <div className="bg-white rounded-2xl border border-[#1A7A3C]/30 overflow-hidden shadow-sm">
            <div className="bg-[#F2FAF5] px-4 py-3 border-b border-[#C8DFD0]">
              <p className="text-xs font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
                {s.confirmTitle}
              </p>
            </div>
            <div className="px-4 py-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎫</span>
                <div>
                  <p className="text-base font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
                    {s.confirmDate}
                  </p>
                  <p className="text-sm text-[#1A7A3C] font-semibold">{s.slots[selectedSlot].time}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-[#F5F9F6] rounded-xl px-3 py-2.5">
                  <p className="text-[9px] text-[#6B7280] mb-0.5">{s.arrivalLabel}</p>
                  <p className="text-xs font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
                    {s.arrivalVal}
                  </p>
                </div>
                <div className="bg-[#FEF3C7] rounded-xl px-3 py-2.5">
                  <p className="text-[9px] text-[#6B7280] mb-0.5">{s.waitEstLabel}</p>
                  <p className="text-xs font-bold text-[#E8960A]" style={{ fontFamily: "Poppins,sans-serif" }}>
                    {s.waitEstVal}
                  </p>
                </div>
              </div>
              <p className="text-[10px] text-[#9CA3AF] mb-4 leading-relaxed">
                ⓘ {s.estimateNote}
              </p>
              <button
                onClick={handleConfirm}
                disabled={confirming}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.99] disabled:opacity-60"
                style={{
                  fontFamily: "Poppins,sans-serif",
                  background: confirming
                    ? "#9CA3AF"
                    : "linear-gradient(135deg,#145F2F 0%,#1A7A3C 100%)",
                  boxShadow: confirming ? "none" : "0 2px 12px rgba(26,122,60,0.3)",
                }}
              >
                {confirming ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="40 20" />
                    </svg>
                    {s.confirming}
                  </span>
                ) : (
                  `✓ ${s.confirmBtn}`
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
