import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { AIRobot } from "../components/AIRobot";
import { ArrowLeft, BookOpen, Award, Target, Calendar, Trophy, Star } from "lucide-react";

const courses = [
  {
    title: "Beginner Sign Language",
    level: "Beginner",
    lessons: 12,
    duration: "2 weeks",
    progress: 75,
    color: "from-blue-primary to-cyan-500",
  },
  {
    title: "Intermediate Lessons",
    level: "Intermediate",
    lessons: 18,
    duration: "4 weeks",
    progress: 40,
    color: "from-purple-primary to-pink-500",
  },
  {
    title: "Advanced Communication",
    level: "Advanced",
    lessons: 24,
    duration: "6 weeks",
    progress: 15,
    color: "from-orange-500 to-red-500",
  },
];

const achievements = [
  { title: "First Steps", icon: Star, unlocked: true },
  { title: "Week Streak", icon: Calendar, unlocked: true },
  { title: "Quick Learner", icon: Target, unlocked: true },
  { title: "Master Signer", icon: Trophy, unlocked: false },
];

export function LearningCenter() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
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
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-5xl mb-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-primary bg-clip-text text-transparent">
                  Learning Center
                </h1>
                <p className="text-muted-foreground text-lg">
                  Master sign language at your own pace with AI-powered lessons
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <AIRobot animation="idle" size="small" mood="happy" />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl mb-6">Your Courses</h2>
                <div className="space-y-6">
                  {courses.map((course, index) => (
                    <motion.div
                      key={course.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-6 cursor-pointer group"
                    >
                      <div className="flex items-start gap-6">
                        <motion.div
                          className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${course.color} flex items-center justify-center flex-shrink-0`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <BookOpen className="w-10 h-10 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl mb-1">{course.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{course.lessons} lessons</span>
                                <span>•</span>
                                <span>{course.duration}</span>
                                <span>•</span>
                                <span className={`px-2 py-1 rounded-lg ${
                                  course.level === 'Beginner' ? 'bg-blue-primary/20 text-blue-400' :
                                  course.level === 'Intermediate' ? 'bg-purple-primary/20 text-purple-400' :
                                  'bg-orange-500/20 text-orange-400'
                                }`}>
                                  {course.level}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-muted-foreground">Progress</span>
                              <span className="text-sm">{course.progress}%</span>
                            </div>
                            <div className="h-2 bg-input-background rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full bg-gradient-to-r ${course.color} rounded-full`}
                                initial={{ width: 0 }}
                                animate={{ width: `${course.progress}%` }}
                                transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                              />
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`mt-4 px-6 py-2 rounded-xl bg-gradient-to-r ${course.color} text-white`}
                          >
                            Continue Learning
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-3xl p-6"
                >
                  <h3 className="text-xl mb-6 flex items-center gap-2">
                    <Award className="w-6 h-6 text-yellow-500" />
                    Achievements
                  </h3>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.title}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className={`flex items-center gap-3 p-3 rounded-xl ${
                          achievement.unlocked
                            ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30'
                            : 'bg-input-background opacity-50'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          achievement.unlocked
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                            : 'bg-gray-700'
                        }`}>
                          <achievement.icon className="w-5 h-5 text-white" />
                        </div>
                        <span>{achievement.title}</span>
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
                  <h3 className="text-xl mb-6">Daily Practice</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Current Streak</p>
                      <p className="text-3xl bg-gradient-to-r from-blue-primary to-purple-primary bg-clip-text text-transparent">
                        7 Days 🔥
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Time Practiced</p>
                      <p className="text-2xl">2h 34m</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-primary to-purple-primary text-white"
                    >
                      Start Daily Practice
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
