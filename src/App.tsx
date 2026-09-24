import { useState } from "react";
import AuthFlow from "./pages/AuthFlow";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

type Mode = "farmer" | "admin";

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [mode, setMode] = useState<Mode>("farmer");

  if (!authed) {
    return (
      <AuthFlow
        onAuthSuccess={() => setAuthed(true)}
        onAdminAccess={() => { setMode("admin"); setAuthed(true); }}
      />
    );
  }

  if (mode === "admin") {
    return <AdminDashboard onLogout={() => { setAuthed(false); setMode("farmer"); }} />;
  }

  return <FarmerDashboard onLogout={() => setAuthed(false)} />;
}
