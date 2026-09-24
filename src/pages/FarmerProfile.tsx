import { useState } from "react";

type Lang = "en" | "hi";

const S = {
  en: {
    lang: "हिन्दी",
    title: "My Profile",
    demoNote: "Demo account — no real identity or banking data is stored. This is a prototype.",
    // Profile card
    farmerName: "Ramesh Kumar",
    farmerID: "Farmer ID: F-1001",
    village: "Gwalior, Madhya Pradesh",
    preferredLang: "हिन्दी",
    crop: "Wheat",
    status: "Active",
    editProfile: "Edit Profile",
    // Edit form
    editTitle: "Edit Profile",
    nameLabel: "Name",
    villageLabel: "Village / Location",
    langLabel: "Preferred Language",
    cropLabel: "Preferred Crop",
    saveChanges: "Save Changes",
    cancelBtn: "Cancel",
    saveSuccess: "Profile Updated (Demo)",
    saveNote: "No real data was changed.",
    demoField: "Demo field — edit is prototype only.",
    // My Procurement
    myProc: "My Procurement",
    totalApps: "Total Applications",
    completed: "Completed",
    inProgress: "In Progress",
    payPending: "Payment Pending",
    viewHistory: "View Application History",
    // Language section
    languageSection: "Language / भाषा",
    // Notification prefs
    notifPrefs: "Notification Preferences",
    slotConfirm: "Slot Confirmation",
    queueUpdates: "Queue Updates",
    etaAlerts: "ETA / Leave-Now Alerts",
    procUpdates: "Procurement Updates",
    payUpdates: "Payment Updates",
    centreAlerts: "Centre Alerts",
    notifNote: "Notification preferences are prototype settings.",
    on: "ON", off: "OFF",
    // Accessibility
    a11yTitle: "Accessibility & Assistance",
    largeText: "Large Text",
    assistedHelp: "Assisted Help",
    ivrAssist: "IVR Assistance",
    smsUpdates: "SMS Updates",
    available: "Available",
    availProto: "Available in prototype",
    getHelp: "Get Help",
    // Security
    securityTitle: "Account & Security",
    changeLogin: "Change Login Method",
    activityLog: "Account Activity",
    logOut: "Log Out",
    secNote: "No password or sensitive credentials are stored in this prototype.",
    // Help card
    needHelp: "Need Help?",
    helpDesc: "Get assistance with booking, queue or procurement tracking.",
    openHelp: "Open Help Centre",
    // Logout modal
    logoutTitle: "Log Out?",
    logoutMsg: "You will be returned to the login screen.",
    logoutConfirm: "Log Out",
    // Footer
    footer: "KisanQ — Smart Procurement. Better Predictability.",
  },
  hi: {
    lang: "English",
    title: "मेरी प्रोफ़ाइल",
    demoNote: "डेमो खाता — कोई वास्तविक पहचान या बैंकिंग डेटा संग्रहीत नहीं है। यह एक प्रोटोटाइप है।",
    farmerName: "रमेश कुमार",
    farmerID: "किसान ID: F-1001",
    village: "ग्वालियर, मध्य प्रदेश",
    preferredLang: "हिन्दी",
    crop: "गेहूं",
    status: "सक्रिय",
    editProfile: "प्रोफ़ाइल संपादित करें",
    editTitle: "प्रोफ़ाइल संपादित करें",
    nameLabel: "नाम",
    villageLabel: "गांव / स्थान",
    langLabel: "पसंदीदा भाषा",
    cropLabel: "पसंदीदा फसल",
    saveChanges: "परिवर्तन सहेजें",
    cancelBtn: "रद्द करें",
    saveSuccess: "प्रोफ़ाइल अपडेट (डेमो)",
    saveNote: "कोई वास्तविक डेटा नहीं बदला गया।",
    demoField: "डेमो फ़ील्ड — संपादन केवल प्रोटोटाइप है।",
    myProc: "मेरी खरीद",
    totalApps: "कुल आवेदन",
    completed: "पूर्ण",
    inProgress: "प्रक्रिया में",
    payPending: "भुगतान लंबित",
    viewHistory: "आवेदन इतिहास देखें",
    languageSection: "Language / भाषा",
    notifPrefs: "सूचना प्राथमिकताएं",
    slotConfirm: "स्लॉट पुष्टि",
    queueUpdates: "कतार अपडेट",
    etaAlerts: "ETA / प्रस्थान अलर्ट",
    procUpdates: "खरीद अपडेट",
    payUpdates: "भुगतान अपडेट",
    centreAlerts: "केंद्र अलर्ट",
    notifNote: "सूचना प्राथमिकताएं प्रोटोटाइप सेटिंग हैं।",
    on: "चालू", off: "बंद",
    a11yTitle: "पहुंच और सहायता",
    largeText: "बड़ा टेक्स्ट",
    assistedHelp: "सहायता",
    ivrAssist: "IVR सहायता",
    smsUpdates: "SMS अपडेट",
    available: "उपलब्ध",
    availProto: "प्रोटोटाइप में उपलब्ध",
    getHelp: "मदद लें",
    securityTitle: "खाता और सुरक्षा",
    changeLogin: "लॉगिन विधि बदलें",
    activityLog: "खाता गतिविधि",
    logOut: "लॉग आउट",
    secNote: "इस प्रोटोटाइप में कोई पासवर्ड या संवेदनशील क्रेडेंशियल संग्रहीत नहीं है।",
    needHelp: "मदद चाहिए?",
    helpDesc: "बुकिंग, कतार या खरीद ट्रैकिंग में सहायता पाएं।",
    openHelp: "सहायता केंद्र खोलें",
    logoutTitle: "लॉग आउट करें?",
    logoutMsg: "आपको लॉगिन स्क्रीन पर वापस ले जाया जाएगा।",
    logoutConfirm: "लॉग आउट",
    footer: "KisanQ — स्मार्ट खरीद, बेहतर पूर्वानुमान।",
  },
};

// ─── Toggle ───────────────────────────────────────────────────────────────────
function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${on ? "bg-[#1A7A3C]" : "bg-[#D1D5DB]"}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? "translate-x-6" : "translate-x-0.5"}`} />
    </button>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl border border-[#C8DFD0] overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E8F5EE]">
        <span className="text-xl">{icon}</span>
        <p className="text-base font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{title}</p>
      </div>
      <div className="divide-y divide-[#E8F5EE]">{children}</div>
    </div>
  );
}

// ─── Setting Row ──────────────────────────────────────────────────────────────
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 gap-3">
      <p className="text-sm font-semibold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{label}</p>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

// ─── Edit Profile Modal ───────────────────────────────────────────────────────
function EditModal({ s, onClose }: { s: typeof S["en"]; onClose: () => void }) {
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState(s.farmerName);
  const [village, setVillage] = useState(s.village);
  const [prefLang, setPrefLang] = useState(s.preferredLang);
  const [crop, setCrop] = useState(s.crop);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSuccess(true); setTimeout(onClose, 1200); };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl max-h-[90vh] overflow-y-auto" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8F5EE] sticky top-0 bg-white">
          <p className="text-base font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>✏️ {s.editTitle}</p>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280] text-xl">×</button>
        </div>
        {success ? (
          <div className="p-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#E8F5EE] flex items-center justify-center text-3xl mb-4">✅</div>
            <p className="text-base font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.saveSuccess}</p>
            <p className="text-xs text-[#9CA3AF] mt-1">{s.saveNote}</p>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 space-y-4">
            <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl px-4 py-2.5">
              <p className="text-xs text-[#92400E]">⚠️ {s.demoField}</p>
            </div>
            {[
              { label: s.nameLabel,    val: name,     set: setName,     ph: "Ramesh Kumar" },
              { label: s.villageLabel, val: village,  set: setVillage,  ph: "Gwalior, Madhya Pradesh" },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>{f.label}</label>
                <input value={f.val} onChange={(e) => f.set(e.target.value)} placeholder={f.ph} className="w-full px-4 py-3 text-sm border border-[#C8DFD0] rounded-2xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]" />
              </div>
            ))}
            <div>
              <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>{s.langLabel}</label>
              <select value={prefLang} onChange={(e) => setPrefLang(e.target.value)} className="w-full px-4 py-3 text-sm border border-[#C8DFD0] rounded-2xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]">
                <option>English</option>
                <option>हिन्दी</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>{s.cropLabel}</label>
              <select value={crop} onChange={(e) => setCrop(e.target.value)} className="w-full px-4 py-3 text-sm border border-[#C8DFD0] rounded-2xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]">
                {["Wheat", "Rice", "Maize", "Soybean", "Other"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={onClose} className="flex-1 py-3.5 text-sm font-bold text-[#6B7280] border border-[#C8DFD0] rounded-2xl hover:bg-[#F5F9F6]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.cancelBtn}</button>
              <button type="submit" className="flex-1 py-3.5 text-sm font-bold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-2xl" style={{ fontFamily: "Poppins, sans-serif" }}>{s.saveChanges}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Logout Modal ─────────────────────────────────────────────────────────────
function LogoutModal({ s, onConfirm, onClose }: { s: typeof S["en"]; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="px-6 py-5 text-center border-b border-[#E8F5EE]">
          <div className="w-14 h-14 rounded-full bg-[#FEF2F2] flex items-center justify-center text-2xl mx-auto mb-3">🚪</div>
          <p className="text-lg font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.logoutTitle}</p>
          <p className="text-sm text-[#6B7280] mt-1">{s.logoutMsg}</p>
        </div>
        <div className="p-5 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3.5 text-sm font-bold text-[#6B7280] border border-[#C8DFD0] rounded-2xl hover:bg-[#F5F9F6]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.cancelBtn}</button>
          <button onClick={onConfirm} className="flex-1 py-3.5 text-sm font-bold text-white bg-[#C8332A] hover:bg-[#A82520] rounded-2xl" style={{ fontFamily: "Poppins, sans-serif" }}>{s.logoutConfirm}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function FarmerProfile({
  lang: initLang = "en",
  onLogout,
  onOpenHelp,
}: {
  lang?: Lang;
  onLogout: () => void;
  onOpenHelp?: () => void;
}) {
  const [lang, setLang] = useState<Lang>(initLang);
  const [showEdit, setShowEdit] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [uiLang, setUiLang] = useState<Lang>(initLang);
  const [notifs, setNotifs] = useState({
    slot: true, queue: true, eta: true, proc: true, pay: true, centre: true,
  });
  const [largeText, setLargeText] = useState(false);
  const s = S[lang];

  const toggleNotif = (k: keyof typeof notifs) => setNotifs((n) => ({ ...n, [k]: !n[k] }));

  const NOTIF_ROWS: [keyof typeof notifs, string][] = [
    ["slot", s.slotConfirm], ["queue", s.queueUpdates], ["eta", s.etaAlerts],
    ["proc", s.procUpdates], ["pay", s.payUpdates], ["centre", s.centreAlerts],
  ];

  return (
    <div className={`min-h-screen bg-[#F5F9F6] pb-6 ${largeText ? "text-lg" : ""}`} style={{ fontFamily: "Inter, sans-serif" }}>

      {/* Header */}
      <div className="bg-white border-b border-[#C8DFD0] sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>🌾 KisanQ</p>
            <p className="text-lg font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.title}</p>
          </div>
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#C8DFD0] text-xs font-bold text-[#1A2B4A] bg-white hover:bg-[#E8F5EE] transition-colors"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            🌐 {s.lang}
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-4">

        {/* Demo notice */}
        <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-2xl px-4 py-2.5 flex items-start gap-2">
          <span className="text-sm flex-shrink-0 mt-0.5">⚠️</span>
          <p className="text-xs text-[#92400E]"><strong>SIH 2026 Prototype</strong> — {s.demoNote}</p>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-[#1A2B4A] to-[#145F2F] rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-20 h-20 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-4xl flex-shrink-0">
              👨‍🌾
            </div>
            <div>
              <p className="text-xl font-bold leading-tight" style={{ fontFamily: "Poppins, sans-serif" }}>{s.farmerName}</p>
              <p className="text-sm text-white/70 mt-0.5">{s.farmerID}</p>
              <span className="text-[9px] font-bold bg-[#1A7A3C] px-2 py-0.5 rounded-full mt-1.5 inline-block">{s.status}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { icon: "📍", label: "Village", val: s.village },
              { icon: "🌐", label: "Language", val: s.preferredLang },
              { icon: "🌾", label: "Crop",    val: s.crop },
              { icon: "🆔", label: "ID",      val: "F-1001" },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 rounded-2xl p-3">
                <p className="text-[9px] text-white/50 mb-0.5">{item.icon} {item.label}</p>
                <p className="text-xs font-semibold text-white/90">{item.val}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowEdit(true)}
            className="w-full py-3.5 text-sm font-bold text-[#1A2B4A] bg-white hover:bg-[#E8F5EE] rounded-2xl transition-colors"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            ✏️ {s.editProfile}
          </button>
        </div>

        {/* My Procurement Summary */}
        <div className="bg-white rounded-3xl border border-[#C8DFD0] p-5 shadow-sm">
          <p className="text-base font-bold text-[#1A2B4A] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>📦 {s.myProc}</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: s.totalApps,  val: "2",  color: "#1A2B4A", bg: "#F5F9F6" },
              { label: s.completed,  val: "1",  color: "#1A7A3C", bg: "#E8F5EE" },
              { label: s.inProgress, val: "1",  color: "#E8960A", bg: "#FEF3C7" },
              { label: s.payPending, val: "1",  color: "#C8332A", bg: "#FEF2F2" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl p-4 text-center" style={{ background: item.bg }}>
                <p className="text-2xl font-bold mb-1" style={{ color: item.color, fontFamily: "Poppins, sans-serif" }}>{item.val}</p>
                <p className="text-[10px] text-[#6B7280]">{item.label}</p>
              </div>
            ))}
          </div>
          <button className="w-full py-3.5 text-sm font-bold text-[#1A7A3C] border-2 border-[#C8DFD0] rounded-2xl hover:bg-[#E8F5EE] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
            📋 {s.viewHistory}
          </button>
        </div>

        {/* Language */}
        <div className="bg-white rounded-3xl border border-[#C8DFD0] p-5 shadow-sm">
          <p className="text-base font-bold text-[#1A2B4A] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>🌐 {s.languageSection}</p>
          <div className="grid grid-cols-2 gap-3">
            {[{ id: "en" as Lang, label: "English", sub: "English" }, { id: "hi" as Lang, label: "हिन्दी", sub: "Hindi" }].map((l) => (
              <button
                key={l.id}
                onClick={() => { setUiLang(l.id); setLang(l.id); }}
                className={`py-4 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${uiLang === l.id ? "border-[#1A7A3C] bg-[#E8F5EE]" : "border-[#C8DFD0] bg-white hover:border-[#1A7A3C]"}`}
              >
                <span className="text-2xl">🌐</span>
                <p className="text-sm font-bold" style={{ color: uiLang === l.id ? "#1A7A3C" : "#6B7280", fontFamily: "Poppins, sans-serif" }}>{l.label}</p>
                {uiLang === l.id && <div className="w-4 h-0.5 rounded-full bg-[#1A7A3C]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Notification Prefs */}
        <Section title={s.notifPrefs} icon="🔔">
          {NOTIF_ROWS.map(([k, label]) => (
            <Row key={k} label={label}>
              <Toggle on={notifs[k]} onChange={() => toggleNotif(k)} />
            </Row>
          ))}
          <div className="px-5 py-3">
            <p className="text-[10px] text-[#9CA3AF]">⚠️ {s.notifNote}</p>
          </div>
        </Section>

        {/* Accessibility */}
        <Section title={s.a11yTitle} icon="♿">
          <Row label={s.largeText}>
            <Toggle on={largeText} onChange={setLargeText} />
          </Row>
          {[
            { label: s.assistedHelp, val: s.available },
            { label: s.ivrAssist,   val: s.availProto },
            { label: s.smsUpdates,  val: s.availProto },
          ].map((item) => (
            <Row key={item.label} label={item.label}>
              <span className="text-[10px] font-bold text-[#7C3AED] bg-[#F5F3FF] px-2.5 py-1 rounded-full" style={{ fontFamily: "Poppins, sans-serif" }}>{item.val}</span>
            </Row>
          ))}
          <div className="px-5 py-4">
            <button onClick={onOpenHelp} className="w-full py-3.5 text-sm font-bold text-[#1A7A3C] border-2 border-[#C8DFD0] rounded-2xl hover:bg-[#E8F5EE] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
              🆘 {s.getHelp}
            </button>
          </div>
        </Section>

        {/* Security */}
        <Section title={s.securityTitle} icon="🔒">
          <div className="px-5 py-3">
            <p className="text-[10px] text-[#9CA3AF] mb-4">🔒 {s.secNote}</p>
          </div>
          {[
            { label: s.changeLogin, icon: "🔑", color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE" },
            { label: s.activityLog, icon: "📋", color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE" },
          ].map((btn) => (
            <div key={btn.label} className="px-5 py-2 last:pb-5">
              <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 transition-colors hover:opacity-80" style={{ color: btn.color, background: btn.bg, borderColor: btn.border, fontFamily: "Poppins, sans-serif" }}>
                <span className="text-xl">{btn.icon}</span>
                <span className="text-sm font-bold">{btn.label}</span>
              </button>
            </div>
          ))}
          <div className="px-5 pb-5">
            <button
              onClick={() => setShowLogout(true)}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 border-[#FECACA] bg-[#FEF2F2] hover:bg-[#FEE2E2] transition-colors"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <span className="text-xl">🚪</span>
              <span className="text-sm font-bold text-[#C8332A]">{s.logOut}</span>
            </button>
          </div>
        </Section>

        {/* Help Card */}
        <div className="bg-gradient-to-br from-[#E8F5EE] to-[#F5F9F6] rounded-3xl border border-[#C8DFD0] p-6 text-center shadow-sm">
          <p className="text-3xl mb-3">🤝</p>
          <p className="text-base font-bold text-[#1A2B4A] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{s.needHelp}</p>
          <p className="text-sm text-[#6B7280] mb-5">{s.helpDesc}</p>
          <button onClick={onOpenHelp} className="w-full py-4 text-base font-bold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-2xl transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
            🆘 {s.openHelp}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center py-2">
          <p className="text-xs font-semibold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.footer}</p>
          <p className="text-[10px] text-[#9CA3AF] mt-1">SIH 2026 · Team Viksit Innovators · Prototype</p>
        </div>
      </div>

      {showEdit && <EditModal s={s} onClose={() => setShowEdit(false)} />}
      {showLogout && <LogoutModal s={s} onConfirm={onLogout} onClose={() => setShowLogout(false)} />}
    </div>
  );
}
