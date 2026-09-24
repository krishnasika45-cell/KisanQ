import { useState } from "react";

type Lang = "en" | "hi";
type SortKey = "recommended" | "nearest" | "lowest-wait";

// ─── Strings ────────────────────────────────────────────────────────────────
const S = {
  en: {
    title: "Find the Best Procurement Centre",
    subtitle: "Compare nearby centres and choose a suitable time.",
    langToggle: "हिन्दी",
    // Input
    inputTitle: "Your Details",
    locationLabel: "Location",
    locationPH: "Enter your location",
    useLocation: "Use Current Location",
    cropLabel: "Crop",
    qtyLabel: "Quantity",
    findBtn: "Find Suitable Centres",
    finding: "Finding centres...",
    // Filters
    filterBy: "Filter by",
    filters: ["≤ 10 km", "Wait ≤ 60 min", "Available Now", "High Capacity"],
    sortBy: "Sort by",
    sorts: ["Recommended", "Nearest", "Lowest Wait"],
    // Cards
    recommended: "Recommended",
    distance: "Distance",
    travel: "Est. Travel",
    queue: "In Queue",
    wait: "Est. Wait",
    capacity: "Capacity",
    nextSlot: "Next Slot",
    totalTime: "Total Est. Time",
    selectBtn: "Select Centre & Slot",
    viewSlots: "View Slots",
    recNote:
      "Recommended based on estimated travel time, queue and processing capacity.",
    estimate: "* All times are estimates, not guarantees.",
    // USP card
    uspHeading: "Nearest is not always fastest.",
    uspBody:
      "Centre C is 3.1 km closer, but Centre B currently has a shorter queue — saving you over 2 hours of total waiting and travel time.",
    uspTag: "KisanQ Intelligence",
    // Comparison
    compTitle: "Quick Comparison",
    compHeaders: ["Centre", "Distance", "Queue", "Wait", "Total"],
    // CTA
    continueBtn: "Continue to Slot Booking →",
    selectedLabel: "Selected Centre:",
    // Questions
    q1: "Where should I go?",
    q2: "When should I go?",
    q3: "How long might it take?",
    // Empty / loading
    noResults: "No centres matched your filters.",
    resetFilters: "Reset Filters",
    farmers: "farmers",
    min: "min",
    km: "km",
  },
  hi: {
    title: "सबसे उपयुक्त खरीद केंद्र खोजें",
    subtitle: "नज़दीकी केंद्रों की तुलना करें और उपयुक्त समय चुनें।",
    langToggle: "English",
    inputTitle: "आपकी जानकारी",
    locationLabel: "स्थान",
    locationPH: "अपना स्थान दर्ज करें",
    useLocation: "वर्तमान स्थान उपयोग करें",
    cropLabel: "फसल",
    qtyLabel: "मात्रा",
    findBtn: "उपयुक्त केंद्र खोजें",
    finding: "केंद्र खोजे जा रहे हैं...",
    filterBy: "फ़िल्टर करें",
    filters: ["≤ 10 km", "प्रतीक्षा ≤ 60 मिनट", "अभी उपलब्ध", "उच्च क्षमता"],
    sortBy: "क्रमबद्ध करें",
    sorts: ["अनुशंसित", "निकटतम", "कम प्रतीक्षा"],
    recommended: "अनुशंसित",
    distance: "दूरी",
    travel: "अनुमानित यात्रा",
    queue: "कतार में",
    wait: "अनुमानित प्रतीक्षा",
    capacity: "क्षमता",
    nextSlot: "अगला स्लॉट",
    totalTime: "कुल अनुमानित समय",
    selectBtn: "केंद्र और स्लॉट चुनें",
    viewSlots: "स्लॉट देखें",
    recNote:
      "अनुमानित यात्रा समय, कतार और प्रसंस्करण क्षमता के आधार पर अनुशंसित।",
    estimate: "* सभी समय अनुमानित हैं, गारंटी नहीं।",
    uspHeading: "निकटतम हमेशा सबसे तेज़ नहीं होता।",
    uspBody:
      "केंद्र C 3.1 km करीब है, लेकिन केंद्र B में अभी कम कतार है — आपका कुल 2 घंटे से ज़्यादा समय बचता है।",
    uspTag: "किसानQ इंटेलिजेंस",
    compTitle: "त्वरित तुलना",
    compHeaders: ["केंद्र", "दूरी", "कतार", "प्रतीक्षा", "कुल"],
    continueBtn: "स्लॉट बुकिंग पर जाएं →",
    selectedLabel: "चुना गया केंद्र:",
    q1: "मुझे कहाँ जाना चाहिए?",
    q2: "मुझे कब जाना चाहिए?",
    q3: "कितना समय लग सकता है?",
    noResults: "कोई केंद्र फ़िल्टर से मेल नहीं खाया।",
    resetFilters: "फ़िल्टर रीसेट करें",
    farmers: "किसान",
    min: "मिनट",
    km: "km",
  },
};

// ─── Centre data ─────────────────────────────────────────────────────────────
const CENTRES_EN = [
  {
    id: 0,
    name: "Gwalior Centre B",
    nameHi: "ग्वालियर केंद्र B",
    distKm: 8.2,
    travelMin: 25,
    queueCount: 18,
    waitMin: 54,
    capacityPct: 36,
    nextSlot: "10:30 AM – 11:00 AM",
    totalMin: 79,
    totalLabel: "~1 hr 19 min",
    totalLabelHi: "~1 घंटा 19 मिनट",
    recommended: true,
  },
  {
    id: 1,
    name: "Gwalior Centre C",
    nameHi: "ग्वालियर केंद्र C",
    distKm: 5.1,
    travelMin: 15,
    queueCount: 41,
    waitMin: 164,
    capacityPct: 74,
    nextSlot: "11:30 AM – 12:00 PM",
    totalMin: 179,
    totalLabel: "~2 hr 59 min",
    totalLabelHi: "~2 घंटे 59 मिनट",
    recommended: false,
  },
  {
    id: 2,
    name: "Gwalior Centre A",
    nameHi: "ग्वालियर केंद्र A",
    distKm: 12.4,
    travelMin: 35,
    queueCount: 62,
    waitMin: 248,
    capacityPct: 88,
    nextSlot: "1:00 PM – 1:30 PM",
    totalMin: 283,
    totalLabel: "~4 hr 43 min",
    totalLabelHi: "~4 घंटे 43 मिनट",
    recommended: false,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function CapacityBar({ pct }: { pct: number }) {
  const color =
    pct <= 40 ? "#1A7A3C" : pct <= 70 ? "#E8960A" : "#C8332A";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#E8F5EE] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span
        className="text-xs font-bold tabular-nums"
        style={{ color, fontFamily: "Poppins,sans-serif" }}
      >
        {pct}%
      </span>
    </div>
  );
}

function QueueDots({ count }: { count: number }) {
  // Show up to 10 filled dots representing saturation
  const filled = Math.min(Math.round((count / 80) * 10), 10);
  return (
    <div className="flex gap-0.5 mt-1">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${i < filled ? "bg-[#1A2B4A]" : "bg-[#E8F5EE]"}`}
        />
      ))}
    </div>
  );
}

function StatPill({
  icon,
  label,
  value,
  accent = false,
}: {
  icon: string;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center px-2.5 py-2 rounded-xl ${accent ? "bg-[#E8F5EE]" : "bg-[#F5F9F6]"}`}
    >
      <span className="text-base leading-none mb-0.5">{icon}</span>
      <span className="text-[9px] text-[#6B7280] leading-none mb-0.5">{label}</span>
      <span
        className={`text-xs font-bold leading-none ${accent ? "text-[#1A7A3C]" : "text-[#1A2B4A]"}`}
        style={{ fontFamily: "Poppins,sans-serif" }}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function SmartCentre({
  onBack,
  onSelectCentre,
  initialLang = "en",
}: {
  onBack: () => void;
  onSelectCentre?: () => void;
  initialLang?: Lang;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [location, setLocation] = useState("Gwalior, Madhya Pradesh");
  const [locatingGPS, setLocatingGPS] = useState(false);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("recommended");
  const [activeFilters, setActiveFilters] = useState<number[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const s = S[lang];

  const handleFind = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSearched(true);
  };

  const handleGPS = async () => {
    setLocatingGPS(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLocatingGPS(false);
    setLocation("Gwalior, Madhya Pradesh");
  };

  const toggleFilter = (i: number) => {
    setActiveFilters((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  // Sort centres
  const sorted = [...CENTRES_EN].sort((a, b) => {
    if (sortBy === "nearest") return a.distKm - b.distKm;
    if (sortBy === "lowest-wait") return a.waitMin - b.waitMin;
    return a.totalMin - b.totalMin;
  });

  // Filter (simple demo logic)
  const filtered = sorted.filter((c) => {
    if (activeFilters.includes(0) && c.distKm > 10) return false;
    if (activeFilters.includes(1) && c.waitMin > 60) return false;
    return true;
  });

  const sortKeys: SortKey[] = ["recommended", "nearest", "lowest-wait"];

  return (
    <div className="pb-6">
      {/* ── Page header ── */}
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

      {/* ── "KisanQ answers" strip ── */}
      <div className="bg-[#1A2B4A] px-4 py-3 flex items-center gap-0 overflow-x-auto">
        {[s.q1, s.q2, s.q3].map((q, i) => (
          <div key={q} className="flex items-center gap-0 flex-shrink-0">
            <span className="text-xs text-white/80 whitespace-nowrap px-2 first:pl-0">{q}</span>
            {i < 2 && <span className="text-white/30 text-xs">·</span>}
          </div>
        ))}
      </div>

      <div className="px-4 pt-4 space-y-4 max-w-2xl mx-auto">
        {/* ── Input card ── */}
        <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4 shadow-sm">
          <p className="text-xs font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins,sans-serif" }}>
            {s.inputTitle}
          </p>
          <div className="space-y-3">
            {/* Location */}
            <div>
              <label className="block text-[10px] font-semibold text-[#6B7280] mb-1 uppercase tracking-wider">
                {s.locationLabel}
              </label>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 border-[#C8DFD0] bg-[#F5F9F6]">
                  <span className="text-sm">📍</span>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1 bg-transparent text-xs font-medium text-[#1A2B4A] outline-none placeholder:text-[#9CA3AF]"
                    placeholder={s.locationPH}
                  />
                </div>
                <button
                  onClick={handleGPS}
                  disabled={locatingGPS}
                  className="flex-shrink-0 px-3 py-2.5 rounded-xl bg-[#E8F5EE] border border-[#C8DFD0] text-[#1A7A3C] text-[10px] font-semibold hover:bg-[#1A7A3C] hover:text-white transition-all"
                  style={{ fontFamily: "Poppins,sans-serif" }}
                >
                  {locatingGPS ? "..." : "📡 GPS"}
                </button>
              </div>
            </div>
            {/* Crop & Qty */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-semibold text-[#6B7280] mb-1 uppercase tracking-wider">
                  {s.cropLabel}
                </label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 border-[#C8DFD0] bg-[#F5F9F6]">
                  <span className="text-sm">🌾</span>
                  <span className="text-xs font-medium text-[#1A2B4A]">
                    {lang === "en" ? "Wheat" : "गेहूं"}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#6B7280] mb-1 uppercase tracking-wider">
                  {s.qtyLabel}
                </label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 border-[#C8DFD0] bg-[#F5F9F6]">
                  <span className="text-sm">⚖️</span>
                  <span className="text-xs font-medium text-[#1A2B4A]">
                    {lang === "en" ? "50 Quintal" : "50 क्विंटल"}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleFind}
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.99]"
              style={{
                fontFamily: "Poppins,sans-serif",
                background: loading
                  ? "#9CA3AF"
                  : "linear-gradient(135deg,#145F2F 0%,#1A7A3C 100%)",
                boxShadow: loading
                  ? "none"
                  : "0 2px 12px rgba(26,122,60,0.3)",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="40 20" />
                  </svg>
                  {s.finding}
                </span>
              ) : (
                `🎯 ${s.findBtn}`
              )}
            </button>
          </div>
        </div>

        {/* ── Results ── */}
        {searched && (
          <>
            {/* Filters + Sort */}
            <div className="space-y-2.5">
              <div>
                <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-1.5">
                  {s.filterBy}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {s.filters.map((f, i) => (
                    <button
                      key={f}
                      onClick={() => toggleFilter(i)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        activeFilters.includes(i)
                          ? "bg-[#1A7A3C] text-white border-[#1A7A3C]"
                          : "bg-white text-[#6B7280] border-[#C8DFD0] hover:border-[#1A7A3C] hover:text-[#1A7A3C]"
                      }`}
                      style={{ fontFamily: "Poppins,sans-serif" }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-1.5">
                  {s.sortBy}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {sortKeys.map((key, i) => (
                    <button
                      key={key}
                      onClick={() => setSortBy(key)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        sortBy === key
                          ? "bg-[#1A2B4A] text-white border-[#1A2B4A]"
                          : "bg-white text-[#6B7280] border-[#C8DFD0] hover:border-[#1A2B4A] hover:text-[#1A2B4A]"
                      }`}
                      style={{ fontFamily: "Poppins,sans-serif" }}
                    >
                      {s.sorts[i]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* USP Card */}
            <div className="bg-[#1A2B4A] rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">💡</span>
                  <span
                    className="text-[10px] font-bold text-[#E8960A] uppercase tracking-wider"
                    style={{ fontFamily: "Poppins,sans-serif" }}
                  >
                    {s.uspTag}
                  </span>
                </div>
                <p
                  className="text-sm font-bold text-white mb-1.5"
                  style={{ fontFamily: "Poppins,sans-serif" }}
                >
                  {s.uspHeading}
                </p>
                <p className="text-xs text-white/70 leading-relaxed">{s.uspBody}</p>
              </div>
            </div>

            {/* No results */}
            {filtered.length === 0 && (
              <div className="bg-white rounded-2xl border border-[#C8DFD0] p-8 text-center">
                <p className="text-2xl mb-3">🔍</p>
                <p className="text-sm font-semibold text-[#1A2B4A] mb-1" style={{ fontFamily: "Poppins,sans-serif" }}>
                  {s.noResults}
                </p>
                <button
                  onClick={() => setActiveFilters([])}
                  className="mt-3 text-xs text-[#1A7A3C] font-semibold hover:underline"
                  style={{ fontFamily: "Poppins,sans-serif" }}
                >
                  {s.resetFilters}
                </button>
              </div>
            )}

            {/* Centre cards */}
            <div className="space-y-3">
              {filtered.map((c, rank) => {
                const isRec = c.id === 0;
                const isSelected = selectedId === c.id;
                const capacityColor =
                  c.capacityPct <= 40
                    ? "#1A7A3C"
                    : c.capacityPct <= 70
                    ? "#E8960A"
                    : "#C8332A";

                return (
                  <div
                    key={c.id}
                    className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all ${
                      isSelected
                        ? "border-[#1A7A3C] shadow-[0_0_0_4px_rgba(26,122,60,0.1)]"
                        : isRec
                        ? "border-[#1A7A3C]/40"
                        : "border-[#C8DFD0]"
                    }`}
                  >
                    {/* Card header */}
                    <div
                      className={`px-4 pt-4 pb-3 ${isRec ? "bg-[#F2FAF5]" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-lg flex-shrink-0">🏭</span>
                          <div className="min-w-0">
                            <p
                              className="text-sm font-bold text-[#1A2B4A] truncate"
                              style={{ fontFamily: "Poppins,sans-serif" }}
                            >
                              {lang === "en" ? c.name : c.nameHi}
                            </p>
                            <p className="text-[10px] text-[#6B7280]">
                              {c.distKm} {s.km} · {c.travelMin} {s.min} {lang === "en" ? "travel" : "यात्रा"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          {isRec && (
                            <span
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1A7A3C] text-white text-[10px] font-bold"
                              style={{ fontFamily: "Poppins,sans-serif" }}
                            >
                              ✦ {s.recommended}
                            </span>
                          )}
                          {rank === 0 && !isRec && (
                            <span
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1A2B4A] text-white text-[10px] font-bold"
                              style={{ fontFamily: "Poppins,sans-serif" }}
                            >
                              #{rank + 1}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Stats grid */}
                    <div className="px-4 pb-3">
                      <div className="grid grid-cols-4 gap-1.5 mb-3">
                        <StatPill
                          icon="🚗"
                          label={s.travel}
                          value={`${c.travelMin}m`}
                          accent={false}
                        />
                        <StatPill
                          icon="👥"
                          label={s.queue}
                          value={`${c.queueCount}`}
                          accent={false}
                        />
                        <StatPill
                          icon="⏳"
                          label={s.wait}
                          value={`~${c.waitMin}m`}
                          accent={isRec}
                        />
                        <StatPill
                          icon="⏰"
                          label={s.totalTime}
                          value={lang === "en" ? c.totalLabel.replace("~", "~") : c.totalLabelHi}
                          accent={isRec}
                        />
                      </div>

                      {/* Capacity */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-[#6B7280]">{s.capacity}</span>
                          <span
                            className="text-[10px] font-semibold"
                            style={{ color: capacityColor }}
                          >
                            {c.capacityPct <= 40
                              ? lang === "en" ? "Low" : "कम"
                              : c.capacityPct <= 70
                              ? lang === "en" ? "Medium" : "मध्यम"
                              : lang === "en" ? "High" : "उच्च"}
                          </span>
                        </div>
                        <CapacityBar pct={c.capacityPct} />
                      </div>

                      {/* Next slot */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] text-[#6B7280]">{s.nextSlot}</span>
                        <span
                          className="text-xs font-bold text-[#1A2B4A]"
                          style={{ fontFamily: "Poppins,sans-serif" }}
                        >
                          🕐 {c.nextSlot}
                        </span>
                      </div>

                      {/* Action buttons */}
                      {isRec ? (
                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              setSelectedId(c.id);
                              if (onSelectCentre) onSelectCentre();
                            }}
                            className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.99]"
                            style={{
                              fontFamily: "Poppins,sans-serif",
                              background:
                                "linear-gradient(135deg,#145F2F 0%,#1A7A3C 100%)",
                              boxShadow: "0 2px 12px rgba(26,122,60,0.3)",
                            }}
                          >
                            {s.selectBtn}
                          </button>
                          <p className="text-[10px] text-[#6B7280] text-center">
                            {s.recNote}
                          </p>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedId(c.id)}
                          className={`w-full py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                            isSelected
                              ? "border-[#1A7A3C] bg-[#E8F5EE] text-[#1A7A3C]"
                              : "border-[#C8DFD0] text-[#1A2B4A] hover:border-[#1A7A3C] hover:text-[#1A7A3C]"
                          }`}
                          style={{ fontFamily: "Poppins,sans-serif" }}
                        >
                          {isSelected ? "✓ Selected" : s.viewSlots}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Comparison table */}
            <div className="bg-white rounded-2xl border border-[#C8DFD0] overflow-hidden shadow-sm">
              <p
                className="px-4 pt-4 pb-2 text-xs font-bold text-[#1A2B4A]"
                style={{ fontFamily: "Poppins,sans-serif" }}
              >
                {s.compTitle}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F5F9F6]">
                      {s.compHeaders.map((h) => (
                        <th
                          key={h}
                          className="px-3 py-2 text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-wider whitespace-nowrap"
                          style={{ fontFamily: "Poppins,sans-serif" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8F5EE]">
                    {CENTRES_EN.map((c) => {
                      const isRec = c.id === 0;
                      return (
                        <tr
                          key={c.id}
                          className={isRec ? "bg-[#F2FAF5]" : ""}
                        >
                          <td className="px-3 py-2.5 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <span
                                className="font-semibold text-[#1A2B4A]"
                                style={{ fontFamily: "Poppins,sans-serif" }}
                              >
                                {lang === "en" ? c.name : c.nameHi}
                              </span>
                              {isRec && (
                                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-[#1A7A3C] text-white font-bold">
                                  ✦
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-3 py-2.5 text-[#6B7280] whitespace-nowrap">
                            {c.distKm} km
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap">
                            <span
                              className={`font-semibold ${
                                c.queueCount <= 20
                                  ? "text-[#1A7A3C]"
                                  : c.queueCount <= 50
                                  ? "text-[#E8960A]"
                                  : "text-[#C8332A]"
                              }`}
                              style={{ fontFamily: "Poppins,sans-serif" }}
                            >
                              {c.queueCount}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap">
                            <span
                              className={`font-semibold ${
                                c.waitMin <= 60
                                  ? "text-[#1A7A3C]"
                                  : c.waitMin <= 120
                                  ? "text-[#E8960A]"
                                  : "text-[#C8332A]"
                              }`}
                              style={{ fontFamily: "Poppins,sans-serif" }}
                            >
                              ~{c.waitMin}m
                            </span>
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap">
                            <span
                              className={`font-bold ${isRec ? "text-[#1A7A3C]" : "text-[#1A2B4A]"}`}
                              style={{ fontFamily: "Poppins,sans-serif" }}
                            >
                              {lang === "en" ? c.totalLabel : c.totalLabelHi}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Estimate disclaimer */}
            <p className="text-[10px] text-[#6B7280] text-center italic px-4">
              {s.estimate}
            </p>

            {/* Continue CTA — only when a centre is selected */}
            {selectedId !== null && (
              <div className="bg-white rounded-2xl border border-[#1A7A3C] p-4 shadow-sm">
                <p className="text-[10px] text-[#6B7280] mb-1">{s.selectedLabel}</p>
                <p
                  className="text-sm font-bold text-[#1A7A3C] mb-3"
                  style={{ fontFamily: "Poppins,sans-serif" }}
                >
                  {lang === "en"
                    ? CENTRES_EN.find((c) => c.id === selectedId)?.name
                    : CENTRES_EN.find((c) => c.id === selectedId)?.nameHi}
                </p>
                <button
                  onClick={() => onSelectCentre?.()}
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.99]"
                  style={{
                    fontFamily: "Poppins,sans-serif",
                    background: "linear-gradient(135deg,#145F2F 0%,#1A7A3C 100%)",
                    boxShadow: "0 2px 12px rgba(26,122,60,0.3)",
                  }}
                >
                  {s.continueBtn}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
