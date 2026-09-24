import { useState } from "react";
import SmartCentre from "./SmartCentre";
import SlotBooking from "./SlotBooking";
import LiveQueue from "./LiveQueue";
import ProcurementTracking from "./ProcurementTracking";
import HelpAssistedAccess from "./HelpAssistedAccess";
import FarmerProfile from "./FarmerProfile";

type Lang = "en" | "hi";
type NavTab = "home" | "booking" | "queue" | "procurement" | "payments" | "profile" | "help";
type SubScreen =
  | "home"
  | "notifications"
  | "booking"
  | "queue"
  | "procurement"
  | "profile"
  | "help"
  | "centre"
  | "payment";

// ─── Strings ───────────────────────────────────────────────────────────────
const S = {
  en: {
    tagline: "Smart Procurement. Better Predictability.",
    namaste: "Namaste, Ramesh 👋",
    planVisit: "Let's plan your procurement visit.",
    farmerName: "Ramesh Kumar",
    village: "Karnal, Haryana",
    crop: "Wheat (Gehun)",
    preferredLang: "English",
    mainCta: "Find Best Centre & Slot",
    mainCtaSub:
      "Get a suitable procurement centre and time based on current workload.",
    quickActions: "Quick Actions",
    qa: [
      { id: "apply", icon: "📋", label: "Apply for\nProcurement" },
      { id: "centre", icon: "🏭", label: "Find Best\nCentre" },
      { id: "booking", icon: "🎫", label: "My Slot\n& Token" },
      { id: "queue", icon: "👥", label: "Live\nQueue" },
      { id: "procurement", icon: "📦", label: "Procurement\nStatus" },
      { id: "payment", icon: "💰", label: "Payment\nStatus" },
    ],
    upcomingVisit: "Your Upcoming Visit",
    centre: "Gwalior Procurement Centre B",
    date: "24 September 2026",
    time: "10:30 AM – 11:00 AM",
    token: "Q-024",
    queueAhead: "18 farmers",
    estWait: "~54 min",
    viewQueue: "View Live Queue",
    leaveTitle: "When should I leave?",
    travel: "Estimated travel",
    travelVal: "25 min",
    queueWait: "Expected queue wait",
    queueWaitVal: "54 min",
    departure: "Recommended departure",
    departureVal: "9:35 AM",
    estimate: "This is an estimate, not a guarantee.",
    viewRoute: "View Route & ETA",
    trackTitle: "Procurement Journey",
    stages: [
      "Application Submitted",
      "Slot Confirmed",
      "Arrived at Centre",
      "Quality Check",
      "Weighing",
      "Procurement Completed",
      "Payment Processed",
    ],
    currentStage: 1,
    notifTitle: "Notifications",
    notifs: [
      {
        id: "n1",
        icon: "✅",
        color: "#1A7A3C",
        bg: "#E8F5EE",
        title: "Slot Confirmed",
        body: "Your slot at Gwalior Centre B is confirmed for 24 Sep, 10:30 AM.",
        time: "2 hrs ago",
      },
      {
        id: "n2",
        icon: "👥",
        color: "#2563EB",
        bg: "#EFF6FF",
        title: "Queue Updated",
        body: "Queue at Centre B has changed. 18 farmers now ahead of you.",
        time: "45 min ago",
      },
      {
        id: "n3",
        icon: "⏰",
        color: "#D97706",
        bg: "#FEF3C7",
        title: "Departure Reminder",
        body: "Your recommended departure time is approaching. Leave by 9:35 AM.",
        time: "Just now",
      },
    ],
    // Bottom nav
    navHome: "Home",
    navBooking: "My Booking",
    navQueue: "Queue",
    navProcurement: "Procurement",
    navPayments: "Payments",
    navProfile: "Profile",
    navHelp: "Help",
    // Profile
    profileTitle: "Farmer Profile",
    phone: "+91 98765 43210",
    regDate: "Registered: 12 Aug 2025",
    aadhaarNote: "Verified via KisanQ registration",
    editProfile: "Edit Profile",
    logout: "Logout",
    // Sub-screens
    comingSoon: "Coming Soon",
    comingSoonSub: "This screen is under development.",
    backHome: "Back to Dashboard",
    langToggle: "हिन्दी",
    sectionCrop: "Crop",
    sectionVillage: "Village",
    sectionLang: "Language",
  },
  hi: {
    tagline: "स्मार्ट खरीद। बेहतर पूर्वानुमान।",
    namaste: "नमस्ते, रमेश 👋",
    planVisit: "आइए आपकी खरीद यात्रा की योजना बनाएं।",
    farmerName: "रमेश कुमार",
    village: "करनाल, हरियाणा",
    crop: "गेहूं",
    preferredLang: "हिन्दी",
    mainCta: "सर्वोत्तम केंद्र और स्लॉट खोजें",
    mainCtaSub:
      "वर्तमान कार्यभार के आधार पर उपयुक्त केंद्र और समय प्राप्त करें।",
    quickActions: "त्वरित कार्रवाई",
    qa: [
      { id: "apply", icon: "📋", label: "खरीद के लिए\nआवेदन" },
      { id: "centre", icon: "🏭", label: "सर्वोत्तम\nकेंद्र खोजें" },
      { id: "booking", icon: "🎫", label: "मेरा स्लॉट\nव टोकन" },
      { id: "queue", icon: "👥", label: "लाइव\nकतार" },
      { id: "procurement", icon: "📦", label: "खरीद\nस्थिति" },
      { id: "payment", icon: "💰", label: "भुगतान\nस्थिति" },
    ],
    upcomingVisit: "आपकी आगामी यात्रा",
    centre: "ग्वालियर खरीद केंद्र B",
    date: "24 सितंबर 2026",
    time: "10:30 AM – 11:00 AM",
    token: "Q-024",
    queueAhead: "18 किसान",
    estWait: "~54 मिनट",
    viewQueue: "लाइव कतार देखें",
    leaveTitle: "मुझे कब निकलना चाहिए?",
    travel: "अनुमानित यात्रा",
    travelVal: "25 मिनट",
    queueWait: "अपेक्षित प्रतीक्षा",
    queueWaitVal: "54 मिनट",
    departure: "अनुशंसित प्रस्थान",
    departureVal: "9:35 AM",
    estimate: "यह एक अनुमान है, गारंटी नहीं।",
    viewRoute: "मार्ग और ETA देखें",
    trackTitle: "खरीद यात्रा",
    stages: [
      "आवेदन जमा",
      "स्लॉट पुष्टि",
      "केंद्र पर पहुंचे",
      "गुणवत्ता जांच",
      "तुलाई",
      "खरीद पूर्ण",
      "भुगतान हो गया",
    ],
    currentStage: 1,
    notifTitle: "सूचनाएं",
    notifs: [
      {
        id: "n1",
        icon: "✅",
        color: "#1A7A3C",
        bg: "#E8F5EE",
        title: "स्लॉट पुष्टि हुई",
        body: "ग्वालियर केंद्र B पर आपका स्लॉट 24 सितंबर, 10:30 AM के लिए पुष्टि है।",
        time: "2 घंटे पहले",
      },
      {
        id: "n2",
        icon: "👥",
        color: "#2563EB",
        bg: "#EFF6FF",
        title: "कतार अपडेट",
        body: "केंद्र B की कतार बदल गई है। आपसे 18 किसान आगे हैं।",
        time: "45 मिनट पहले",
      },
      {
        id: "n3",
        icon: "⏰",
        color: "#D97706",
        bg: "#FEF3C7",
        title: "प्रस्थान अनुस्मारक",
        body: "आपका अनुशंसित प्रस्थान समय आ रहा है। 9:35 AM तक निकलें।",
        time: "अभी",
      },
    ],
    navHome: "होम",
    navBooking: "बुकिंग",
    navQueue: "कतार",
    navProcurement: "खरीद",
    navPayments: "भुगतान",
    navProfile: "प्रोफाइल",
    navHelp: "मदद",
    profileTitle: "किसान प्रोफाइल",
    phone: "+91 98765 43210",
    regDate: "पंजीकरण: 12 अगस्त 2025",
    aadhaarNote: "किसानQ पंजीकरण द्वारा सत्यापित",
    editProfile: "प्रोफाइल संपादित करें",
    logout: "लॉगआउट",
    comingSoon: "जल्द आएगा",
    comingSoonSub: "यह स्क्रीन विकास के अधीन है।",
    backHome: "डैशबोर्ड पर वापस",
    langToggle: "English",
    sectionCrop: "फसल",
    sectionVillage: "गांव",
    sectionLang: "भाषा",
  },
};

// ─── Shared tiny helpers ────────────────────────────────────────────────────
function KQ({ white = false }: { white?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <svg width="30" height="30" viewBox="0 0 48 48" fill="none">
        <rect
          width="48"
          height="48"
          rx="10"
          fill={white ? "rgba(255,255,255,0.25)" : "#1A7A3C"}
        />
        <text
          x="10"
          y="34"
          fontFamily="Poppins,sans-serif"
          fontWeight="700"
          fontSize="26"
          fill="white"
        >
          K
        </text>
        <circle
          cx="36"
          cy="28"
          r="9"
          fill={white ? "rgba(255,255,255,0.1)" : "#1A7A3C"}
          stroke="white"
          strokeWidth="2.5"
        />
        <line
          x1="42"
          y1="34"
          x2="46"
          y2="38"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M32 22 Q36 18 40 22"
          stroke="#E8960A"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <div>
        <p
          className={`text-base font-bold leading-none ${white ? "text-white" : "text-[#1A7A3C]"}`}
          style={{ fontFamily: "Poppins,sans-serif" }}
        >
          KisanQ
        </p>
      </div>
    </div>
  );
}

function Badge({
  label,
  color = "green",
}: {
  label: string;
  color?: "green" | "amber" | "blue" | "gray";
}) {
  const styles = {
    green: "bg-[#E8F5EE] text-[#1A7A3C] border-[#C8DFD0]",
    amber: "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]",
    blue: "bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]",
    gray: "bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[color]}`}
      style={{ fontFamily: "Poppins,sans-serif" }}
    >
      {label}
    </span>
  );
}

// ─── Sub-screens ────────────────────────────────────────────────────────────
function ComingSoon({
  s,
  title,
  icon,
  onBack,
}: {
  s: (typeof S)["en"];
  title: string;
  icon: string;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h2
        className="text-xl font-bold text-[#1A2B4A] mb-2"
        style={{ fontFamily: "Poppins,sans-serif" }}
      >
        {title}
      </h2>
      <p className="text-[#6B7280] text-sm mb-6">{s.comingSoonSub}</p>
      <button
        onClick={onBack}
        className="px-6 py-2.5 rounded-xl bg-[#1A7A3C] text-white text-sm font-semibold hover:bg-[#145F2F] transition-colors"
        style={{ fontFamily: "Poppins,sans-serif" }}
      >
        {s.backHome}
      </button>
    </div>
  );
}

function BookingScreen({ s }: { s: (typeof S)["en"] }) {
  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <div
        className="bg-[#1A7A3C] rounded-2xl p-6 text-white mb-5"
        style={{ background: "linear-gradient(135deg,#1A7A3C 0%,#2E9952 100%)" }}
      >
        <p
          className="text-xs font-semibold opacity-70 mb-1 uppercase tracking-wider"
          style={{ fontFamily: "Poppins,sans-serif" }}
        >
          Virtual Token
        </p>
        <p
          className="text-5xl font-bold mb-4"
          style={{ fontFamily: "Poppins,sans-serif" }}
        >
          {s.token}
        </p>
        <div className="h-px bg-white/20 mb-4" />
        <p
          className="text-sm font-semibold opacity-90"
          style={{ fontFamily: "Poppins,sans-serif" }}
        >
          {s.centre}
        </p>
        <p className="text-sm opacity-70 mt-1">{s.date}</p>
        <p className="text-sm opacity-70">{s.time}</p>
      </div>
      <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 space-y-4">
        <Row label="Queue Ahead" val={s.queueAhead} />
        <div className="h-px bg-[#E8F5EE]" />
        <Row label="Estimated Wait" val={s.estWait} highlight />
        <div className="h-px bg-[#E8F5EE]" />
        <Row label="Departure" val={s.departureVal} />
      </div>
      <p className="text-xs text-[#6B7280] text-center mt-4">{s.estimate}</p>
    </div>
  );
}

function Row({
  label,
  val,
  highlight = false,
}: {
  label: string;
  val: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[#6B7280]">{label}</span>
      <span
        className={`text-sm font-bold ${highlight ? "text-[#1A7A3C]" : "text-[#1A2B4A]"}`}
        style={{ fontFamily: "Poppins,sans-serif" }}
      >
        {val}
      </span>
    </div>
  );
}

function QueueScreen({ s }: { s: (typeof S)["en"] }) {
  const farmers = [
    { token: "Q-006", name: "Suresh P.", crop: "Wheat", wait: "~8 min", done: true },
    { token: "Q-007", name: "Mohan L.", crop: "Rice", wait: "~16 min", done: true },
    { token: "Q-008", name: "Arvind K.", crop: "Wheat", wait: "~24 min", active: true },
    { token: "Q-009", name: "Priya D.", crop: "Soybean", wait: "~32 min" },
    { token: "Q-010", name: "Ravi S.", crop: "Maize", wait: "~40 min" },
  ];
  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <div className="bg-[#E8F5EE] border border-[#C8DFD0] rounded-2xl p-4 mb-5 flex items-center justify-between">
        <div>
          <p
            className="text-xs text-[#6B7280] font-medium"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            Your Token
          </p>
          <p
            className="text-2xl font-bold text-[#1A7A3C]"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            {s.token}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#6B7280]">Queue ahead</p>
          <p
            className="text-2xl font-bold text-[#1A2B4A]"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            18
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#6B7280]">Est. wait</p>
          <p
            className="text-2xl font-bold text-[#E8960A]"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            54m
          </p>
        </div>
      </div>
      <div className="space-y-2.5">
        {farmers.map((f) => (
          <div
            key={f.token}
            className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all
              ${f.active
                ? "border-[#1A7A3C] bg-[#E8F5EE]"
                : f.done
                ? "border-[#E5E7EB] bg-[#F9FAFB] opacity-50"
                : "border-[#E5E7EB] bg-white"
              }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                ${f.active ? "bg-[#1A7A3C] text-white" : f.done ? "bg-[#E5E7EB] text-[#9CA3AF]" : "bg-[#F5F9F6] text-[#1A2B4A]"}`}
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              {f.done ? "✓" : f.token.split("-")[1]}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-semibold text-[#1A2B4A] truncate"
                style={{ fontFamily: "Poppins,sans-serif" }}
              >
                {f.name}
              </p>
              <p className="text-xs text-[#6B7280]">{f.crop}</p>
            </div>
            {f.active ? (
              <Badge label="Processing" color="green" />
            ) : f.done ? (
              <Badge label="Done" color="gray" />
            ) : (
              <span className="text-xs text-[#6B7280]">{f.wait}</span>
            )}
          </div>
        ))}
        <p className="text-xs text-center text-[#6B7280] pt-2">
          + 13 more farmers · {s.centre}
        </p>
      </div>
    </div>
  );
}

function ProcurementScreen({ s }: { s: (typeof S)["en"] }) {
  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 mb-5">
        <p
          className="text-xs text-[#6B7280] mb-0.5"
          style={{ fontFamily: "Poppins,sans-serif" }}
        >
          Application ID
        </p>
        <p
          className="text-lg font-bold text-[#1A2B4A] mb-3"
          style={{ fontFamily: "Poppins,sans-serif" }}
        >
          KQ-2026-00847
        </p>
        <div className="flex gap-2 flex-wrap">
          <Badge label="Slot Confirmed" color="green" />
          <Badge label="24 Sep 2026" color="gray" />
          <Badge label={s.token} color="blue" />
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5">
        <p
          className="text-sm font-bold text-[#1A2B4A] mb-5"
          style={{ fontFamily: "Poppins,sans-serif" }}
        >
          {s.trackTitle}
        </p>
        <div className="relative">
          <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-[#E8F5EE]" />
          {s.stages.map((stage, i) => {
            const done = i < s.currentStage;
            const active = i === s.currentStage;
            return (
              <div key={stage} className="flex items-start gap-4 mb-5 last:mb-0 relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 text-sm font-bold
                    ${done ? "bg-[#1A7A3C] text-white" : active ? "bg-[#1A7A3C] text-white ring-4 ring-[#1A7A3C]/20" : "bg-[#E8F5EE] text-[#9CA3AF]"}`}
                  style={{ fontFamily: "Poppins,sans-serif" }}
                >
                  {done ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l4 4 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <div className="pt-2">
                  <p
                    className={`text-sm font-semibold ${active ? "text-[#1A7A3C]" : done ? "text-[#6B7280]" : "text-[#9CA3AF]"}`}
                    style={{ fontFamily: "Poppins,sans-serif" }}
                  >
                    {stage}
                  </p>
                  {active && (
                    <p className="text-xs text-[#6B7280] mt-0.5">Current stage</p>
                  )}
                  {done && i === 0 && (
                    <p className="text-xs text-[#6B7280] mt-0.5">22 Sep 2026</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProfileScreen({
  s,
  onLogout,
}: {
  s: (typeof S)["en"];
  onLogout: () => void;
}) {
  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <div
        className="rounded-2xl p-6 text-white mb-5 flex items-center gap-4"
        style={{ background: "linear-gradient(135deg,#1A2B4A 0%,#2A3F6A 100%)" }}
      >
        <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0"
          style={{ fontFamily: "Poppins,sans-serif" }}>
          R
        </div>
        <div>
          <p className="text-lg font-bold" style={{ fontFamily: "Poppins,sans-serif" }}>
            {s.farmerName}
          </p>
          <p className="text-sm opacity-70">{s.phone}</p>
          <p className="text-xs opacity-50 mt-0.5">{s.regDate}</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-[#C8DFD0] divide-y divide-[#E8F5EE] mb-4">
        {[
          { icon: "🌾", label: s.sectionCrop, val: s.crop },
          { icon: "📍", label: s.sectionVillage, val: s.village },
          { icon: "🌐", label: s.sectionLang, val: s.preferredLang },
          { icon: "🔒", label: "Verification", val: s.aadhaarNote },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-3 px-5 py-4">
            <span className="text-xl">{row.icon}</span>
            <div className="flex-1">
              <p className="text-xs text-[#6B7280]">{row.label}</p>
              <p className="text-sm font-semibold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
                {row.val}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <button className="w-full py-3 rounded-xl border-2 border-[#C8DFD0] text-[#1A7A3C] text-sm font-semibold hover:bg-[#E8F5EE] transition-colors"
          style={{ fontFamily: "Poppins,sans-serif" }}>
          {s.editProfile}
        </button>
        <button
          onClick={onLogout}
          className="w-full py-3 rounded-xl border-2 border-[#FCA5A5] text-[#C8332A] text-sm font-semibold hover:bg-[#FEF2F2] transition-colors"
          style={{ fontFamily: "Poppins,sans-serif" }}
        >
          {s.logout}
        </button>
      </div>
    </div>
  );
}

function NotifPanel({ s, onClose }: { s: (typeof S)["en"]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="flex-1 bg-black/30" onClick={onClose} />
      <div className="w-full max-w-sm bg-white h-full flex flex-col shadow-2xl animate-[slideRight_0.25s_ease]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8F5EE]">
          <p className="text-base font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
            {s.notifTitle}
          </p>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280] transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {s.notifs.map((n) => (
            <div key={n.id} className="flex gap-3 p-4 rounded-xl" style={{ background: n.bg }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-lg" style={{ background: n.color + "20" }}>
                {n.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>{n.title}</p>
                <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">{n.body}</p>
                <p className="text-xs mt-1.5" style={{ color: n.color }}>{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ─────────────────────────────────────────────────────────
export default function FarmerDashboard({ onLogout }: { onLogout: () => void }) {
  const [lang, setLang] = useState<Lang>("en");
  const [screen, setScreen] = useState<SubScreen>("home");
  const [navTab, setNavTab] = useState<NavTab>("home");
  const [showNotif, setShowNotif] = useState(false);

  const s = S[lang];

  const navigate = (sc: SubScreen, tab?: NavTab) => {
    setScreen(sc);
    if (tab) setNavTab(tab);
  };

  const handleQA = (id: string) => {
    if (id === "booking") navigate("booking", "booking");
    else if (id === "queue") navigate("queue", "queue");
    else if (id === "procurement") navigate("procurement", "procurement");
    else if (id === "centre") navigate("centre");
    else if (id === "payment") navigate("payment");
    else navigate("centre");
  };

  const handleNav = (tab: NavTab) => {
    setNavTab(tab);
    if (tab === "home") navigate("home", "home");
    else if (tab === "booking") navigate("booking", "booking");
    else if (tab === "queue") navigate("queue", "queue");
    else if (tab === "procurement") navigate("procurement", "procurement");
    else if (tab === "payments") navigate("payment", "payments");
    else if (tab === "profile") navigate("profile", "profile");
    else if (tab === "help") navigate("help", "help");
  };

  // ─── Screen titles for sub-screens ─────────────────────────────
  const screenTitle: Record<SubScreen, string> = {
    home: "KisanQ",
    notifications: s.notifTitle,
    booking: lang === "en" ? "My Slot & Token" : "मेरा स्लॉट व टोकन",
    queue: lang === "en" ? "Live Queue" : "लाइव कतार",
    procurement: lang === "en" ? "Procurement Status" : "खरीद स्थिति",
    profile: s.profileTitle,
    help: lang === "en" ? "Help & Assisted Access" : "मदद और सहायता",
    centre: lang === "en" ? "Find Best Centre" : "सर्वोत्तम केंद्र",
    payment: lang === "en" ? "Payment Status" : "भुगतान स्थिति",
  };

  const renderScreen = () => {
    if (screen === "booking") return (
      <SlotBooking
        onBack={() => navigate("centre")}
        onViewQueue={() => navigate("queue", "queue")}
        initialLang={lang}
      />
    );
    if (screen === "queue") return (
      <LiveQueue
        onBack={() => navigate("home", "home")}
        onViewBooking={() => navigate("booking", "booking")}
        initialLang={lang as "en" | "hi"}
      />
    );
    if (screen === "procurement") return (
      <ProcurementTracking
        onBack={() => navigate("home", "home")}
        onViewQueue={() => navigate("queue", "queue")}
        initialLang={lang as "en" | "hi"}
      />
    );
    if (screen === "profile") return <FarmerProfile lang={lang as "en" | "hi"} onLogout={onLogout} onOpenHelp={() => navigate("help", "help")} />;
    if (screen === "help") return <HelpAssistedAccess lang={lang as "en" | "hi"} onBack={() => navigate("home", "home")} />;
    if (screen === "centre") {
      return (
        <SmartCentre
          onBack={() => navigate("home", "home")}
          onSelectCentre={() => navigate("booking", "booking")}
          initialLang={lang as "en" | "hi"}
        />
      );
    }
    if (screen === "payment") {
      return (
        <ComingSoon
          s={s}
          title={screenTitle["payment"]}
          icon="💰"
          onBack={() => navigate("home", "home")}
        />
      );
    }
    return null;
  };

  // ─── HOME SCREEN content ────────────────────────────────────────
  const HomeContent = () => (
    <div className="pb-24">
      {/* Welcome */}
      <div
        className="px-4 pt-5 pb-6"
        style={{ background: "linear-gradient(160deg,#1A7A3C 0%,#2E9952 100%)" }}
      >
        <h1
          className="text-2xl font-bold text-white mb-0.5"
          style={{ fontFamily: "Poppins,sans-serif" }}
        >
          {s.namaste}
        </h1>
        <p className="text-white/80 text-sm mb-5">{s.planVisit}</p>
        {/* Profile pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { icon: "🌾", val: s.crop },
            { icon: "📍", val: s.village },
          ].map((p) => (
            <div
              key={p.val}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/25"
            >
              <span className="text-sm">{p.icon}</span>
              <span className="text-white/90 text-xs font-medium">{p.val}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-4">
        {/* Main CTA */}
        <button
          onClick={() => navigate("centre")}
          className="w-full rounded-2xl p-5 text-left shadow-[0_4px_20px_rgba(26,122,60,0.25)] transition-all active:scale-[0.99]"
          style={{ background: "linear-gradient(135deg,#145F2F 0%,#1A7A3C 100%)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">🎯</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M10 4l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-white text-base font-bold mb-1" style={{ fontFamily: "Poppins,sans-serif" }}>
            {s.mainCta}
          </p>
          <p className="text-white/70 text-xs leading-relaxed">{s.mainCtaSub}</p>
        </button>

        {/* Quick Actions */}
        <div>
          <p className="text-sm font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins,sans-serif" }}>
            {s.quickActions}
          </p>
          <div className="grid grid-cols-2 min-[360px]:grid-cols-3 gap-2.5">
            {s.qa.map((qa) => (
              <button
                key={qa.id}
                onClick={() => handleQA(qa.id)}
                className="bg-white border border-[#C8DFD0] rounded-2xl p-3.5 flex flex-col items-center text-center hover:bg-[#E8F5EE] hover:border-[#1A7A3C] transition-all active:scale-[0.97] shadow-sm"
              >
                <span className="text-2xl mb-2">{qa.icon}</span>
                <span
                  className="text-xs font-semibold text-[#1A2B4A] leading-tight whitespace-pre-line"
                  style={{ fontFamily: "Poppins,sans-serif" }}
                >
                  {qa.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Booking */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] overflow-hidden shadow-sm">
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
                {s.upcomingVisit}
              </p>
              <Badge label="Confirmed" color="green" />
            </div>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] flex items-center justify-center flex-shrink-0 text-xl">
                🏭
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
                  {s.centre}
                </p>
                <p className="text-xs text-[#6B7280] mt-0.5">{s.date} · {s.time}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Token", val: s.token, color: "#1A7A3C" },
                { label: "Queue Ahead", val: s.queueAhead, color: "#1A2B4A" },
                { label: "Est. Wait", val: s.estWait, color: "#E8960A" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#F5F9F6] rounded-xl px-3 py-2.5 text-center">
                  <p className="text-[10px] text-[#6B7280] mb-0.5">{stat.label}</p>
                  <p className="text-sm font-bold" style={{ color: stat.color, fontFamily: "Poppins,sans-serif" }}>
                    {stat.val}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-[#E8F5EE]">
            <button
              onClick={() => navigate("queue", "queue")}
              className="w-full py-3.5 text-sm font-semibold text-[#1A7A3C] hover:bg-[#E8F5EE] transition-colors"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              {s.viewQueue} →
            </button>
          </div>
        </div>

        {/* Smart Leave-Now */}
        <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🕐</span>
            <p className="text-sm font-bold text-[#92400E]" style={{ fontFamily: "Poppins,sans-serif" }}>
              {s.leaveTitle}
            </p>
          </div>
          <div className="space-y-2 mb-4">
            {[
              { label: s.travel, val: s.travelVal },
              { label: s.queueWait, val: s.queueWaitVal },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between">
                <span className="text-xs text-[#92400E]/80">{r.label}</span>
                <span className="text-xs font-bold text-[#92400E]" style={{ fontFamily: "Poppins,sans-serif" }}>
                  {r.val}
                </span>
              </div>
            ))}
            <div className="h-px bg-[#FDE68A]" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#92400E]">{s.departure}</span>
              <span className="text-sm font-bold text-[#92400E]" style={{ fontFamily: "Poppins,sans-serif" }}>
                {s.departureVal}
              </span>
            </div>
          </div>
          <p className="text-[10px] text-[#92400E]/60 mb-3 italic">{s.estimate}</p>
          <button
            onClick={() => navigate("centre")}
            className="w-full py-2.5 rounded-xl bg-[#E8960A] text-white text-sm font-semibold hover:bg-[#D97706] transition-colors shadow-sm"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            {s.viewRoute}
          </button>
        </div>

        {/* Procurement Tracker */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
          <p className="text-sm font-bold text-[#1A2B4A] mb-5" style={{ fontFamily: "Poppins,sans-serif" }}>
            {s.trackTitle}
          </p>
          {/* Horizontal scrollable on mobile, wrapped on desktop */}
          <div className="w-full overflow-x-auto pb-1 -mx-1 px-1">
          <div className="flex items-start gap-0 min-w-max">
            {s.stages.map((stage, i) => {
              const done = i < s.currentStage;
              const active = i === s.currentStage;
              return (
                <div key={stage} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center w-[68px]">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 flex-shrink-0
                        ${done ? "bg-[#1A7A3C] text-white" : active ? "bg-[#1A7A3C] text-white ring-4 ring-[#1A7A3C]/20" : "bg-[#E8F5EE] text-[#9CA3AF]"}`}
                      style={{ fontFamily: "Poppins,sans-serif" }}
                    >
                      {done ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <p
                      className={`text-[9px] text-center mt-1.5 leading-tight px-1 ${active ? "text-[#1A7A3C] font-bold" : done ? "text-[#9CA3AF]" : "text-[#9CA3AF]"}`}
                      style={{ fontFamily: "Poppins,sans-serif" }}
                    >
                      {stage}
                    </p>
                  </div>
                  {i < s.stages.length - 1 && (
                    <div
                      className={`h-0.5 w-4 flex-shrink-0 mb-4 rounded-full ${done ? "bg-[#1A7A3C]" : "bg-[#E8F5EE]"}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          </div>
          <button
            onClick={() => navigate("procurement", "procurement")}
            className="mt-3 w-full py-2.5 rounded-xl border border-[#C8DFD0] text-[#1A7A3C] text-xs font-semibold hover:bg-[#E8F5EE] transition-colors"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            {lang === "en" ? "View Full Procurement Status →" : "पूर्ण खरीद स्थिति देखें →"}
          </button>
        </div>

        {/* Notifications preview */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] overflow-hidden shadow-sm">
          <div className="px-5 pt-4 pb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
              {s.notifTitle}
            </p>
            <button
              onClick={() => setShowNotif(true)}
              className="text-xs text-[#1A7A3C] font-semibold hover:underline"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              {lang === "en" ? "View all" : "सभी देखें"}
            </button>
          </div>
          <div className="divide-y divide-[#E8F5EE]">
            {s.notifs.slice(0, 2).map((n) => (
              <div key={n.id} className="flex items-start gap-3 px-5 py-3.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-base" style={{ background: n.bg }}>
                  {n.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
                    {n.title}
                  </p>
                  <p className="text-xs text-[#6B7280] mt-0.5 line-clamp-2">{n.body}</p>
                </div>
                <span className="text-[10px] text-[#9CA3AF] flex-shrink-0 pt-0.5">{n.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "#F5F9F6", fontFamily: "Inter,sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#C8DFD0] shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {screen !== "home" ? (
              <button
                onClick={() => navigate("home", "home")}
                className="w-8 h-8 -ml-1 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : (
              <KQ />
            )}
            {screen !== "home" && (
              <p className="text-base font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>
                {screenTitle[screen]}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="px-3 py-1.5 rounded-full border border-[#C8DFD0] bg-white text-xs font-semibold text-[#1A7A3C] hover:bg-[#E8F5EE] transition-colors"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              {s.langToggle}
            </button>
            <button
              onClick={() => setShowNotif(true)}
              className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2a6 6 0 00-6 6v2.586l-1.707 1.707A1 1 0 003 14h14a1 1 0 00.707-1.707L16 10.586V8a6 6 0 00-6-6z" fill="#1A2B4A" />
                <path d="M8 14a2 2 0 104 0" fill="#1A2B4A" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E8960A] border border-white" />
            </button>
            <button
              onClick={() => navigate("profile", "profile")}
              className="w-9 h-9 rounded-full bg-[#1A7A3C] flex items-center justify-center text-white text-sm font-bold hover:bg-[#145F2F] transition-colors"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              R
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable body */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden max-w-2xl mx-auto w-full min-w-0">
        {screen === "home" ? <HomeContent /> : <div className="pb-24">{renderScreen()}</div>}
      </main>

      {/* Bottom Navigation */}
      <nav className="flex-shrink-0 bg-white border-t border-[#C8DFD0] shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
        <div className="max-w-2xl mx-auto flex">
          {(
            [
              { id: "home", icon: "🏠", label: s.navHome },
              { id: "booking", icon: "🎫", label: s.navBooking },
              { id: "queue", icon: "👥", label: s.navQueue },
              { id: "procurement", icon: "📦", label: s.navProcurement },
              { id: "payments", icon: "💳", label: s.navPayments },
              { id: "profile", icon: "👤", label: s.navProfile },
            ] as { id: NavTab; icon: string; label: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleNav(tab.id)}
              className="flex-1 flex flex-col items-center py-2.5 gap-0.5 transition-colors"
            >
              <span className="text-lg leading-none">{tab.icon}</span>
              <span
                className={`text-[9px] font-semibold leading-tight ${navTab === tab.id ? "text-[#1A7A3C]" : "text-[#9CA3AF]"}`}
                style={{ fontFamily: "Poppins,sans-serif" }}
              >
                {tab.label}
              </span>
              {navTab === tab.id && (
                <div className="w-4 h-0.5 rounded-full bg-[#1A7A3C]" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Notification panel */}
      {showNotif && <NotifPanel s={s} onClose={() => setShowNotif(false)} />}

      <style>{`
        @keyframes slideRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
