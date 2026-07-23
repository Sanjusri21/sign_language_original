import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AIRobot } from "../components/AIRobot";
import { Upload, Link2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { uploadVideoApi } from "../services/api";

export function VideoTranslate() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      setIsUploading(true);
      const res = await uploadVideoApi(selectedFile);

      if (res && res.status === "success") {
        navigate("/processing", {
          state: {
            videoPath: res.videoPath,
            audioPath: res.audioPath,
            fileName: selectedFile.name,
            fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
          },
        });
      } else {
        toast.error("Unable to upload video. Please try again.");
      }
    } catch (err) {
      toast.error("Unable to upload video. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
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
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-4xl">
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

                  <label>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="border-2 border-dashed border-glass-border rounded-2xl p-12 text-center cursor-pointer hover:border-blue-primary transition-colors block"
                    >
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="mb-2">
                        {selectedFile ? selectedFile.name : "Drop video file here or click to browse"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports MP4, MOV, AVI up to 500MB
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        accept="video/*"
                        onChange={handleFileChange}
                      />
                    </motion.div>
                  </label>

                  <motion.button
                    type="submit"
                    disabled={isUploading || (!url && !selectedFile)}
                    whileHover={{ scale: (!isUploading && (url || selectedFile)) ? 1.02 : 1 }}
                    whileTap={{ scale: (!isUploading && (url || selectedFile)) ? 0.98 : 1 }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-primary to-purple-primary text-white disabled:opacity-50 disabled:cursor-not-allowed font-medium text-base cursor-pointer shadow-lg"
                  >
                    {isUploading ? "Uploading Video..." : "Generate Sign Language Translation"}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
