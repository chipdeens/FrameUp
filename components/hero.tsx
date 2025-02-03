'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Truck, Caravan, Bus, Sun, Power, ChevronLeft, ChevronRight } from 'lucide-react'

const phrases = [
  { text: 'Tiny Home', Icon: Home },
  { text: 'Van', Icon: Truck },
  { text: 'Trailer', Icon: Caravan },
  { text: 'Bus', Icon: Bus },
  { text: 'Solar', Icon: Sun },
  { text: 'Off-Grid', Icon: Power },
]

const slideAnimation = {
  initial: (direction: number) => ({ 
    x: direction > 0 ? 50 : -50, 
    opacity: 0 
  }),
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 2000,
      damping: 30,
      mass: 0.5,
      velocity: 10
    }
  },
  exit: (direction: number) => ({ 
    x: direction > 0 ? -50 : 50, 
    opacity: 0,
    transition: { 
      type: "spring",
      stiffness: 2000,
      damping: 30,
      mass: 0.5,
      velocity: 10
    }
  })
}

export default function Hero() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isAutoPlay) {
      interval = setInterval(() => {
        setDirection(1)
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
      }, 3000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlay])

  const handleNext = () => {
    setIsAutoPlay(false)
    setDirection(1)
    setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
  }

  const handlePrev = () => {
    setIsAutoPlay(false)
    setDirection(-1)
    setCurrentPhraseIndex((prevIndex) => (prevIndex - 1 + phrases.length) % phrases.length)
  }

  const CurrentIcon = phrases[currentPhraseIndex].Icon

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col bg-[#1C1C1C]">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="flex flex-col items-center text-5xl md:text-7xl font-bold tracking-tight text-white space-y-6">
            <span className="text-white">Your Personal</span>
            <div className="flex items-center justify-center w-full">
              <div className="flex items-center justify-between w-[380px] md:w-[720px]">
                <button
                  onClick={handlePrev}
                  className="text-[#FF4D00] hover:text-[#FF6633] transition-colors"
                  aria-label="Previous term"
                >
                  <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
                </button>
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={currentPhraseIndex}
                    custom={direction}
                    variants={slideAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex items-center gap-4 text-[#FF4D00] w-[260px] md:w-[500px] justify-center whitespace-nowrap"
                  >
                    <span className="text-5xl md:text-7xl">{phrases[currentPhraseIndex].text}</span>
                    <CurrentIcon className="w-12 h-12 md:w-16 md:h-16 text-[#FF4D00] flex-shrink-0" />
                  </motion.div>
                </AnimatePresence>
                <button
                  onClick={handleNext}
                  className="text-[#FF4D00] hover:text-[#FF6633] transition-colors"
                  aria-label="Next term"
                >
                  <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
                </button>
              </div>
            </div>
            <span className="text-white">Build Coach</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#8B8B8B] mt-6">
            Available 24/7
          </p>
          <button 
            className="mt-8 px-5 py-2 text-lg font-bold text-white bg-[#FF4D00] border border-[#FF6633] 
              rounded-md relative cursor-pointer
              shadow-[0_6px_0_#CC3D00]
              transition-all duration-100 ease-in-out
              hover:brightness-110
              active:shadow-[0_2px_0_#CC3D00] active:translate-y-1"
          >
            Start Building
          </button>
        </div>
      </div>
    </div>
  )
}

