import { useState } from "react";

type Lang = "en" | "hi";
type Priority = "High" | "Medium" | "Normal";
type NFilter = "all" | "unread" | "queue" | "slots" | "applications" | "procurement" | "payments" | "centre";
type DateF = "today" | "week" | "month";

const S = {
  en: {
    title: "Notifications & Alerts",
    subtitle: "Monitor important procurement and queue updates.",
    lang: "हिन्दी",
    demoNote: "All notifications are demo/prototype only — not connected to real SMS, IVR, WhatsApp, or any government system. Do not use as operational alerts.",
    // KPIs
    totalNotif: "Total Notifications",
    unread: "Unread",
    critical: "Critical Alerts",
    farmerUpdates: "Farmer Updates Today",
    demo: "Demo Data",
    // Filters
    searchPlaceholder: "Search notifications…",
    all: "All",
    allUnread: "Unread",
    queue: "Queue",
    slots: "Slots",
    applications: "Applications",
    procurement: "Procurement",
    payments: "Payments",
    centreAlerts: "Centre Alerts",
    today: "Today",
    lastWeek: "Last 7 Days",
    lastMonth: "Last 30 Days",
    // List
    markRead: "Mark Read",
    markUnread: "Mark Unread",
    viewCentre: "View Centre",
    viewQueue: "View Queue",
    viewApps: "View Applications",
    viewSlots: "View Slots",
    viewProc: "View Procurement",
    viewPay: "View Payment",
    read: "Read",
    unreadBadge: "Unread",
    ago: "ago",
    // Detail drawer
    notifDetails: "Notification Details",
    close: "Close",
    notifType: "Notification Type",
    notifTitle: "Title",
    notifMsg: "Message",
    centre: "Centre",
    created: "Created",
    status: "Status",
    markAsRead: "Mark as Read",
    openRelated: "Open Related Record",
    // Create
    createBtn: "+ Create Notification",
    createTitle: "Create Demo Notification",
    createNote: "This creates a prototype notification only. No real message is sent.",
    typeLabel: "Notification Type",
    titleLabel: "Title",
    msgLabel: "Message",
    audienceLabel: "Audience",
    langLabel: "Language",
    priorityLabel: "Priority",
    cancelBtn: "Cancel",
    saveBtn: "Create Demo Notification",
    createSuccess: "Notification Created (Demo)",
    createSuccessNote: "No real notification was sent.",
    // Audience
    farmers: "Farmers",
    centreStaff: "Centre Staff",
    admins: "Admins",
    // Priority
    high: "High",
    medium: "Medium",
    normal: "Normal",
    // Farmer preview
    farmerPreviewTitle: "Farmer Notification Preview",
    farmerPreviewNote: "This is a prototype preview only — not a real sent notification.",
    kisanqUpdate: "KisanQ Update",
    farmerMsg1: "Your estimated waiting time at Centre B is now ~54 minutes.",
    farmerMsg2: "Recommended departure: 9:35 AM (estimate only).",
    viewBooking: "View Booking",
    // Empty
    noNotifs: "No notifications found.",
    noNotifsSub: "Try changing your filters or search.",
    resetFilters: "Reset Filters",
    // Pagination
    showing: "Showing",
    of: "of",
    notifRecords: "notifications",
    prev: "Previous",
    next: "Next",
    // Mark all
    markAllRead: "Mark All Read",
  },
  hi: {
    title: "सूचनाएं और अलर्ट",
    subtitle: "महत्वपूर्ण खरीद और कतार अपडेट की निगरानी करें।",
    lang: "English",
    demoNote: "सभी सूचनाएं केवल डेमो/प्रोटोटाइप हैं — वास्तविक SMS, IVR, WhatsApp या किसी सरकारी प्रणाली से जुड़ी नहीं हैं।",
    totalNotif: "कुल सूचनाएं",
    unread: "अपठित",
    critical: "गंभीर अलर्ट",
    farmerUpdates: "आज के किसान अपडेट",
    demo: "डेमो डेटा",
    searchPlaceholder: "सूचनाएं खोजें…",
    all: "सभी",
    allUnread: "अपठित",
    queue: "कतार",
    slots: "स्लॉट",
    applications: "आवेदन",
    procurement: "खरीद",
    payments: "भुगतान",
    centreAlerts: "केंद्र अलर्ट",
    today: "आज",
    lastWeek: "पिछले 7 दिन",
    lastMonth: "पिछले 30 दिन",
    markRead: "पढ़ा चिह्नित करें",
    markUnread: "अपठित करें",
    viewCentre: "केंद्र देखें",
    viewQueue: "कतार देखें",
    viewApps: "आवेदन देखें",
    viewSlots: "स्लॉट देखें",
    viewProc: "खरीद देखें",
    viewPay: "भुगतान देखें",
    read: "पठित",
    unreadBadge: "अपठित",
    ago: "पहले",
    notifDetails: "सूचना विवरण",
    close: "बंद करें",
    notifType: "सूचना प्रकार",
    notifTitle: "शीर्षक",
    notifMsg: "संदेश",
    centre: "केंद्र",
    created: "बनाई गई",
    status: "स्थिति",
    markAsRead: "पढ़ा चिह्नित करें",
    openRelated: "संबंधित रिकॉर्ड खोलें",
    createBtn: "+ सूचना बनाएं",
    createTitle: "डेमो सूचना बनाएं",
    createNote: "यह केवल एक प्रोटोटाइप सूचना बनाता है। कोई वास्तविक संदेश नहीं भेजा जाता।",
    typeLabel: "सूचना प्रकार",
    titleLabel: "शीर्षक",
    msgLabel: "संदेश",
    audienceLabel: "दर्शक",
    langLabel: "भाषा",
    priorityLabel: "प्राथमिकता",
    cancelBtn: "रद्द करें",
    saveBtn: "डेमो सूचना बनाएं",
    createSuccess: "सूचना बनाई गई (डेमो)",
    createSuccessNote: "कोई वास्तविक सूचना नहीं भेजी गई।",
    farmers: "किसान",
    centreStaff: "केंद्र कर्मचारी",
    admins: "व्यवस्थापक",
    high: "उच्च",
    medium: "मध्यम",
    normal: "सामान्य",
    farmerPreviewTitle: "किसान सूचना पूर्वावलोकन",
    farmerPreviewNote: "यह केवल एक प्रोटोटाइप पूर्वावलोकन है — कोई वास्तविक सूचना नहीं भेजी गई।",
    kisanqUpdate: "KisanQ अपडेट",
    farmerMsg1: "Centre B पर आपका अनुमानित प्रतीक्षा समय अब ~54 मिनट है।",
    farmerMsg2: "अनुशंसित प्रस्थान: 9:35 AM (केवल अनुमान)।",
    viewBooking: "बुकिंग देखें",
    noNotifs: "कोई सूचना नहीं मिली।",
    noNotifsSub: "अपने फ़िल्टर या खोज बदलकर देखें।",
    resetFilters: "फ़िल्टर रीसेट करें",
    showing: "दिखाया जा रहा है",
    of: "में से",
    notifRecords: "सूचनाएं",
    prev: "पिछला",
    next: "अगला",
    markAllRead: "सभी पढ़ा चिह्नित करें",
  },
};

// ─── Data ──────────────────────────────────────────────────────────────────────
type Notif = {
  id: string;
  priority: Priority;
  type: NFilter;
  title: string;
  message: string;
  time: string;
  centre?: string;
  created: string;
  action: string;
  actionLabel: string;
  read: boolean;
};

const INITIAL_NOTIFS: Notif[] = [
  { id: "N001", priority: "High",   type: "centre",       title: "Centre A is approaching capacity.",     message: "Current utilization: 89%. Review queue and slot availability.",                         time: "2 min", centre: "Gwalior PC Centre A", created: "24 Sep 2026, 11:08 AM", action: "centre",       actionLabel: "viewCentre", read: false },
  { id: "N002", priority: "High",   type: "queue",        title: "Queue wait time increased at Centre C.", message: "Estimated waiting time changed from ~42 min to ~68 min. Consider redistributing load.", time: "5 min", centre: "Gwalior PC Centre C", created: "24 Sep 2026, 11:05 AM", action: "queue",        actionLabel: "viewQueue",  read: false },
  { id: "N003", priority: "High",   type: "centre",       title: "Centre D: Operator not logged in.",      message: "No active operator session at Centre D. Queue may be delayed.",                       time: "6 min", centre: "Gwalior PC Centre D", created: "24 Sep 2026, 11:04 AM", action: "centre",       actionLabel: "viewCentre", read: false },
  { id: "N004", priority: "Medium", type: "queue",        title: "Queue updated at Centre B.",             message: "Estimated waiting time changed from ~62 min to ~54 min.",                             time: "8 min", centre: "Gwalior PC Centre B", created: "24 Sep 2026, 11:02 AM", action: "queue",        actionLabel: "viewQueue",  read: false },
  { id: "N005", priority: "Medium", type: "applications", title: "12 applications awaiting verification.", message: "These applications have been in verification pending status for over 30 minutes.",     time: "20 min",centre: undefined,              created: "24 Sep 2026, 10:50 AM", action: "applications", actionLabel: "viewApps",   read: false },
  { id: "N006", priority: "Medium", type: "slots",        title: "Slot capacity low at Centre B.",         message: "Only 3 slots remain for the afternoon session at Centre B.",                          time: "28 min",centre: "Gwalior PC Centre B", created: "24 Sep 2026, 10:42 AM", action: "slots",        actionLabel: "viewSlots",  read: true  },
  { id: "N007", priority: "Normal", type: "slots",        title: "Slot availability updated.",             message: "8 slots remain available at Centre B for today.",                                    time: "35 min",centre: "Gwalior PC Centre B", created: "24 Sep 2026, 10:35 AM", action: "slots",        actionLabel: "viewSlots",  read: true  },
  { id: "N008", priority: "Normal", type: "procurement",  title: "Procurement status updated.",            message: "Application KQ-2026-00241 moved to weighing stage.",                                 time: "1 hr",  centre: "Gwalior PC Centre B", created: "24 Sep 2026, 10:10 AM", action: "procurement",  actionLabel: "viewProc",   read: true  },
  { id: "N009", priority: "Normal", type: "payments",     title: "Payment record pending.",                message: "Application KQ-2026-00241 has a pending payment status.",                            time: "2 hr",  centre: undefined,              created: "24 Sep 2026, 9:05 AM",  action: "payments",     actionLabel: "viewPay",    read: true  },
  { id: "N010", priority: "Normal", type: "applications", title: "New application registered.",            message: "Farmer Santosh Verma registered Application KQ-2026-00249.",                        time: "3 hr",  centre: "Gwalior PC Centre D", created: "24 Sep 2026, 8:12 AM",  action: "applications", actionLabel: "viewApps",   read: true  },
];

const PRIORITY_STYLE: Record<Priority, { color: string; bg: string; border: string; dot: string }> = {
  High:   { color: "#C8332A", bg: "#FEF2F2", border: "#FECACA", dot: "#C8332A" },
  Medium: { color: "#E8960A", bg: "#FEF3C7", border: "#FDE68A", dot: "#E8960A" },
  Normal: { color: "#1A7A3C", bg: "#E8F5EE", border: "#C8DFD0", dot: "#1A7A3C" },
};

const TYPE_ICON: Record<NFilter | string, string> = {
  queue: "🔢", slots: "📅", applications: "📋", procurement: "📦", payments: "💰", centre: "🏛️", all: "🔔", unread: "🔔",
};

// ─── Create Notification Modal ─────────────────────────────────────────────────
function CreateModal({ s, onClose, onCreated }: { s: typeof S["en"]; onClose: () => void; onCreated: () => void }) {
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ type: "Queue", title: "", message: "", audience: "Farmers", lang: "English", priority: "Normal" });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSuccess(true); setTimeout(() => { onCreated(); onClose(); }, 1200); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-[#C8DFD0] max-h-[90vh] overflow-y-auto" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8F5EE] sticky top-0 bg-white">
          <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.createTitle}</p>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
        {success ? (
          <div className="p-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#E8F5EE] flex items-center justify-center text-3xl mb-4">✅</div>
            <p className="text-sm font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.createSuccess}</p>
            <p className="text-xs text-[#9CA3AF] mt-1">{s.createSuccessNote}</p>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 space-y-4">
            <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl px-4 py-2.5">
              <p className="text-xs text-[#92400E]">⚠️ {s.createNote}</p>
            </div>
            {[
              { k: "type", label: s.typeLabel, opts: ["Queue","Slot","Application","Procurement","Payment","Centre"] },
              { k: "audience", label: s.audienceLabel, opts: [s.farmers, s.centreStaff, s.admins] },
              { k: "lang", label: s.langLabel, opts: ["English","Hindi","Both"] },
              { k: "priority", label: s.priorityLabel, opts: [s.high, s.medium, s.normal] },
            ].map((f) => (
              <div key={f.k}>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">{f.label}</label>
                <select value={(form as Record<string,string>)[f.k]} onChange={(e) => set(f.k, e.target.value)} className="w-full px-3 py-2.5 text-sm border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]">
                  {f.opts.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div>
              <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">{s.titleLabel}</label>
              <input value={form.title} onChange={(e) => set("title", e.target.value)} required placeholder="e.g. Centre B Queue Updated" className="w-full px-3 py-2.5 text-sm border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A] placeholder-[#9CA3AF]" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">{s.msgLabel}</label>
              <textarea rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} required placeholder="e.g. Current estimated queue waiting time is approximately 54 minutes." className="w-full px-3 py-2.5 text-sm border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A] placeholder-[#9CA3AF] resize-none" />
            </div>
            <div className="flex gap-2 pt-1">
              <button type="button" onClick={onClose} className="flex-1 py-2.5 text-sm font-semibold text-[#6B7280] border border-[#C8DFD0] rounded-xl hover:bg-[#F5F9F6]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.cancelBtn}</button>
              <button type="submit" className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>{s.saveBtn}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Notification Detail Drawer ────────────────────────────────────────────────
function NotifDrawer({ notif, s, onClose, onMarkRead }: { notif: Notif; s: typeof S["en"]; onClose: () => void; onMarkRead: () => void }) {
  const ps = PRIORITY_STYLE[notif.priority];
  const action = (s as Record<string, string>)[notif.actionLabel];
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="sticky top-0 z-10 bg-white border-b border-[#C8DFD0] px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.notifDetails}</p>
            <p className="text-[10px] text-[#9CA3AF] font-mono">{notif.id} · {s.demo}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>

        <div className="flex-1 p-5 space-y-5">
          {/* Hero */}
          <div className="bg-gradient-to-br from-[#1A2B4A] to-[#0F1E35] rounded-2xl p-5 text-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{TYPE_ICON[notif.type]}</span>
                <div>
                  <p className="text-[9px] text-white/40 uppercase tracking-widest">{s.notifType}</p>
                  <p className="text-sm font-bold capitalize" style={{ fontFamily: "Poppins, sans-serif" }}>{notif.type} Alert</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0" style={{ color: ps.color, background: ps.bg }}>
                {notif.priority}
              </span>
            </div>
            <p className="text-base font-bold leading-snug mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>{notif.title}</p>
            <p className="text-sm text-white/70 leading-relaxed">{notif.message}</p>
            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
              {notif.centre && (
                <div>
                  <p className="text-[9px] text-white/40 mb-0.5">{s.centre}</p>
                  <p className="text-xs text-white/90">{notif.centre}</p>
                </div>
              )}
              <div>
                <p className="text-[9px] text-white/40 mb-0.5">{s.created}</p>
                <p className="text-xs text-white/90">{notif.created}</p>
              </div>
              <div>
                <p className="text-[9px] text-white/40 mb-0.5">{s.status}</p>
                <p className="text-xs font-semibold" style={{ color: notif.read ? "#9CA3AF" : "#E8960A" }}>
                  {notif.read ? s.read : s.unreadBadge}
                </p>
              </div>
            </div>
          </div>

          {/* Priority indicator */}
          <div className="rounded-2xl p-4 border-2" style={{ borderColor: ps.border, background: ps.bg }}>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ background: ps.dot }} />
              <div>
                <p className="text-sm font-bold" style={{ color: ps.color, fontFamily: "Poppins, sans-serif" }}>{notif.priority} Priority</p>
                <p className="text-xs mt-0.5" style={{ color: ps.color + "CC" }}>
                  {notif.priority === "High" ? "Requires immediate attention." : notif.priority === "Medium" ? "Review when possible." : "Informational update."}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            {!notif.read && (
              <button onClick={() => { onMarkRead(); onClose(); }} className="w-full py-3 text-sm font-bold text-white bg-[#1A7A3C] hover:bg-[#145F2F] rounded-xl transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
                {s.markAsRead}
              </button>
            )}
            <button className="w-full py-3 text-sm font-bold text-[#1A2B4A] border-2 border-[#C8DFD0] hover:bg-[#F5F9F6] rounded-xl transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
              {s.openRelated}: {action}
            </button>
          </div>

          {/* Farmer preview card in context */}
          <div className="bg-[#F5F9F6] rounded-2xl border border-[#C8DFD0] p-4">
            <p className="text-xs font-bold text-[#1A2B4A] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>🔔 {s.farmerPreviewTitle}</p>
            <p className="text-[9px] text-[#9CA3AF] mb-3">{s.farmerPreviewNote}</p>
            <div className="bg-white rounded-xl border border-[#C8DFD0] p-3">
              <p className="text-[10px] font-bold text-[#1A7A3C] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>🔔 {s.kisanqUpdate}</p>
              <p className="text-xs text-[#1A2B4A] mb-1">{s.farmerMsg1}</p>
              <p className="text-xs text-[#6B7280]">{s.farmerMsg2}</p>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-1.5 text-[10px] font-bold text-[#1A7A3C] border border-[#C8DFD0] rounded-lg bg-[#E8F5EE]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.viewQueue}</button>
                <button className="flex-1 py-1.5 text-[10px] font-bold text-[#1A2B4A] border border-[#C8DFD0] rounded-lg" style={{ fontFamily: "Poppins, sans-serif" }}>{s.viewBooking}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Notification Card ─────────────────────────────────────────────────────────
function NotifCard({ notif, s, onOpen, onMarkRead }: { notif: Notif; s: typeof S["en"]; onOpen: () => void; onMarkRead: () => void }) {
  const ps = PRIORITY_STYLE[notif.priority];
  const al = (s as Record<string, string>)[notif.actionLabel];
  return (
    <div
      className={`relative bg-white rounded-xl border transition-all cursor-pointer hover:shadow-md ${notif.read ? "border-[#C8DFD0]" : "border-l-4 shadow-sm"}`}
      style={{ borderLeftColor: notif.read ? undefined : ps.dot }}
      onClick={onOpen}
    >
      {!notif.read && <div className="absolute top-4 right-4 w-2 h-2 rounded-full" style={{ background: ps.dot }} />}
      <div className="p-4">
        <div className="flex items-start gap-3 mb-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: ps.bg }}>{TYPE_ICON[notif.type]}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ color: ps.color, background: ps.bg, fontFamily: "Poppins, sans-serif" }}>{notif.priority}</span>
              {!notif.read && <span className="text-[9px] font-bold text-[#E8960A] bg-[#FEF3C7] px-2 py-0.5 rounded-full" style={{ fontFamily: "Poppins, sans-serif" }}>{s.unreadBadge}</span>}
              <span className="text-[9px] text-[#9CA3AF] ml-auto">{notif.time} {s.ago}</span>
            </div>
            <p className="text-sm font-bold text-[#1A2B4A] leading-tight" style={{ fontFamily: "Poppins, sans-serif" }}>{notif.title}</p>
            <p className="text-xs text-[#6B7280] mt-0.5 line-clamp-2">{notif.message}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-[#E8F5EE]">
          <button onClick={(e) => { e.stopPropagation(); onOpen(); }} className="px-3 py-1.5 text-[10px] font-bold text-[#1A2B4A] border border-[#C8DFD0] rounded-lg hover:bg-[#F5F9F6] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>{al}</button>
          <button
            onClick={(e) => { e.stopPropagation(); onMarkRead(); }}
            className="px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-colors"
            style={{ color: notif.read ? "#9CA3AF" : "#1A7A3C", borderColor: notif.read ? "#C8DFD0" : "#C8DFD0", background: "white", fontFamily: "Poppins, sans-serif" }}
          >{notif.read ? s.markUnread : s.markRead}</button>
          {notif.centre && <span className="text-[9px] text-[#9CA3AF] ml-auto">🏛️ {notif.centre.replace("Gwalior PC ", "")}</span>}
        </div>
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function NotificationsManagement({ lang: initLang = "en" }: { lang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initLang);
  const [filter, setFilter] = useState<NFilter>("all");
  const [dateFilter, setDateFilter] = useState<DateF>("today");
  const [search, setSearch] = useState("");
  const [notifs, setNotifs] = useState<Notif[]>(INITIAL_NOTIFS);
  const [selectedNotif, setSelectedNotif] = useState<Notif | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [page, setPage] = useState(1);
  const s = S[lang];

  const markRead = (id: string, val?: boolean) =>
    setNotifs((ns) => ns.map((n) => n.id === id ? { ...n, read: val !== undefined ? val : !n.read } : n));
  const markAllRead = () => setNotifs((ns) => ns.map((n) => ({ ...n, read: true })));

  const unreadCount = notifs.filter((n) => !n.read).length;
  const criticalCount = notifs.filter((n) => n.priority === "High").length;

  const filtered = notifs.filter((n) => {
    const matchF = filter === "all" || filter === "unread" ? (filter === "unread" ? !n.read : true) : n.type === filter;
    const q = search.toLowerCase();
    const matchS = !q || n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q);
    return matchF && matchS;
  });

  const FILTER_LABELS: { id: NFilter; label: string }[] = [
    { id: "all",          label: s.all },
    { id: "unread",       label: s.allUnread },
    { id: "queue",        label: s.queue },
    { id: "slots",        label: s.slots },
    { id: "applications", label: s.applications },
    { id: "procurement",  label: s.procurement },
    { id: "payments",     label: s.payments },
    { id: "centre",       label: s.centreAlerts },
  ];

  const DATE_LABELS: { id: DateF; label: string }[] = [
    { id: "today", label: s.today },
    { id: "week",  label: s.lastWeek },
    { id: "month", label: s.lastMonth },
  ];

  return (
    <div className="p-4 xl:p-6 space-y-4 max-w-[1280px] mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* Demo notice */}
      <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl px-4 py-2 flex items-start gap-2">
        <span className="text-sm flex-shrink-0 mt-0.5">⚠️</span>
        <p className="text-xs text-[#92400E]"><strong>SIH 2026 Prototype</strong> — {s.demoNote}</p>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-lg font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.title}</p>
          <p className="text-xs text-[#9CA3AF]">{s.subtitle}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="px-3 py-1.5 rounded-xl border border-[#C8DFD0] text-xs font-semibold text-[#6B7280] bg-white hover:bg-[#F5F9F6]" style={{ fontFamily: "Poppins, sans-serif" }}>
              {s.markAllRead}
            </button>
          )}
          <button onClick={() => setShowCreate(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1A7A3C] hover:bg-[#145F2F] transition-colors shadow-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
            {s.createBtn}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: s.totalNotif,    value: String(notifs.length), icon: "🔔", color: "#1A2B4A", bg: "#E8F0FF", qf: "all" as NFilter },
          { label: s.unread,        value: String(unreadCount),   icon: "📬", color: "#E8960A", bg: "#FEF3C7", qf: "unread" as NFilter },
          { label: s.critical,      value: String(criticalCount), icon: "🚨", color: "#C8332A", bg: "#FEF2F2", qf: "centre" as NFilter },
          { label: s.farmerUpdates, value: "67",                  icon: "👨‍🌾", color: "#1A7A3C", bg: "#E8F5EE", qf: "all" as NFilter },
        ].map((k) => (
          <div key={k.label} className="bg-white rounded-xl border border-[#C8DFD0] p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter(k.qf)}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: k.bg }}>{k.icon}</div>
              <span className="text-[9px] text-[#9CA3AF]">{s.demo}</span>
            </div>
            <p className="text-2xl font-bold mb-0.5" style={{ color: k.color, fontFamily: "Poppins, sans-serif" }}>{k.value}</p>
            <p className="text-[10px] text-[#6B7280]">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Main 2-col */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* Left: Notification list */}
        <div className="lg:col-span-2 space-y-3">

          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" /><path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder={s.searchPlaceholder} className="w-full pl-9 pr-4 py-2.5 text-sm border border-[#C8DFD0] rounded-xl bg-white focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A] placeholder-[#9CA3AF]" />
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 flex-wrap">
            {FILTER_LABELS.map((f) => {
              const count = f.id === "unread" ? unreadCount : f.id === "all" ? notifs.length : notifs.filter((n) => n.type === f.id).length;
              return (
                <button
                  key={f.id}
                  onClick={() => { setFilter(f.id); setPage(1); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${filter === f.id ? "bg-[#1A2B4A] text-white border-[#1A2B4A]" : "text-[#6B7280] border-[#C8DFD0] bg-white hover:border-[#1A7A3C] hover:text-[#1A7A3C]"}`}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {f.label}
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${filter === f.id ? "bg-white/20 text-white" : "bg-[#E8F5EE] text-[#1A7A3C]"}`}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Date filter */}
          <div className="flex gap-2">
            {DATE_LABELS.map((d) => (
              <button
                key={d.id}
                onClick={() => setDateFilter(d.id)}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all ${dateFilter === d.id ? "bg-[#E8F5EE] text-[#1A7A3C] border-[#C8DFD0]" : "text-[#9CA3AF] border-[#C8DFD0] bg-white hover:text-[#1A2B4A]"}`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >{d.label}</button>
            ))}
          </div>

          {/* Notifications */}
          {filtered.length > 0 ? (
            <div className="space-y-2">
              {filtered.map((n) => (
                <NotifCard
                  key={n.id}
                  notif={n}
                  s={s}
                  onOpen={() => setSelectedNotif(n)}
                  onMarkRead={() => markRead(n.id)}
                />
              ))}
              {/* Pagination */}
              <div className="flex items-center justify-between pt-2 flex-wrap gap-2">
                <span className="text-xs text-[#9CA3AF]">{s.showing} 1–{filtered.length} {s.of} 128 {s.notifRecords}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1.5 text-[10px] font-semibold border border-[#C8DFD0] rounded-lg disabled:opacity-40 hover:bg-[#F5F9F6] text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.prev}</button>
                  {[1, 2, 3].map((p) => (
                    <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 text-xs font-bold rounded-lg ${page === p ? "bg-[#1A2B4A] text-white" : "text-[#6B7280] hover:bg-[#F5F9F6] border border-[#C8DFD0]"}`} style={{ fontFamily: "Poppins, sans-serif" }}>{p}</button>
                  ))}
                  <button onClick={() => setPage(Math.min(13, page + 1))} disabled={page === 13} className="px-3 py-1.5 text-[10px] font-semibold border border-[#C8DFD0] rounded-lg disabled:opacity-40 hover:bg-[#F5F9F6] text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.next}</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-14 text-center bg-white rounded-2xl border border-[#C8DFD0]">
              <div className="text-4xl mb-3">🔕</div>
              <p className="text-sm font-bold text-[#1A2B4A] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{s.noNotifs}</p>
              <p className="text-xs text-[#9CA3AF] mb-4">{s.noNotifsSub}</p>
              <button onClick={() => { setFilter("all"); setSearch(""); }} className="px-4 py-2 text-xs font-semibold text-[#1A7A3C] border border-[#C8DFD0] rounded-xl hover:bg-[#E8F5EE]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.resetFilters}</button>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4">

          {/* Priority breakdown */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
            <p className="text-sm font-bold text-[#1A2B4A] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Priority Overview</p>
            {([["High", "#C8332A", "#FEF2F2"], ["Medium", "#E8960A", "#FEF3C7"], ["Normal", "#1A7A3C", "#E8F5EE"]] as [Priority, string, string][]).map(([p, color, bg]) => {
              const cnt = notifs.filter((n) => n.priority === p).length;
              const pct = (cnt / notifs.length) * 100;
              return (
                <div key={p} className="mb-3 last:mb-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                      <span className="text-xs text-[#6B7280]">{p}</span>
                    </div>
                    <span className="text-xs font-bold" style={{ color, fontFamily: "Poppins, sans-serif" }}>{cnt}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: bg }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Type breakdown */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
            <p className="text-sm font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>By Category</p>
            <div className="space-y-2">
              {(["centre","queue","applications","slots","procurement","payments"] as NFilter[]).map((t) => {
                const cnt = notifs.filter((n) => n.type === t).length;
                const label = (s as Record<string, string>)[t] ?? t;
                return (
                  <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all text-left ${filter === t ? "border-[#1A2B4A] bg-[#F5F9F6]" : "border-[#E8F5EE] hover:border-[#C8DFD0]"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{TYPE_ICON[t]}</span>
                      <span className="text-xs text-[#1A2B4A] capitalize">{label}</span>
                    </div>
                    <span className="text-xs font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>{cnt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Farmer notification preview */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>🔔 {s.farmerPreviewTitle}</p>
            </div>
            <p className="text-[9px] text-[#9CA3AF] mb-4">{s.farmerPreviewNote}</p>
            <div className="bg-[#F5F9F6] rounded-xl border border-[#C8DFD0] p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#E8F5EE] flex items-center justify-center text-base">🌾</div>
                <div>
                  <p className="text-xs font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.kisanqUpdate}</p>
                  <p className="text-[9px] text-[#9CA3AF]">24 Sep 2026 · 10:30 AM</p>
                </div>
              </div>
              <p className="text-sm text-[#1A2B4A] font-medium mb-1">{s.farmerMsg1}</p>
              <p className="text-xs text-[#6B7280] mb-4">{s.farmerMsg2}</p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 text-[10px] font-bold text-white bg-[#1A7A3C] rounded-lg hover:bg-[#145F2F]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.viewQueue}</button>
                <button className="flex-1 py-2 text-[10px] font-bold text-[#1A2B4A] border border-[#C8DFD0] rounded-lg hover:bg-[#F5F9F6]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.viewBooking}</button>
              </div>
            </div>
            <p className="text-[9px] text-[#9CA3AF] text-center mt-3">{s.demo} · {s.farmerPreviewNote}</p>
          </div>

          {/* Quick create shortcut */}
          <button onClick={() => setShowCreate(true)} className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-[#1A7A3C] border-2 border-dashed border-[#C8DFD0] rounded-2xl hover:border-[#1A7A3C] hover:bg-[#E8F5EE] transition-all" style={{ fontFamily: "Poppins, sans-serif" }}>
            <span className="text-lg">+</span> {s.createBtn}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-2 border-t border-[#C8DFD0]">
        <p className="text-[10px] text-[#9CA3AF]">KisanQ Admin · SIH 2026 Prototype · Team Viksit Innovators · All notifications are demo only</p>
      </div>

      {selectedNotif && (
        <NotifDrawer
          notif={selectedNotif}
          s={s}
          onClose={() => setSelectedNotif(null)}
          onMarkRead={() => { markRead(selectedNotif.id, true); setSelectedNotif(null); }}
        />
      )}
      {showCreate && (
        <CreateModal
          s={s}
          onClose={() => setShowCreate(false)}
          onCreated={() => {}}
        />
      )}
    </div>
  );
}
