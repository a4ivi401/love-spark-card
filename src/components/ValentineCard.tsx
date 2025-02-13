import { motion, useAnimate } from "framer-motion";
import { Heart } from "./Heart";
import { ScrollArea } from "./ui/scroll-area";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

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
      className="min-h-screen flex items-center justify-center px-6 snap-center"
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

const FlyingHeart = ({ x, y, scale }: { x: number; y: number; scale: number }) => (
  <motion.div
    className="absolute text-valentine-pink"
    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
    animate={{
      x: x,
      y: y,
      opacity: 0,
      scale: scale,
    }}
    transition={{ duration: 1.5, ease: "easeOut" }}
  >
    ❤️
  </motion.div>
);

export const ValentineCard = () => {
  const sentences = [
    { text: "В этот особенный день я хочу сказать тебе", highlight: "особенный" },
    { text: "Ты делаешь каждый момент волшебным", highlight: "волшебным" },
    { text: "Твоя улыбка освещает мой мир", highlight: "освещает" },
    { text: "С тобой каждый день наполнен любовью", highlight: "любовью" },
  ];

  const finalMessageRef = useRef(null);
  const finalMessageInView = useInView(finalMessageRef, { once: true, amount: 0.3 });
  const [scope, animate] = useAnimate();
  const [hearts, setHearts] = useState<React.ReactNode[]>([]);

  const createHearts = () => {
    const newHearts = [];
    for (let i = 0; i < 15; i++) {
      const randomX = (Math.random() - 0.5) * 200;
      const randomY = Math.random() * -150;
      const scale = Math.random() * 0.5 + 0.5;
      newHearts.push(
        <FlyingHeart key={`heart-${Date.now()}-${i}`} x={randomX} y={randomY} scale={scale} />
      );
    }
    setHearts(newHearts);
    setTimeout(() => setHearts([]), 1500); // Очищаем сердечки после анимации
  };

  return (
    <ScrollArea className="h-screen">
      <div className="relative min-h-screen bg-white snap-y snap-mandatory overflow-y-auto">
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
            className="min-h-screen flex items-center justify-center px-6 snap-center"
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

          <div className="min-h-screen flex items-center justify-center snap-center">
            <Heart />
          </div>

          <div className="min-h-screen flex flex-col items-center justify-center snap-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-center relative"
              ref={scope}
            >
              Я тебя{" "}
              <span 
                className="text-valentine-pink cursor-pointer relative"
                onClick={() => {
                  animate(scope.current, { scale: [1, 1.1, 1] }, { duration: 0.3 });
                  createHearts();
                }}
              >
                люблю
                {hearts}
              </span>
            </motion.div>
          </div>

          <motion.div 
            className="min-h-screen w-full snap-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div 
              className="w-full h-screen bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/lovable-uploads/91719634-0c6e-4dc0-a6f9-a892bdd6ee38.png')",
              }}
            />
          </motion.div>
        </div>
      </div>
    </ScrollArea>
  );
};
