import { useState } from "react";
import FarmerManagement from "./FarmerManagement";
import CentreManagement from "./CentreManagement";
import SlotManagement from "./SlotManagement";
import LiveQueueManagement from "./LiveQueueManagement";
import ApplicationManagement from "./ApplicationManagement";
import ProcurementManagement from "./ProcurementManagement";
import PaymentManagement from "./PaymentManagement";
import NotificationsManagement from "./NotificationsManagement";
import ReportsAnalytics from "./ReportsAnalytics";
import AdminSettings from "./AdminSettings";

type NavItem =
  | "dashboard" | "farmers" | "applications" | "centres"
  | "slots" | "queue" | "procurement" | "payments"
  | "notifications" | "reports" | "settings";

// ─── Demo data ────────────────────────────────────────────────────────────────
const KPIS = [
  { label: "Registered Farmers", value: "2,486", icon: "👥", color: "#1A7A3C", bg: "#E8F5EE", delta: "+24 today" },
  { label: "Today's Applications", value: "184", icon: "📋", color: "#2563EB", bg: "#EFF6FF", delta: "+12 this hour" },
  { label: "Active Queue", value: "126", icon: "👥", color: "#E8960A", bg: "#FEF3C7", delta: "3 centres" },
  { label: "Completed Procurement", value: "98", icon: "✅", color: "#1A7A3C", bg: "#E8F5EE", delta: "Today" },
  { label: "Pending Applications", value: "42", icon: "⏳", color: "#E8960A", bg: "#FEF3C7", delta: "Needs review" },
  { label: "Payment Pending", value: "27", icon: "💰", color: "#C8332A", bg: "#FEF2F2", delta: "₹2.76L est." },
];

const CENTRES = [
  { name: "Gwalior Centre A", nameShort: "Centre A", queue: 62, capacity: 70, util: 89, avgTime: "4 min", status: "High Load", statusColor: "#C8332A", statusBg: "#FEF2F2", token: "Q-061", next: "Q-062" },
  { name: "Gwalior Centre B", nameShort: "Centre B", queue: 18, capacity: 50, util: 36, avgTime: "3 min", status: "Normal", statusColor: "#1A7A3C", statusBg: "#E8F5EE", token: "Q-018", next: "Q-019" },
  { name: "Gwalior Centre C", nameShort: "Centre C", queue: 41, capacity: 60, util: 68, avgTime: "4 min", status: "Moderate", statusColor: "#E8960A", statusBg: "#FEF3C7", token: "Q-041", next: "Q-042" },
];

const APPLICATIONS = [
  { id: "KQ-2026-00241", farmer: "Ramesh Kumar", crop: "Wheat", qty: "50 Qtl", centre: "Centre B", slot: "10:30 AM", status: "Confirmed", statusColor: "#1A7A3C", statusBg: "#E8F5EE" },
  { id: "KQ-2026-00242", farmer: "Suresh Patel", crop: "Wheat", qty: "35 Qtl", centre: "Centre C", slot: "11:00 AM", status: "Submitted", statusColor: "#2563EB", statusBg: "#EFF6FF" },
  { id: "KQ-2026-00243", farmer: "Amit Sharma", crop: "Rice", qty: "40 Qtl", centre: "Centre A", slot: "12:00 PM", status: "Quality Check", statusColor: "#E8960A", statusBg: "#FEF3C7" },
  { id: "KQ-2026-00244", farmer: "Priya Devi", crop: "Soybean", qty: "28 Qtl", centre: "Centre B", slot: "01:00 PM", status: "Weighing", statusColor: "#7C3AED", statusBg: "#F5F3FF" },
  { id: "KQ-2026-00245", farmer: "Mohan Lal", crop: "Maize", qty: "60 Qtl", centre: "Centre C", slot: "02:00 PM", status: "Confirmed", statusColor: "#1A7A3C", statusBg: "#E8F5EE" },
];

const PROC_STAGES = [
  { label: "Applications", value: 184, color: "#2563EB" },
  { label: "Quality Check", value: 72, color: "#E8960A" },
  { label: "Weighing", value: 38, color: "#7C3AED" },
  { label: "Completed", value: 98, color: "#1A7A3C" },
  { label: "Payment Pending", value: 27, color: "#C8332A" },
];

const ALERTS = [
  { icon: "🔴", text: "Centre A is approaching full capacity.", time: "2 min ago", urgent: true },
  { icon: "🟡", text: "Centre B queue increased by 6 farmers.", time: "8 min ago", urgent: false },
  { icon: "🔵", text: "12 applications are awaiting verification.", time: "15 min ago", urgent: false },
  { icon: "🟠", text: "5 procurement records require attention.", time: "32 min ago", urgent: false },
];

const DAILY_DATA = [
  { day: "Mon", val: 145 }, { day: "Tue", val: 162 }, { day: "Wed", val: 178 },
  { day: "Thu", val: 184 }, { day: "Fri", val: 201 }, { day: "Sat", val: 89 }, { day: "Sun", val: 52 },
];

const NAV_ITEMS: { id: NavItem; icon: string; label: string }[] = [
  { id: "dashboard", icon: "📊", label: "Dashboard" },
  { id: "farmers", icon: "👥", label: "Farmers" },
  { id: "applications", icon: "📋", label: "Applications" },
  { id: "centres", icon: "🏭", label: "Centres" },
  { id: "slots", icon: "🕐", label: "Slots" },
  { id: "queue", icon: "👥", label: "Live Queue" },
  { id: "procurement", icon: "📦", label: "Procurement" },
  { id: "payments", icon: "💰", label: "Payments" },
  { id: "notifications", icon: "🔔", label: "Notifications" },
  { id: "reports", icon: "📈", label: "Reports" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

// ─── Micro components ─────────────────────────────────────────────────────────
function BarChart({ data, maxVal }: { data: typeof DAILY_DATA; maxVal: number }) {
  return (
    <div className="flex items-end gap-1.5 h-28 w-full">
      {data.map((d) => {
        const pct = (d.val / maxVal) * 100;
        const isToday = d.day === "Thu";
        return (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[9px] text-[#6B7280] font-medium">{d.val}</span>
            <div className="w-full flex flex-col justify-end" style={{ height: "80px" }}>
              <div
                className="w-full rounded-t-md transition-all"
                style={{
                  height: `${pct}%`,
                  background: isToday
                    ? "linear-gradient(180deg,#1A7A3C,#2E9952)"
                    : "#C8DFD0",
                  minHeight: 4,
                }}
              />
            </div>
            <span className={`text-[9px] font-semibold ${isToday ? "text-[#1A7A3C]" : "text-[#9CA3AF]"}`}>
              {d.day}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function UtilBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-[#1A2B4A] font-medium" style={{ fontFamily: "Poppins,sans-serif" }}>{label}</span>
        <span className="text-xs font-bold" style={{ color, fontFamily: "Poppins,sans-serif" }}>{pct}%</span>
      </div>
      <div className="h-2 bg-[#E8F5EE] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function KQ() {
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="10" fill="rgba(255,255,255,0.2)" />
        <text x="10" y="34" fontFamily="Poppins,sans-serif" fontWeight="700" fontSize="26" fill="white">K</text>
        <circle cx="36" cy="28" r="9" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="2.5" />
        <line x1="42" y1="34" x2="46" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M32 22 Q36 18 40 22" stroke="#E8960A" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
      <span className="text-base font-bold text-white" style={{ fontFamily: "Poppins,sans-serif" }}>KisanQ</span>
    </div>
  );
}

function ComingSoonPanel({ label }: { label: string }) {
  return (
    <div className="flex-1 flex items-center justify-center p-10">
      <div className="text-center">
        <div className="text-5xl mb-4">🚧</div>
        <p className="text-lg font-bold text-[#1A2B4A] mb-1" style={{ fontFamily: "Poppins,sans-serif" }}>{label}</p>
        <p className="text-sm text-[#6B7280]">This admin panel is under development.</p>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeNav, setActiveNav] = useState<NavItem>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alertsDismissed, setAlertsDismissed] = useState<number[]>([]);
  const [adminLang, setAdminLang] = useState<"en" | "hi">("en");

  const dismissAlert = (i: number) => setAlertsDismissed((p) => [...p, i]);
  const visibleAlerts = ALERTS.filter((_, i) => !alertsDismissed.includes(i));

  // ── Sidebar ────────────────────────────────────────────────────────────────
  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      className={`flex flex-col h-full ${mobile ? "w-64" : "w-56 xl:w-64"}`}
      style={{ background: "linear-gradient(180deg,#1A2B4A 0%,#0F1E35 100%)" }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
        <KQ />
        {mobile && (
          <button onClick={() => setSidebarOpen(false)} className="text-white/60 hover:text-white">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      {/* Admin label */}
      <div className="px-5 py-3 border-b border-white/10">
        <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Admin Portal</span>
      </div>
      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => { setActiveNav(item.id); if (mobile) setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-all ${
              activeNav === item.id
                ? "bg-white/15 text-white border-r-2 border-[#1A7A3C]"
                : "text-white/60 hover:bg-white/8 hover:text-white/90"
            }`}
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            <span className="text-base w-5 text-center flex-shrink-0">{item.icon}</span>
            <span>{item.label}</span>
            {item.id === "notifications" && visibleAlerts.length > 0 && (
              <span className="ml-auto text-[9px] font-bold bg-[#C8332A] text-white px-1.5 py-0.5 rounded-full">
                {visibleAlerts.length}
              </span>
            )}
          </button>
        ))}
      </nav>
      {/* Admin profile */}
      <div className="px-5 py-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1A7A3C] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            A
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate" style={{ fontFamily: "Poppins,sans-serif" }}>Admin User</p>
            <p className="text-[9px] text-white/50">Centre Administrator</p>
          </div>
          <button onClick={onLogout} className="text-white/40 hover:text-white/80 transition-colors flex-shrink-0" title="Logout">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h2M9 10l3-3-3-3M12 7H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  // ── Dashboard main ─────────────────────────────────────────────────────────
  const DashboardMain = () => (
    <div className="p-5 xl:p-6 space-y-5 max-w-[1280px] mx-auto">

      {/* Demo watermark */}
      <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl px-4 py-2 flex items-center gap-2">
        <span className="text-sm">⚠️</span>
        <p className="text-xs text-[#92400E]">
          <strong>SIH 2026 Prototype</strong> — All data shown is demo/fictional. Not connected to any real government system.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {KPIS.map((k) => (
          <div key={k.label} className="bg-white rounded-xl border border-[#C8DFD0] p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ background: k.bg }}>
                {k.icon}
              </div>
              <span className="text-[9px] text-[#9CA3AF]">{k.delta}</span>
            </div>
            <p className="text-xl font-bold text-[#1A2B4A] mb-0.5" style={{ color: k.color, fontFamily: "Poppins,sans-serif" }}>{k.value}</p>
            <p className="text-[10px] text-[#6B7280] leading-tight">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Centre Workload */}
      <div className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E8F5EE] flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>Centre Workload</p>
            <p className="text-[10px] text-[#9CA3AF]">Real-time utilization · Demo data</p>
          </div>
          <span className="text-[10px] text-[#1A7A3C] font-semibold bg-[#E8F5EE] px-2.5 py-1 rounded-full">3 Centres</span>
        </div>
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E8F5EE]">
          {CENTRES.map((c) => (
            <div key={c.name} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>{c.name}</p>
                  <p className="text-[10px] text-[#9CA3AF]">Avg processing: {c.avgTime}</p>
                </div>
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{ color: c.statusColor, background: c.statusBg, fontFamily: "Poppins,sans-serif" }}
                >
                  {c.status}
                </span>
              </div>
              {/* Utilization bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-[#6B7280]">Utilization</span>
                  <span className="text-xs font-bold" style={{ color: c.statusColor, fontFamily: "Poppins,sans-serif" }}>{c.util}%</span>
                </div>
                <div className="h-2 bg-[#E8F5EE] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${c.util}%`, background: c.statusColor }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { label: "Queue", val: c.queue },
                  { label: "Capacity", val: c.capacity },
                ].map((st) => (
                  <div key={st.label} className="bg-[#F5F9F6] rounded-xl px-3 py-2 text-center">
                    <p className="text-[9px] text-[#9CA3AF]">{st.label}</p>
                    <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>{st.val}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 text-[10px] font-semibold text-[#1A7A3C] border border-[#C8DFD0] rounded-lg hover:bg-[#E8F5EE] transition-colors" style={{ fontFamily: "Poppins,sans-serif" }}>
                  View
                </button>
                <button className="flex-1 py-1.5 text-[10px] font-semibold text-white bg-[#1A7A3C] rounded-lg hover:bg-[#145F2F] transition-colors" style={{ fontFamily: "Poppins,sans-serif" }}>
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2-col: Live Queue + Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Live Queue */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm">
          <div className="px-5 py-4 border-b border-[#E8F5EE] flex items-center justify-between">
            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>Live Queue Overview</p>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[9px] text-[#6B7280]">Live · Demo</span>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {CENTRES.map((c) => (
              <div key={c.name} className="flex items-center gap-3 p-3 bg-[#F5F9F6] rounded-xl">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: c.statusBg, color: c.statusColor, fontFamily: "Poppins,sans-serif" }}
                >
                  {c.nameShort.slice(-1)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#1A2B4A] truncate" style={{ fontFamily: "Poppins,sans-serif" }}>{c.nameShort}</p>
                  <p className="text-[9px] text-[#9CA3AF]">Now: {c.token} · Next: {c.next}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold" style={{ color: c.statusColor, fontFamily: "Poppins,sans-serif" }}>{c.queue}</p>
                  <p className="text-[9px] text-[#9CA3AF]">waiting</p>
                </div>
              </div>
            ))}
            <button
              onClick={() => setActiveNav("queue")}
              className="w-full py-2 text-xs font-semibold text-[#1A7A3C] border border-[#C8DFD0] rounded-xl hover:bg-[#E8F5EE] transition-colors"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              View Live Queue →
            </button>
          </div>
        </div>

        {/* Quick Actions + Alerts */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4 shadow-sm">
            <p className="text-sm font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins,sans-serif" }}>Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: "👤", label: "Add Farmer", nav: "farmers" },
                { icon: "🕐", label: "Create Slot", nav: "slots" },
                { icon: "🏭", label: "Manage Centre", nav: "centres" },
                { icon: "📋", label: "View Applications", nav: "applications" },
                { icon: "👥", label: "Update Queue", nav: "queue" },
                { icon: "📊", label: "View Reports", nav: "reports" },
              ].map((a) => (
                <button
                  key={a.label}
                  onClick={() => setActiveNav(a.nav as NavItem)}
                  className="flex items-center gap-2.5 px-3 py-2.5 bg-[#F5F9F6] hover:bg-[#E8F5EE] border border-[#C8DFD0] hover:border-[#1A7A3C]/40 rounded-xl transition-all text-left"
                >
                  <span className="text-base">{a.icon}</span>
                  <span className="text-[10px] font-semibold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-[#E8F5EE] flex items-center justify-between">
              <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>Alerts</p>
              {visibleAlerts.length > 0 && (
                <span className="text-[9px] font-bold bg-[#C8332A] text-white px-2 py-0.5 rounded-full">{visibleAlerts.length}</span>
              )}
            </div>
            <div className="divide-y divide-[#E8F5EE] max-h-48 overflow-y-auto">
              {visibleAlerts.length === 0 ? (
                <p className="px-4 py-6 text-xs text-[#9CA3AF] text-center">All clear ✓</p>
              ) : (
                ALERTS.map((a, i) =>
                  alertsDismissed.includes(i) ? null : (
                    <div key={i} className={`flex items-start gap-2.5 px-4 py-3 ${a.urgent ? "bg-[#FEF2F2]" : ""}`}>
                      <span className="text-sm flex-shrink-0 mt-0.5">{a.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#1A2B4A] leading-relaxed">{a.text}</p>
                        <p className="text-[9px] text-[#9CA3AF] mt-0.5">{a.time}</p>
                      </div>
                      <button onClick={() => dismissAlert(i)} className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-[#E5E7EB] text-[#9CA3AF]">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                      </button>
                    </div>
                  )
                )
              )}
            </div>
            <div className="px-4 py-3 border-t border-[#E8F5EE]">
              <button onClick={() => setActiveNav("notifications")} className="text-xs font-semibold text-[#1A7A3C] hover:underline" style={{ fontFamily: "Poppins,sans-serif" }}>
                View All Notifications →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E8F5EE] flex items-center justify-between">
          <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>Recent Applications</p>
          <button onClick={() => setActiveNav("applications")} className="text-xs font-semibold text-[#1A7A3C] hover:underline" style={{ fontFamily: "Poppins,sans-serif" }}>
            View All →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F5F9F6]">
                {["Application ID", "Farmer", "Crop", "Quantity", "Centre", "Slot", "Status"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: "Poppins,sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8F5EE]">
              {APPLICATIONS.map((row) => (
                <tr key={row.id} className="hover:bg-[#F5F9F6] transition-colors cursor-pointer">
                  <td className="px-4 py-3 font-mono text-[10px] text-[#6B7280] whitespace-nowrap">{row.id}</td>
                  <td className="px-4 py-3 font-semibold text-[#1A2B4A] whitespace-nowrap" style={{ fontFamily: "Poppins,sans-serif" }}>{row.farmer}</td>
                  <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{row.crop}</td>
                  <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{row.qty}</td>
                  <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{row.centre}</td>
                  <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{row.slot}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ color: row.statusColor, background: row.statusBg, fontFamily: "Poppins,sans-serif" }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2-col: Procurement Progress + Charts */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Procurement funnel */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
          <p className="text-sm font-bold text-[#1A2B4A] mb-1" style={{ fontFamily: "Poppins,sans-serif" }}>Procurement Progress</p>
          <p className="text-[10px] text-[#9CA3AF] mb-4">Today's pipeline · Demo data</p>
          <div className="space-y-3">
            {PROC_STAGES.map((stage) => (
              <div key={stage.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-[#1A2B4A]" style={{ fontFamily: "Poppins,sans-serif" }}>{stage.label}</span>
                  <span className="text-sm font-bold" style={{ color: stage.color, fontFamily: "Poppins,sans-serif" }}>{stage.value}</span>
                </div>
                <div className="h-2 bg-[#E8F5EE] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(stage.value / 184) * 100}%`, background: stage.color }} />
                </div>
              </div>
            ))}
          </div>
          {/* Payment summary */}
          <div className="mt-4 pt-4 border-t border-[#E8F5EE]">
            <p className="text-xs font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins,sans-serif" }}>Payment Summary</p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: "Completed", val: "98", color: "#1A7A3C" },
                { label: "Processed", val: "71", color: "#2563EB" },
                { label: "Pending", val: "27", color: "#C8332A" },
              ].map((p) => (
                <div key={p.label} className="bg-[#F5F9F6] rounded-xl p-2.5 text-center">
                  <p className="text-[9px] text-[#9CA3AF] mb-0.5">{p.label}</p>
                  <p className="text-base font-bold" style={{ color: p.color, fontFamily: "Poppins,sans-serif" }}>{p.val}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setActiveNav("payments")}
              className="w-full py-2 text-xs font-semibold text-[#1A7A3C] border border-[#C8DFD0] rounded-xl hover:bg-[#E8F5EE] transition-colors"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              View Payment Records →
            </button>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
            <p className="text-sm font-bold text-[#1A2B4A] mb-0.5" style={{ fontFamily: "Poppins,sans-serif" }}>Daily Applications</p>
            <p className="text-[10px] text-[#9CA3AF] mb-4">Last 7 days · Demo data</p>
            <BarChart data={DAILY_DATA} maxVal={220} />
          </div>
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
            <p className="text-sm font-bold text-[#1A2B4A] mb-1" style={{ fontFamily: "Poppins,sans-serif" }}>Centre Utilization</p>
            <p className="text-[10px] text-[#9CA3AF] mb-4">Current · Demo data</p>
            <UtilBar label="Gwalior Centre A" pct={89} color="#C8332A" />
            <UtilBar label="Gwalior Centre C" pct={68} color="#E8960A" />
            <UtilBar label="Gwalior Centre B" pct={36} color="#1A7A3C" />
            <div className="mt-3 p-3 bg-[#E8F5EE] rounded-xl">
              <p className="text-[10px] text-[#1A7A3C]">
                <strong>Centre B</strong> has available capacity. Consider redistributing applications from Centre A.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-3 border-t border-[#C8DFD0]">
        <p className="text-[10px] text-[#9CA3AF]">KisanQ Admin · SIH 2026 Prototype · Team Viksit Innovators · All data is demo only</p>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: "#F5F9F6", fontFamily: "Inter,sans-serif" }}>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="flex-shrink-0">
            <Sidebar mobile />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="flex-shrink-0 bg-white border-b border-[#C8DFD0] px-4 md:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F5F9F6] text-[#6B7280]"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <div className="min-w-0">
              <p className="text-base font-bold text-[#1A2B4A] capitalize" style={{ fontFamily: "Poppins,sans-serif" }}>
                {activeNav === "dashboard" ? "Dashboard" : NAV_ITEMS.find((n) => n.id === activeNav)?.label}
              </p>
              <p className="text-[10px] text-[#9CA3AF] hidden sm:block">Procurement operations overview · Demo data</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#C8DFD0] bg-[#F5F9F6] text-xs text-[#9CA3AF]">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="5.5" cy="5.5" r="4" stroke="#9CA3AF" strokeWidth="1.2" />
                <path d="M9 9l2 2" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span>Search...</span>
            </div>
            {/* Lang selector */}
            <select
              value={adminLang}
              onChange={(e) => setAdminLang(e.target.value as "en" | "hi")}
              className="hidden sm:block px-2.5 py-1.5 rounded-lg border border-[#C8DFD0] bg-white text-xs font-semibold text-[#1A2B4A] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#1A7A3C]"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              <option value="en">EN</option>
              <option value="hi">हिन्दी</option>
            </select>
            {/* Notif */}
            <button className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] transition-colors">
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                <path d="M10 2a6 6 0 00-6 6v2.586l-1.707 1.707A1 1 0 003 14h14a1 1 0 00.707-1.707L16 10.586V8a6 6 0 00-6-6z" fill="#6B7280" />
                <path d="M8 14a2 2 0 104 0" fill="#6B7280" />
              </svg>
              {visibleAlerts.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C8332A] border border-white" />
              )}
            </button>
            {/* Admin avatar */}
            <div className="w-8 h-8 rounded-full bg-[#1A2B4A] flex items-center justify-center text-white text-xs font-bold" style={{ fontFamily: "Poppins,sans-serif" }}>
              A
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {activeNav === "dashboard" ? (
              <DashboardMain />
            ) : activeNav === "farmers" ? (
              <FarmerManagement key={adminLang} lang={adminLang} />
            ) : activeNav === "centres" ? (
              <CentreManagement key={adminLang} lang={adminLang} />
            ) : activeNav === "slots" ? (
              <SlotManagement key={adminLang} lang={adminLang} />
            ) : activeNav === "queue" ? (
              <LiveQueueManagement key={adminLang} lang={adminLang} />
            ) : activeNav === "applications" ? (
              <ApplicationManagement key={adminLang} lang={adminLang} />
            ) : activeNav === "procurement" ? (
              <ProcurementManagement key={adminLang} lang={adminLang} />
            ) : activeNav === "payments" ? (
              <PaymentManagement key={adminLang} lang={adminLang} />
            ) : activeNav === "notifications" ? (
              <NotificationsManagement key={adminLang} lang={adminLang} />
            ) : activeNav === "reports" ? (
              <ReportsAnalytics key={adminLang} lang={adminLang} />
            ) : activeNav === "settings" ? (
              <AdminSettings key={adminLang} lang={adminLang} />
            ) : (
              <ComingSoonPanel label={NAV_ITEMS.find((n) => n.id === activeNav)?.label ?? ""} />
            )}
        </main>
      </div>
    </div>
  );
}
