import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const ImagePage = () => {
	const navigate = useNavigate()

	return (
		<div className='min-h-screen relative'>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				className='w-full h-screen'
			>
				<img
					src='/Mosaically-Untitled-_1_.png'
					alt=''
					className='w-full h-full object-cover'
				/>
			</motion.div>
			<Button
				variant='outline'
				className='absolute top-4 left-4 bg-white/80 hover:bg-white'
				onClick={() => navigate('/')}
			>
				Назад
			</Button>
		</div>
	)
}

export default ImagePage
