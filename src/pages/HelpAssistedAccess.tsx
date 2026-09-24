import { useState } from "react";

type Lang = "en" | "hi";

const S = {
  en: {
    lang: "हिन्दी",
    headline: "Need Help?",
    subtitle: "Choose the easiest way to use KisanQ.",
    usp: "\"Digital service should not mean digital barrier.\"",
    uspDesc: "KisanQ combines smartphone access with assisted channels so farmers can get help even when they are not comfortable using digital services independently.",
    protoNote: "Prototype concept — assisted channels are not yet live services.",
    // Cards
    helpDeskTitle: "Help Desk",
    helpDeskDesc: "Get help from a support person for booking and tracking.",
    helpDeskBtn: "Get Help",
    callTitle: "Call Support",
    callDesc: "Talk to a support representative.",
    callBtn: "Call Support",
    callNumber: "1800-XXX-XXXX",
    callDemoLabel: "Demo Number",
    ivrTitle: "IVR Assistance",
    ivrDesc: "Use a phone call to access basic KisanQ services.",
    ivrBtn: "Learn How IVR Works",
    ivrMeaning: "IVR = Interactive Voice Response",
    ivrProto: "Prototype Flow",
    ivrStep1: "Call", ivrStep2: "Choose Language", ivrStep3: "Enter / Select Service", ivrStep4: "Receive Information",
    ivrServices: "IVR Services (Demo):",
    ivrS1: "1. Check Slot", ivrS2: "2. Check Token", ivrS3: "3. Check Queue", ivrS4: "4. Check Procurement Status",
    smsTitle: "SMS Assistance",
    smsDesc: "Receive important booking and status updates through SMS.",
    smsDemoLabel: "Demo SMS",
    // Journey
    journeyTitle: "How KisanQ Can Help",
    j1Title: "Register", j1Desc: "Register with assisted support",
    j2Title: "Book",     j2Desc: "Choose centre and slot",
    j3Title: "Track",    j3Desc: "Check token and queue",
    j4Title: "Complete", j4Desc: "Track procurement and payment status",
    // Access for all
    a11yTitle: "Designed for Everyone",
    a11y1: "Simple language", a11y2: "Hindi + English", a11y3: "Large buttons",
    a11y4: "Assisted support", a11y5: "Voice / IVR concept", a11y6: "SMS updates",
    // FAQ
    faqTitle: "Frequently Asked Questions",
    faq1q: "Can I use KisanQ without a smartphone?",
    faq1a: "Yes. KisanQ's prototype includes assisted access through support, SMS and IVR.",
    faq2q: "What is IVR?",
    faq2a: "IVR means Interactive Voice Response. It allows users to interact with a service using a phone call and voice / keypad options.",
    faq3q: "Can someone help me book a slot?",
    faq3a: "Yes. The prototype includes an assisted Help Desk option.",
    faq4q: "Can I check my token?",
    faq4a: "Yes. Token and queue information can be provided through supported access channels.",
    faq5q: "Can I track procurement status?",
    faq5a: "Yes. KisanQ provides a procurement tracking flow.",
    // Support card
    supportTitle: "Need assistance with your booking?",
    contactHelp: "Contact Help Desk",
    viewBooking: "View Booking",
    checkToken: "Check Token",
    // IVR detail modal
    ivrModalTitle: "How IVR Works",
    ivrClose: "Close",
    // Toast
    toastMsg: "Connecting to Help Desk (Demo)",
    toastNote: "This is a prototype — no real call is made.",
  },
  hi: {
    lang: "English",
    headline: "मदद चाहिए?",
    subtitle: "KisanQ उपयोग का सबसे आसान तरीका चुनें।",
    usp: "\"डिजिटल सेवा किसी किसान के लिए बाधा नहीं होनी चाहिए।\"",
    uspDesc: "KisanQ स्मार्टफोन एक्सेस को सहायता चैनलों के साथ जोड़ता है ताकि किसान मदद पा सकें।",
    protoNote: "प्रोटोटाइप अवधारणा — सहायता चैनल अभी लाइव सेवाएं नहीं हैं।",
    helpDeskTitle: "सहायता केंद्र",
    helpDeskDesc: "बुकिंग और ट्रैकिंग के लिए सहायक से मदद लें।",
    helpDeskBtn: "मदद लें",
    callTitle: "कॉल सहायता",
    callDesc: "सहायता प्रतिनिधि से बात करें।",
    callBtn: "कॉल करें",
    callNumber: "1800-XXX-XXXX",
    callDemoLabel: "डेमो नंबर",
    ivrTitle: "IVR सहायता",
    ivrDesc: "फोन कॉल से KisanQ की बुनियादी सेवाएं एक्सेस करें।",
    ivrBtn: "IVR कैसे काम करता है",
    ivrMeaning: "IVR = इंटरएक्टिव वॉयस रिस्पॉन्स",
    ivrProto: "प्रोटोटाइप प्रवाह",
    ivrStep1: "कॉल करें", ivrStep2: "भाषा चुनें", ivrStep3: "सेवा चुनें", ivrStep4: "जानकारी प्राप्त करें",
    ivrServices: "IVR सेवाएं (डेमो):",
    ivrS1: "1. स्लॉट जांचें", ivrS2: "2. टोकन जांचें", ivrS3: "3. कतार जांचें", ivrS4: "4. खरीद स्थिति",
    smsTitle: "SMS सहायता",
    smsDesc: "SMS के माध्यम से बुकिंग और स्थिति अपडेट प्राप्त करें।",
    smsDemoLabel: "डेमो SMS",
    journeyTitle: "KisanQ कैसे मदद कर सकता है",
    j1Title: "रजिस्टर करें", j1Desc: "सहायता के साथ रजिस्टर करें",
    j2Title: "बुक करें",     j2Desc: "केंद्र और स्लॉट चुनें",
    j3Title: "ट्रैक करें",   j3Desc: "टोकन और कतार जांचें",
    j4Title: "पूर्ण करें",   j4Desc: "खरीद और भुगतान स्थिति ट्रैक करें",
    a11yTitle: "सबके लिए डिज़ाइन",
    a11y1: "सरल भाषा", a11y2: "हिन्दी + अंग्रेज़ी", a11y3: "बड़े बटन",
    a11y4: "सहायता चैनल", a11y5: "Voice / IVR अवधारणा", a11y6: "SMS अपडेट",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    faq1q: "क्या मैं स्मार्टफोन के बिना KisanQ उपयोग कर सकता हूं?",
    faq1a: "हां। KisanQ के प्रोटोटाइप में सहायता, SMS और IVR के माध्यम से एक्सेस शामिल है।",
    faq2q: "IVR क्या है?",
    faq2a: "IVR का मतलब इंटरएक्टिव वॉयस रिस्पॉन्स है। यह उपयोगकर्ताओं को फोन कॉल और कीपैड से सेवा से इंटरैक्ट करने देता है।",
    faq3q: "क्या कोई मेरे लिए स्लॉट बुक करने में मदद कर सकता है?",
    faq3a: "हां। प्रोटोटाइप में एक सहायता केंद्र विकल्प शामिल है।",
    faq4q: "क्या मैं अपना टोकन जांच सकता हूं?",
    faq4a: "हां। सहायता चैनलों के माध्यम से टोकन और कतार जानकारी प्रदान की जा सकती है।",
    faq5q: "क्या मैं खरीद स्थिति ट्रैक कर सकता हूं?",
    faq5a: "हां। KisanQ एक खरीद ट्रैकिंग प्रवाह प्रदान करता है।",
    supportTitle: "आपकी बुकिंग में सहायता चाहिए?",
    contactHelp: "सहायता केंद्र से संपर्क करें",
    viewBooking: "बुकिंग देखें",
    checkToken: "टोकन जांचें",
    ivrModalTitle: "IVR कैसे काम करता है",
    ivrClose: "बंद करें",
    toastMsg: "सहायता केंद्र से जोड़ रहे हैं (डेमो)",
    toastNote: "यह प्रोटोटाइप है — कोई वास्तविक कॉल नहीं की जाती।",
  },
};

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#C8DFD0] rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-[#1A2B4A] leading-snug pr-4" style={{ fontFamily: "Poppins, sans-serif" }}>{q}</span>
        <div className={`w-8 h-8 rounded-full bg-[#E8F5EE] flex items-center justify-center flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="#1A7A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </button>
      {open && (
        <div className="px-5 pb-4 border-t border-[#E8F5EE]">
          <p className="text-sm text-[#6B7280] leading-relaxed pt-3">{a}</p>
        </div>
      )}
    </div>
  );
}

// ─── IVR Modal ────────────────────────────────────────────────────────────────
function IVRModal({ s, onClose }: { s: typeof S["en"]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8F5EE]">
          <p className="text-base font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>☎️ {s.ivrModalTitle}</p>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280] text-xl">×</button>
        </div>
        <div className="p-6 space-y-5">
          {/* IVR flow */}
          <div className="bg-[#F5F9F6] rounded-2xl p-4">
            <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-4">{s.ivrProto}</p>
            {[s.ivrStep1, s.ivrStep2, s.ivrStep3, s.ivrStep4].map((step, i) => (
              <div key={step} className="flex flex-col items-center">
                <div className="w-full flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1A7A3C] text-white text-sm font-bold flex items-center justify-center flex-shrink-0" style={{ fontFamily: "Poppins, sans-serif" }}>{i + 1}</div>
                  <p className="text-sm font-semibold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{step}</p>
                </div>
                {i < 3 && <div className="w-0.5 h-5 bg-[#C8DFD0] my-1 ml-4" />}
              </div>
            ))}
          </div>
          {/* Services */}
          <div>
            <p className="text-xs font-bold text-[#1A2B4A] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>{s.ivrServices}</p>
            <div className="space-y-1.5">
              {[s.ivrS1, s.ivrS2, s.ivrS3, s.ivrS4].map((sv) => (
                <div key={sv} className="flex items-center gap-2 bg-[#E8F5EE] rounded-xl px-3 py-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1A7A3C]" />
                  <p className="text-sm text-[#1A2B4A]">{sv}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-[#9CA3AF] text-center">{s.protoNote}</p>
          <button onClick={onClose} className="w-full py-3.5 text-sm font-bold text-[#1A7A3C] border-2 border-[#C8DFD0] rounded-2xl hover:bg-[#E8F5EE]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.ivrClose}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Demo Toast ───────────────────────────────────────────────────────────────
function DemoToast({ msg, note, onClose }: { msg: string; note: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#1A2B4A] text-white rounded-2xl shadow-2xl px-5 py-3 flex items-start gap-3 max-w-xs w-full mx-4">
      <span className="text-lg flex-shrink-0">📞</span>
      <div className="flex-1">
        <p className="text-sm font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>{msg}</p>
        <p className="text-[10px] text-white/60 mt-0.5">{note}</p>
      </div>
      <button onClick={onClose} className="text-white/60 hover:text-white text-lg leading-none flex-shrink-0">×</button>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function HelpAssistedAccess({ lang: initLang = "en", onBack }: { lang?: Lang; onBack?: () => void }) {
  const [lang, setLang] = useState<Lang>(initLang);
  const [showIVR, setShowIVR] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const s = S[lang];

  const toast = () => { setShowToast(true); setTimeout(() => setShowToast(false), 3000); };

  const SMS_PREVIEW = `KisanQ Update:\nToken Q-024\nCentre B\nSlot: 10:30 AM`;

  return (
    <div className="min-h-screen bg-[#F5F9F6]" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* Header */}
      <div className="bg-white border-b border-[#C8DFD0] sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280]">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}
            <div>
              <p className="text-xs font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>🌾 KisanQ</p>
              <p className="text-lg font-bold text-[#1A2B4A] leading-tight" style={{ fontFamily: "Poppins, sans-serif" }}>{s.headline}</p>
            </div>
          </div>
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#C8DFD0] text-xs font-bold text-[#1A2B4A] bg-white hover:bg-[#E8F5EE] transition-colors"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            🌐 {s.lang}
          </button>
        </div>
        <div className="max-w-lg mx-auto px-4 pb-3">
          <p className="text-sm text-[#6B7280]">{s.subtitle}</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-5 pb-28">

        {/* USP Banner */}
        <div className="bg-gradient-to-br from-[#1A2B4A] to-[#1A7A3C] rounded-3xl p-6 text-white text-center">
          <p className="text-base font-bold leading-snug mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{s.usp}</p>
          <p className="text-xs text-white/75 leading-relaxed">{s.uspDesc}</p>
          <div className="mt-3 inline-block bg-white/15 px-3 py-1 rounded-full">
            <p className="text-[9px] text-white/70">{s.protoNote}</p>
          </div>
        </div>

        {/* CARD 1 — Help Desk */}
        <div className="bg-white rounded-3xl border border-[#C8DFD0] shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-[#E8F5EE] flex items-center justify-center text-4xl flex-shrink-0">👨‍💼</div>
              <div>
                <p className="text-xl font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.helpDeskTitle}</p>
                <p className="text-sm text-[#6B7280] mt-0.5">{s.helpDeskDesc}</p>
              </div>
            </div>
            <button onClick={toast} className="w-full py-4 text-base font-bold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-2xl transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
              {s.helpDeskBtn}
            </button>
          </div>
        </div>

        {/* CARD 2 — Call Support */}
        <div className="bg-white rounded-3xl border border-[#C8DFD0] shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] flex items-center justify-center text-4xl flex-shrink-0">📞</div>
              <div>
                <p className="text-xl font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.callTitle}</p>
                <p className="text-sm text-[#6B7280] mt-0.5">{s.callDesc}</p>
              </div>
            </div>
            <div className="bg-[#F5F9F6] rounded-2xl p-4 mb-4 flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-[#1A2B4A] tracking-wider" style={{ fontFamily: "Poppins, sans-serif" }}>{s.callNumber}</p>
                <span className="text-[9px] font-bold text-[#E8960A] bg-[#FEF3C7] px-2 py-0.5 rounded-full mt-1 inline-block">{s.callDemoLabel}</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#2563EB] flex items-center justify-center text-2xl">📞</div>
            </div>
            <button onClick={toast} className="w-full py-4 text-base font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-2xl transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
              {s.callBtn}
            </button>
          </div>
        </div>

        {/* CARD 3 — IVR */}
        <div className="bg-white rounded-3xl border border-[#C8DFD0] shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-[#F5F3FF] flex items-center justify-center text-4xl flex-shrink-0">☎️</div>
              <div>
                <p className="text-xl font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.ivrTitle}</p>
                <p className="text-sm text-[#6B7280] mt-0.5">{s.ivrDesc}</p>
                <p className="text-[10px] text-[#7C3AED] font-bold mt-1">{s.ivrMeaning}</p>
              </div>
            </div>
            {/* Mini IVR flow */}
            <div className="bg-[#F5F3FF] rounded-2xl p-4 mb-4">
              <p className="text-[9px] font-bold text-[#7C3AED] uppercase tracking-wider mb-3">{s.ivrProto}</p>
              <div className="flex items-center gap-1 flex-wrap">
                {[s.ivrStep1, s.ivrStep2, s.ivrStep3, s.ivrStep4].map((step, i) => (
                  <div key={step} className="flex items-center gap-1">
                    <div className="bg-[#7C3AED] text-white text-[9px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap">{step}</div>
                    {i < 3 && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6h6M7 4l2 2-2 2" stroke="#7C3AED" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => setShowIVR(true)} className="w-full py-4 text-base font-bold text-[#7C3AED] bg-[#F5F3FF] hover:bg-[#EDE9FE] border-2 border-[#DDD6FE] rounded-2xl transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
              {s.ivrBtn}
            </button>
          </div>
        </div>

        {/* CARD 4 — SMS */}
        <div className="bg-white rounded-3xl border border-[#C8DFD0] shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-[#E8F5EE] flex items-center justify-center text-4xl flex-shrink-0">💬</div>
              <div>
                <p className="text-xl font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.smsTitle}</p>
                <p className="text-sm text-[#6B7280] mt-0.5">{s.smsDesc}</p>
              </div>
            </div>
            {/* SMS Preview bubble */}
            <div className="bg-[#F5F9F6] rounded-2xl p-4 mb-4">
              <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">{s.smsDemoLabel}</p>
              <div className="bg-white rounded-xl p-3 border border-[#C8DFD0] shadow-sm max-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-full bg-[#1A7A3C] flex items-center justify-center text-[8px] text-white font-bold">K</div>
                  <p className="text-[10px] font-bold text-[#1A7A3C]">KisanQ</p>
                </div>
                {SMS_PREVIEW.split("\n").map((line, i) => (
                  <p key={i} className={`text-xs ${i === 0 ? "font-semibold text-[#1A2B4A]" : "text-[#6B7280]"}`}>{line}</p>
                ))}
              </div>
            </div>
            <p className="text-[10px] text-[#9CA3AF]">{s.protoNote}</p>
          </div>
        </div>

        {/* Farmer Journey */}
        <div className="bg-white rounded-3xl border border-[#C8DFD0] p-6 shadow-sm">
          <p className="text-lg font-bold text-[#1A2B4A] mb-5 text-center" style={{ fontFamily: "Poppins, sans-serif" }}>{s.journeyTitle}</p>
          <div className="space-y-3">
            {[
              { num: "1", title: s.j1Title, desc: s.j1Desc, color: "#1A7A3C", bg: "#E8F5EE" },
              { num: "2", title: s.j2Title, desc: s.j2Desc, color: "#2563EB", bg: "#EFF6FF" },
              { num: "3", title: s.j3Title, desc: s.j3Desc, color: "#E8960A", bg: "#FEF3C7" },
              { num: "4", title: s.j4Title, desc: s.j4Desc, color: "#7C3AED", bg: "#F5F3FF" },
            ].map((step, i) => (
              <div key={step.num} className="flex flex-col items-start">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0" style={{ background: step.color, fontFamily: "Poppins, sans-serif" }}>{step.num}</div>
                  <div className="flex-1 py-3 px-4 rounded-2xl" style={{ background: step.bg }}>
                    <p className="text-sm font-bold" style={{ color: step.color, fontFamily: "Poppins, sans-serif" }}>{step.title}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{step.desc}</p>
                  </div>
                </div>
                {i < 3 && <div className="w-0.5 h-4 bg-[#C8DFD0] ml-6 my-0.5" />}
              </div>
            ))}
          </div>
        </div>

        {/* Accessibility */}
        <div className="bg-gradient-to-br from-[#E8F5EE] to-[#F5F9F6] rounded-3xl border border-[#C8DFD0] p-6">
          <p className="text-base font-bold text-[#1A2B4A] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>✅ {s.a11yTitle}</p>
          <div className="grid grid-cols-2 gap-2">
            {[s.a11y1, s.a11y2, s.a11y3, s.a11y4, s.a11y5, s.a11y6].map((item) => (
              <div key={item} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 border border-[#C8DFD0]">
                <div className="w-4 h-4 rounded-full bg-[#1A7A3C] flex items-center justify-center flex-shrink-0">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <p className="text-xs text-[#1A2B4A] font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <p className="text-lg font-bold text-[#1A2B4A] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>❓ {s.faqTitle}</p>
          <div className="space-y-3">
            <FAQItem q={s.faq1q} a={s.faq1a} />
            <FAQItem q={s.faq2q} a={s.faq2a} />
            <FAQItem q={s.faq3q} a={s.faq3a} />
            <FAQItem q={s.faq4q} a={s.faq4a} />
            <FAQItem q={s.faq5q} a={s.faq5a} />
          </div>
        </div>

        {/* Support card */}
        <div className="bg-white rounded-3xl border border-[#C8DFD0] p-6 shadow-sm text-center">
          <p className="text-base font-bold text-[#1A2B4A] mb-5" style={{ fontFamily: "Poppins, sans-serif" }}>🤝 {s.supportTitle}</p>
          <div className="space-y-3">
            <button onClick={toast} className="w-full py-4 text-base font-bold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-2xl transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
              👨‍💼 {s.contactHelp}
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="py-3.5 text-sm font-bold text-[#2563EB] border-2 border-[#BFDBFE] bg-[#EFF6FF] hover:bg-[#DBEAFE] rounded-2xl transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
                🎫 {s.viewBooking}
              </button>
              <button className="py-3.5 text-sm font-bold text-[#7C3AED] border-2 border-[#DDD6FE] bg-[#F5F3FF] hover:bg-[#EDE9FE] rounded-2xl transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
                🔢 {s.checkToken}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-[#9CA3AF] pb-2">KisanQ · SIH 2026 Prototype · Team Viksit Innovators · {s.protoNote}</p>
      </div>

      {showIVR && <IVRModal s={s} onClose={() => setShowIVR(false)} />}
      {showToast && <DemoToast msg={s.toastMsg} note={s.toastNote} onClose={() => setShowToast(false)} />}
    </div>
  );
}
