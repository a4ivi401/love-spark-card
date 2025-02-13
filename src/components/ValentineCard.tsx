import { motion, useAnimate } from 'framer-motion'
import { Heart } from './Heart'
import { ScrollArea } from './ui/scroll-area'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const BackgroundAnimation = () => {
	return (
		<div className='fixed inset-0 -z-10'>
			{[...Array(3)].map((_, i) => (
				<motion.div
					key={i}
					className='absolute rounded-full bg-pink-100/30'
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
						repeatType: 'reverse',
					}}
				/>
			))}
		</div>
	)
}

const AnimatedText = ({
	text,
	highlight,
}: {
	text: string
	highlight: string
}) => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.3 })

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.8, ease: 'easeOut' }}
			className='min-h-screen flex items-center justify-center px-6 snap-center'
		>
			<p className='text-lg md:text-xl leading-relaxed max-w-lg text-center'>
				{text.split(highlight).map((part, i, arr) => (
					<>
						{part}
						{i < arr.length - 1 && (
							<span className='text-valentine-pink font-medium'>
								{highlight}
							</span>
						)}
					</>
				))}
			</p>
		</motion.div>
	)
}

const FlyingHeart = ({
	x,
	y,
	scale,
}: {
	x: number
	y: number
	scale: number
}) => (
	<motion.div
		className='absolute text-valentine-pink'
		initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
		animate={{
			x: x,
			y: y,
			opacity: 0,
			scale: scale,
		}}
		transition={{ duration: 1.5, ease: 'easeOut' }}
	>
		❤️
	</motion.div>
)

export const ValentineCard = () => {
	const navigate = useNavigate()
	const sentences = [
		{
			text: 'Привет! У меня есть для тебя парочку слов. Дочитай пожалуйста..',
			highlight: 'Привет!',
		},
		{
			text: 'Сегодня особенная дата.. мне хочется во всем признатся, сказать много слов, спеть много песен. Но я постараюсь быть краток...',
			highlight: 'особенная',
		},
		{
			text: '... этот день особенный и пусть отныне и на век тебя обходят темные тучи которые не дают тебе дарить радость себе и окружающим. Ты мой самый дорогой лучик в жизни который мне повезло поймать. Я безумно горжусь тобой, твоя смелость, упорство, ум и красота вдохновляют меня каждый день просыпатся и становится лучше. Каждый момент проведенный вместе отпечатался в нашей памяти светлым лучём.',
			highlight: 'особенный',
		},
		{
			text: 'Спасибо тебе за все уделенное время, за все счасливые моменты, за божественные мемы, за шикарные песни. Спасибо тебе, что стала частью моей жизни, островком надежды, нежности и тепла. Спасибо!',
			highlight: 'Спасибо',
		},
	]

	const finalMessageRef = useRef(null)
	const finalMessageInView = useInView(finalMessageRef, {
		once: true,
		amount: 0.3,
	})
	const [scope, animate] = useAnimate()
	const [hearts, setHearts] = useState<React.ReactNode[]>([])

	const createHearts = () => {
		const newHearts = []
		for (let i = 0; i < 15; i++) {
			const randomX = (Math.random() - 0.5) * 200
			const randomY = Math.random() * -150
			const scale = Math.random() * 0.5 + 0.5
			newHearts.push(
				<FlyingHeart
					key={`heart-${Date.now()}-${i}`}
					x={randomX}
					y={randomY}
					scale={scale}
				/>
			)
		}
		setHearts(newHearts)
		setTimeout(() => setHearts([]), 1500)
	}

	return (
		<ScrollArea className='h-screen'>
			<div className='relative min-h-screen bg-white snap-y snap-mandatory overflow-y-auto'>
				<BackgroundAnimation />
				<div className='max-w-4xl mx-auto'>
					{sentences.map((sentence, index) => (
						<AnimatedText key={index} {...sentence} />
					))}

					<motion.div
						ref={finalMessageRef}
						initial={{ opacity: 0, y: 50 }}
						animate={
							finalMessageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
						}
						transition={{ duration: 0.8, ease: 'easeOut' }}
						className='min-h-screen flex items-center justify-center px-6 snap-center'
					>
						<div className='text-base md:text-lg text-gray-600 max-w-lg text-center'>
							Пусть этот День святого Валентина будет наполнен
							<span className='text-valentine-pink'> нежностью </span>и
							<span className='text-valentine-pink'> теплом</span>. Ты - мое
							самое большое
							<span className='text-valentine-pink'> счастье</span>!
						</div>
					</motion.div>

					<div className='min-h-screen flex items-center justify-center snap-center'>
						<Heart />
					</div>

					<div className='min-h-screen flex flex-col items-center justify-center gap-8 snap-center'>
						<motion.div
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, delay: 0.3 }}
							className='text-4xl md:text-6xl font-bold text-center relative'
							ref={scope}
						>
							Я тебя{' '}
							<span
								className='text-valentine-pink cursor-pointer relative'
								onClick={() => {
									animate(
										scope.current,
										{ scale: [1, 1.1, 1] },
										{ duration: 0.3 }
									)
									createHearts()
								}}
							>
								люблю
								{hearts}
							</span>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
						>
							<Button
								className='bg-valentine-pink hover:bg-valentine-pink/90 text-white'
								onClick={() => navigate('/image')}
							>
								Открыть сюрприз ❤️
							</Button>
						</motion.div>
					</div>
				</div>
			</div>
		</ScrollArea>
	)
}
