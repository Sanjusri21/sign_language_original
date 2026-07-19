import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

export function SettingsPage() {

  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const [signLanguage, setSignLanguage] = useState("ASL");

  return (
    <div
      className={`min-h-screen p-8 ${
        darkMode
          ? "bg-[#0a0a1a] text-white"
          : "bg-white text-black"
      }`}
    >

      <button
        onClick={()=>navigate("/profile")}
        className="flex items-center gap-2 mb-8"
      >
        <ArrowLeft/>
        Back
      </button>

      <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        className="max-w-xl mx-auto rounded-3xl border p-8"
      >

        <h2 className="text-3xl mb-8">
          Settings
        </h2>

        {/* Theme */}

        <div className="flex justify-between items-center mb-6">

          <span>Dark Mode</span>

          <input
            type="checkbox"
            checked={darkMode}
            onChange={()=>setDarkMode(!darkMode)}
          />

        </div>

        {/* Notification */}

        <div className="flex justify-between items-center mb-6">

          <span>Notifications</span>

          <input
            type="checkbox"
            checked={notifications}
            onChange={()=>setNotifications(!notifications)}
          />

        </div>

        {/* Language */}

        <div className="mb-6">

          <label>Language</label>

          <select
            value={language}
            onChange={(e)=>setLanguage(e.target.value)}
            className="w-full mt-2 p-3 rounded-xl text-black"
          >

            <option>English</option>
            <option>Tamil</option>
            <option>Hindi</option>

          </select>

        </div>

        {/* Sign Language */}

        <div className="mb-6">

          <label>Sign Language</label>

          <select
            value={signLanguage}
            onChange={(e)=>setSignLanguage(e.target.value)}
            className="w-full mt-2 p-3 rounded-xl text-black"
          >

            <option>ASL</option>
            <option>ISL</option>
            <option>BSL</option>

          </select>

        </div>

        <button
          onClick={()=>alert("Settings Saved")}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white"
        >
          Save Settings
        </button>

      </motion.div>

    </div>
  );
}