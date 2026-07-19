import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AIRobot } from "../components/AIRobot";
import { Eye, EyeOff, Sparkles } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showLoginPanel, setShowLoginPanel] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleGetStarted = () => {
    setShowLoginPanel(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]">
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-primary/50 rounded-full"
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

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-6xl flex items-center justify-between gap-12">
          <motion.div
            className="flex-1 flex flex-col items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{
                x: showLoginPanel ? 40 : 0,
                rotate: showLoginPanel ? 15 : 0,
              }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <AIRobot
                animation={isLoggingIn ? "celebrate" : showLoginPanel ? "point" : "wave"}
                size="large"
                mood={isLoggingIn ? "excited" : "happy"}
                eyesClosed={isPasswordFocused && !showPassword}
              />
            </motion.div>

            {isLoggingIn && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center"
              >
                <p className="text-purple-primary">Welcome back!</p>
              </motion.div>
            )}
          </motion.div>

          <div className="flex-1 flex items-center justify-center">
            <AnimatePresence>
              {!showLoginPanel ? (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: 100 }}
                  onClick={handleGetStarted}
                  className="px-12 py-6 rounded-3xl bg-gradient-to-r from-blue-primary to-purple-primary text-white text-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles className="inline-block mr-2 w-6 h-6" />
                  Click to Sign In
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 300, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="w-full max-w-md"
                >
                  <div className="relative backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-8 shadow-2xl">
                    <motion.div
                      className="absolute -inset-0.5 bg-gradient-to-r from-blue-primary to-purple-primary rounded-3xl opacity-20 blur-xl"
                      animate={{
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    />

                    <div className="relative z-10">
                      <h2 className="text-3xl mb-2 text-center bg-gradient-to-r from-blue-primary to-purple-primary bg-clip-text text-transparent">
                        Welcome Back
                      </h2>
                      <p className="text-muted-foreground text-center mb-8">
                        Sign in to continue to SignAura
                      </p>

                      <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                          <label className="block text-sm mb-2">Username</label>
                          <motion.input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-2xl bg-input-background border border-glass-border focus:border-blue-primary outline-none transition-colors text-foreground"
                            placeholder="Enter your username"
                            whileFocus={{ scale: 1.02 }}
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm mb-2">Password</label>
                          <div className="relative">
                            <motion.input
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              onFocus={() => setIsPasswordFocused(true)}
                              onBlur={() => setIsPasswordFocused(false)}
                              className="w-full px-4 py-3 rounded-2xl bg-input-background border border-glass-border focus:border-purple-primary outline-none transition-colors text-foreground pr-12"
                              placeholder="Enter your password"
                              whileFocus={{ scale: 1.02 }}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        <motion.button
                          type="submit"
                          disabled={isLoggingIn}
                          className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-primary to-purple-primary text-white disabled:opacity-50"
                          whileHover={{ scale: isLoggingIn ? 1 : 1.02 }}
                          whileTap={{ scale: isLoggingIn ? 1 : 0.98 }}
                        >
                          {isLoggingIn ? "Signing in..." : "Sign In"}
                        </motion.button>

                        <div className="text-center">
                          <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="text-sm text-muted-foreground hover:text-blue-primary transition-colors"
                          >
                            Back to Welcome
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
