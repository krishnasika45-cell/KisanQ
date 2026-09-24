import { useState } from "react";

type Lang = "en" | "hi";
type QuickF = "all" | "today" | "pending" | "processed" | "review";
type PayStatus = "Pending" | "Processed" | "Under Review" | "Failed";

const S = {
  en: {
    title: "Payment Management",
    subtitle: "Monitor procurement payment status and records.",
    lang: "हिन्दी",
    demoNote: "All data is demo/fictional — not connected to any real government or banking system. Payment amounts are demo estimates only. KisanQ does not process government payments.",
    date: "24 September 2026",
    // KPIs
    totalValue: "Total Procurement Value",
    processed: "Payment Processed",
    pending: "Payment Pending",
    completedTx: "Completed Transactions",
    pendingTx: "Pending Transactions",
    demo: "Demo Data",
    // Filters
    searchPlaceholder: "Search by Application ID, farmer name or token…",
    filters: "Filters",
    allCentres: "All Centres",
    allStatus: "All Status",
    allDates: "All Dates",
    allCrops: "All Crops",
    applyFilters: "Apply Filters",
    reset: "Reset",
    // Table
    tableTitle: "Payment Records",
    tableSub: "Demo data · Not connected to any government payment system",
    payID: "Payment ID",
    appID: "Application ID",
    farmer: "Farmer",
    crop: "Crop",
    quantity: "Quantity",
    amount: "Procurement Amount",
    statusCol: "Payment Status",
    dateCol: "Date",
    action: "Action",
    view: "View",
    // Quick filters
    all: "All",
    today: "Today",
    underReview: "Under Review",
    // Pagination
    showing: "Showing",
    of: "of",
    records: "payment records",
    prev: "Previous",
    next: "Next",
    // Empty
    noRecords: "No payment records found.",
    noRecordsSub: "Try changing your filters.",
    resetFilters: "Reset Filters",
    // Drawer
    payDetails: "Payment Details",
    close: "Close",
    payIDLabel: "Payment ID",
    appIDLabel: "Application ID",
    farmerLabel: "Farmer",
    cropLabel: "Crop",
    qtyLabel: "Quantity",
    centreLabel: "Procurement Centre",
    amountLabel: "Procurement Amount",
    statusLabel: "Status",
    demoDataLabel: "Demo Data",
    // Timeline
    timeline: "Payment Timeline",
    tStage1: "Procurement Completed",
    tStage2: "Payment Record Created",
    tStage3: "Payment Processing",
    tStage4: "Payment Completed",
    done: "Done",
    inProgress: "In Progress",
    pendingLabel: "Pending",
    // Status card
    payPendingTitle: "Payment Pending",
    payPendingMsg: "Payment status has not yet been marked as completed in this prototype.",
    viewProcurement: "View Procurement Record",
    payProcessedTitle: "Payment Processed",
    payProcessedMsg: "Payment has been marked as processed in this prototype.",
    payReviewTitle: "Under Review",
    payReviewMsg: "Payment record is currently under review.",
    payFailedTitle: "Payment Failed",
    payFailedMsg: "Payment has been marked as failed in this prototype.",
    // Notification
    payUpdate: "Payment Update",
    viewApplication: "View Application",
    // Admin actions
    adminActions: "Admin Actions",
    updateStatus: "Update Payment Status",
    viewProcRecord: "View Procurement",
    viewApp: "View Application",
    viewFarmer: "View Farmer",
    // Modal
    updateModalTitle: "Update Payment Status",
    selectStatus: "Select new status",
    noteLabel: "Add internal note (optional)",
    notePlaceholder: "Internal note…",
    cancelBtn: "Cancel",
    saveBtn: "Save Demo Status",
    modalWarning: "This action only updates the prototype record. No real payment is processed.",
    updateSuccess: "Status Updated (Demo)",
    // Analytics
    statusOverview: "Payment Status Overview",
    dailyValue: "Daily Payment Value",
    dailySub: "Demo estimates · Last 7 days",
    lakh: "Lakh",
  },
  hi: {
    title: "भुगतान प्रबंधन",
    subtitle: "खरीद भुगतान की स्थिति और रिकॉर्ड की निगरानी करें।",
    lang: "English",
    demoNote: "सभी डेटा डेमो/काल्पनिक है — किसी सरकारी या बैंकिंग प्रणाली से जुड़ा नहीं है। भुगतान राशियाँ केवल डेमो अनुमान हैं। KisanQ सरकारी भुगतान संसाधित नहीं करता।",
    date: "24 सितंबर 2026",
    totalValue: "कुल खरीद मूल्य",
    processed: "भुगतान संसाधित",
    pending: "भुगतान लंबित",
    completedTx: "पूर्ण लेनदेन",
    pendingTx: "लंबित लेनदेन",
    demo: "डेमो डेटा",
    searchPlaceholder: "आवेदन ID, किसान नाम या टोकन से खोजें…",
    filters: "फ़िल्टर",
    allCentres: "सभी केंद्र",
    allStatus: "सभी स्थिति",
    allDates: "सभी तिथियाँ",
    allCrops: "सभी फसलें",
    applyFilters: "फ़िल्टर लागू करें",
    reset: "रीसेट",
    tableTitle: "भुगतान रिकॉर्ड",
    tableSub: "डेमो डेटा · किसी सरकारी भुगतान प्रणाली से जुड़ा नहीं",
    payID: "भुगतान ID",
    appID: "आवेदन ID",
    farmer: "किसान",
    crop: "फसल",
    quantity: "मात्रा",
    amount: "खरीद राशि",
    statusCol: "भुगतान स्थिति",
    dateCol: "तिथि",
    action: "क्रिया",
    view: "देखें",
    all: "सभी",
    today: "आज",
    underReview: "समीक्षाधीन",
    showing: "दिखाया जा रहा है",
    of: "में से",
    records: "भुगतान रिकॉर्ड",
    prev: "पिछला",
    next: "अगला",
    noRecords: "कोई भुगतान रिकॉर्ड नहीं मिला।",
    noRecordsSub: "अपने फ़िल्टर बदलकर देखें।",
    resetFilters: "फ़िल्टर रीसेट करें",
    payDetails: "भुगतान विवरण",
    close: "बंद करें",
    payIDLabel: "भुगतान ID",
    appIDLabel: "आवेदन ID",
    farmerLabel: "किसान",
    cropLabel: "फसल",
    qtyLabel: "मात्रा",
    centreLabel: "खरीद केंद्र",
    amountLabel: "खरीद राशि",
    statusLabel: "स्थिति",
    demoDataLabel: "डेमो डेटा",
    timeline: "भुगतान टाइमलाइन",
    tStage1: "खरीद पूर्ण",
    tStage2: "भुगतान रिकॉर्ड बनाया",
    tStage3: "भुगतान प्रक्रिया",
    tStage4: "भुगतान पूर्ण",
    done: "पूर्ण",
    inProgress: "प्रक्रिया में",
    pendingLabel: "लंबित",
    payPendingTitle: "भुगतान लंबित",
    payPendingMsg: "इस प्रोटोटाइप में भुगतान की स्थिति अभी तक पूर्ण नहीं चिह्नित की गई है।",
    viewProcurement: "खरीद रिकॉर्ड देखें",
    payProcessedTitle: "भुगतान संसाधित",
    payProcessedMsg: "इस प्रोटोटाइप में भुगतान को संसाधित चिह्नित किया गया है।",
    payReviewTitle: "समीक्षाधीन",
    payReviewMsg: "भुगतान रिकॉर्ड वर्तमान में समीक्षाधीन है।",
    payFailedTitle: "भुगतान असफल",
    payFailedMsg: "इस प्रोटोटाइप में भुगतान असफल चिह्नित किया गया है।",
    payUpdate: "भुगतान अपडेट",
    viewApplication: "आवेदन देखें",
    adminActions: "व्यवस्थापक क्रियाएं",
    updateStatus: "भुगतान स्थिति अपडेट करें",
    viewProcRecord: "खरीद देखें",
    viewApp: "आवेदन देखें",
    viewFarmer: "किसान देखें",
    updateModalTitle: "भुगतान स्थिति अपडेट करें",
    selectStatus: "नई स्थिति चुनें",
    noteLabel: "आंतरिक नोट जोड़ें (वैकल्पिक)",
    notePlaceholder: "आंतरिक नोट…",
    cancelBtn: "रद्द करें",
    saveBtn: "डेमो स्थिति सहेजें",
    modalWarning: "यह क्रिया केवल प्रोटोटाइप रिकॉर्ड अपडेट करती है। कोई वास्तविक भुगतान संसाधित नहीं होता।",
    updateSuccess: "स्थिति अपडेट (डेमो)",
    statusOverview: "भुगतान स्थिति अवलोकन",
    dailyValue: "दैनिक भुगतान मूल्य",
    dailySub: "डेमो अनुमान · पिछले 7 दिन",
    lakh: "लाख",
  },
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const PAYMENTS = [
  { payID: "PAY-001", appID: "KQ-2026-00241", farmer: "Ramesh Kumar",  crop: "Wheat",   qty: "50 Qtl", amount: "₹10,250", status: "Pending"    as PayStatus, date: "24 Sep 2026", centre: "Gwalior PC Centre B" },
  { payID: "PAY-002", appID: "KQ-2026-00242", farmer: "Suresh Patel",  crop: "Wheat",   qty: "35 Qtl", amount: "₹7,175",  status: "Processed"  as PayStatus, date: "24 Sep 2026", centre: "Gwalior PC Centre C" },
  { payID: "PAY-003", appID: "KQ-2026-00243", farmer: "Amit Sharma",   crop: "Rice",    qty: "40 Qtl", amount: "₹8,200",  status: "Under Review" as PayStatus, date: "24 Sep 2026", centre: "Gwalior PC Centre A" },
  { payID: "PAY-004", appID: "KQ-2026-00244", farmer: "Mohan Singh",   crop: "Wheat",   qty: "30 Qtl", amount: "₹6,150",  status: "Processed"  as PayStatus, date: "24 Sep 2026", centre: "Gwalior PC Centre B" },
  { payID: "PAY-005", appID: "KQ-2026-00245", farmer: "Priya Devi",    crop: "Soybean", qty: "28 Qtl", amount: "₹5,740",  status: "Pending"    as PayStatus, date: "24 Sep 2026", centre: "Gwalior PC Centre C" },
  { payID: "PAY-006", appID: "KQ-2026-00246", farmer: "Dinesh Yadav",  crop: "Maize",   qty: "45 Qtl", amount: "₹6,750",  status: "Processed"  as PayStatus, date: "24 Sep 2026", centre: "Gwalior PC Centre A" },
  { payID: "PAY-007", appID: "KQ-2026-00247", farmer: "Kavita Bai",    crop: "Wheat",   qty: "60 Qtl", amount: "₹12,300", status: "Pending"    as PayStatus, date: "24 Sep 2026", centre: "Gwalior PC Centre B" },
  { payID: "PAY-008", appID: "KQ-2026-00248", farmer: "Ravi Gupta",    crop: "Rice",    qty: "38 Qtl", amount: "₹7,790",  status: "Failed"     as PayStatus, date: "23 Sep 2026", centre: "Gwalior PC Centre C" },
  { payID: "PAY-009", appID: "KQ-2026-00249", farmer: "Santosh Verma", crop: "Wheat",   qty: "25 Qtl", amount: "₹5,125",  status: "Processed"  as PayStatus, date: "23 Sep 2026", centre: "Gwalior PC Centre D" },
  { payID: "PAY-010", appID: "KQ-2026-00250", farmer: "Geeta Kumari",  crop: "Rice",    qty: "33 Qtl", amount: "₹6,765",  status: "Under Review" as PayStatus, date: "23 Sep 2026", centre: "Gwalior PC Centre E" },
];

const STATUS_STYLE: Record<PayStatus, { color: string; bg: string; border: string }> = {
  "Pending":      { color: "#E8960A", bg: "#FEF3C7", border: "#FDE68A" },
  "Processed":    { color: "#1A7A3C", bg: "#E8F5EE", border: "#C8DFD0" },
  "Under Review": { color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE" },
  "Failed":       { color: "#C8332A", bg: "#FEF2F2", border: "#FECACA" },
};

const DAILY_VALUES = [
  { day: "18 Sep", val: 82 }, { day: "19 Sep", val: 95 }, { day: "20 Sep", val: 68 },
  { day: "21 Sep", val: 110 }, { day: "22 Sep", val: 78 }, { day: "23 Sep", val: 130 },
  { day: "24 Sep", val: 102 },
];

const STATUS_OVERVIEW = [
  { label: "Processed",    count: 71, color: "#1A7A3C", bg: "#E8F5EE" },
  { label: "Pending",      count: 27, color: "#E8960A", bg: "#FEF3C7" },
  { label: "Under Review", count: 6,  color: "#7C3AED", bg: "#F5F3FF" },
  { label: "Failed",       count: 2,  color: "#C8332A", bg: "#FEF2F2" },
];

// ─── Update Modal ──────────────────────────────────────────────────────────────
function UpdateModal({ pay, s, onClose }: { pay: typeof PAYMENTS[0]; s: typeof S["en"]; onClose: () => void }) {
  const [success, setSuccess] = useState(false);
  const [note, setNote] = useState("");
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSuccess(true); setTimeout(onClose, 1200); };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-[#C8DFD0]" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8F5EE]">
          <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.updateModalTitle}</p>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
        {success ? (
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#E8F5EE] flex items-center justify-center text-2xl mb-3">✅</div>
            <p className="text-sm font-bold text-[#1A7A3C]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.updateSuccess}</p>
            <p className="text-xs text-[#9CA3AF] mt-1">{s.modalWarning}</p>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 space-y-4">
            <div className="bg-[#F5F9F6] rounded-xl p-3 text-xs text-[#6B7280] font-mono">{pay.payID} · {pay.farmer}</div>
            <div>
              <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">{s.selectStatus}</label>
              <select className="w-full px-3 py-2.5 text-sm border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]">
                {(["Pending","Processed","Under Review","Failed"] as PayStatus[]).map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">{s.noteLabel}</label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={s.notePlaceholder}
                className="w-full px-3 py-2.5 text-sm border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A] resize-none"
              />
            </div>
            <p className="text-[9px] text-[#9CA3AF] leading-relaxed">{s.modalWarning}</p>
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

// ─── Payment Detail Drawer ─────────────────────────────────────────────────────
function PayDrawer({ pay, s, onClose }: { pay: typeof PAYMENTS[0]; s: typeof S["en"]; onClose: () => void }) {
  const [showModal, setShowModal] = useState(false);
  const st = STATUS_STYLE[pay.status];

  const timelineDone = pay.status === "Processed" ? 4 : pay.status === "Under Review" ? 2 : 2;
  const timelineStages = [s.tStage1, s.tStage2, s.tStage3, s.tStage4];
  const timelineTimes = ["11:20 AM", "11:25 AM", s.pendingLabel, s.pendingLabel];

  const statusCard = {
    "Pending":      { title: s.payPendingTitle, msg: s.payPendingMsg, color: "#E8960A", bg: "#FEF3C7", icon: "⏳" },
    "Processed":    { title: s.payProcessedTitle, msg: s.payProcessedMsg, color: "#1A7A3C", bg: "#E8F5EE", icon: "✅" },
    "Under Review": { title: s.payReviewTitle, msg: s.payReviewMsg, color: "#7C3AED", bg: "#F5F3FF", icon: "🔍" },
    "Failed":       { title: s.payFailedTitle, msg: s.payFailedMsg, color: "#C8332A", bg: "#FEF2F2", icon: "❌" },
  }[pay.status];

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>

        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#C8DFD0] px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.payDetails}</p>
            <p className="text-[10px] font-mono text-[#9CA3AF]">{pay.payID} · {s.demo}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F9F6] text-[#6B7280]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>

        <div className="flex-1 p-5 space-y-5">

          {/* Hero card */}
          <div className="bg-gradient-to-br from-[#1A2B4A] to-[#0F1E35] rounded-2xl p-5 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">{s.statusLabel}</p>
                <p className="text-xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>{pay.status}</p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0" style={{ color: st.color, background: st.bg, fontFamily: "Poppins, sans-serif" }}>
                {pay.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: s.payIDLabel, v: pay.payID },
                { l: s.appIDLabel, v: pay.appID },
                { l: s.farmerLabel, v: pay.farmer },
                { l: s.cropLabel,   v: pay.crop },
                { l: s.qtyLabel,    v: pay.qty },
                { l: s.centreLabel, v: pay.centre },
              ].map((item) => (
                <div key={item.l}>
                  <p className="text-[9px] text-white/40 mb-0.5">{item.l}</p>
                  <p className="text-xs font-semibold text-white/90">{item.v}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-[9px] text-white/40 mb-0.5">{s.amountLabel}</p>
              <p className="text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>{pay.amount}</p>
              <p className="text-[9px] text-white/30 mt-0.5">{s.demoDataLabel}</p>
            </div>
          </div>

          {/* Status card */}
          <div className="rounded-2xl p-4 border-2" style={{ borderColor: st.border, background: st.bg }}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{statusCard.icon}</span>
              <div>
                <p className="text-sm font-bold" style={{ color: statusCard.color, fontFamily: "Poppins, sans-serif" }}>{statusCard.title}</p>
                <p className="text-xs mt-0.5" style={{ color: statusCard.color + "CC" }}>{statusCard.msg}</p>
              </div>
            </div>
            <button className="mt-3 w-full py-2 text-xs font-bold rounded-xl border" style={{ color: statusCard.color, borderColor: st.border, background: "white", fontFamily: "Poppins, sans-serif" }}>
              {s.viewProcurement}
            </button>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-4">
            <p className="text-xs font-bold text-[#1A2B4A] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>{s.timeline}</p>
            {timelineStages.map((stage, i) => {
              const isDone = i < timelineDone;
              const isCurrent = i === timelineDone;
              return (
                <div key={stage} className="flex gap-3 mb-3 last:mb-0">
                  <div className="flex flex-col items-center w-5 flex-shrink-0">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isDone ? "border-[#1A7A3C] bg-[#1A7A3C]" : isCurrent ? "border-[#E8960A] bg-[#FEF3C7]" : "border-[#C8DFD0] bg-white"}`}>
                      {isDone && <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2.5 2.5L7.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      {isCurrent && <div className="w-2 h-2 rounded-full bg-[#E8960A]" />}
                    </div>
                    {i < timelineStages.length - 1 && <div className={`w-0.5 flex-1 mt-0.5 min-h-4 ${isDone ? "bg-[#1A7A3C]" : "bg-[#E8F5EE]"}`} />}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-semibold ${isDone ? "text-[#1A2B4A]" : isCurrent ? "text-[#E8960A]" : "text-[#9CA3AF]"}`} style={{ fontFamily: "Poppins, sans-serif" }}>{stage}</p>
                      <span className={`text-[9px] flex-shrink-0 ml-2 ${isDone ? "text-[#9CA3AF]" : isCurrent ? "text-[#E8960A] font-semibold" : "text-[#C8DFD0]"}`}>{timelineTimes[i]}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Notification */}
          <div className="bg-[#E8F5EE] border border-[#C8DFD0] rounded-xl p-4">
            <p className="text-xs font-bold text-[#1A7A3C] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>🔔 {s.payUpdate}</p>
            <p className="text-xs text-[#1A7A3C]/80 mb-3">Payment status for {pay.appID} is currently <strong>{pay.status.toLowerCase()}</strong>.</p>
            <button className="text-[10px] font-bold text-[#1A7A3C] border border-[#C8DFD0] bg-white rounded-lg px-3 py-1.5 hover:bg-[#E8F5EE] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>{s.viewApplication}</button>
          </div>

          {/* Admin actions */}
          <div className="bg-[#F5F9F6] rounded-2xl border border-[#C8DFD0] p-4">
            <p className="text-xs font-bold text-[#1A2B4A] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{s.adminActions}</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: s.updateStatus,   fn: () => setShowModal(true), color: "#1A7A3C", bg: "#E8F5EE", border: "#C8DFD0" },
                { label: s.viewProcRecord, fn: () => {},                  color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE" },
                { label: s.viewApp,        fn: () => {},                  color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE" },
                { label: s.viewFarmer,     fn: () => {},                  color: "#E8960A", bg: "#FEF3C7", border: "#FDE68A" },
              ].map((btn) => (
                <button
                  key={btn.label}
                  onClick={btn.fn}
                  className="py-2.5 text-[10px] font-bold rounded-xl border transition-all hover:opacity-80 text-center"
                  style={{ color: btn.color, background: btn.bg, borderColor: btn.border, fontFamily: "Poppins, sans-serif" }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && <UpdateModal pay={pay} s={s} onClose={() => setShowModal(false)} />}
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function PaymentManagement({ lang: initLang = "en" }: { lang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initLang);
  const [quickFilter, setQuickFilter] = useState<QuickF>("all");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<typeof PAYMENTS[0] | null>(null);
  const s = S[lang];

  const statusForQuick: Record<QuickF, PayStatus | ""> = {
    all: "", today: "", pending: "Pending", processed: "Processed", review: "Under Review",
  };

  const filtered = PAYMENTS.filter((p) => {
    const sq = statusForQuick[quickFilter];
    const matchQ = !sq || p.status === sq;
    const q = search.toLowerCase();
    const matchS = !q || p.payID.toLowerCase().includes(q) || p.appID.toLowerCase().includes(q) || p.farmer.toLowerCase().includes(q);
    return matchQ && matchS;
  });

  const maxDailyVal = Math.max(...DAILY_VALUES.map((d) => d.val));
  const totalOverview = STATUS_OVERVIEW.reduce((a, b) => a + b.count, 0);

  const QUICK_LABELS: { id: QuickF; label: string }[] = [
    { id: "all", label: s.all },
    { id: "today", label: s.today },
    { id: "pending", label: s.pending },
    { id: "processed", label: s.processed },
    { id: "review", label: s.underReview },
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
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#9CA3AF] hidden sm:block">{s.date}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {[
          { label: s.totalValue,   value: "₹10.2 " + s.lakh, icon: "💰", color: "#1A2B4A", bg: "#E8F0FF", qf: null },
          { label: s.processed,    value: "₹7.4 " + s.lakh,  icon: "✅", color: "#1A7A3C", bg: "#E8F5EE", qf: "processed" as QuickF },
          { label: s.pending,      value: "₹2.8 " + s.lakh,  icon: "⏳", color: "#E8960A", bg: "#FEF3C7", qf: "pending" as QuickF },
          { label: s.completedTx,  value: "71",               icon: "📋", color: "#1A7A3C", bg: "#E8F5EE", qf: "processed" as QuickF },
          { label: s.pendingTx,    value: "27",               icon: "🕐", color: "#C8332A", bg: "#FEF2F2", qf: "pending" as QuickF },
        ].map((k) => (
          <div
            key={k.label}
            className={`bg-white rounded-xl border border-[#C8DFD0] p-4 shadow-sm ${k.qf ? "cursor-pointer hover:shadow-md transition-shadow" : ""}`}
            onClick={() => k.qf && setQuickFilter(k.qf)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: k.bg }}>{k.icon}</div>
              <span className="text-[9px] text-[#9CA3AF]">{s.demo}</span>
            </div>
            <p className="text-xl font-bold mb-0.5 leading-tight" style={{ color: k.color, fontFamily: "Poppins, sans-serif" }}>{k.value}</p>
            <p className="text-[10px] text-[#6B7280]">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Main 2-col layout */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* Left: table + filters */}
        <div className="lg:col-span-2 space-y-3">

          {/* Search + filter toggle */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" /><path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder={s.searchPlaceholder}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-[#C8DFD0] rounded-xl bg-white focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A] placeholder-[#9CA3AF]"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold rounded-xl border transition-colors ${showFilters ? "bg-[#1A2B4A] text-white border-[#1A2B4A]" : "bg-white text-[#1A2B4A] border-[#C8DFD0] hover:bg-[#F5F9F6]"}`}
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
              {s.filters}
            </button>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="bg-white rounded-xl border border-[#C8DFD0] p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                {[
                  { label: s.centreLabel, opts: [s.allCentres, "Centre A", "Centre B", "Centre C", "Centre D", "Centre E"] },
                  { label: s.statusCol,   opts: [s.allStatus, "Pending", "Processed", "Under Review", "Failed"] },
                  { label: s.dateCol,     opts: [s.allDates, "Today", "Yesterday", "This Week"] },
                  { label: s.cropLabel,   opts: [s.allCrops, "Wheat", "Rice", "Maize", "Soybean"] },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-1.5">{f.label}</label>
                    <select className="w-full px-2.5 py-2 text-xs border border-[#C8DFD0] rounded-xl bg-[#F5F9F6] focus:outline-none focus:border-[#1A7A3C] text-[#1A2B4A]">
                      {f.opts.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-xs font-bold text-white bg-[#1A7A3C] rounded-xl hover:bg-[#145F2F]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.applyFilters}</button>
                <button onClick={() => { setSearch(""); setQuickFilter("all"); }} className="px-4 py-2 text-xs font-bold text-[#6B7280] border border-[#C8DFD0] rounded-xl hover:bg-[#F5F9F6]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.reset}</button>
              </div>
            </div>
          )}

          {/* Quick filters */}
          <div className="flex gap-2 flex-wrap">
            {QUICK_LABELS.map((qf) => (
              <button
                key={qf.id}
                onClick={() => { setQuickFilter(qf.id); setPage(1); }}
                className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${quickFilter === qf.id ? "bg-[#1A2B4A] text-white border-[#1A2B4A]" : "text-[#6B7280] border-[#C8DFD0] bg-white hover:border-[#1A7A3C] hover:text-[#1A7A3C]"}`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >{qf.label}</button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-[#E8F5EE] flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.tableTitle}</p>
                <p className="text-[10px] text-[#9CA3AF]">{s.tableSub}</p>
              </div>
              <span className="text-[10px] font-bold text-[#1A7A3C] bg-[#E8F5EE] px-2.5 py-1 rounded-full">{filtered.length} {s.records}</span>
            </div>

            {filtered.length > 0 ? (
              <>
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-[#F5F9F6]">
                        {[s.payID, s.appID, s.farmer, s.crop, s.quantity, s.amount, s.statusCol, s.dateCol, s.action].map((h) => (
                          <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8F5EE]">
                      {filtered.map((pay) => {
                        const st = STATUS_STYLE[pay.status];
                        return (
                          <tr key={pay.payID} className="hover:bg-[#F5F9F6] cursor-pointer transition-colors" onClick={() => setSelected(pay)}>
                            <td className="px-4 py-3 font-mono text-[10px] text-[#6B7280] whitespace-nowrap">{pay.payID}</td>
                            <td className="px-4 py-3 font-mono text-[10px] text-[#6B7280] whitespace-nowrap">{pay.appID}</td>
                            <td className="px-4 py-3 font-semibold text-[#1A2B4A] whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>{pay.farmer}</td>
                            <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{pay.crop}</td>
                            <td className="px-4 py-3 text-[#6B7280] whitespace-nowrap">{pay.qty}</td>
                            <td className="px-4 py-3 font-bold text-[#1A2B4A] whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>{pay.amount}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ color: st.color, background: st.bg, fontFamily: "Poppins, sans-serif" }}>{pay.status}</span>
                            </td>
                            <td className="px-4 py-3 text-[#9CA3AF] whitespace-nowrap text-[10px]">{pay.date}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <button onClick={(e) => { e.stopPropagation(); setSelected(pay); }} className="px-3 py-1.5 text-[10px] font-bold text-[#1A7A3C] border border-[#C8DFD0] rounded-lg hover:bg-[#E8F5EE] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>{s.view}</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden divide-y divide-[#E8F5EE]">
                  {filtered.map((pay) => {
                    const st = STATUS_STYLE[pay.status];
                    return (
                      <div key={pay.payID} className="p-4 hover:bg-[#F5F9F6] cursor-pointer" onClick={() => setSelected(pay)}>
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <p className="font-mono text-[9px] text-[#9CA3AF]">{pay.payID} · {pay.appID}</p>
                            <p className="text-sm font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{pay.farmer}</p>
                            <p className="text-[10px] text-[#9CA3AF]">{pay.crop} · {pay.qty} · {pay.amount}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1.5">
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ color: st.color, background: st.bg }}>{pay.status}</span>
                            <button onClick={(e) => { e.stopPropagation(); setSelected(pay); }} className="text-[10px] font-bold text-[#1A7A3C] border border-[#C8DFD0] rounded-lg px-2.5 py-1 hover:bg-[#E8F5EE]">{s.view}</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-14 text-center px-4">
                <div className="text-4xl mb-3">💳</div>
                <p className="text-sm font-bold text-[#1A2B4A] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{s.noRecords}</p>
                <p className="text-xs text-[#9CA3AF] mb-4">{s.noRecordsSub}</p>
                <button onClick={() => { setQuickFilter("all"); setSearch(""); }} className="px-4 py-2 text-xs font-semibold text-[#1A7A3C] border border-[#C8DFD0] rounded-xl hover:bg-[#E8F5EE]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.resetFilters}</button>
              </div>
            )}

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="px-5 py-3 border-t border-[#E8F5EE] flex items-center justify-between gap-3 flex-wrap">
                <span className="text-xs text-[#9CA3AF]">{s.showing} 1–{filtered.length} {s.of} 104 {s.records}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1.5 text-[10px] font-semibold border border-[#C8DFD0] rounded-lg disabled:opacity-40 hover:bg-[#F5F9F6] text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.prev}</button>
                  {[1, 2, 3, 4].map((p) => (
                    <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 text-xs font-bold rounded-lg ${page === p ? "bg-[#1A2B4A] text-white" : "text-[#6B7280] hover:bg-[#F5F9F6] border border-[#C8DFD0]"}`} style={{ fontFamily: "Poppins, sans-serif" }}>{p}</button>
                  ))}
                  <button onClick={() => setPage(Math.min(11, page + 1))} disabled={page === 11} className="px-3 py-1.5 text-[10px] font-semibold border border-[#C8DFD0] rounded-lg disabled:opacity-40 hover:bg-[#F5F9F6] text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.next}</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Analytics */}
        <div className="space-y-4">

          {/* Status overview donut-style */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
            <p className="text-sm font-bold text-[#1A2B4A] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>{s.statusOverview}</p>
            {/* SVG donut */}
            <div className="flex items-center gap-4 mb-4">
              <svg viewBox="0 0 100 100" className="w-24 h-24 flex-shrink-0 -rotate-90">
                {(() => {
                  let offset = 0;
                  return STATUS_OVERVIEW.map((item) => {
                    const pct = item.count / totalOverview;
                    const circ = 2 * Math.PI * 38;
                    const dash = pct * circ;
                    const el = (
                      <circle
                        key={item.label}
                        cx="50" cy="50" r="38"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="16"
                        strokeDasharray={`${dash} ${circ - dash}`}
                        strokeDashoffset={-offset * circ}
                      />
                    );
                    offset += pct;
                    return el;
                  });
                })()}
                <circle cx="50" cy="50" r="30" fill="white" />
              </svg>
              <div className="flex-1 space-y-1.5">
                {STATUS_OVERVIEW.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                      <span className="text-[10px] text-[#6B7280]">{item.label}</span>
                    </div>
                    <span className="text-xs font-bold" style={{ color: item.color, fontFamily: "Poppins, sans-serif" }}>{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Daily payment value bar chart */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
            <p className="text-sm font-bold text-[#1A2B4A] mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>{s.dailyValue}</p>
            <p className="text-[10px] text-[#9CA3AF] mb-4">{s.dailySub}</p>
            <div className="flex items-end gap-1.5" style={{ height: 96 }}>
              {DAILY_VALUES.map((d) => {
                const pct = (d.val / maxDailyVal) * 100;
                const isToday = d.day === "24 Sep";
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[8px] text-[#9CA3AF] font-bold" style={{ color: isToday ? "#1A7A3C" : undefined }}>{d.val}</span>
                    <div className="w-full flex flex-col justify-end" style={{ height: 64 }}>
                      <div
                        className="w-full rounded-t-md transition-all"
                        style={{ height: `${pct}%`, background: isToday ? "#1A7A3C" : "#C8DFD0", minHeight: 4 }}
                      />
                    </div>
                    <span className="text-[7px] text-[#9CA3AF] text-center" style={{ color: isToday ? "#1A7A3C" : undefined }}>
                      {d.day.split(" ")[0]}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-[9px] text-[#9CA3AF] text-center pt-2 border-t border-[#E8F5EE] mt-2">₹ in thousands · {s.demo}</p>
          </div>

          {/* Status breakdown bars */}
          <div className="bg-white rounded-2xl border border-[#C8DFD0] p-5 shadow-sm">
            <p className="text-sm font-bold text-[#1A2B4A] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Payment Summary</p>
            {[
              { label: s.processed,   val: "₹7.4L", pct: 73, color: "#1A7A3C" },
              { label: s.pending,     val: "₹2.8L", pct: 27, color: "#E8960A" },
              { label: s.completedTx, val: "71",    pct: 71, color: "#1A7A3C" },
              { label: s.pendingTx,   val: "27",    pct: 27, color: "#E8960A" },
            ].map((item) => (
              <div key={item.label} className="mb-3 last:mb-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-[#6B7280]">{item.label}</span>
                  <span className="text-xs font-bold" style={{ color: item.color, fontFamily: "Poppins, sans-serif" }}>{item.val}</span>
                </div>
                <div className="h-1.5 bg-[#E8F5EE] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
              </div>
            ))}
            <p className="text-[9px] text-[#9CA3AF] text-center mt-3 border-t border-[#E8F5EE] pt-2">{s.demo}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-2 border-t border-[#C8DFD0]">
        <p className="text-[10px] text-[#9CA3AF]">KisanQ Admin · SIH 2026 Prototype · Team Viksit Innovators · All payment data is demo only · KisanQ does not process real payments</p>
      </div>

      {selected && <PayDrawer pay={selected} s={s} onClose={() => setSelected(null)} />}
    </div>
  );
}
