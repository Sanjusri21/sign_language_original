import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { AIRobot } from "../components/AIRobot";
import {
  Video,
  Languages,
  Wrench,
  BookOpen,
  User,
  Search,
  Bell,
  Play,
  TrendingUp,
  Clock,
} from "lucide-react";
import { SignAuraLogo } from "../components/SignAuraLogo";

const quickActions = [
  {
    icon: Video,
    title: "Translate Video",
    description: "Convert videos to sign language",
    gradient: "from-blue-primary to-purple-primary",
    path: "/translate",
  },
  {
    icon: Languages,
    title: "Live Sign Detection",
    description: "Real-time sign language recognition",
    gradient: "from-purple-primary to-pink-500",
    path: "/tools",
  },
  {
    icon: BookOpen,
    title: "Learning Center",
    description: "Master sign language skills",
    gradient: "from-orange-500 to-pink-500",
    path: "/learn",
  },
];

const recentVideos = [
  { title: "Morning Routine Vlog", duration: "5:32", status: "Completed" },
  { title: "Product Review", duration: "12:45", status: "Completed" },
  { title: "Tutorial: Cooking Basics", duration: "8:20", status: "Processing" },
];

const trendingContent = [
  { title: "Accessible Cooking Channel", views: "2.3M" },
  { title: "Sign Language News Daily", views: "1.8M" },
  { title: "Inclusive Travel Vlogs", views: "1.5M" },
];

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <header className="backdrop-blur-xl bg-glass-bg border-b border-glass-border">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SignAuraLogo size={36} showText textSize="text-2xl" />
            </div>

            <div className="flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-2xl bg-input-background border border-glass-border focus:border-blue-primary outline-none transition-colors w-64 text-foreground"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl bg-glass-bg hover:bg-glass-bg/80 transition-colors relative"
              >
                <Bell className="w-6 h-6 text-muted-foreground" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-purple-primary rounded-full" />
              </motion.button>
              <motion.button
                onClick={() => navigate("/profile")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-gradient-to-r from-blue-primary to-purple-primary"
              >
                <User className="w-6 h-6 text-white" />
              </motion.button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-4xl mb-2">Wlecome Sanjusri</h2>
              <p className="text-muted-foreground">
                Ready to make content more accessible today?
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AIRobot animation="idle" size="small" mood="happy" />
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {quickActions.map((action, index) => (
              <motion.button
                key={action.title}
                onClick={() => navigate(action.path)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-3xl blur transition-opacity duration-300"
                  style={{
                    backgroundImage: `linear-gradient(to right, var(--blue-primary), var(--purple-primary))`
                  }}
                />
                <div className="relative backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-6 h-full">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${action.gradient} flex items-center justify-center mb-4`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-left">{action.title}</h3>
                  <p className="text-sm text-muted-foreground text-left">
                    {action.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-primary" />
                  Recent Translations
                </h3>
              </div>
              <div className="space-y-4">
                {recentVideos.map((video, index) => (
                  <motion.div
                    key={video.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-input-background hover:bg-glass-bg/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/result/${index}`)}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-primary to-purple-primary flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="mb-1">{video.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {video.duration}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        video.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {video.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-primary" />
                  Trending Accessible Content
                </h3>
              </div>
              <div className="space-y-4">
                {trendingContent.map((content, index) => (
                  <motion.div
                    key={content.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: -5 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-input-background hover:bg-glass-bg/50 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-primary to-pink-500 flex items-center justify-center text-xl">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="mb-1">{content.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {content.views} views
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
