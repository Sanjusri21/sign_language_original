import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mic, Type, Volume2, FileText, CheckCircle2 } from "lucide-react";

const tools = [
  {
    icon: Mic,
    title: "Speech to Text",
    description: "Convert spoken words into written text in real-time",
    gradient: "from-blue-primary to-cyan-500",
  },
  {
    icon: Type,
    title: "Text to Sign Language",
    description: "Translate any text into animated sign language",
    gradient: "from-purple-primary to-pink-500",
  },
  {
    icon: Volume2,
    title: "Audio Description",
    description: "Add descriptive audio narration to visual content",
    gradient: "from-orange-500 to-red-500",
  },
];

export function AccessibilityTools() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
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
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 text-center"
            >
              <h1 className="text-5xl mb-4 bg-gradient-to-r from-blue-primary via-purple-primary to-pink-500 bg-clip-text text-transparent">
                Accessibility Tools
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Comprehensive suite of AI-powered tools to make your content accessible to everyone
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-full">
                    <motion.div
                      className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(to right, var(--blue-primary), var(--purple-primary))`,
                      }}
                    />
                    <div className="relative backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-8 h-full flex flex-col">
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tool.gradient} flex items-center justify-center mb-6`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <tool.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl mb-3">{tool.title}</h3>
                      <p className="text-muted-foreground flex-1">{tool.description}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-primary to-purple-primary text-white"
                      >
                        Launch Tool
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-8"
            >
              <h2 className="text-2xl mb-6">Why Accessibility Matters</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-2 bg-gradient-to-r from-blue-primary to-purple-primary bg-clip-text text-transparent">
                    1 in 5
                  </div>
                  <p className="text-muted-foreground">
                    People have some form of disability
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2 bg-gradient-to-r from-purple-primary to-pink-500 bg-clip-text text-transparent">
                    466M
                  </div>
                  <p className="text-muted-foreground">
                    People worldwide with hearing loss
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2 bg-gradient-to-r from-cyan-500 to-blue-primary bg-clip-text text-transparent">
                    100%
                  </div>
                  <p className="text-muted-foreground">
                    Of users benefit from accessible design
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
