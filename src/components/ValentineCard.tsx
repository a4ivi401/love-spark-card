
import { motion } from "framer-motion";
import { Heart } from "./Heart";
import { ScrollArea } from "./ui/scroll-area";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AnimatedText = ({ text, highlight }: { text: string; highlight: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="min-h-[50vh] flex items-center justify-center"
    >
      <p className="text-lg md:text-xl leading-relaxed">
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
  const finalMessageInView = useInView(finalMessageRef, { once: true, amount: 0.5 });

  return (
    <ScrollArea className="h-screen">
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-md mx-auto space-y-8">
          {sentences.map((sentence, index) => (
            <AnimatedText key={index} {...sentence} />
          ))}

          <motion.div
            ref={finalMessageRef}
            initial={{ opacity: 0, y: 50 }}
            animate={finalMessageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="min-h-[50vh] flex items-center justify-center"
          >
            <div className="text-base md:text-lg text-gray-600">
              Пусть этот День святого Валентина будет наполнен
              <span className="text-valentine-pink"> нежностью </span>
              и
              <span className="text-valentine-pink"> теплом</span>. Ты - мое самое
              большое
              <span className="text-valentine-pink"> счастье</span>!
            </div>
          </motion.div>

          <Heart />
        </div>
      </div>
    </ScrollArea>
  );
};
