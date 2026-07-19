import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AIRobot } from "../components/AIRobot";
import { Upload, Link2, ArrowLeft, Loader2 } from "lucide-react";

export function VideoTranslate() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          navigate("/result/demo");
        }, 500);
      }
    }, 150);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
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

        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-4xl">
            {!isProcessing ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="mb-8 flex justify-center"
                >
                  <AIRobot animation="idle" size="medium" mood="happy" />
                </motion.div>

                <h1 className="text-4xl mb-4 bg-gradient-to-r from-blue-primary to-purple-primary bg-clip-text text-transparent">
                  Translate Video to Sign Language
                </h1>
                <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
                  Upload a video or paste a social media URL to generate an AI-powered sign language translation
                </p>

                <div className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-8 max-w-2xl mx-auto">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-left mb-3">Paste Social Media URL</label>
                      <div className="relative">
                        <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="https://youtube.com/watch?v=..."
                          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-input-background border border-glass-border focus:border-blue-primary outline-none transition-colors text-foreground"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-glass-border"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-glass-bg text-muted-foreground">or</span>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="border-2 border-dashed border-glass-border rounded-2xl p-12 text-center cursor-pointer hover:border-blue-primary transition-colors"
                    >
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="mb-2">Drop video file here</p>
                      <p className="text-sm text-muted-foreground">
                        Supports MP4, MOV, AVI up to 500MB
                      </p>
                      <input type="file" className="hidden" accept="video/*" />
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={!url}
                      whileHover={{ scale: url ? 1.02 : 1 }}
                      whileTap={{ scale: url ? 0.98 : 1 }}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-primary to-purple-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Generate Sign Language Translation
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="mb-8 flex justify-center"
                >
                  <AIRobot animation="sign" size="large" mood="happy" />
                </motion.div>

                <h2 className="text-3xl mb-4">Processing Your Video</h2>
                <p className="text-muted-foreground mb-8">
                  Our AI is analyzing the content and generating sign language translation...
                </p>

                <div className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-8 max-w-2xl mx-auto">
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm">{progress}%</span>
                    </div>
                    <div className="h-3 bg-input-background rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-primary to-purple-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <div className="space-y-3 text-left">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: progress > 20 ? 1 : 0.3, x: 0 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${progress > 20 ? 'bg-green-500' : 'bg-glass-bg'}`}>
                        {progress > 20 && <span className="text-xs">✓</span>}
                      </div>
                      <span className={progress > 20 ? 'text-foreground' : 'text-muted-foreground'}>
                        Extracting audio and video
                      </span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: progress > 50 ? 1 : 0.3, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${progress > 50 ? 'bg-green-500' : 'bg-glass-bg'}`}>
                        {progress > 50 && <span className="text-xs">✓</span>}
                      </div>
                      <span className={progress > 50 ? 'text-foreground' : 'text-muted-foreground'}>
                        Analyzing speech and context
                      </span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: progress > 80 ? 1 : 0.3, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${progress > 80 ? 'bg-green-500' : 'bg-glass-bg'}`}>
                        {progress > 80 && <span className="text-xs">✓</span>}
                      </div>
                      <span className={progress > 80 ? 'text-foreground' : 'text-muted-foreground'}>
                        Generating sign language avatar
                      </span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
