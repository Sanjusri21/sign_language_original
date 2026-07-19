import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface AIRobotProps {
  mood?: "happy" | "neutral" | "shy" | "excited";
  animation?: "wave" | "point" | "idle" | "sign" | "celebrate";
  size?: "small" | "medium" | "large";
  eyesClosed?: boolean;
}

export function AIRobot({
  mood = "happy",
  animation = "idle",
  size = "medium",
  eyesClosed = false,
}: AIRobotProps) {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => (p + 1) % 3);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const sizeMap = {
    small: 120,
    medium: 180,
    large: 240,
  };

  const dim = sizeMap[size];

  const bodyAnim =
    animation === "celebrate"
      ? { y: [0, -18, 0, -14, 0], rotate: [-4, 4, -4, 4, 0] }
      : animation === "wave"
      ? { y: [0, -10, 0], rotate: [-3, 3, -3] }
      : { y: [0, -8, 0], rotate: [0, 0, 0] };

  const ringScale =
    animation === "celebrate" ? [1, 1.18, 1, 1.14, 1] : [1, 1.06, 1];

  const eyeRy = eyesClosed ? 1 : mood === "excited" ? 7 : 5;
  const eyeRx = eyesClosed ? 6 : 6;

  return (
    <motion.div
      style={{ width: dim, height: dim, position: "relative" }}
      animate={bodyAnim}
      transition={{
        duration: animation === "celebrate" ? 1 : 4,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: animation === "celebrate" ? "loop" : "mirror",
      }}
    >
      <svg
        viewBox="0 0 200 200"
        width={dim}
        height={dim}
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id="coreGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#a0bcff" />
            <stop offset="45%" stopColor="#4F7CFF" />
            <stop offset="100%" stopColor="#1a1060" />
          </radialGradient>

          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4F7CFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4F7CFF" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="pupilGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#dde8ff" />
            <stop offset="60%" stopColor="#7aa3ff" />
            <stop offset="100%" stopColor="#0033cc" />
          </radialGradient>

          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <clipPath id="faceClip">
            <circle cx="100" cy="100" r="52" />
          </clipPath>
        </defs>

        {/* Ambient glow */}
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          fill="url(#glowGrad)"
          animate={{ r: [78, 86, 78], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Outer orbit ring */}
        <motion.ellipse
          cx="100"
          cy="100"
          rx="88"
          ry="22"
          fill="none"
          stroke="#4F7CFF"
          strokeWidth="1.5"
          strokeOpacity="0.35"
          animate={{ scale: ringScale, strokeOpacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "100px 100px", rotate: "-15deg" }}
        />

        {/* Inner orbit ring */}
        <motion.ellipse
          cx="100"
          cy="100"
          rx="75"
          ry="16"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="1"
          strokeOpacity="0.3"
          animate={{ scale: ringScale, strokeOpacity: [0.3, 0.5, 0.3] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          style={{ transformOrigin: "100px 100px", rotate: "20deg" }}
        />

        {/* Orbiting dot on outer ring */}
        <motion.circle
          cx="188"
          cy="100"
          r="4"
          fill="#4F7CFF"
          filter="url(#softGlow)"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        />

        {/* Orbiting dot on inner ring (opposite direction) */}
        <motion.circle
          cx="12"
          cy="100"
          r="3"
          fill="#8B5CF6"
          filter="url(#softGlow)"
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        />

        {/* Main sphere body */}
        <circle
          cx="100"
          cy="100"
          r="54"
          fill="url(#coreGrad)"
          filter="url(#glow)"
        />

        {/* Sphere sheen */}
        <ellipse
          cx="85"
          cy="80"
          rx="20"
          ry="14"
          fill="white"
          fillOpacity="0.12"
          clipPath="url(#faceClip)"
        />

        {/* Face panel — subtle frosted area */}
        <ellipse
          cx="100"
          cy="105"
          rx="36"
          ry="30"
          fill="#0a0a2e"
          fillOpacity="0.45"
          clipPath="url(#faceClip)"
        />

        {/* Eyes */}
        <motion.ellipse
          cx="84"
          cy="98"
          rx={eyeRx}
          ry={eyeRy}
          fill="url(#pupilGrad)"
          initial={{ opacity: 1 }}
          animate={{
            ry: eyesClosed ? 1 : [eyeRy, eyeRy, eyeRy, 1, eyeRy],
            opacity: eyesClosed ? 0.4 : 1,
          }}
          transition={{
            duration: eyesClosed ? 0.15 : 4,
            repeat: eyesClosed ? 0 : Infinity,
            times: eyesClosed ? undefined : [0, 0.8, 0.85, 0.9, 1],
            ease: "easeInOut",
          }}
          filter="url(#softGlow)"
        />
        <motion.ellipse
          cx="116"
          cy="98"
          rx={eyeRx}
          ry={eyeRy}
          fill="url(#pupilGrad)"
          initial={{ opacity: 1 }}
          animate={{
            ry: eyesClosed ? 1 : [eyeRy, eyeRy, eyeRy, 1, eyeRy],
            opacity: eyesClosed ? 0.4 : 1,
          }}
          transition={{
            duration: eyesClosed ? 0.15 : 4,
            repeat: eyesClosed ? 0 : Infinity,
            times: eyesClosed ? undefined : [0, 0.8, 0.85, 0.9, 1],
            ease: "easeInOut",
            delay: 0.05,
          }}
          filter="url(#softGlow)"
        />

        {/* Eye highlights */}
        {!eyesClosed && (
          <>
            <circle cx="81" cy="95" r="2" fill="white" fillOpacity="0.9" />
            <circle cx="113" cy="95" r="2" fill="white" fillOpacity="0.9" />
          </>
        )}

        {/* Mouth / expression */}
        {mood === "happy" || mood === "excited" ? (
          <motion.path
            d="M 88 113 Q 100 122 112 113"
            stroke="#7aa3ff"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            animate={{ d: ["M 88 113 Q 100 122 112 113", "M 88 112 Q 100 124 112 112", "M 88 113 Q 100 122 112 113"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : mood === "shy" ? (
          <path
            d="M 90 115 Q 100 118 110 115"
            stroke="#7aa3ff"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        ) : (
          <line
            x1="90"
            y1="115"
            x2="110"
            y2="115"
            stroke="#7aa3ff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}

        {/* Status dots — top of sphere */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={90 + i * 10}
            cy="57"
            r="3"
            fill={i === pulse ? "#a0bcff" : "#4F7CFF"}
            fillOpacity={i === pulse ? 1 : 0.4}
            animate={{ r: i === pulse ? [3, 4, 3] : 3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        ))}

        {/* Excited sparkles */}
        {mood === "excited" &&
          [0, 1, 2, 3].map((i) => {
            const angle = (i / 4) * Math.PI * 2 - Math.PI / 4;
            const r = 70;
            return (
              <motion.circle
                key={i}
                cx={100 + Math.cos(angle) * r}
                cy={100 + Math.sin(angle) * r}
                r="3"
                fill={i % 2 === 0 ? "#4F7CFF" : "#8B5CF6"}
                animate={{
                  scale: [0, 1.4, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut",
                }}
              />
            );
          })}
          {/* Left Arm */}
<motion.g
  animate={
    animation === "celebrate"
      ? { rotate: [-20, -50, -20] }
      : animation === "wave"
      ? { rotate: [-15, -25, -15] }
      : animation === "point"
      ? { rotate: [-5] }
      : { rotate: [-10, -15, -10] }
  }
  transition={{
    duration: 1,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  style={{
    transformOrigin: "58px 100px",
  }}
>
  {/* Upper Arm */}
  <line
    x1="58"
    y1="100"
    x2="38"
    y2="112"
    stroke="#4F7CFF"
    strokeWidth="4"
    strokeLinecap="round"
  />

  {/* Forearm */}
  <line
    x1="38"
    y1="112"
    x2="28"
    y2="126"
    stroke="#4F7CFF"
    strokeWidth="4"
    strokeLinecap="round"
  />

  {/* Hand */}
  <circle
    cx="28"
    cy="126"
    r="5"
    fill="#8B5CF6"
    filter="url(#softGlow)"
  />
</motion.g>
{/* Right Arm */}
<motion.g
  animate={
    animation === "wave"
      ? {
          rotate: [0, -45, 20, -45, 0],
        }
      : animation === "point"
      ? {
          rotate: [-55],
        }
      : animation === "celebrate"
      ? {
          rotate: [20, 60, 20],
        }
      : {
          rotate: [10, 15, 10],
        }
  }
  transition={{
    duration: animation === "wave" ? 0.8 : 1,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  style={{
    transformOrigin: "142px 100px",
  }}
>
  {/* Upper Arm */}
  <line
    x1="142"
    y1="100"
    x2="162"
    y2="112"
    stroke="#4F7CFF"
    strokeWidth="4"
    strokeLinecap="round"
  />

  {/* Forearm */}
  <line
    x1="162"
    y1="112"
    x2="172"
    y2="126"
    stroke="#4F7CFF"
    strokeWidth="4"
    strokeLinecap="round"
  />

  {/* Hand */}
  <circle
    cx="172"
    cy="126"
    r="5"
    fill="#8B5CF6"
    filter="url(#softGlow)"
  />
</motion.g>
      </svg>
    </motion.div>
  );
}
