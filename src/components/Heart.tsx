
import { motion } from "framer-motion";

export const Heart = () => {
  return (
    <motion.div
      className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mt-8"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      <div className="absolute inset-0 animate-heartbeat">
        <svg
          viewBox="0 0 32 32"
          className="w-full h-full fill-current text-transparent"
          style={{
            filter: "drop-shadow(0 0 10px rgba(255, 20, 147, 0.3))",
          }}
        >
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF1493" />
              <stop offset="100%" stopColor="#FF69B4" />
            </linearGradient>
          </defs>
          <path
            fill="url(#heartGradient)"
            d="M16 28.4L14.3 26.8C7.4 20.5 3 16.5 3 11.6C3 7.6 6.2 4.4 10.2 4.4C12.4 4.4 14.5 5.5 16 7.3C17.5 5.5 19.6 4.4 21.8 4.4C25.8 4.4 29 7.6 29 11.6C29 16.5 24.6 20.5 17.7 26.8L16 28.4Z"
          />
        </svg>
      </div>
    </motion.div>
  );
};
