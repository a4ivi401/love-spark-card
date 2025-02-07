
import { motion } from "framer-motion";
import { Heart } from "./Heart";
import { ScrollArea } from "./ui/scroll-area";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Background animation component
const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-pink-100/30"
          style={{
            width: Math.random() * 200 + 50,
            height: Math.random() * 200 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5 + i * 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

const AnimatedText = ({ text, highlight }: { text: string; highlight: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center px-6"
    >
      <p className="text-lg md:text-xl leading-relaxed max-w-lg text-center">
        {text.split(highlight).map((part, i, arr) => (
          <>
            {part}
            {i < arr.length - 1 && (
              <span className="text-valentine-pink font-medium">{highlight}</span>
            )}
          </>
        ))}
      </p>
    </motion.div>
  );
};

export const ValentineCard = () => {
  const sentences = [
    { text: "В этот особенный день я хочу сказать тебе", highlight: "особенный" },
    { text: "Ты делаешь каждый момент волшебным", highlight: "волшебным" },
    { text: "Твоя улыбка освещает мой мир", highlight: "освещает" },
    { text: "С тобой каждый день наполнен любовью", highlight: "любовью" },
  ];

  const finalMessageRef = useRef(null);
  const finalMessageInView = useInView(finalMessageRef, { once: true, amount: 0.3 });

  return (
    <ScrollArea className="h-screen">
      <div className="relative min-h-screen bg-white">
        <BackgroundAnimation />
        <div className="max-w-4xl mx-auto">
          {sentences.map((sentence, index) => (
            <AnimatedText key={index} {...sentence} />
          ))}

          <motion.div
            ref={finalMessageRef}
            initial={{ opacity: 0, y: 50 }}
            animate={finalMessageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen flex items-center justify-center px-6"
          >
            <div className="text-base md:text-lg text-gray-600 max-w-lg text-center">
              Пусть этот День святого Валентина будет наполнен
              <span className="text-valentine-pink"> нежностью </span>
              и
              <span className="text-valentine-pink"> теплом</span>. Ты - мое самое
              большое
              <span className="text-valentine-pink"> счастье</span>!
            </div>
          </motion.div>

          <div className="min-h-screen flex items-center justify-center">
            <Heart />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
