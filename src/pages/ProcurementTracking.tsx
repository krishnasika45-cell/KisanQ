import { useState } from "react";

type Lang = "en" | "hi";

const S = {
  en: {
    title: "Procurement Status",
    subtitle: "Track your procurement journey in one place.",
    langToggle: "हिन्दी",
    // App summary
    summaryTitle: "Application Summary",
    appId: "KQ-2026-00241",
    farmer: "Ramesh Kumar",
    crop: "Wheat",
    qty: "50 Quintal",
    centre: "Gwalior Procurement Centre B",
    token: "Q-024",
    date: "24 September 2026",
    // Current status
    currentStatus: "Quality Check Completed ✓",
    currentStatusSub: "Your produce has completed the quality verification stage.",
    // Progress stages
    stages: [
      {
        label: "Application Submitted",
        desc: "Application registered in KisanQ",
        time: "24 Sep, 8:15 AM",
        state: "done",
      },
      {
        label: "Slot Confirmed",
        desc: "Slot booked at Gwalior Centre B",
        time: "24 Sep, 8:20 AM",
        state: "done",
      },
      {
        label: "Farmer Arrived",
        desc: "Arrival recorded at the centre",
        time: "24 Sep, 10:18 AM",
        state: "done",
      },
      {
        label: "Quality Check",
        desc: "Produce quality verified",
        time: "24 Sep, 10:42 AM",
        state: "done",
      },
      {
        label: "Weighing",
        desc: "Currently in progress",
        time: "",
        state: "active",
      },
      {
        label: "Procurement",
        desc: "Pending",
        time: "",
        state: "pending",
      },
      {
        label: "Payment",
        desc: "Pending",
        time: "",
        state: "pending",
      },
    ],
    // Weighing card
    weighingTitle: "Current Stage: Weighing",
    weighingQty: "Quantity",
    weighingQtyVal: "50 Quintal",
    weighingStatus: "In Progress",
    weighingNote: "Please wait for the next update.",
    lastUpdated: "Last updated: 10:55 AM",
    // Payment
    paymentTitle: "Payment Status",
    paymentStatus: "Pending",
    paymentAmt: "₹10,250",
    paymentDemoLabel: "Demo estimate",
    paymentNote:
      "Final payment details will depend on the applicable procurement process. This is a prototype estimate only.",
    // USP
    uspTitle: "From Slot to Payment",
    uspBody:
      "Track every important stage without repeatedly visiting the centre just to ask for an update.",
    // Notification
    notifTitle: "Procurement Update",
    notifBody:
      "Your quality check has been completed. Your application has moved to weighing.",
    viewUpdates: "View Updates",
    // Documents
    docsTitle: "Documents & Records",
    docButtons: ["View Application", "View Procurement Receipt", "Download Record"],
    docsNote: "Prototype interactions — not connected to actual records.",
    // Help
    helpTitle: "Need Help?",
    helpNote:
      "Assisted access is available for farmers who need help using digital services.",
    helpButtons: ["Help Desk", "Call Support", "IVR Assistance"],
    // Labels
    appIdLabel: "Application ID",
    farmerLabel: "Farmer",
    cropLabel: "Crop",
    qtyLabel: "Quantity",
    centreLabel: "Centre",
    tokenLabel: "Token",
    dateLabel: "Date",
    back: "← Back",
  },
  hi: {
    title: "खरीद की स्थिति",
    subtitle: "अपनी खरीद यात्रा को एक जगह ट्रैक करें।",
    langToggle: "English",
    summaryTitle: "आवेदन सारांश",
    appId: "KQ-2026-00241",
    farmer: "रमेश कुमार",
    crop: "गेहूं",
    qty: "50 क्विंटल",
    centre: "ग्वालियर खरीद केंद्र B",
    token: "Q-024",
    date: "24 सितंबर 2026",
    currentStatus: "गुणवत्ता जांच पूर्ण ✓",
    currentStatusSub: "आपकी उपज की गुणवत्ता जांच पूरी हो गई है।",
    stages: [
      {
        label: "आवेदन जमा",
        desc: "KisanQ में आवेदन पंजीकृत",
        time: "24 सित, 8:15 AM",
        state: "done",
      },
      {
        label: "स्लॉट पुष्टि",
        desc: "ग्वालियर केंद्र B पर स्लॉट बुक",
        time: "24 सित, 8:20 AM",
        state: "done",
      },
      {
        label: "किसान पहुंचा",
        desc: "केंद्र पर आगमन दर्ज",
        time: "24 सित, 10:18 AM",
        state: "done",
      },
      {
        label: "गुणवत्ता जांच",
        desc: "उपज की गुणवत्ता सत्यापित",
        time: "24 सित, 10:42 AM",
        state: "done",
      },
      {
        label: "तुलाई",
        desc: "वर्तमान में जारी है",
        time: "",
        state: "active",
      },
      {
        label: "खरीद",
        desc: "लंबित",
        time: "",
        state: "pending",
      },
      {
        label: "भुगतान",
        desc: "लंबित",
        time: "",
        state: "pending",
      },
    ],
    weighingTitle: "वर्तमान चरण: तुलाई",
    weighingQty: "मात्रा",
    weighingQtyVal: "50 क्विंटल",
    weighingStatus: "जारी है",
    weighingNote: "कृपया अगले अपडेट की प्रतीक्षा करें।",
    lastUpdated: "अंतिम अपडेट: 10:55 AM",
    paymentTitle: "भुगतान की स्थिति",
    paymentStatus: "लंबित",
    paymentAmt: "₹10,250",
    paymentDemoLabel: "डेमो अनुमान",
    paymentNote:
      "अंतिम भुगतान विवरण लागू खरीद प्रक्रिया पर निर्भर करेगा। यह केवल प्रोटोटाइप अनुमान है।",
    uspTitle: "स्लॉट से भुगतान तक",
    uspBody:
      "हर महत्वपूर्ण चरण ट्रैक करें — बस अपडेट पूछने के लिए बार-बार केंद्र न जाएं।",
    notifTitle: "खरीद अपडेट",
    notifBody:
      "आपकी गुणवत्ता जांच पूरी हो गई है। आपका आवेदन तुलाई चरण में पहुंच गया है।",
    viewUpdates: "अपडेट देखें",
    docsTitle: "दस्तावेज़ और रिकॉर्ड",
    docButtons: ["आवेदन देखें", "खरीद रसीद देखें", "रिकॉर्ड डाउनलोड"],
    docsNote: "प्रोटोटाइप इंटरैक्शन — वास्तविक रिकॉर्ड से जुड़ा नहीं।",
    helpTitle: "मदद चाहिए?",
    helpNote:
      "डिजिटल सेवाओं में सहायता की ज़रूरत वाले किसानों के लिए सहायता उपलब्ध है।",
    helpButtons: ["सहायता केंद्र", "कॉल सहायता", "IVR सहायता"],
    appIdLabel: "आवेदन ID",
    farmerLabel: "किसान",
    cropLabel: "फसल",
    qtyLabel: "मात्रा",
    centreLabel: "केंद्र",
    tokenLabel: "टोकन",
    dateLabel: "तारीख",
    back: "← वापस",
  },
};

type StageState = "done" | "active" | "pending";

function StageIcon({ state }: { state: StageState }) {
  if (state === "done")
    return (
      <div className="w-9 h-9 rounded-full bg-[#1A7A3C] flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8l4 4 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  if (state === "active")
    return (
      <div className="w-9 h-9 rounded-full bg-[#E8960A] flex items-center justify-center flex-shrink-0 shadow-sm ring-4 ring-[#E8960A]/20">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="3" fill="white" />
        </svg>
      </div>
    );
  return (
    <div className="w-9 h-9 rounded-full bg-[#E8F5EE] border-2 border-[#C8DFD0] flex items-center justify-center flex-shrink-0">
      <div className="w-2 h-2 rounded-full bg-[#C8DFD0]" />
    </div>
  );
}

function StatusBadge({ state, labels }: { state: StageState; labels: { done: string; active: string; pending: string } }) {
  const cfg = {
    done: "bg-[#E8F5EE] text-[#1A7A3C]",
    active: "bg-[#FEF3C7] text-[#92400E]",
    pending: "bg-[#F3F4F6] text-[#9CA3AF]",
  };
  return (
    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${cfg[state]}`} style={{ fontFamily: "Poppins,sans-serif" }}>
      {labels[state]}
    </span>
  );
}

export default function ProcurementTracking({
  onBack,
  onViewQueue,
  initialLang = "en",
}: {
  onBack: () => void;
  onViewQueue?: () => void;
  initialLang?: Lang;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [notifDismissed, setNotifDismissed] = useState(false);
  const s = S[lang];

  const badgeLabels = {
    done: lang === "en" ? "Done" : "पूर्ण",
    active: lang === "en" ? "In Progress" : "जारी है",
    pending: lang === "en" ? "Pending" : "लंबित",
  };

  return (
    <div className="pb-6">
      {/* ── Header ── */}
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

        {/* ── USP strip ── */}
        <div
          className="rounded-2xl p-4 flex items-start gap-3"
          style={{ background: "linear-gradient(135deg,#1A2B4A 0%,#2A3F6A 100%)" }}
        >
          <span className="text-xl flex-shrink-0 mt-0.5">📊</span>
          <div>
            <p className="text-xs font-bold text-white mb-0.5" style={{ fontFamily: "Poppins,sans-serif" }}>
              {s.uspTitle}
            </p>
            <p className="text-[10px] text-white/70 leading-relaxed">{s.uspBody}</p>
          </div>
        </div>

        {/* ── Notification card ── */}
        {!notifDismissed && (
          <div className="bg-[#E8F5EE] border border-[#C8DFD0] rounded-2xl p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#1A7A3C] flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1a5.5 5.5 0 100 11A5.5 5.5 0 007 1zM7 4v3.5l2 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#1A2B4A] mb-0.5" style={{ fontFamily: "Poppins,sans-serif" }}>
                    {s.notifTitle}
                  </p>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{s.notifBody}</p>
                  <button
                    className="mt-2 text-xs font-semibold text-[#1A7A3C] hover:underline"
                    style={{ fontFamily: "Poppins,sans-serif" }}
                  >
                    {s.viewUpdates}
                  </button>
                </div>
              </div>
              <button
                onClick={() => setNotifDismissed(true)}
                className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-[#C8DFD0] text-[#6B7280]"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ── Current status hero ── */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "linear-gradient(135deg,#145F2F 0%,#1A7A3C 100%)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] animate-pulse" />
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">
              {lang === "en" ? "Current Status" : "वर्तमान स्थिति"}
            </span>
          </div>
          <p className="text-base font-bold text-white mb-1" style={{ fontFamily: "Poppins,sans-serif" }}>
            {s.currentStatus}
          </p>
          <p className="text-xs text-white/75 leading-relaxed">{s.currentStatusSub}</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full rounded-full bg-white/80" style={{ width: "57%" }} />
            </div>
            <span className="text-[10px] text-white/70 font-medium">4 / 7</span>
          </div>
        </div>

        {/* ── Application summary ── */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] overflow-hidden shadow-sm">
          <div className="bg-[#F2FAF5] px-4 py-3 border-b border-[#C8DFD0] flex items-center justify-between">
            <p className="text-xs font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
              {s.summaryTitle}
            </p>
            <span className="text-[10px] font-bold text-[#1A7A3C] bg-[#E8F5EE] px-2 py-0.5 rounded-full">
              {s.appId}
            </span>
          </div>
          <div className="px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
            {[
              { label: s.farmerLabel, val: s.farmer, icon: "👤" },
              { label: s.cropLabel, val: s.crop, icon: "🌾" },
              { label: s.qtyLabel, val: s.qty, icon: "⚖️" },
              { label: s.tokenLabel, val: s.token, icon: "🎫" },
              { label: s.centreLabel, val: s.centre, icon: "🏭" },
              { label: s.dateLabel, val: s.date, icon: "📅" },
            ].map((row) => (
              <div key={row.label} className="flex items-start gap-1.5 min-w-0">
                <span className="text-sm flex-shrink-0 mt-0.5">{row.icon}</span>
                <div className="min-w-0">
                  <p className="text-[9px] text-[#9CA3AF]">{row.label}</p>
                  <p className="text-xs font-semibold text-[#1A2B4A] leading-tight truncate" style={{ fontFamily: "Poppins,sans-serif" }}>
                    {row.val}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Progress timeline ── */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
          <p className="text-xs font-bold text-[#1A2B4A] mb-5" style={{ fontFamily: "Poppins,sans-serif" }}>
            {lang === "en" ? "Procurement Journey" : "खरीद यात्रा"}
          </p>
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-4 top-5 bottom-5 w-0.5 bg-gradient-to-b from-[#1A7A3C] via-[#E8960A] to-[#E8F5EE]" />
            <div className="space-y-0">
              {s.stages.map((stage, i) => {
                const st = stage.state as StageState;
                return (
                  <div key={i} className="flex items-start gap-4 relative">
                    <div className="z-10">
                      <StageIcon state={st} />
                    </div>
                    <div
                      className={`flex-1 pb-5 last:pb-0 min-w-0 ${
                        st === "active"
                          ? "bg-[#FFFBEB] -mx-2 px-2 rounded-xl border border-[#FDE68A] mb-1"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 pt-1.5">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p
                              className={`text-sm font-bold leading-tight ${
                                st === "active"
                                  ? "text-[#92400E]"
                                  : st === "done"
                                  ? "text-[#1A2B4A]"
                                  : "text-[#9CA3AF]"
                              }`}
                              style={{ fontFamily: "Poppins,sans-serif" }}
                            >
                              {stage.label}
                            </p>
                            <StatusBadge state={st} labels={badgeLabels} />
                          </div>
                          <p
                            className={`text-[10px] mt-0.5 ${
                              st === "active"
                                ? "text-[#E8960A] font-medium"
                                : st === "done"
                                ? "text-[#6B7280]"
                                : "text-[#C8DFD0]"
                            }`}
                          >
                            {stage.desc}
                          </p>
                        </div>
                        {stage.time && (
                          <span className="text-[9px] text-[#9CA3AF] flex-shrink-0 pt-0.5 whitespace-nowrap">
                            {stage.time}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Weighing card ── */}
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#E8960A] flex items-center justify-center flex-shrink-0">
              <span className="text-base">⚖️</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#92400E]" style={{ fontFamily: "Poppins,sans-serif" }}>
                {s.weighingTitle}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-white/70 rounded-xl px-3 py-2.5">
              <p className="text-[9px] text-[#92400E]/60 mb-0.5">{s.weighingQty}</p>
              <p className="text-sm font-bold text-[#92400E]" style={{ fontFamily: "Poppins,sans-serif" }}>
                {s.weighingQtyVal}
              </p>
            </div>
            <div className="bg-white/70 rounded-xl px-3 py-2.5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#E8960A] animate-pulse flex-shrink-0" />
              <p className="text-sm font-bold text-[#92400E]" style={{ fontFamily: "Poppins,sans-serif" }}>
                {s.weighingStatus}
              </p>
            </div>
          </div>
          <p className="text-xs text-[#92400E]/80 mb-1">{s.weighingNote}</p>
          <p className="text-[9px] text-[#92400E]/50 italic">{s.lastUpdated}</p>
        </div>

        {/* ── Payment card ── */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] overflow-hidden shadow-sm">
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
                {s.paymentTitle}
              </p>
              <span className="text-xs font-bold text-[#9CA3AF] bg-[#F3F4F6] px-2.5 py-1 rounded-full">
                {s.paymentStatus}
              </span>
            </div>
            <div className="flex items-end justify-between gap-3 mb-3">
              <div>
                <p className="text-[9px] text-[#9CA3AF] mb-0.5">
                  {lang === "en" ? "Expected Amount" : "अपेक्षित राशि"}
                </p>
                <p className="text-3xl font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
                  {s.paymentAmt}
                </p>
              </div>
              <span className="text-[10px] text-[#E8960A] font-semibold bg-[#FEF3C7] px-2.5 py-1 rounded-full border border-[#FDE68A]">
                {s.paymentDemoLabel}
              </span>
            </div>
            {/* Payment stages bar */}
            <div className="flex gap-1 mb-3">
              {["Quality", "Weighing", "Procurement", "Payment"].map((step, i) => (
                <div key={step} className="flex-1">
                  <div
                    className={`h-1.5 rounded-full ${i === 0 ? "bg-[#1A7A3C]" : i === 1 ? "bg-[#E8960A]" : "bg-[#E8F5EE]"}`}
                  />
                </div>
              ))}
            </div>
            <p className="text-[9px] text-[#9CA3AF] leading-relaxed italic">{s.paymentNote}</p>
          </div>
        </div>

        {/* ── Documents ── */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4 shadow-sm">
          <p className="text-xs font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins,sans-serif" }}>
            📄 {s.docsTitle}
          </p>
          <div className="space-y-2">
            {s.docButtons.map((label, i) => (
              <button
                key={label}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-[#C8DFD0] bg-[#F5F9F6] hover:bg-[#E8F5EE] hover:border-[#1A7A3C]/40 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{["📋", "🧾", "⬇️"][i]}</span>
                  <span className="text-xs font-semibold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
                    {label}
                  </span>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
          <p className="mt-3 text-[9px] text-[#9CA3AF] italic text-center">{s.docsNote}</p>
        </div>

        {/* ── Help section ── */}
        <div className="bg-[#E8F5EE] border border-[#C8DFD0] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🌾</span>
            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
              {s.helpTitle}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {s.helpButtons.map((label, i) => (
              <button
                key={label}
                className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-xl border border-[#C8DFD0] hover:border-[#1A7A3C]/50 hover:bg-[#F2FAF5] transition-all"
              >
                <span className="text-xl">{["🏢", "📞", "📟"][i]}</span>
                <span
                  className="text-[9px] font-semibold text-[#1A2B4A] text-center leading-tight"
                  style={{ fontFamily: "Poppins,sans-serif" }}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
          <p className="text-[10px] text-[#6B7280] text-center leading-relaxed">{s.helpNote}</p>
        </div>

      </div>
    </div>
  );
}
