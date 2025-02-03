'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Users } from 'lucide-react'

const messages = [
  {
    sender: 'Coach',
    text: "Hi there! I'm FrameUp, your on-demand build coach, available 24/7. Sounds like you want to build a tiny home?",
    time: '10:51 AM'
  },
  {
    sender: 'User',
    text: "I want to build a tiny home I can live full-time while traveling the country.",
    time: '10:52 AM'
  },
  {
    sender: 'Coach',
    text: "Amazing! Do you envision something minimalist, or do you need room for work, cooking, and hobbies? Let's paint a clear picture together.",
    time: '10:52 AM'
  },
  {
    sender: 'User',
    text: "I don't even know where to start.",
    time: '10:53 AM'
  },
  {
    sender: 'Coach',
    text: "Let's start with your budget. How much are you planning to spend? Then we'll break it into phases: making a budget, designing the layout, and building step by step.",
    time: '10:53 AM'
  },
  {
    sender: 'User',
    text: "I haven't done anything this week.",
    time: '10:54 AM'
  },
  {
    sender: 'Coach',
    text: "No worries! Let's start small. Can you make a list of all the features you'd want? That'll get the ball rolling.",
    time: '10:54 AM'
  },
  {
    sender: 'User',
    text: "I'm overwhelmed with how to tackle solar. How much solar do I need? Where do I even get the parts?",
    time: '10:55 AM'
  },
  {
    sender: 'Coach',
    text: "No problem! We can use this energy calculator to help you figure out exactly how much solar power you'll need. I'll also send you a materials list to build the system, along with discounts on solar panels, batteries, and wiring. Want me to walk you through it?",
    time: '10:55 AM'
  },
  {
    sender: 'Coach',
    isLink: true,
    text: "Energy Calculator & Materials List",
    time: '10:55 AM'
  },
  {
    sender: 'User',
    text: "Can I run the air conditioning off my solar?",
    time: '10:56 AM'
  },
  {
    sender: 'Coach',
    text: "Yes! Let me connect you with one of our expert builders to guide you through it step by step!",
    time: '10:56 AM'
  },
  {
    sender: 'Coach',
    isLink: true,
    text: "Expert Builder Connection",
    time: '10:56 AM'
  }
]

export default function ChatSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const sectionElement = sectionRef.current
    const scrollElement = scrollRef.current
    if (!sectionElement || !scrollElement) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(sectionElement)

    const handleMainScroll = () => {
      if (!isVisible || !scrollElement) return

      const sectionRect = sectionElement.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const sectionHeight = sectionElement.offsetHeight
      
      // Calculate the progress of the section through the viewport
      let progress = (viewportHeight - sectionRect.top) / (viewportHeight + sectionHeight)
      progress = Math.max(0, Math.min(1, progress))

      // Calculate the target scroll position for the chat
      const maxScroll = scrollElement.scrollHeight - scrollElement.clientHeight
      const targetScrollTop = maxScroll * progress

      // Scroll to the calculated position
      scrollElement.scrollTop = targetScrollTop
    }

    window.addEventListener('scroll', handleMainScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleMainScroll)
    }
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-24 bg-[#1C1C1C] min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          <span className="text-[#FF4D00]">Chat</span> with Your Build Coach
        </h2>
        <div className="max-w-2xl mx-auto bg-[#2C2C2C] rounded-lg shadow-xl overflow-hidden">
          <div 
            ref={scrollRef}
            className="h-[400px] overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300"
          >
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.sender === 'User' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-[80%] space-y-1">
                  <div 
                    className={`rounded-lg px-4 py-2 text-white break-words
                      ${message.sender === 'User' 
                        ? 'bg-[#26A94A]' 
                        : message.isLink 
                          ? 'bg-[#3D3D3D] border border-gray-600 hover:bg-[#4D4D4D] cursor-pointer transition-colors duration-200'
                          : 'bg-[#3B3B3D]'
                      }`}
                  >
                    {message.isLink ? (
                      <div className="flex items-center space-x-2">
                        {message.text.includes("Energy Calculator") ? (
                          <Calculator className="w-5 h-5 text-[#FF4D00]" />
                        ) : (
                          <Users className="w-5 h-5 text-[#FF4D00]" />
                        )}
                        <span>{message.text}</span>
                      </div>
                    ) : (
                      message.text
                    )}
                  </div>
                  <div className="text-xs text-gray-400 px-2">{message.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

