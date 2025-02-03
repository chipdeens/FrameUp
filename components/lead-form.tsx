'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vision: '',
  })
  const [showPricing, setShowPricing] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowPricing(true)
    // Here you would typically send the form data to your backend
    console.log(formData)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with Stripe for payment processing
    console.log('Subscribing user:', formData)
  }

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const headerY = useTransform(scrollYProgress, [0, 0.2], [50, 0])

  const formOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const formY = useTransform(scrollYProgress, [0.2, 0.4], [50, 0])

  return (
    <section ref={sectionRef} className="py-24 bg-[#1C1C1C]">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <span className="text-[#FF4D00]">Start</span> Your Next Project
        </motion.h2>
        <motion.div 
          className="max-w-md mx-auto relative"
          style={{ opacity: formOpacity, y: formY }}
        >
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full rounded-lg animate-pulse-outline"></div>
          </div>
          <div className="relative z-10">
            {!showPricing ? (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-[#2C2C2C] p-6 rounded-lg"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-[#3B3B3D] text-white border border-gray-600 focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-[#3B3B3D] text-white border border-gray-600 focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="vision" className="block text-sm font-medium text-gray-300 mb-1">Your Vision</label>
                  <textarea
                    id="vision"
                    name="vision"
                    required
                    value={formData.vision}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-md bg-[#3B3B3D] text-white border border-gray-600 focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] outline-none resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 text-lg font-bold text-white bg-[#FF4D00] rounded-md 
                    shadow-[0_4px_0_#CC3D00] hover:shadow-[0_6px_0_#CC3D00] hover:-translate-y-[2px] 
                    active:shadow-[0_0px_0_#CC3D00] active:translate-y-[4px] 
                    transition-all duration-150 ease-in-out"
                >
                  Start Building
                </button>
              </form>
            ) : (
              <div
                className="bg-[#2C2C2C] p-6 rounded-lg"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Vision?</h3>
                <p className="text-gray-300 mb-6">Get started with our premium coaching for just $40/month.</p>
                <ul className="text-gray-300 mb-6 space-y-2">
                  <li>✓ 24/7 Access to Expert Coaches</li>
                  <li>✓ Personalized Build Plans</li>
                  <li>✓ Exclusive Discounts on Materials</li>
                  <li>✓ Community Support</li>
                </ul>
                <form onSubmit={handleSubscribe}>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-lg font-bold text-white bg-[#FF4D00] rounded-md 
                      shadow-[0_4px_0_#CC3D00] hover:shadow-[0_6px_0_#CC3D00] hover:-translate-y-[2px] 
                      active:shadow-[0_0px_0_#CC3D00] active:translate-y-[4px] 
                      transition-all duration-150 ease-in-out"
                  >
                    Subscribe Now
                  </button>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

