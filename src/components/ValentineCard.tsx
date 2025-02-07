
import { motion } from "framer-motion";
import { Heart } from "./Heart";

export const ValentineCard = () => {
  const sentences = [
    { text: "В этот особенный день я хочу сказать тебе", highlight: "особенный" },
    { text: "Ты делаешь каждый момент волшебным", highlight: "волшебным" },
    { text: "Твоя улыбка освещает мой мир", highlight: "освещает" },
    { text: "С тобой каждый день наполнен любовью", highlight: "любовью" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="max-w-md w-full space-y-8 text-center"
      >
        <motion.div className="space-y-6">
          {sentences.map((sentence, index) => (
            <motion.p
              key={index}
              variants={item}
              className="text-lg md:text-xl leading-relaxed"
            >
              {sentence.text.split(sentence.highlight).map((part, i, arr) => (
                <>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="text-valentine-pink font-medium">
                      {sentence.highlight}
                    </span>
                  )}
                </>
              ))}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          variants={item}
          className="text-base md:text-lg text-gray-600 mt-8"
        >
          Пусть этот День святого Валентина будет наполнен
          <span className="text-valentine-pink"> нежностью </span>
          и
          <span className="text-valentine-pink"> теплом</span>. Ты - мое самое
          большое
          <span className="text-valentine-pink"> счастье</span>!
        </motion.div>

        <Heart />
      </motion.div>
    </div>
  );
};
