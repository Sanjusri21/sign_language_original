import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { AIRobot } from "../components/AIRobot";
import {
  ArrowLeft,
  User,
  Video,
  Clock,
  BookOpen,
  Settings,
  Bell,
  Moon,
  Sun,
  Globe,
  Shield,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
const stats = [
  { label: "Videos Translated", value: "247", icon: Video, color: "from-blue-primary to-cyan-500" },
  { label: "Hours Saved", value: "156", icon: Clock, color: "from-purple-primary to-pink-500" },
  { label: "Lessons Completed", value: "89", icon: BookOpen, color: "from-orange-500 to-red-500" },
];

const settingsSections = [
  {
    title: "Preferences",
    items: [
      { icon: Globe, label: "Language", value: "English (US)" },
      { icon: Moon, label: "Theme", value: "Dark Mode" },
      { icon: Bell, label: "Notifications", value: "Enabled" },
    ],
  },
  {
    title: "Accessibility",
    items: [
      { icon: Settings, label: "Sign Language Preference", value: "ASL" },
      { icon: Shield, label: "Privacy Settings", value: "Manage" },
    ],
  },
];

export function Profile() {
  const navigate = useNavigate();
const [profile, setProfile] = useState({
  name: "Sanjusri",
  email: "sanjusri2321@gmail.com",
  bio: "AI & DS Student",
});

useEffect(() => {
  const savedProfile = localStorage.getItem("profile");

  if (savedProfile) {
    setProfile(JSON.parse(savedProfile));
  }
}, []);
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="backdrop-blur-xl bg-glass-bg border-b border-glass-border px-6 py-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
        </header>

        <main className="flex-1 px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-8 mb-8"
            >
              <div className="flex items-start gap-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-primary to-purple-primary p-1">
                    <div className="w-full h-full rounded-full bg-[#0a0a1a] flex items-center justify-center">
                      <User className="w-16 h-16 text-muted-foreground" />
                    </div>
                  </div>
                  <motion.div
                    className="absolute -bottom-2 -right-2"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center border-4 border-[#0a0a1a]">
                      <span className="text-xs">✓</span>
                    </div>
                  </motion.div>
                </motion.div>

                <div className="flex-1">
                  <h1 className="text-4xl mb-2">{profile.name}</h1>

<p className="text-muted-foreground mb-4">
  {profile.email}
</p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate("/edit-profile")}
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-primary to-purple-primary text-white"
                    >
                      Edit Profile
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate("/settings")}
                      className="px-6 py-2 rounded-xl backdrop-blur-xl bg-glass-bg border border-glass-border"
                    >
                      <Settings className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <AIRobot animation="idle" size="small" mood="happy" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-2xl mb-6">Your Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-6"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-4xl mb-2 bg-gradient-to-r from-blue-primary to-purple-primary bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {settingsSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, x: sectionIndex === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-6"
                >
                  <h3 className="text-xl mb-6">{section.title}</h3>
                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + itemIndex * 0.1 }}
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-between p-4 rounded-2xl bg-input-background hover:bg-glass-bg/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-primary to-purple-primary flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-white" />
                          </div>
                          <span>{item.label}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{item.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-6"
            >
              <h3 className="text-xl mb-6">Account Actions</h3>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/")}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 text-white flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </motion.button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
