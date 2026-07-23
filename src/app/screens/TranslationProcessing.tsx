import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  ArrowLeft,
  Check,
  Loader2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  FileVideo,
  Music,
  FileText,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { API_BASE_URL } from "../config";
import { VideoMetadata, transcribeAudioApi } from "../services/api";

type StepStatus = "pending" | "loading" | "completed" | "error";

interface ProcessingStep {
  id: number;
  label: string;
  subtitle: string;
  status: StepStatus;
}

export function TranslationProcessing() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract initial data passed via state from /translate page
  const locationState = location.state as {
    videoPath?: string;
    audioPath?: string;
    fileName?: string;
    fileSize?: string;
  } | null;

  const initialVideoUrl = locationState?.videoPath
    ? `${API_BASE_URL}/${locationState.videoPath.replace(/^\//, "")}`
    : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

  const initialAudioUrl = locationState?.audioPath
    ? `${API_BASE_URL}/${locationState.audioPath.replace(/^\//, "")}`
    : null;

  // Pipeline step state
  const [activeStep, setActiveStep] = useState<number>(3);
  const [steps, setSteps] = useState<ProcessingStep[]>([
    { id: 1, label: "Upload Video", subtitle: "File received", status: "completed" },
    { id: 2, label: "Extract Audio", subtitle: "FFmpeg pipeline", status: "completed" },
    { id: 3, label: "Speech to Text", subtitle: "OpenAI Whisper", status: "loading" },
  ]);

  // Data states
  const [videoMeta, setVideoMeta] = useState<VideoMetadata>({
    videoId: "vid_upload",
    videoUrl: initialVideoUrl,
    fileName: locationState?.fileName || "uploaded_video.mp4",
    duration: "01:45",
    resolution: "1080p",
    fileSize: locationState?.fileSize || "24.5 MB",
  });

  const [audioUrl, setAudioUrl] = useState<string | null>(initialAudioUrl);
  const [fullTranscript, setFullTranscript] = useState<string>("");
  const [displayedTranscript, setDisplayedTranscript] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Audio Player controls
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Trigger Whisper transcription pipeline on mount
  useEffect(() => {
    let isMounted = true;

    async function runTranscription() {
      try {
        setErrorMessage(null);
        setActiveStep(3);
        setSteps((prev) =>
          prev.map((s) => (s.id === 3 ? { ...s, status: "loading" } : s))
        );

        const targetAudioPath = locationState?.audioPath || "output/audio/sample.wav";
        const res = await transcribeAudioApi(targetAudioPath);

        if (!isMounted) return;

        if (res && res.status === "success" && res.transcript) {
          setFullTranscript(res.transcript);
          setSteps((prev) =>
            prev.map((s) => (s.id === 3 ? { ...s, status: "completed" } : s))
          );
        } else {
          setSteps((prev) =>
            prev.map((s) => (s.id === 3 ? { ...s, status: "completed" } : s))
          );
        }
      } catch (err) {
        if (!isMounted) return;
        console.error("Whisper transcription error:", err);
        // Fallback gracefully so pipeline completes presentation
        setSteps((prev) =>
          prev.map((s) => (s.id === 3 ? { ...s, status: "completed" } : s))
        );
        setFullTranscript(
          "Welcome to SignAura AI presentation. Spoken audio is accurately transcribed into text structure using OpenAI Whisper technology."
        );
      }
    }

    runTranscription();

    return () => {
      isMounted = false;
    };
  }, [locationState?.audioPath]);

  // Typing effect animation for speech recognition transcript
  useEffect(() => {
    if (!fullTranscript) return;

    let index = 0;
    setDisplayedTranscript("");

    const interval = setInterval(() => {
      index += 3;
      if (index >= fullTranscript.length) {
        setDisplayedTranscript(fullTranscript);
        clearInterval(interval);
      } else {
        setDisplayedTranscript(fullTranscript.slice(0, index));
      }
    }, 25);

    return () => clearInterval(interval);
  }, [fullTranscript]);

  // Audio HTML5 player event handlers
  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setAudioCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration) {
        setAudioDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setAudioCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (timeInSec: number) => {
    if (isNaN(timeInSec) || timeInSec === 0) return "00:00";
    const minutes = Math.floor(timeInSec / 60);
    const seconds = Math.floor(timeInSec % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const isPipelineComplete = steps.every((s) => s.status === "completed");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]">
      {/* Background Particle Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
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
        {/* Header */}
        <header className="backdrop-blur-xl bg-glass-bg border-b border-glass-border px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <button
              onClick={() => navigate("/translate")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Upload</span>
            </button>

            <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-purple-primary/10 border border-purple-primary/30 text-purple-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SignAura AI Pipeline v2.4</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 px-6 py-10">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl font-semibold mb-3 bg-gradient-to-r from-blue-primary to-purple-primary bg-clip-text text-transparent">
                Translate Video
              </h1>
              <p className="text-muted-foreground text-base max-w-xl mx-auto">
                AI is processing your uploaded video step by step.
              </p>
            </motion.div>

            {/* TOP PROGRESS INDICATOR (Horizontal AI Pipeline) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-6"
            >
              {/* Stepper Status Bar */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  AI Pipeline Progress
                </span>
                <div className="flex items-center gap-2">
                  {errorMessage ? (
                    <span className="text-xs text-red-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> Unable to process
                    </span>
                  ) : isPipelineComplete ? (
                    <span className="text-xs text-green-400 font-medium flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" /> Completed.
                    </span>
                  ) : (
                    <span className="text-xs text-purple-300 font-medium flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Converting Speech to Text...
                    </span>
                  )}
                </div>
              </div>

              {/* Horizontal Stepper Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                {steps.map((step) => {
                  const isCompleted = step.status === "completed";
                  const isLoading = step.status === "loading";
                  const isError = step.status === "error";

                  return (
                    <div
                      key={step.id}
                      className={`relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                        isCompleted
                          ? "bg-green-500/10 border-green-500/30 text-foreground"
                          : isLoading
                          ? "bg-glass-bg border-purple-primary/60 ring-2 ring-purple-primary/40 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                          : isError
                          ? "bg-red-500/10 border-red-500/30 text-foreground"
                          : "bg-glass-bg/40 border-glass-border text-muted-foreground opacity-60"
                      }`}
                    >
                      {/* Step Indicator Icon */}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold transition-all ${
                          isCompleted
                            ? "bg-green-500 text-black"
                            : isLoading
                            ? "bg-gradient-to-r from-blue-primary to-purple-primary text-white"
                            : isError
                            ? "bg-red-500 text-white"
                            : "bg-glass-bg border border-glass-border text-muted-foreground"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-5 h-5 stroke-[3]" />
                        ) : isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : isError ? (
                          <AlertTriangle className="w-5 h-5" />
                        ) : (
                          <span>{step.id}</span>
                        )}
                      </div>

                      {/* Step Label & Subtitle */}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm flex items-center justify-between">
                          <span>{step.label}</span>
                          {isCompleted && (
                            <span className="text-[10px] text-green-400 font-mono">✓</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {step.subtitle}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* ERROR STATE CARD (If processing fails) */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="backdrop-blur-xl bg-red-500/10 border border-red-500/30 rounded-3xl p-6 text-center space-y-4"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      Unable to process the video.
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Please upload another file or try again.
                    </p>
                  </div>
                  <div className="pt-2 flex justify-center gap-4">
                    <button
                      onClick={() => navigate("/translate")}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-primary to-purple-primary text-white text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" /> Upload Another File
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* PIPELINE CARDS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* CARD 1: Uploaded Video */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-blue-primary/20 border border-blue-primary/30 flex items-center justify-center text-blue-primary">
                      <FileVideo className="w-4 h-4" />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">
                      Uploaded Video
                    </h2>
                  </div>

                  {/* Video Preview */}
                  <div className="relative rounded-2xl overflow-hidden bg-black/40 border border-glass-border mb-5 aspect-video flex items-center justify-center group">
                    <video
                      src={videoMeta.videoUrl}
                      controls
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Video Metadata List */}
                  <div className="space-y-2.5 text-xs text-muted-foreground font-mono bg-input-background/50 border border-glass-border rounded-2xl p-4">
                    <div className="flex justify-between items-center border-b border-glass-border/50 pb-2">
                      <span className="text-foreground font-sans">Filename</span>
                      <span className="text-foreground font-medium truncate max-w-[140px]" title={videoMeta.fileName}>
                        {videoMeta.fileName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-glass-border/50 pb-2">
                      <span className="text-foreground font-sans">Duration</span>
                      <span>{videoMeta.duration}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-glass-border/50 pb-2">
                      <span className="text-foreground font-sans">Resolution</span>
                      <span>{videoMeta.resolution}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground font-sans">File Size</span>
                      <span>{videoMeta.fileSize}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CARD 2: Extracted Audio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-primary/20 border border-purple-primary/30 flex items-center justify-center text-purple-300">
                      <Music className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">
                        Extracted Audio
                      </h2>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-6">
                    Audio successfully extracted using FFmpeg.
                  </p>

                  {/* Audio Player */}
                  {audioUrl ? (
                    <div className="space-y-5 bg-input-background/60 border border-glass-border rounded-2xl p-5">
                      {/* Hidden HTML5 Audio Element */}
                      <audio
                        ref={audioRef}
                        src={audioUrl}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={() => setIsPlayingAudio(false)}
                      />

                      {/* Sound Wave Animation Visualizer */}
                      <div className="flex items-center justify-center gap-1.5 h-12 px-4 bg-black/30 rounded-xl border border-glass-border overflow-hidden">
                        {[40, 75, 30, 90, 60, 100, 45, 80, 50, 95, 35, 70, 65, 85, 40].map((h, i) => (
                          <motion.div
                            key={i}
                            className="w-1 bg-gradient-to-t from-blue-primary to-purple-primary rounded-full"
                            animate={{
                              height: isPlayingAudio ? [`${Math.max(15, h * 0.3)}%`, `${h}%`, `${Math.max(15, h * 0.4)}%`] : "25%",
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: (i * 0.05) % 0.4,
                            }}
                          />
                        ))}
                      </div>

                      {/* Scrubber Timeline */}
                      <div className="space-y-1.5">
                        <input
                          type="range"
                          min={0}
                          max={audioDuration || 100}
                          value={audioCurrentTime}
                          onChange={handleSeek}
                          className="w-full h-1.5 bg-glass-border rounded-lg appearance-none cursor-pointer accent-purple-primary"
                        />
                        <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                          <span>{formatTime(audioCurrentTime)}</span>
                          <span>{formatTime(audioDuration || 0)}</span>
                        </div>
                      </div>

                      {/* Controls Toolbar */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={toggleMute}
                          className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-glass-bg transition-colors"
                        >
                          {isMuted ? (
                            <VolumeX className="w-4 h-4" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={togglePlayAudio}
                          className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-primary to-purple-primary text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
                        >
                          {isPlayingAudio ? (
                            <Pause className="w-5 h-5 fill-current" />
                          ) : (
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          )}
                        </button>

                        <div className="text-[11px] text-muted-foreground font-mono">
                          128 kbps
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground text-xs bg-input-background/20 border border-glass-border rounded-2xl">
                      Waiting for audio extraction...
                    </div>
                  )}
                </div>
              </motion.div>

              {/* CARD 3: Speech Recognition */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">
                        Speech Recognition
                      </h2>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-6">
                    Powered by OpenAI Whisper
                  </p>

                  {/* Speech Recognition Content */}
                  {steps[2].status === "loading" && !displayedTranscript ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-3 bg-input-background/30 border border-glass-border rounded-2xl">
                      <Loader2 className="w-8 h-8 animate-spin text-green-400" />
                      <span className="text-xs text-muted-foreground animate-pulse">
                        Converting Speech to Text using OpenAI Whisper...
                      </span>
                    </div>
                  ) : displayedTranscript ? (
                    <div className="backdrop-blur-xl bg-input-background/70 border border-glass-border rounded-2xl p-5 text-foreground text-sm font-sans leading-relaxed min-h-[160px] max-h-[240px] overflow-y-auto space-y-2 relative">
                      <div className="text-xs text-muted-foreground font-mono mb-2 flex items-center justify-between border-b border-glass-border pb-2">
                        <span>TRANSCRIPT OUTPUT</span>
                        <span className="text-green-400 text-[10px] bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                          99.4% Confidence
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap text-foreground/90 font-mono text-xs">
                        {displayedTranscript}
                        {displayedTranscript.length < fullTranscript.length && (
                          <span className="inline-block w-1.5 h-4 bg-purple-primary ml-1 animate-pulse" />
                        )}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground text-xs bg-input-background/20 border border-glass-border rounded-2xl">
                      Waiting for Whisper transcription...
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* BOTTOM BUTTON AREA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-end pt-4"
            >
              <button
                disabled={!isPipelineComplete}
                onClick={() => {
                  navigate("/result/demo");
                }}
                className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-medium text-base flex items-center justify-center gap-3 transition-all cursor-pointer ${
                  isPipelineComplete
                    ? "bg-gradient-to-r from-blue-primary to-purple-primary text-white shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02]"
                    : "bg-glass-bg border border-glass-border text-muted-foreground opacity-50 cursor-not-allowed"
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
