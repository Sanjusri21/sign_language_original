import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { AIRobot } from "../components/AIRobot";
import { ArrowLeft, Download, Share2, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { useState } from "react";

export function TranslationResult() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-500/30 rounded-full"
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
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl">Translation Complete!</h1>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-primary to-purple-primary text-white flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-2xl backdrop-blur-xl bg-glass-bg border border-glass-border flex items-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </motion.button>
                </div>
              </div>
              <p className="text-muted-foreground">
                Your video has been successfully translated to sign language
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-6"
              >
                <h3 className="mb-4">Original Video</h3>
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-primary/10 to-purple-primary/10" />
                  <Play className="w-16 h-16 text-white/50" />
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3 rounded-xl bg-gradient-to-r from-blue-primary to-purple-primary"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                  </motion.button>
                  <div className="flex-1 h-2 bg-input-background rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-gradient-to-r from-blue-primary to-purple-primary rounded-full" />
                  </div>
                  <span className="text-sm text-muted-foreground">1:23 / 3:45</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-6"
              >
                <h3 className="mb-4">Sign Language Translation</h3>
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-primary/10 to-pink-500/10" />
                  <AIRobot animation="sign" size="large" mood="happy" />
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl bg-gradient-to-r from-purple-primary to-pink-500"
                  >
                    <SkipBack className="w-5 h-5 text-white" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl bg-gradient-to-r from-purple-primary to-pink-500"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl bg-gradient-to-r from-purple-primary to-pink-500"
                  >
                    <SkipForward className="w-5 h-5 text-white" />
                  </motion.button>
                  <div className="flex-1" />
                  <select
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="px-3 py-2 rounded-xl bg-input-background border border-glass-border outline-none text-sm"
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={1}>1x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-6"
            >
              <h3 className="mb-4">Translation Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                  <p className="text-2xl">3:45</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Accuracy</p>
                  <p className="text-2xl text-green-500">98.5%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Processing Time</p>
                  <p className="text-2xl">15s</p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
