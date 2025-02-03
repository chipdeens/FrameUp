'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Lightbulb, FileText, Percent, Bell, Video } from 'lucide-react'

const features = [
  {
    title: 'Expert Guidance',
    description: 'Access insights and strategies for electrical, plumbing, and design to ensure your build is safe, efficient, and top-notch.',
    Icon: Lightbulb
  },
  {
    title: 'Tailored Resources',
    description: 'Receive custom plans, detailed diagrams, and exclusive web tools tailored to your unique project needs.',
    Icon: FileText
  },
  {
    title: 'Exclusive Discounts',
    description: 'Save big with insider pricing on materials and parts, hand-picked to meet your specifications.',
    Icon: Percent
  },
  {
    title: 'Proactive Support',
    description: 'Stay on track with regular check-ins, reminders, and progress updates designed to keep you motivated and moving forward.',
    Icon: Bell
  },
  {
    title: 'Personalized Assistance',
    description: 'Get instant, on-demand 1:1 video support to tackle challenges and receive real-time solutions.',
    Icon: Video
  }
]

export default function CheckboxSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const headerY = useTransform(scrollYProgress, [0, 0.1], [50, 0])

  return (
    <section ref={sectionRef} className="py-24 bg-[#1C1C1C] min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[640px] mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
            style={{ opacity: headerOpacity, y: headerY }}
          >
            <span className="text-[#FF4D00]">Unlock</span> Your Project's Potential
          </motion.h2>
          <div className="flex flex-col items-start space-y-8">
            {features.map(({ title, description, Icon }, index) => {
              const start = 0.1 + index * 0.05
              const end = start + 0.25

              const itemProgress = useTransform(scrollYProgress, [start, end], [0, 1])
              const itemOpacity = useTransform(itemProgress, [0, 1], [0, 1])
              const itemX = useTransform(itemProgress, [0, 1], [-20, 0])
              const itemScale = useTransform(itemProgress, [0, 1], [0.8, 1])

              return (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 w-full max-w-[560px]"
                  style={{ opacity: itemOpacity, x: itemX, scale: itemScale }}
                >
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2C2C2C] flex items-center justify-center mt-1"
                    style={{ scale: itemProgress }}
                  >
                    <Icon className="w-6 h-6 text-[#FF4D00]" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                    <p className="text-gray-300">{description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

