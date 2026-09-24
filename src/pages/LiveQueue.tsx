import { useState, useCallback } from "react";

type Lang = "en" | "hi";

// ─── Strings ─────────────────────────────────────────────────────────────────
const S = {
  en: {
    title: "Live Queue",
    subtitle: "Track your position and plan your visit.",
    langToggle: "हिन्दी",
    // Centre card
    centre: "Gwalior Procurement Centre B",
    centreOpen: "Centre Open",
    queueLabel: "Current Queue",
    capacityLabel: "Capacity",
    lastUpdated: "Last updated",
    justNow: "just now",
    autoUpdate: "Queue updates automatically",
    farmers: "farmers",
    // Your token
    yourToken: "Your Token",
    yourPos: "Your Position",
    ahead: "Farmers Ahead",
    estWait: "Est. Waiting",
    // Queue timeline labels
    processing: "Processing",
    completed: "Done",
    waiting: "Waiting",
    youLabel: "You",
    moreInQueue: "more farmers in queue",
    // ETA
    etaTitle: "Estimated Turn",
    etaTime: "11:24 AM",
    etaNote:
      "Estimated based on current queue and average processing time.",
    etaCalc: "Last calculated: 10:30 AM",
    // Leave now
    leaveTitle: "When should I leave?",
    travelLabel: "Estimated travel",
    travelVal: "25 min",
    queueWaitLabel: "Est. queue wait",
    queueWaitVal: "54 min",
    departureLabel: "Recommended departure",
    departureVal: "9:35 AM",
    viewRoute: "View Route",
    leaveDisclaimer:
      "Travel and waiting times are estimates and may change.",
    // Alert
    alertTitle: "Queue Update",
    alertBody: "3 farmers have completed processing.",
    alertPrev: "Previous est. wait",
    alertPrevVal: "~62 min",
    alertCurr: "Current est. wait",
    alertCurrVal: "~54 min",
    dismiss: "Dismiss",
    // Status
    statusTitle: "Centre Status",
    statuses: [
      { icon: "🟢", label: "Centre Open", sub: "Demo status" },
      { icon: "🟢", label: "Procurement Active", sub: "Demo status" },
      { icon: "🟢", label: "Weighing Available", sub: "Demo status" },
      { icon: "🟡", label: "Moderate Queue", sub: "18 farmers" },
    ],
    statusNote:
      "These are prototype demo statuses, not live government data.",
    // Refresh
    refreshBtn: "Refresh Queue",
    refreshing: "Refreshing...",
    // Booking details
    bookingTitle: "Your Booking",
    dateLabel: "Date",
    dateVal: "24 September 2026",
    slotLabel: "Slot",
    slotVal: "10:30 AM – 11:00 AM",
    tokenLabel: "Token",
    viewBooking: "View Booking",
    cancelBooking: "Cancel Booking",
    // USP
    uspMsg:
      "Don't wait blindly. KisanQ gives you queue visibility so you can plan your visit.",
    // Cancel confirm
    cancelQ: "Cancel your booking?",
    cancelNote: "Are you sure? This will release your slot.",
    cancelYes: "Yes, Cancel",
    cancelNo: "No, Keep Booking",
  },
  hi: {
    title: "लाइव कतार",
    subtitle: "अपनी स्थिति ट्रैक करें और अपनी यात्रा की योजना बनाएं।",
    langToggle: "English",
    centre: "ग्वालियर खरीद केंद्र B",
    centreOpen: "केंद्र खुला है",
    queueLabel: "वर्तमान कतार",
    capacityLabel: "क्षमता",
    lastUpdated: "अंतिम अपडेट",
    justNow: "अभी",
    autoUpdate: "कतार स्वतः अपडेट होती है",
    farmers: "किसान",
    yourToken: "आपका टोकन",
    yourPos: "आपकी स्थिति",
    ahead: "आगे किसान",
    estWait: "अनुमानित प्रतीक्षा",
    processing: "प्रक्रियाधीन",
    completed: "पूर्ण",
    waiting: "प्रतीक्षा",
    youLabel: "आप",
    moreInQueue: "और किसान कतार में",
    etaTitle: "अनुमानित बारी",
    etaTime: "11:24 AM",
    etaNote:
      "वर्तमान कतार और औसत प्रसंस्करण समय के आधार पर अनुमानित।",
    etaCalc: "अंतिम गणना: 10:30 AM",
    leaveTitle: "मुझे कब निकलना चाहिए?",
    travelLabel: "अनुमानित यात्रा",
    travelVal: "25 मिनट",
    queueWaitLabel: "अनुमानित प्रतीक्षा",
    queueWaitVal: "54 मिनट",
    departureLabel: "अनुशंसित प्रस्थान",
    departureVal: "9:35 AM",
    viewRoute: "मार्ग देखें",
    leaveDisclaimer:
      "यात्रा और प्रतीक्षा समय अनुमानित हैं और बदल सकते हैं।",
    alertTitle: "कतार अपडेट",
    alertBody: "3 किसानों की प्रक्रिया पूरी हो गई।",
    alertPrev: "पिछली अनुमानित प्रतीक्षा",
    alertPrevVal: "~62 मिनट",
    alertCurr: "वर्तमान अनुमानित प्रतीक्षा",
    alertCurrVal: "~54 मिनट",
    dismiss: "ठीक है",
    statusTitle: "केंद्र स्थिति",
    statuses: [
      { icon: "🟢", label: "केंद्र खुला", sub: "डेमो स्थिति" },
      { icon: "🟢", label: "खरीद सक्रिय", sub: "डेमो स्थिति" },
      { icon: "🟢", label: "तुलाई उपलब्ध", sub: "डेमो स्थिति" },
      { icon: "🟡", label: "मध्यम कतार", sub: "18 किसान" },
    ],
    statusNote:
      "ये प्रोटोटाइप डेमो स्थितियां हैं, वास्तविक सरकारी डेटा नहीं।",
    refreshBtn: "कतार रिफ्रेश करें",
    refreshing: "रिफ्रेश हो रहा है...",
    bookingTitle: "आपकी बुकिंग",
    dateLabel: "तारीख",
    dateVal: "24 सितंबर 2026",
    slotLabel: "स्लॉट",
    slotVal: "10:30 AM – 11:00 AM",
    tokenLabel: "टोकन",
    viewBooking: "बुकिंग देखें",
    cancelBooking: "बुकिंग रद्द करें",
    uspMsg:
      "अंधेरे में न प्रतीक्षा करें। KisanQ आपको कतार की जानकारी देता है ताकि आप अपनी यात्रा की योजना बना सकें।",
    cancelQ: "बुकिंग रद्द करें?",
    cancelNote: "क्या आप सुनिश्चित हैं? इससे आपका स्लॉट रिलीज हो जाएगा।",
    cancelYes: "हां, रद्द करें",
    cancelNo: "नहीं, बुकिंग रखें",
  },
};

// ─── Queue data ───────────────────────────────────────────────────────────────
type TokenState = "done" | "processing" | "waiting" | "you" | "hidden";

function buildQueue(extra = 0): { token: string; state: TokenState }[] {
  const q: { token: string; state: TokenState }[] = [];
  const done = ["Q-006", "Q-009", "Q-012", "Q-015"];
  done.forEach((t) => q.push({ token: t, state: "done" }));
  q.push({ token: "Q-018", state: "processing" });
  ["Q-020", "Q-021", "Q-022", "Q-023"].forEach((t) =>
    q.push({ token: t, state: "waiting" })
  );
  q.push({ token: "Q-024", state: "you" });
  if (extra > 0) q.push({ token: `+${extra}`, state: "hidden" });
  return q;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function CapBar({ pct }: { pct: number }) {
  const c = pct <= 40 ? "#1A7A3C" : pct <= 70 ? "#E8960A" : "#C8332A";
  return (
    <div className="flex items-center gap-2 flex-1">
      <div className="flex-1 h-1.5 rounded-full bg-[#E8F5EE] overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: c }} />
      </div>
      <span className="text-[10px] font-bold" style={{ color: c, fontFamily: "Poppins,sans-serif" }}>
        {pct}%
      </span>
    </div>
  );
}

function PulseDot({ color = "#22C55E" }: { color?: string }) {
  return (
    <span className="relative flex-shrink-0 w-2.5 h-2.5">
      <span
        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
        style={{ background: color }}
      />
      <span
        className="relative inline-flex rounded-full w-2.5 h-2.5"
        style={{ background: color }}
      />
    </span>
  );
}

function QueueRow({ token, state, s }: { token: string; state: TokenState; s: (typeof S)["en"] }) {
  const styles: Record<TokenState, { row: string; badge: string; dot: string; label: string }> = {
    done: {
      row: "opacity-45",
      badge: "bg-[#F3F4F6] text-[#9CA3AF] line-through",
      dot: "bg-[#D1D5DB]",
      label: "text-[#9CA3AF]",
    },
    processing: {
      row: "",
      badge: "bg-[#FEF3C7] text-[#92400E] font-bold",
      dot: "bg-[#E8960A]",
      label: "text-[#E8960A] font-semibold",
    },
    waiting: {
      row: "",
      badge: "bg-[#F5F9F6] text-[#6B7280]",
      dot: "bg-[#C8DFD0]",
      label: "text-[#9CA3AF]",
    },
    you: {
      row: "bg-[#E8F5EE] rounded-xl",
      badge: "bg-[#1A7A3C] text-white font-bold",
      dot: "bg-[#1A7A3C]",
      label: "text-[#1A7A3C] font-bold",
    },
    hidden: {
      row: "opacity-50",
      badge: "bg-[#F5F9F6] text-[#9CA3AF]",
      dot: "bg-[#E5E7EB]",
      label: "text-[#9CA3AF]",
    },
  };
  const st = styles[state];
  const icon =
    state === "done"
      ? "✓"
      : state === "processing"
      ? "→"
      : state === "you"
      ? "⭐"
      : state === "hidden"
      ? "…"
      : "";
  const sublabel =
    state === "processing"
      ? s.processing
      : state === "done"
      ? s.completed
      : state === "you"
      ? s.youLabel
      : "";

  return (
    <div className={`flex items-center gap-3 px-2 py-2 ${st.row}`}>
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${st.dot}`} />
      <div className={`flex-1 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <span
            className={`text-sm px-2.5 py-1 rounded-lg ${st.badge}`}
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            {token}
          </span>
          {sublabel && (
            <span className={`text-[10px] ${st.label}`}>{sublabel}</span>
          )}
        </div>
        {icon && (
          <span className={`text-sm ${state === "you" ? "text-[#1A7A3C]" : state === "processing" ? "text-[#E8960A]" : "text-[#9CA3AF]"}`}>
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function LiveQueue({
  onBack,
  onViewBooking,
  initialLang = "en",
}: {
  onBack: () => void;
  onViewBooking?: () => void;
  initialLang?: Lang;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTick, setRefreshTick] = useState(0);
  const [showCancel, setShowCancel] = useState(false);

  const s = S[lang];

  // Dynamic values that "change" on refresh
  const dynamicData = [
    { queue: 18, wait: 54, capacity: 36, eta: "11:24 AM" },
    { queue: 16, wait: 48, capacity: 33, eta: "11:18 AM" },
    { queue: 15, wait: 45, capacity: 31, eta: "11:15 AM" },
  ];
  const d = dynamicData[refreshTick % dynamicData.length];

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setRefreshTick((t) => t + 1);
    setRefreshing(false);
    setAlertDismissed(false); // show alert again after refresh
  }, []);

  const queueRows = buildQueue(8);

  return (
    <div className="pb-6">
      {/* ── Sticky header ── */}
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
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
                  {s.title}
                </p>
                <PulseDot />
              </div>
              <p className="text-[10px] text-[#6B7280] truncate">{s.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-[#C8DFD0] hover:bg-[#E8F5EE] transition-colors disabled:opacity-50"
              title={s.refreshBtn}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className={refreshing ? "animate-spin" : ""}
              >
                <path
                  d="M12 7A5 5 0 112 7"
                  stroke="#1A7A3C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path d="M12 3v4h-4" stroke="#1A7A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="px-3 py-1.5 rounded-full border border-[#C8DFD0] text-xs font-semibold text-[#1A7A3C] hover:bg-[#E8F5EE] transition-colors"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              {s.langToggle}
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4 max-w-lg mx-auto">

        {/* ── Queue change alert ── */}
        {!alertDismissed && (
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-4 relative">
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">📢</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#1E40AF] mb-0.5" style={{ fontFamily: "Poppins,sans-serif" }}>
                  {s.alertTitle}
                </p>
                <p className="text-xs text-[#3B82F6] mb-2">{s.alertBody}</p>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-[9px] text-[#6B7280]">{s.alertPrev}</p>
                    <p className="text-sm font-bold text-[#9CA3AF] line-through" style={{ fontFamily: "Poppins,sans-serif" }}>
                      {s.alertPrevVal}
                    </p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 8h8M9 5l3 3-3 3" stroke="#1A7A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="text-center">
                    <p className="text-[9px] text-[#6B7280]">{s.alertCurr}</p>
                    <p className="text-sm font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins,sans-serif" }}>
                      {s.alertCurrVal}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setAlertDismissed(true)}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#BFDBFE]/50 text-[#3B82F6] flex-shrink-0"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ── Centre card ── */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#E8F5EE] flex items-center justify-center text-lg flex-shrink-0">
                🏭
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#1A2B4A] truncate" style={{ fontFamily: "Poppins,sans-serif" }}>
                  {s.centre}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <PulseDot />
                  <span className="text-[10px] text-[#1A7A3C] font-semibold">{s.centreOpen}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-[#F5F9F6] rounded-xl px-3 py-2.5">
              <p className="text-[9px] text-[#6B7280] mb-0.5">{s.queueLabel}</p>
              <p className="text-lg font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
                {d.queue}
                <span className="text-xs font-normal text-[#6B7280] ml-1">{s.farmers}</span>
              </p>
            </div>
            <div className="bg-[#F5F9F6] rounded-xl px-3 py-2.5">
              <p className="text-[9px] text-[#6B7280] mb-1">{s.capacityLabel}</p>
              <CapBar pct={d.capacity} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] text-[#9CA3AF]">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4" stroke="#9CA3AF" strokeWidth="1" />
                <path d="M5 3v2.5l1.5 1" stroke="#9CA3AF" strokeWidth="1" strokeLinecap="round" />
              </svg>
              {s.lastUpdated}: {refreshing ? "..." : s.justNow}
            </div>
            <span className="text-[9px] text-[#9CA3AF] italic">{s.autoUpdate}</span>
          </div>
        </div>

        {/* ── USP banner ── */}
        <div className="bg-[#1A2B4A] rounded-2xl px-4 py-3 flex items-center gap-3">
          <span className="text-xl flex-shrink-0">💡</span>
          <p className="text-xs text-white/80 leading-relaxed">{s.uspMsg}</p>
        </div>

        {/* ── Your token + ETA row ── */}
        <div className="grid grid-cols-2 gap-3">
          {/* Token */}
          <div
            className="rounded-2xl p-4 flex flex-col justify-between"
            style={{ background: "linear-gradient(145deg,#145F2F,#1A7A3C)" }}
          >
            <div>
              <p className="text-[9px] text-white/60 uppercase tracking-wider mb-1">{s.yourToken}</p>
              <p className="text-4xl font-bold text-white leading-none" style={{ fontFamily: "Poppins,sans-serif" }}>
                Q-024
              </p>
            </div>
            <div className="mt-3 space-y-1">
              <div>
                <p className="text-[8px] text-white/50">{s.yourPos}</p>
                <p className="text-lg font-bold text-white" style={{ fontFamily: "Poppins,sans-serif" }}>#19</p>
              </div>
              <div>
                <p className="text-[8px] text-white/50">{s.estWait}</p>
                <p className="text-sm font-bold text-[#86EFAC]" style={{ fontFamily: "Poppins,sans-serif" }}>~{d.wait} min</p>
              </div>
            </div>
          </div>

          {/* ETA */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4 flex flex-col justify-between shadow-sm">
            <div>
              <p className="text-[9px] text-[#6B7280] uppercase tracking-wider mb-1">{s.etaTitle}</p>
              <p className="text-3xl font-bold text-[#1A2B4A] leading-none" style={{ fontFamily: "Poppins,sans-serif" }}>
                {d.eta}
              </p>
            </div>
            <div className="mt-3">
              <p className="text-[9px] text-[#9CA3AF] leading-tight mb-1">{s.etaNote}</p>
              <p className="text-[9px] text-[#6B7280] italic">{s.etaCalc}</p>
            </div>
          </div>
        </div>

        {/* ── Queue timeline ── */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] overflow-hidden shadow-sm">
          <div className="px-4 pt-4 pb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
              {s.queueLabel}
            </p>
            <div className="flex items-center gap-3 text-[9px] text-[#9CA3AF]">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#D1D5DB] inline-block" />{s.completed}</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#E8960A] inline-block" />{s.processing}</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#1A7A3C] inline-block" />{s.youLabel}</span>
            </div>
          </div>

          {/* Vertical timeline */}
          <div className="px-4 pb-4 relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-4 w-px bg-[#E8F5EE]" />
            <div className="space-y-1">
              {queueRows.map((row, i) => (
                <QueueRow key={i} token={row.token} state={row.state} s={s} />
              ))}
              <div className="flex items-center gap-3 px-2 py-1.5 opacity-40">
                <div className="w-2 h-2 rounded-full bg-[#E5E7EB] flex-shrink-0" />
                <p className="text-[10px] text-[#9CA3AF]">+ 8 {s.moreInQueue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Leave-now card ── */}
        <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🕐</span>
            <p className="text-sm font-bold text-[#92400E]" style={{ fontFamily: "Poppins,sans-serif" }}>
              {s.leaveTitle}
            </p>
          </div>
          <div className="space-y-2 mb-4">
            {[
              { label: s.travelLabel, val: s.travelVal },
              { label: s.queueWaitLabel, val: `~${d.wait} min` },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-xs text-[#92400E]/80">{row.label}</span>
                <span className="text-xs font-bold text-[#92400E]" style={{ fontFamily: "Poppins,sans-serif" }}>{row.val}</span>
              </div>
            ))}
            <div className="h-px bg-[#FDE68A]" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#92400E]">{s.departureLabel}</span>
              <span className="text-base font-bold text-[#92400E]" style={{ fontFamily: "Poppins,sans-serif" }}>{s.departureVal}</span>
            </div>
          </div>
          <p className="text-[10px] text-[#92400E]/60 italic mb-3">{s.leaveDisclaimer}</p>
          <button
            className="w-full py-2.5 rounded-xl bg-[#E8960A] text-white text-sm font-bold hover:bg-[#D97706] transition-colors"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            🗺️ {s.viewRoute}
          </button>
        </div>

        {/* ── Centre status indicators ── */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4 shadow-sm">
          <p className="text-xs font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins,sans-serif" }}>
            {s.statusTitle}
          </p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {s.statuses.map((st) => (
              <div key={st.label} className="flex items-center gap-2 bg-[#F5F9F6] rounded-xl px-3 py-2.5">
                <span className="text-sm flex-shrink-0">{st.icon}</span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-[#1A2B4A] leading-tight truncate" style={{ fontFamily: "Poppins,sans-serif" }}>
                    {st.label}
                  </p>
                  <p className="text-[9px] text-[#9CA3AF]">{st.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[9px] text-[#9CA3AF] italic text-center">{s.statusNote}</p>
        </div>

        {/* ── Refresh button ── */}
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="w-full py-3 rounded-xl border-2 border-[#C8DFD0] text-sm font-semibold text-[#1A7A3C] hover:bg-[#E8F5EE] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          style={{ fontFamily: "Poppins,sans-serif" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className={refreshing ? "animate-spin" : ""}
          >
            <path d="M12 7A5 5 0 112 7" stroke="#1A7A3C" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 3v4h-4" stroke="#1A7A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {refreshing ? s.refreshing : s.refreshBtn}
        </button>

        {/* ── Booking details ── */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] overflow-hidden shadow-sm">
          <div className="bg-[#F2FAF5] px-4 py-3 border-b border-[#C8DFD0]">
            <p className="text-xs font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
              {s.bookingTitle}
            </p>
          </div>
          <div className="px-4 py-4 space-y-2.5">
            {[
              { label: s.centre, icon: "🏭", val: s.centre },
              { label: s.dateLabel, icon: "📅", val: s.dateVal },
              { label: s.slotLabel, icon: "🕐", val: s.slotVal },
              { label: s.tokenLabel, icon: "🎫", val: "Q-024" },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-3">
                <span className="text-base w-5 text-center flex-shrink-0">{row.icon}</span>
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <span className="text-[10px] text-[#6B7280]">{row.label}</span>
                  <span className="text-xs font-semibold text-[#1A2B4A] text-right max-w-[60%]" style={{ fontFamily: "Poppins,sans-serif" }}>
                    {row.val}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 pb-4 grid grid-cols-2 gap-2">
            <button
              onClick={onViewBooking}
              className="py-2.5 rounded-xl bg-[#1A7A3C] text-white text-xs font-bold hover:bg-[#145F2F] transition-colors"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              {s.viewBooking}
            </button>
            <button
              onClick={() => setShowCancel(true)}
              className="py-2.5 rounded-xl border-2 border-[#FCA5A5] text-[#C8332A] text-xs font-bold hover:bg-[#FEF2F2] transition-colors"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              {s.cancelBooking}
            </button>
          </div>
        </div>
      </div>

      {/* ── Cancel confirmation modal ── */}
      {showCancel && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-[fadeUp_0.2s_ease]">
            <div className="w-12 h-12 rounded-full bg-[#FEF2F2] flex items-center justify-center mx-auto mb-4 text-2xl">
              🗑️
            </div>
            <h3 className="text-base font-bold text-[#1A2B4A] text-center mb-2" style={{ fontFamily: "Poppins,sans-serif" }}>
              {s.cancelQ}
            </h3>
            <p className="text-xs text-[#6B7280] text-center mb-5">{s.cancelNote}</p>
            <div className="space-y-2">
              <button
                onClick={() => setShowCancel(false)}
                className="w-full py-3 rounded-xl bg-[#C8332A] text-white text-sm font-bold hover:bg-red-700 transition-colors"
                style={{ fontFamily: "Poppins,sans-serif" }}
              >
                {s.cancelYes}
              </button>
              <button
                onClick={() => setShowCancel(false)}
                className="w-full py-3 rounded-xl border-2 border-[#C8DFD0] text-[#1A2B4A] text-sm font-semibold hover:bg-[#F5F9F6] transition-colors"
                style={{ fontFamily: "Poppins,sans-serif" }}
              >
                {s.cancelNo}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
