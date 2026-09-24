import { useState, useRef, useEffect, KeyboardEvent } from "react";

type Lang = "en" | "hi";
type Step = "login" | "otp-login" | "register" | "otp-register" | "success" | "help";

const STRINGS = {
  en: {
    name: "KisanQ",
    tagline: "Smart Procurement. Better Predictability.",
    heroDesc:
      "Plan your procurement visit, reduce unnecessary waiting and track your journey from application to payment.",
    journey: ["Plan", "Queue", "Procure", "Track", "Get Paid"],
    langToggle: "हिन्दी",
    // Login
    welcomeBack: "Welcome Back",
    loginSub: "Login to continue your procurement journey.",
    mobileLabel: "Mobile Number",
    mobilePH: "Enter mobile number",
    sendOtp: "Send OTP",
    newTo: "New to KisanQ?",
    createAcc: "Create Account",
    needHelp: "Need help?",
    assistedHelp: "Get Assisted Help",
    // OTP
    verifyTitle: "Verify Your Mobile Number",
    verifySub: "Enter the 6-digit OTP sent to your mobile number.",
    otpSentTo: "OTP sent to",
    verifyBtn: "Verify & Continue",
    didntGet: "Didn't receive OTP?",
    resend: "Resend OTP",
    resendIn: "Resend in",
    // Register
    regTitle: "Create Your KisanQ Account",
    regSub: "Register once and make your procurement journey easier.",
    fullName: "Full Name",
    fullNamePH: "Enter your full name",
    villageLabel: "Location / Village",
    villagePH: "Enter village or location",
    districtLabel: "District",
    districtPH: "Select district",
    prefLang: "Preferred Language",
    continueBtn: "Continue",
    step01: "01", step02: "02", step03: "03",
    basicDetails: "Basic Details",
    mobileVerification: "Mobile Verification",
    accountCreated: "Account Created",
    regOtpSub: "Enter the OTP to complete your registration.",
    regVerifyBtn: "Verify & Create Account",
    // Success
    successTitle: "Registration Successful",
    successMsg1: "Welcome to KisanQ, Rahul.",
    successMsg2:
      "Your account is ready. You can now start your procurement journey.",
    goToDashboard: "Go to Farmer Dashboard",
    startNew: "Start New Application",
    // Help
    helpTitle: "Need help using KisanQ?",
    helpDesc:
      "Farmers who need help can access KisanQ through assisted support.",
    helpDesk: "Assisted Help Desk",
    callSupport: "Call Support",
    ivr: "IVR (Interactive Voice Response)",
    sms: "SMS Assistance",
    backToLogin: "Back to Login",
    // Errors
    invalidMobile: "Please enter a valid 10-digit mobile number.",
    incorrectOtp: "Incorrect OTP. Please try again. (Hint: use 123456)",
    requiredField: "This field is required.",
    // Loading
    sendingOtp: "Sending OTP...",
    verifyingOtp: "Verifying OTP...",
    creatingAcc: "Creating Account...",
    loggingIn: "Logging In...",
  },
  hi: {
    name: "किसानQ",
    tagline: "स्मार्ट खरीद। बेहतर पूर्वानुमान।",
    heroDesc:
      "अपनी खरीद यात्रा की योजना बनाएं, अनावश्यक प्रतीक्षा कम करें और आवेदन से भुगतान तक अपनी यात्रा ट्रैक करें।",
    journey: ["योजना", "कतार", "खरीद", "ट्रैक", "भुगतान"],
    langToggle: "English",
    welcomeBack: "वापस आपका स्वागत है",
    loginSub: "अपनी खरीद प्रक्रिया जारी रखने के लिए लॉगिन करें।",
    mobileLabel: "मोबाइल नंबर",
    mobilePH: "मोबाइल नंबर दर्ज करें",
    sendOtp: "OTP भेजें",
    newTo: "किसानQ में नए हैं?",
    createAcc: "खाता बनाएं",
    needHelp: "मदद चाहिए?",
    assistedHelp: "सहायता प्राप्त करें",
    verifyTitle: "अपना मोबाइल नंबर सत्यापित करें",
    verifySub: "आपके मोबाइल नंबर पर भेजे गए 6-अंकीय OTP दर्ज करें।",
    otpSentTo: "OTP भेजा गया",
    verifyBtn: "सत्यापित करें और जारी रखें",
    didntGet: "OTP नहीं मिला?",
    resend: "OTP दोबारा भेजें",
    resendIn: "पुनः भेजें",
    regTitle: "अपना किसानQ खाता बनाएं",
    regSub: "एक बार पंजीकरण करें और अपनी खरीद प्रक्रिया को आसान बनाएं।",
    fullName: "पूरा नाम",
    fullNamePH: "अपना पूरा नाम दर्ज करें",
    villageLabel: "स्थान / गांव",
    villagePH: "गांव या स्थान दर्ज करें",
    districtLabel: "जिला",
    districtPH: "जिला चुनें",
    prefLang: "पसंदीदा भाषा",
    continueBtn: "जारी रखें",
    step01: "०१", step02: "०२", step03: "०३",
    basicDetails: "मूल जानकारी",
    mobileVerification: "मोबाइल सत्यापन",
    accountCreated: "खाता बनाया",
    regOtpSub: "पंजीकरण पूरा करने के लिए OTP दर्ज करें।",
    regVerifyBtn: "सत्यापित करें और खाता बनाएं",
    successTitle: "पंजीकरण सफल",
    successMsg1: "किसानQ में आपका स्वागत है, राहुल।",
    successMsg2:
      "आपका खाता तैयार है। अब आप अपनी खरीद प्रक्रिया शुरू कर सकते हैं।",
    goToDashboard: "किसान डैशबोर्ड पर जाएं",
    startNew: "नया आवेदन शुरू करें",
    helpTitle: "किसानQ इस्तेमाल करने में मदद चाहिए?",
    helpDesc:
      "जिन किसानों को सहायता चाहिए, वे सहायता केंद्र, IVR या SMS के माध्यम से सेवा प्राप्त कर सकते हैं।",
    helpDesk: "सहायता केंद्र",
    callSupport: "कॉल सहायता",
    ivr: "IVR (इंटरएक्टिव वॉयस रिस्पॉन्स)",
    sms: "SMS सहायता",
    backToLogin: "लॉगिन पर वापस जाएं",
    invalidMobile: "कृपया सही 10-अंकीय मोबाइल नंबर दर्ज करें।",
    incorrectOtp: "OTP गलत है। कृपया दोबारा प्रयास करें। (संकेत: 123456)",
    requiredField: "यह जानकारी आवश्यक है।",
    sendingOtp: "OTP भेजा जा रहा है...",
    verifyingOtp: "OTP सत्यापित किया जा रहा है...",
    creatingAcc: "खाता बनाया जा रहा है...",
    loggingIn: "लॉगिन हो रहा है...",
  },
};

const DISTRICTS = [
  "Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda",
  "Firozpur", "Gurdaspur", "Hoshiarpur", "Moga", "Faridkot",
  "Sangrur", "Mansa", "Fatehgarh Sahib", "Rupnagar", "Nawanshahr",
];

const FARMER_IMG =
  "https://images.unsplash.com/photo-1528693404014-b13ebe6e723e?w=800&h=1000&fit=crop&auto=format";

function KisanQLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: 28, md: 36, lg: 48 };
  const px = sizes[size];
  const textSizes = { sm: "text-lg", md: "text-xl", lg: "text-2xl" };
  return (
    <div className="flex items-center gap-2">
      <svg
        width={px}
        height={px}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="10" fill="#1A7A3C" />
        <text
          x="10"
          y="34"
          fontFamily="Poppins, sans-serif"
          fontWeight="700"
          fontSize="26"
          fill="white"
        >
          K
        </text>
        <circle cx="36" cy="28" r="9" fill="#1A7A3C" stroke="white" strokeWidth="2.5" />
        <line x1="42" y1="34" x2="46" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M32 22 Q36 18 40 22" stroke="#E8960A" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M33 26 Q36 21 39 26" stroke="#E8960A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
      <span
        className={`font-bold text-[#1A7A3C] tracking-tight ${textSizes[size]}`}
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        KisanQ
      </span>
    </div>
  );
}

function LangToggle({
  lang,
  onToggle,
}: {
  lang: Lang;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#C8DFD0] bg-white text-sm font-medium text-[#1A7A3C] hover:bg-[#E8F5EE] transition-colors"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <span className="text-[#6B7280]">
        {lang === "en" ? "EN" : "HI"}
      </span>
      <span className="text-[#C8DFD0]">|</span>
      <span>{lang === "en" ? "हिन्दी" : "English"}</span>
    </button>
  );
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-[#1A7A3C] text-white rounded-xl shadow-lg text-sm font-medium animate-[slideIn_0.3s_ease]"
      style={{ fontFamily: "Inter, sans-serif" }}>
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="10" fill="rgba(255,255,255,0.2)" />
        <path d="M6 10l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {message}
    </div>
  );
}

function OTPInput({
  value,
  onChange,
  error,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  error?: string;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, char: string) => {
    const digit = char.replace(/\D/g, "").slice(-1);
    const next = [...value];
    next[i] = digit;
    onChange(next);
    if (digit && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = Array(6).fill("");
    pasted.split("").forEach((c, i) => { next[i] = c; });
    onChange(next);
    refs.current[Math.min(pasted.length, 5)]?.focus();
  };

  return (
    <div>
      <div className="flex gap-3 justify-center">
        {value.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKey(i, e)}
            onPaste={handlePaste}
            className={`w-11 h-13 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all
              ${error
                ? "border-[#C8332A] bg-[#FEF2F2] text-[#C8332A]"
                : digit
                ? "border-[#1A7A3C] bg-[#E8F5EE] text-[#1A7A3C]"
                : "border-[#C8DFD0] bg-white text-[#1A2B4A]"
              }
              focus:border-[#1A7A3C] focus:ring-2 focus:ring-[#1A7A3C]/20`}
            style={{ fontFamily: "Poppins, sans-serif" }}
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-center text-sm text-[#C8332A]">{error}</p>
      )}
    </div>
  );
}

function ProgressBar({
  step,
  s,
}: {
  step: "register" | "otp-register" | "success";
  s: typeof STRINGS.en;
}) {
  const steps = [
    { key: "register", label: s.basicDetails, num: s.step01 },
    { key: "otp-register", label: s.mobileVerification, num: s.step02 },
    { key: "success", label: s.accountCreated, num: s.step03 },
  ];
  const activeIdx = steps.findIndex((x) => x.key === step);
  return (
    <div className="flex items-center gap-0 mb-7">
      {steps.map((st, i) => {
        const done = i < activeIdx;
        const active = i === activeIdx;
        return (
          <div key={st.key} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors
                  ${done ? "bg-[#1A7A3C] text-white" : active ? "bg-[#1A7A3C] text-white ring-4 ring-[#1A7A3C]/20" : "bg-[#E8F5EE] text-[#6B7280]"}`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {done ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7l4 4 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  st.num
                )}
              </div>
              <span
                className={`mt-1 text-[10px] text-center leading-tight max-w-[60px] ${active || done ? "text-[#1A7A3C] font-semibold" : "text-[#6B7280]"}`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {st.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 flex-1 mx-1 rounded-full transition-colors ${done ? "bg-[#1A7A3C]" : "bg-[#C8DFD0]"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function HelpCard({ s, onClose }: { s: typeof STRINGS.en; onClose: () => void }) {
  const items = [
    { icon: "🏢", label: s.helpDesk, sub: "Visit your nearest KisanQ centre" },
    { icon: "📞", label: s.callSupport, sub: "1800-XXX-XXXX (Toll Free)" },
    { icon: "📟", label: s.ivr, sub: "Call & follow voice instructions" },
    { icon: "💬", label: s.sms, sub: "SMS 'KISAN' to 56789" },
  ];
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-[fadeUp_0.25s_ease]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#E8F5EE] text-[#6B7280] hover:text-[#1A7A3C] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-full bg-[#E8F5EE] flex items-center justify-center text-xl">🌾</div>
          <h2 className="text-lg font-bold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>
            {s.helpTitle}
          </h2>
        </div>
        <p className="text-sm text-[#6B7280] mb-5 ml-13">{s.helpDesc}</p>
        <div className="grid grid-cols-1 gap-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-[#E8F5EE] bg-[#F5F9F6] hover:bg-[#E8F5EE] hover:border-[#C8DFD0] transition-colors cursor-pointer"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold text-[#1A2B4A]" style={{ fontFamily: "Poppins, sans-serif" }}>{item.label}</p>
                <p className="text-xs text-[#6B7280]">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl border border-[#C8DFD0] text-[#1A7A3C] text-sm font-medium hover:bg-[#E8F5EE] transition-colors"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {s.backToLogin}
        </button>
      </div>
    </div>
  );
}

function LeftPanel({ s }: { s: typeof STRINGS.en }) {
  return (
    <div className="hidden md:flex flex-col relative w-[45%] flex-shrink-0 overflow-hidden" style={{ minHeight: "100vh" }}>
      <img
        src={FARMER_IMG}
        alt="Indian farmer in a lush green rice field"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D4A22]/75 via-[#1A7A3C]/55 to-[#145F2F]/70" />
      <div className="relative z-10 flex flex-col justify-between h-full p-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="10" fill="rgba(255,255,255,0.2)" />
              <text x="10" y="34" fontFamily="Poppins, sans-serif" fontWeight="700" fontSize="26" fill="white">K</text>
              <circle cx="36" cy="28" r="9" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="2.5" />
              <line x1="42" y1="34" x2="46" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M32 22 Q36 18 40 22" stroke="#E8960A" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
            <span className="text-2xl font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>KisanQ</span>
          </div>
        </div>
        <div>
          <div className="inline-block px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-medium mb-4 border border-white/25">
            Smart India Hackathon 2026 · SIH26032
          </div>
          <h1 className="text-3xl font-bold text-white leading-tight mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
            {s.tagline}
          </h1>
          <p className="text-white/80 text-sm leading-relaxed mb-8 max-w-xs">
            {s.heroDesc}
          </p>
          <div className="flex items-center gap-0">
            {s.journey.map((step, i) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">{i + 1}</span>
                  </div>
                  <span className="text-white/80 text-[10px] mt-1 text-center font-medium max-w-[48px] leading-tight">{step}</span>
                </div>
                {i < s.journey.length - 1 && (
                  <div className="h-px w-5 bg-white/30 mx-1 mb-3" />
                )}
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/40 text-xs">
          Digital Farmer Slot Booking and Tracking Platform
        </p>
      </div>
    </div>
  );
}

export default function AuthFlow({
  onAuthSuccess,
  onAdminAccess,
}: {
  onAuthSuccess: () => void;
  onAdminAccess?: () => void;
}) {
  const [lang, setLang] = useState<Lang>("en");
  const [step, setStep] = useState<Step>("login");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [showHelp, setShowHelp] = useState(false);

  const s = STRINGS[lang];

  const startTimer = () => {
    setResendTimer(30);
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer((r) => r - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const validateMobile = () => {
    const digits = mobile.replace(/\D/g, "");
    if (digits.length !== 10) {
      setErrors({ mobile: s.invalidMobile });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSendOtp = async (nextStep: Step) => {
    if (!validateMobile()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setOtp(Array(6).fill(""));
    setErrors({});
    startTimer();
    setToast(`${s.otpSentTo} +91 ${mobile}`);
    setStep(nextStep);
  };

  const handleVerifyOtp = async (isRegister: boolean) => {
    const entered = otp.join("");
    if (entered.length < 6) {
      setErrors({ otp: s.requiredField });
      return;
    }
    if (entered !== "123456") {
      setErrors({ otp: s.incorrectOtp });
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    if (isRegister) {
      setToast("Registration complete — please log in");
      setStep("success");
    } else {
      setToast("Login successful — welcome back!");
      setTimeout(onAuthSuccess, 600);
    }
  };

  const handleRegisterContinue = async () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = s.requiredField;
    if (!mobile.trim() || mobile.replace(/\D/g, "").length !== 10)
      newErrors.mobile = s.invalidMobile;
    if (!village.trim()) newErrors.village = s.requiredField;
    if (!district) newErrors.district = s.requiredField;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    await handleSendOtp("otp-register");
  };

  const inputCls = (field: string) =>
    `w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all bg-white
    ${errors[field]
      ? "border-[#C8332A] focus:ring-2 focus:ring-[#C8332A]/20"
      : "border-[#C8DFD0] focus:border-[#1A7A3C] focus:ring-2 focus:ring-[#1A7A3C]/20"
    } text-[#1A2B4A] placeholder:text-[#9CA3AF]`;

  const cardCls =
    "w-full max-w-[420px] bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.09)] p-8";

  const primaryBtn = (disabled = false) =>
    `w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all
    ${disabled || loading
      ? "bg-[#1A7A3C]/50 cursor-not-allowed"
      : "bg-[#1A7A3C] hover:bg-[#145F2F] active:scale-[0.99] shadow-[0_2px_12px_rgba(26,122,60,0.3)]"
    }`;

  const secondaryBtn =
    "w-full py-3 rounded-xl font-medium text-sm text-[#1A7A3C] border-2 border-[#C8DFD0] hover:bg-[#E8F5EE] transition-all";

  const renderCard = () => {
    if (step === "login") {
      return (
        <div className={cardCls}>
          <div className="flex items-center justify-between mb-6">
            <KisanQLogo size="sm" />
            <LangToggle lang={lang} onToggle={() => setLang(lang === "en" ? "hi" : "en")} />
          </div>
          <h2 className="text-2xl font-bold text-[#1A2B4A] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
            {s.welcomeBack}
          </h2>
          <p className="text-sm text-[#6B7280] mb-6">{s.loginSub}</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1A2B4A] mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>
                {s.mobileLabel}
              </label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 rounded-xl border-2 border-[#C8DFD0] bg-[#F5F9F6] text-sm font-medium text-[#1A2B4A] flex-shrink-0">
                  +91
                </div>
                <input
                  type="tel"
                  placeholder={s.mobilePH}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className={`${inputCls("mobile")} flex-1`}
                />
              </div>
              {errors.mobile && <p className="mt-1.5 text-xs text-[#C8332A]">{errors.mobile}</p>}
            </div>
            <button
              className={primaryBtn()}
              style={{ fontFamily: "Poppins, sans-serif" }}
              onClick={() => handleSendOtp("otp-login")}
              disabled={loading}
            >
              {loading ? s.sendingOtp : s.sendOtp}
            </button>
          </div>
          <div className="mt-5 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <span>{s.newTo}</span>
              <button
                onClick={() => { setErrors({}); setMobile(""); setStep("register"); }}
                className="text-[#1A7A3C] font-semibold hover:underline"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {s.createAcc}
              </button>
            </div>
            <div className="w-full h-px bg-[#E8F5EE]" />
            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <span>{s.needHelp}</span>
              <button
                onClick={() => setShowHelp(true)}
                className="text-[#E8960A] font-semibold hover:underline"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {s.assistedHelp}
              </button>
            </div>
            {onAdminAccess && (
              <>
                <div className="w-full h-px bg-[#E8F5EE]" />
                <button
                  onClick={onAdminAccess}
                  className="flex items-center gap-2 text-xs text-[#6B7280] hover:text-[#1A2B4A] border border-dashed border-[#C8DFD0] rounded-xl px-4 py-2 hover:border-[#1A2B4A] transition-colors"
                >
                  <span>📊</span>
                  <span style={{ fontFamily: "Poppins, sans-serif" }}>SIH Demo — Admin Dashboard</span>
                </button>
              </>
            )}
          </div>
        </div>
      );
    }

    if (step === "otp-login" || step === "otp-register") {
      const isReg = step === "otp-register";
      return (
        <div className={cardCls}>
          <div className="flex items-center justify-between mb-6">
            <KisanQLogo size="sm" />
            <LangToggle lang={lang} onToggle={() => setLang(lang === "en" ? "hi" : "en")} />
          </div>
          {isReg && <ProgressBar step="otp-register" s={s} />}
          <button
            onClick={() => { setErrors({}); setOtp(Array(6).fill("")); setStep(isReg ? "register" : "login"); }}
            className="flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#1A7A3C] mb-4 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {s.backToLogin}
          </button>
          <h2 className="text-xl font-bold text-[#1A2B4A] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
            {s.verifyTitle}
          </h2>
          <p className="text-sm text-[#6B7280] mb-1">{isReg ? s.regOtpSub : s.verifySub}</p>
          <p className="text-xs text-[#1A7A3C] font-medium mb-6">
            {s.otpSentTo} +91 {mobile.replace(/(\d{5})(\d{5})/, "$1 $2")}
          </p>
          <OTPInput value={otp} onChange={setOtp} error={errors.otp} />
          <div className="mt-6 space-y-3">
            <button
              className={primaryBtn(otp.join("").length < 6)}
              style={{ fontFamily: "Poppins, sans-serif" }}
              onClick={() => handleVerifyOtp(isReg)}
              disabled={loading || otp.join("").length < 6}
            >
              {loading ? (isReg ? s.creatingAcc : s.verifyingOtp) : isReg ? s.regVerifyBtn : s.verifyBtn}
            </button>
            <div className="text-center text-sm text-[#6B7280]">
              {s.didntGet}{" "}
              {resendTimer > 0 ? (
                <span className="text-[#6B7280]">{s.resendIn} {resendTimer}s</span>
              ) : (
                <button
                  onClick={() => handleSendOtp(step)}
                  className="text-[#1A7A3C] font-semibold hover:underline"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {s.resend}
                </button>
              )}
            </div>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-[#FEF3C7] border border-[#E8960A]/30">
            <p className="text-xs text-[#92400E] text-center">
              🔐 Demo OTP: <strong>123456</strong>
            </p>
          </div>
        </div>
      );
    }

    if (step === "register") {
      return (
        <div className={cardCls}>
          <div className="flex items-center justify-between mb-5">
            <KisanQLogo size="sm" />
            <LangToggle lang={lang} onToggle={() => setLang(lang === "en" ? "hi" : "en")} />
          </div>
          <ProgressBar step="register" s={s} />
          <button
            onClick={() => { setErrors({}); setStep("login"); }}
            className="flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#1A7A3C] mb-4 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {s.backToLogin}
          </button>
          <h2 className="text-xl font-bold text-[#1A2B4A] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
            {s.regTitle}
          </h2>
          <p className="text-sm text-[#6B7280] mb-5">{s.regSub}</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1A2B4A] mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>
                {s.fullName}
              </label>
              <input
                type="text"
                placeholder={s.fullNamePH}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputCls("name")}
              />
              {errors.name && <p className="mt-1 text-xs text-[#C8332A]">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1A2B4A] mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>
                {s.mobileLabel}
              </label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 rounded-xl border-2 border-[#C8DFD0] bg-[#F5F9F6] text-sm font-medium text-[#1A2B4A] flex-shrink-0">
                  +91
                </div>
                <input
                  type="tel"
                  placeholder={s.mobilePH}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className={`${inputCls("mobile")} flex-1`}
                />
              </div>
              {errors.mobile && <p className="mt-1 text-xs text-[#C8332A]">{errors.mobile}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1A2B4A] mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>
                {s.villageLabel}
              </label>
              <input
                type="text"
                placeholder={s.villagePH}
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className={inputCls("village")}
              />
              {errors.village && <p className="mt-1 text-xs text-[#C8332A]">{errors.village}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1A2B4A] mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>
                {s.districtLabel}
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className={`${inputCls("district")} appearance-none cursor-pointer`}
              >
                <option value="">{s.districtPH}</option>
                {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              {errors.district && <p className="mt-1 text-xs text-[#C8332A]">{errors.district}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1A2B4A] mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>
                {s.prefLang}
              </label>
              <div className="flex gap-3">
                {(["en", "hi"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${lang === l
                      ? "border-[#1A7A3C] bg-[#E8F5EE] text-[#1A7A3C]"
                      : "border-[#C8DFD0] text-[#6B7280] hover:border-[#1A7A3C]/50"
                      }`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {l === "en" ? "English" : "हिन्दी"}
                  </button>
                ))}
              </div>
            </div>
            <button
              className={primaryBtn()}
              style={{ fontFamily: "Poppins, sans-serif" }}
              onClick={handleRegisterContinue}
              disabled={loading}
            >
              {loading ? s.sendingOtp : s.continueBtn}
            </button>
          </div>
        </div>
      );
    }

    if (step === "success") {
      return (
        <div className={cardCls}>
          <div className="flex items-center justify-between mb-8">
            <KisanQLogo size="sm" />
            <LangToggle lang={lang} onToggle={() => setLang(lang === "en" ? "hi" : "en")} />
          </div>
          <ProgressBar step="success" s={s} />
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-[#E8F5EE] flex items-center justify-center mb-5 shadow-[0_0_0_8px_rgba(26,122,60,0.08)]">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#1A7A3C" />
                <path d="M11 20l7 7 11-11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#1A2B4A] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
              {s.successTitle}
            </h2>
            <p className="text-base font-semibold text-[#1A7A3C] mb-1">{s.successMsg1}</p>
            <p className="text-sm text-[#6B7280] mb-8">{s.successMsg2}</p>
            <div className="w-full space-y-3">
              <button
                className={primaryBtn()}
                style={{ fontFamily: "Poppins, sans-serif" }}
                onClick={onAuthSuccess}
              >
                {s.goToDashboard}
              </button>
              <button
                className={secondaryBtn}
                style={{ fontFamily: "Poppins, sans-serif" }}
                onClick={() => { setStep("login"); setMobile(""); setName(""); setVillage(""); setDistrict(""); }}
              >
                {s.startNew}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#F5F9F6" }}>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
      {showHelp && <HelpCard s={s} onClose={() => setShowHelp(false)} />}

      <LeftPanel s={s} />

      <div className="flex-1 flex flex-col items-center justify-center p-5 py-10 min-h-screen">
        <div className="w-full flex flex-col items-center gap-6 max-w-[440px]">
          <div className="md:hidden w-full">
            <div className="relative rounded-2xl overflow-hidden h-36 mb-2">
              <img
                src={FARMER_IMG}
                alt="Indian farmer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D4A22]/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-bold text-base" style={{ fontFamily: "Poppins, sans-serif" }}>KisanQ</p>
                <p className="text-white/80 text-xs">{s.tagline}</p>
              </div>
            </div>
          </div>
          {renderCard()}
          {(step === "login" || step === "otp-login") && (
            <button
              onClick={() => setShowHelp(true)}
              className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1A7A3C] transition-colors md:hidden"
            >
              <span>🌾</span>
              <span>{s.needHelp} {s.assistedHelp}</span>
            </button>
          )}
          <p className="text-xs text-[#6B7280] text-center">
            SIH26032 · Digital Farmer Slot Booking & Tracking Platform
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
