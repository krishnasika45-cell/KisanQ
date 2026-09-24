import { useState } from "react";

type Lang = "en" | "hi";
type Section = "general" | "profile" | "centre" | "queue" | "notifications" | "language" | "security" | "system";

const S = {
  en: {
    title: "Settings",
    subtitle: "Manage KisanQ system preferences and configuration.",
    lang: "हिन्दी",
    demoNote: "All settings are prototype/demo only — not connected to real government systems, databases, or services. No real data is stored or modified.",
    saved: "Settings saved (Demo)",
    savedNote: "No real configuration was changed.",
    // Nav
    general: "General", profile: "Admin Profile", centre: "Centre Configuration",
    queue: "Slot & Queue Settings", notifications: "Notifications", language: "Language",
    security: "Security", system: "System Information",
    // General
    platformName: "Platform Name", tagline: "Tagline", problemStatement: "Problem Statement",
    defaultLang: "Default Language", secondaryLang: "Secondary Language",
    timezone: "Timezone", saveChanges: "Save Changes",
    // Profile
    adminName: "Admin Name", role: "Role", centreLabel: "Centre",
    email: "Email", phone: "Phone", editProfile: "Edit Profile", changePassword: "Change Password",
    demoInfo: "Demo information only — not real admin credentials.",
    // Centre config
    centreConfig: "Centre Configuration",
    capacity: "Capacity", avgProcTime: "Average Processing Time",
    statusLabel: "Status", availSlots: "Available Slots",
    saveConfig: "Save Configuration", viewCentre: "View Centre",
    protoValues: "These are prototype configuration values.",
    // Queue
    maxFarmers: "Maximum Farmers per Slot",
    queueInterval: "Queue Update Interval",
    etaCalc: "ETA Calculation",
    queueStatus: "Queue Status",
    liveQueue: "Live Queue", dynamicETA: "Dynamic ETA", leaveNow: "Leave-Now Recommendation",
    protoToggles: "These are prototype toggles — no real system integration.",
    // Notifications
    queueUpdates: "Queue Updates", slotConfirm: "Slot Confirmation",
    etaChanges: "ETA Changes", procUpdates: "Procurement Updates",
    payUpdates: "Payment Updates", centreAlerts: "Centre Alerts",
    channels: "Notification Channels",
    inApp: "In-App", sms: "SMS", ivr: "IVR",
    prototype: "Prototype",
    smsNote: "SMS and IVR are shown as planned/assisted-access channels in this prototype and are not connected to live services.",
    // Language
    bilingualInterface: "Bilingual Interface",
    preview: "Interface Preview",
    liveQueueEn: "Live Queue", liveQueueHi: "लाइव कतार",
    // Security
    adminAuth: "Admin Authentication", sessionTimeout: "Session Timeout",
    rbac: "Role-Based Access", activityLog: "Activity Logging",
    viewLog: "View Activity Log", updateSecurity: "Update Security Settings",
    secNote: "No real authentication secrets are stored in this prototype.",
    // System
    application: "Application", version: "Version", sih: "SIH Year",
    environment: "Environment", database: "Database",
    backend: "Backend", frontend: "Frontend", statusSys: "Status",
    // Danger zone
    dangerZone: "Administrative Actions",
    resetDemo: "Reset Demo Data",
    resetTitle: "Reset Demo Data?",
    resetMsg: "This will reset prototype values and demo records. No real data will be deleted.",
    cancelBtn: "Cancel",
    confirmReset: "Reset Demo Data",
    resetDone: "Demo Reset Simulated",
    resetDoneNote: "No real data was deleted.",
    on: "ON", off: "OFF",
    enabled: "Enabled", disabled: "Disabled",
    min: "min",
  },
  hi: {
    title: "सेटिंग्स",
    subtitle: "KisanQ सिस्टम प्राथमिकताएं और कॉन्फ़िगरेशन प्रबंधित करें।",
    lang: "English",
    demoNote: "सभी सेटिंग्स केवल प्रोटोटाइप/डेमो हैं — किसी वास्तविक सरकारी प्रणाली, डेटाबेस या सेवाओं से जुड़ी नहीं हैं।",
    saved: "सेटिंग्स सहेजी गईं (डेमो)",
    savedNote: "कोई वास्तविक कॉन्फ़िगरेशन नहीं बदला गया।",
    general: "सामान्य", profile: "व्यवस्थापक प्रोफ़ाइल", centre: "केंद्र कॉन्फ़िगरेशन",
    queue: "स्लॉट और कतार सेटिंग्स", notifications: "सूचनाएं", language: "भाषा",
    security: "सुरक्षा", system: "सिस्टम जानकारी",
    platformName: "प्लेटफ़ॉर्म नाम", tagline: "टैगलाइन", problemStatement: "समस्या कथन",
    defaultLang: "डिफ़ॉल्ट भाषा", secondaryLang: "द्वितीयक भाषा",
    timezone: "समय क्षेत्र", saveChanges: "परिवर्तन सहेजें",
    adminName: "व्यवस्थापक नाम", role: "भूमिका", centreLabel: "केंद्र",
    email: "ईमेल", phone: "फ़ोन", editProfile: "प्रोफ़ाइल संपादित करें", changePassword: "पासवर्ड बदलें",
    demoInfo: "केवल डेमो जानकारी — वास्तविक व्यवस्थापक क्रेडेंशियल नहीं।",
    centreConfig: "केंद्र कॉन्फ़िगरेशन",
    capacity: "क्षमता", avgProcTime: "औसत प्रक्रिया समय",
    statusLabel: "स्थिति", availSlots: "उपलब्ध स्लॉट",
    saveConfig: "कॉन्फ़िगरेशन सहेजें", viewCentre: "केंद्र देखें",
    protoValues: "ये प्रोटोटाइप कॉन्फ़िगरेशन मान हैं।",
    maxFarmers: "प्रति स्लॉट अधिकतम किसान",
    queueInterval: "कतार अपडेट अंतराल",
    etaCalc: "ETA गणना",
    queueStatus: "कतार स्थिति",
    liveQueue: "लाइव कतार", dynamicETA: "डायनामिक ETA", leaveNow: "प्रस्थान अनुशंसा",
    protoToggles: "ये प्रोटोटाइप टॉगल हैं — कोई वास्तविक सिस्टम एकीकरण नहीं।",
    queueUpdates: "कतार अपडेट", slotConfirm: "स्लॉट पुष्टि",
    etaChanges: "ETA परिवर्तन", procUpdates: "खरीद अपडेट",
    payUpdates: "भुगतान अपडेट", centreAlerts: "केंद्र अलर्ट",
    channels: "सूचना चैनल",
    inApp: "इन-ऐप", sms: "SMS", ivr: "IVR",
    prototype: "प्रोटोटाइप",
    smsNote: "SMS और IVR इस प्रोटोटाइप में नियोजित चैनल के रूप में दिखाए गए हैं — लाइव सेवाओं से जुड़े नहीं हैं।",
    bilingualInterface: "द्विभाषी इंटरफ़ेस",
    preview: "इंटरफ़ेस पूर्वावलोकन",
    liveQueueEn: "Live Queue", liveQueueHi: "लाइव कतार",
    adminAuth: "व्यवस्थापक प्रमाणीकरण", sessionTimeout: "सत्र समयसीमा",
    rbac: "भूमिका-आधारित पहुँच", activityLog: "गतिविधि लॉगिंग",
    viewLog: "गतिविधि लॉग देखें", updateSecurity: "सुरक्षा सेटिंग्स अपडेट करें",
    secNote: "इस प्रोटोटाइप में कोई वास्तविक प्रमाणीकरण रहस्य संग्रहीत नहीं है।",
    application: "एप्लिकेशन", version: "संस्करण", sih: "SIH वर्ष",
    environment: "वातावरण", database: "डेटाबेस",
    backend: "बैकएंड", frontend: "फ्रंटएंड", statusSys: "स्थिति",
    dangerZone: "प्रशासनिक क्रियाएं",
    resetDemo: "डेमो डेटा रीसेट करें",
    resetTitle: "डेमो डेटा रीसेट करें?",
    resetMsg: "यह प्रोटोटाइप मान और डेमो रिकॉर्ड रीसेट करेगा। कोई वास्तविक डेटा नहीं हटाया जाएगा।",
    cancelBtn: "रद्द करें",
    confirmReset: "डेमो डेटा रीसेट करें",
    resetDone: "डेमो रीसेट सिम्युलेटेड",
    resetDoneNote: "कोई वास्तविक डेटा नहीं हटाया गया।",
    on: "चालू", off: "बंद",
    enabled: "सक्षम", disabled: "अक्षम",
    min: "मिनट",
  },
};

// ─── Toggle Component ──────────────────────────────────────────────────────────
function Toggle({ on, onChange, disabled = false }: { on: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!on)}
      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"} ${on ? "bg-[#1A7A3C]" : "bg-[#D1D5DB]"}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

// ─── Setting Row ───────────────────────────────────────────────────────────────
function SettingRow({ label, children, note }: { label: string; children: React.ReactNode; note?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-[#E8F5EE] last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{label}</p>
        {note && <p className="text-[10px] text-[#9CA3AF] mt-0.5">{note}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

// ─── Field ────────────────────────────────────────────────────────────────────
function Field({ label, value, type = "text", note }: { label: string; value: string; type?: string; note?: string }) {
  const [val, setVal] = useState(value);
  return (
    <div>
      <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>{label}</label>
      <input
        type={type}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="w-full px-3 py-2.5 text-sm border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]"
      />
      {note && <p className="text-[9px] text-[#9CA3AF] mt-1">{note}</p>}
    </div>
  );
}

// ─── Save Toast ───────────────────────────────────────────────────────────────
function SaveToast({ msg, note, onClose }: { msg: string; note: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#1A7A3C] text-white rounded-2xl shadow-2xl px-5 py-4 flex items-start gap-3 max-w-xs animate-in fade-in slide-in-from-bottom-4">
      <span className="text-xl flex-shrink-0">✅</span>
      <div>
        <p className="text-sm font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>{msg}</p>
        <p className="text-xs text-white/70 mt-0.5">{note}</p>
      </div>
      <button onClick={onClose} className="ml-2 text-white/60 hover:text-white text-lg leading-none flex-shrink-0">×</button>
    </div>
  );
}

// ─── Reset Modal ──────────────────────────────────────────────────────────────
function ResetModal({ s, onClose }: { s: typeof S["en"]; onClose: () => void }) {
  const [done, setDone] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-[#FECACA]" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#FEF2F2]">
          <p className="text-sm font-bold text-[#C8332A]" style={{ fontFamily: "Poppins, sans-serif" }}>⚠️ {s.resetTitle}</p>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#FEF2F2] text-[#6B7280]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
        {done ? (
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#E8F5EE] flex items-center justify-center text-2xl mb-3">✅</div>
            <p className="text-sm font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.resetDone}</p>
            <p className="text-xs text-[#9CA3AF] mt-1">{s.resetDoneNote}</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <p className="text-sm text-[#6B7280] leading-relaxed">{s.resetMsg}</p>
            <div className="flex gap-2">
              <button onClick={onClose} className="flex-1 py-2.5 text-sm font-semibold text-[#6B7280] border border-[#C8DFD0] rounded-xl hover:bg-[#F5F9F6]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.cancelBtn}</button>
              <button onClick={() => { setDone(true); setTimeout(onClose, 1200); }} className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#C8332A] hover:bg-[#A82520] rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>{s.confirmReset}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Section card wrapper ─────────────────────────────────────────────────────
function Card({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-[#E8F5EE] flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{title}</p>
      </div>
      <div className="px-6 py-2">{children}</div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function AdminSettings({ lang: initLang = "en" }: { lang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initLang);
  const [section, setSection] = useState<Section>("general");
  const [showToast, setShowToast] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const s = S[lang];

  // Toggle states
  const [liveQueue, setLiveQueue] = useState(true);
  const [dynamicETA, setDynamicETA] = useState(true);
  const [leaveNow, setLeaveNow] = useState(true);
  const [notifToggles, setNotifToggles] = useState({
    queueUpdates: true, slotConfirm: true, etaChanges: true,
    procUpdates: true, payUpdates: true, centreAlerts: true,
    inApp: true, sms: false, ivr: false,
  });
  const [bilingual, setBilingual] = useState(true);
  const [uiLang, setUiLang] = useState<"en" | "hi">("en");

  const toast = () => { setShowToast(true); setTimeout(() => setShowToast(false), 2800); };

  const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
    { id: "general",       label: s.general,       icon: "⚙️" },
    { id: "profile",       label: s.profile,        icon: "👤" },
    { id: "centre",        label: s.centre,         icon: "🏛️" },
    { id: "queue",         label: s.queue,          icon: "🔢" },
    { id: "notifications", label: s.notifications,  icon: "🔔" },
    { id: "language",      label: s.language,       icon: "🌐" },
    { id: "security",      label: s.security,       icon: "🔒" },
    { id: "system",        label: s.system,         icon: "💻" },
  ];

  const toggleNotif = (k: keyof typeof notifToggles) =>
    setNotifToggles((n) => ({ ...n, [k]: !n[k] }));

  return (
    <div className="p-4 xl:p-6 max-w-[1280px] mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* Demo notice */}
      <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl px-4 py-2 flex items-start gap-2 mb-4">
        <span className="text-sm flex-shrink-0 mt-0.5">⚠️</span>
        <p className="text-xs text-[#92400E]"><strong>SIH 2026 Prototype</strong> — {s.demoNote}</p>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <div>
          <p className="text-lg font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.title}</p>
          <p className="text-xs text-[#9CA3AF]">{s.subtitle}</p>
        </div>
      </div>

      <div className="flex gap-5 items-start">

        {/* Settings sidebar nav */}
        <aside className="hidden md:flex flex-col w-52 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm overflow-hidden">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${i < NAV_ITEMS.length - 1 ? "border-b border-[#E8F5EE]" : ""} ${section === item.id ? "bg-[#1A2B4A] text-white" : "hover:bg-[#F5F9F6] text-[#6B7280]"}`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <span className="text-base flex-shrink-0">{item.icon}</span>
                <span className="font-semibold text-xs">{item.label}</span>
                {section === item.id && (
                  <svg className="ml-auto w-3 h-3" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Mobile nav pills */}
        <div className="md:hidden flex gap-2 flex-wrap mb-4 w-full">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => setSection(item.id)} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${section === item.id ? "bg-[#1A2B4A] text-white border-[#1A2B4A]" : "text-[#6B7280] border-[#C8DFD0] bg-white"}`} style={{ fontFamily: "Poppins, sans-serif" }}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </div>

        {/* Settings content */}
        <div className="flex-1 min-w-0 space-y-4">

          {/* ── General ── */}
          {section === "general" && (
            <Card title={s.general} icon="⚙️">
              <div className="py-4 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label={s.platformName}     value="KisanQ" />
                  <Field label={s.tagline}          value="Smart Procurement. Better Predictability." />
                  <Field label={s.problemStatement} value="SIH26032" />
                  <Field label={s.timezone}         value="India Standard Time (IST)" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>{s.defaultLang}</label>
                    <select className="w-full px-3 py-2.5 text-sm border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]">
                      <option>English</option><option>हिन्दी</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>{s.secondaryLang}</label>
                    <select className="w-full px-3 py-2.5 text-sm border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]">
                      <option>हिन्दी</option><option>English</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button onClick={toast} className="px-5 py-2.5 text-sm font-bold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>{s.saveChanges}</button>
                </div>
              </div>
            </Card>
          )}

          {/* ── Admin Profile ── */}
          {section === "profile" && (
            <Card title={s.profile} icon="👤">
              <div className="py-4 space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A2B4A] to-[#1A7A3C] flex items-center justify-center text-2xl text-white font-bold flex-shrink-0" style={{ fontFamily: "Poppins, sans-serif" }}>CA</div>
                  <div>
                    <p className="text-base font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>Centre Administrator</p>
                    <p className="text-xs text-[#9CA3AF]">Procurement Centre Admin</p>
                    <span className="text-[9px] font-bold text-[#1A7A3C] bg-[#E8F5EE] px-2 py-0.5 rounded-full mt-1 inline-block">Demo Account</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label={s.adminName} value="Centre Administrator" note={s.demoInfo} />
                  <Field label={s.role}      value="Procurement Centre Admin" />
                  <Field label={s.centreLabel} value="Gwalior Procurement Centre B" />
                  <Field label={s.email}    value="admin@example.demo" type="email" note="Demo email only" />
                  <Field label={s.phone}    value="+91 XXXXX XXXXX" note="Demo placeholder" />
                </div>
                <div className="flex gap-2 pt-2">
                  <button onClick={toast} className="px-5 py-2.5 text-sm font-bold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>{s.editProfile}</button>
                  <button onClick={toast} className="px-5 py-2.5 text-sm font-bold text-[#6B7280] border border-[#C8DFD0] hover:bg-[#F5F9F6] rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>{s.changePassword}</button>
                </div>
              </div>
            </Card>
          )}

          {/* ── Centre Config ── */}
          {section === "centre" && (
            <Card title={s.centreConfig} icon="🏛️">
              <div className="py-4 space-y-4">
                <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl px-4 py-2.5">
                  <p className="text-xs text-[#92400E]">⚠️ {s.protoValues}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label={s.centreLabel}    value="Gwalior Procurement Centre B" />
                  <Field label={s.capacity}       value="50 farmers" />
                  <Field label={s.avgProcTime}    value="3 minutes" />
                  <Field label={s.availSlots}     value="8" />
                </div>
                <SettingRow label={s.statusLabel}>
                  <span className="text-xs font-bold text-[#1A7A3C] bg-[#E8F5EE] px-3 py-1.5 rounded-full" style={{ fontFamily: "Poppins, sans-serif" }}>Open</span>
                </SettingRow>
                <div className="flex gap-2 pt-2">
                  <button onClick={toast} className="px-5 py-2.5 text-sm font-bold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>{s.saveConfig}</button>
                  <button className="px-5 py-2.5 text-sm font-bold text-[#6B7280] border border-[#C8DFD0] hover:bg-[#F5F9F6] rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>{s.viewCentre}</button>
                </div>
              </div>
            </Card>
          )}

          {/* ── Slot & Queue ── */}
          {section === "queue" && (
            <Card title={s.queue} icon="🔢">
              <div className="py-2 divide-y divide-[#E8F5EE]">
                <div className="py-4 grid md:grid-cols-2 gap-4">
                  <Field label={s.maxFarmers}    value="25" />
                  <Field label={s.queueInterval} value="5 minutes" />
                  <Field label={s.etaCalc}       value="Travel Time + Estimated Queue Wait" />
                  <Field label={s.avgProcTime}   value="3 minutes" />
                </div>
                <SettingRow label={s.liveQueue}  note={s.protoToggles}><Toggle on={liveQueue} onChange={setLiveQueue} /></SettingRow>
                <SettingRow label={s.dynamicETA} note={s.protoToggles}><Toggle on={dynamicETA} onChange={setDynamicETA} /></SettingRow>
                <SettingRow label={s.leaveNow}   note={s.protoToggles}><Toggle on={leaveNow} onChange={setLeaveNow} /></SettingRow>
                <div className="py-4">
                  <button onClick={toast} className="px-5 py-2.5 text-sm font-bold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>{s.saveChanges}</button>
                </div>
              </div>
            </Card>
          )}

          {/* ── Notifications ── */}
          {section === "notifications" && (
            <>
              <Card title={s.notifications} icon="🔔">
                <div className="divide-y divide-[#E8F5EE]">
                  {([
                    ["queueUpdates", s.queueUpdates], ["slotConfirm", s.slotConfirm],
                    ["etaChanges", s.etaChanges], ["procUpdates", s.procUpdates],
                    ["payUpdates", s.payUpdates], ["centreAlerts", s.centreAlerts],
                  ] as [keyof typeof notifToggles, string][]).map(([k, label]) => (
                    <SettingRow key={k} label={label}>
                      <Toggle on={notifToggles[k]} onChange={() => toggleNotif(k)} />
                    </SettingRow>
                  ))}
                </div>
              </Card>
              <Card title={s.channels} icon="📡">
                <div className="divide-y divide-[#E8F5EE]">
                  <SettingRow label={s.inApp}>
                    <Toggle on={notifToggles.inApp} onChange={() => toggleNotif("inApp")} />
                  </SettingRow>
                  <SettingRow label={s.sms} note={s.smsNote}>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-[#7C3AED] bg-[#F5F3FF] px-2 py-0.5 rounded-full">{s.prototype}</span>
                      <Toggle on={false} onChange={() => {}} disabled />
                    </div>
                  </SettingRow>
                  <SettingRow label={s.ivr} note={s.smsNote}>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-[#7C3AED] bg-[#F5F3FF] px-2 py-0.5 rounded-full">{s.prototype}</span>
                      <Toggle on={false} onChange={() => {}} disabled />
                    </div>
                  </SettingRow>
                </div>
              </Card>
              <div className="flex justify-end">
                <button onClick={toast} className="px-5 py-2.5 text-sm font-bold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>{s.saveChanges}</button>
              </div>
            </>
          )}

          {/* ── Language ── */}
          {section === "language" && (
            <Card title={s.language} icon="🌐">
              <div className="divide-y divide-[#E8F5EE]">
                <div className="py-4">
                  <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>Interface Language</p>
                  <div className="flex gap-2">
                    {[{ id: "en" as const, label: "English" }, { id: "hi" as const, label: "हिन्दी" }].map((l) => (
                      <button key={l.id} onClick={() => setUiLang(l.id)} className={`flex-1 py-3 text-sm font-bold rounded-xl border-2 transition-all ${uiLang === l.id ? "border-[#1A7A3C] bg-[#E8F5EE] text-[#1A7A3C]" : "border-[#C8DFD0] text-[#6B7280] hover:border-[#1A7A3C]"}`} style={{ fontFamily: "Poppins, sans-serif" }}>{l.label}</button>
                    ))}
                  </div>
                </div>
                <SettingRow label={s.bilingualInterface}>
                  <Toggle on={bilingual} onChange={setBilingual} />
                </SettingRow>
                <div className="py-4">
                  <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{s.preview}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#F5F9F6] rounded-xl border border-[#C8DFD0] p-4">
                      <p className="text-[9px] text-[#9CA3AF] mb-1">English</p>
                      <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.liveQueueEn}</p>
                      <p className="text-[10px] text-[#6B7280] mt-1">Live Queue</p>
                    </div>
                    <div className="bg-[#E8F5EE] rounded-xl border border-[#C8DFD0] p-4">
                      <p className="text-[9px] text-[#9CA3AF] mb-1">हिन्दी</p>
                      <p className="text-sm font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.liveQueueHi}</p>
                      <p className="text-[10px] text-[#6B7280] mt-1">Live Queue</p>
                    </div>
                  </div>
                </div>
                <div className="py-4">
                  <button onClick={toast} className="px-5 py-2.5 text-sm font-bold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>{s.saveChanges}</button>
                </div>
              </div>
            </Card>
          )}

          {/* ── Security ── */}
          {section === "security" && (
            <Card title={s.security} icon="🔒">
              <div className="divide-y divide-[#E8F5EE]">
                <SettingRow label={s.adminAuth}>
                  <span className="text-xs font-bold text-[#1A7A3C] bg-[#E8F5EE] px-3 py-1 rounded-full" style={{ fontFamily: "Poppins, sans-serif" }}>{s.enabled}</span>
                </SettingRow>
                <SettingRow label={s.sessionTimeout}>
                  <select className="px-3 py-2 text-xs border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]">
                    <option>30 {s.min}</option><option>15 {s.min}</option><option>60 {s.min}</option>
                  </select>
                </SettingRow>
                <SettingRow label={s.rbac}>
                  <span className="text-xs font-bold text-[#1A7A3C] bg-[#E8F5EE] px-3 py-1 rounded-full" style={{ fontFamily: "Poppins, sans-serif" }}>{s.enabled}</span>
                </SettingRow>
                <SettingRow label={s.activityLog}>
                  <span className="text-xs font-bold text-[#1A7A3C] bg-[#E8F5EE] px-3 py-1 rounded-full" style={{ fontFamily: "Poppins, sans-serif" }}>{s.enabled}</span>
                </SettingRow>
                <div className="py-4 space-y-3">
                  <p className="text-[10px] text-[#9CA3AF]">🔒 {s.secNote}</p>
                  <div className="flex gap-2">
                    <button onClick={toast} className="px-5 py-2.5 text-sm font-bold text-[#1A2B4A] border border-[#C8DFD0] hover:bg-[#F5F9F6] rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>{s.viewLog}</button>
                    <button onClick={toast} className="px-5 py-2.5 text-sm font-bold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>{s.updateSecurity}</button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* ── System Information ── */}
          {section === "system" && (
            <>
              <Card title={s.system} icon="💻">
                <div className="py-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { l: s.application,  v: "KisanQ",                        badge: null },
                      { l: s.version,      v: "Prototype v1.0",                badge: "demo" },
                      { l: s.sih,          v: "2026",                          badge: null },
                      { l: s.problemStatement, v: "SIH26032",                  badge: null },
                      { l: s.environment,  v: "Prototype / Demo",              badge: "demo" },
                      { l: s.database,     v: "MySQL — Planned Backend",        badge: "planned" },
                      { l: s.backend,      v: "Node.js + Express — Planned",   badge: "planned" },
                      { l: s.frontend,     v: "React + Vite + Tailwind CSS",    badge: null },
                      { l: s.statusSys,    v: "Demo Environment",              badge: "demo" },
                    ].map((item) => (
                      <div key={item.l} className="bg-[#F5F9F6] rounded-xl border border-[#C8DFD0] p-3">
                        <p className="text-[9px] text-[#9CA3AF] mb-1">{item.l}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-xs font-semibold text-[#1A2B4A]">{item.v}</p>
                          {item.badge === "demo" && <span className="text-[8px] font-bold text-[#E8960A] bg-[#FEF3C7] px-1.5 py-0.5 rounded-full">Demo</span>}
                          {item.badge === "planned" && <span className="text-[8px] font-bold text-[#7C3AED] bg-[#F5F3FF] px-1.5 py-0.5 rounded-full">Planned</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 bg-[#E8F5EE] rounded-xl p-4 border border-[#C8DFD0]">
                    <p className="text-xs font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>🏆 SIH 2026 — Team Viksit Innovators</p>
                    <p className="text-[10px] text-[#1A7A3C]/70 mt-0.5">Problem Statement SIH26032 · KisanQ Prototype · All components are demonstration only</p>
                  </div>
                </div>
              </Card>

              {/* Danger zone */}
              <div className="bg-white rounded-2xl border-2 border-[#FECACA] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#FEF2F2] flex items-center gap-3 bg-[#FEF2F2]">
                  <span className="text-xl">⚠️</span>
                  <p className="text-sm font-bold text-[#C8332A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.dangerZone}</p>
                </div>
                <div className="px-6 py-5">
                  <p className="text-xs text-[#6B7280] mb-4">Demo administrative actions. No real data will be affected.</p>
                  <button onClick={() => setShowReset(true)} className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#C8332A] border-2 border-[#FECACA] hover:bg-[#FEF2F2] rounded-xl transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
                    🗑️ {s.resetDemo}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Footer */}
          <div className="text-center py-2 border-t border-[#C8DFD0]">
            <p className="text-[10px] text-[#9CA3AF]">KisanQ Admin · SIH 2026 Prototype · Team Viksit Innovators · All settings are demo only</p>
          </div>
        </div>
      </div>

      {showToast && <SaveToast msg={s.saved} note={s.savedNote} onClose={() => setShowToast(false)} />}
      {showReset && <ResetModal s={s} onClose={() => setShowReset(false)} />}
    </div>
  );
}
