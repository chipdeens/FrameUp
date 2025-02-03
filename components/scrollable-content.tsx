'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const phrases = [
  'dream it.',
  'visualize it.',
  'design it.',
  'plan it.',
  'start it.',
  'create it.',
  'build it.',
  'modify it.',
  'learn it.',
  'simplify it.',
  'push it.',
  'collaborate.',
  'iterate.',
  'innovate.',
  'refine it.',
  'live it.',
  'love it.',
  'do it.'
]

const getColor = (index: number) => {
  if (index === 0) return '#FF4D00' // First item (dream it.) in orange
  if (index === phrases.length - 1) return 'white' // Last item stays white
  const hue = 16 + (index * (200 - 16) / (phrases.length - 2))
  return `hsl(${hue}, 100%, 50%)`
}

export default function ScrollableContent() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<(HTMLLIElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!sectionRef.current) return

    const items = itemsRef.current.filter(Boolean) as HTMLLIElement[]

    items.forEach((item, index) => {
      gsap.set(item, { 
        opacity: index === 0 ? 1 : 0.2, 
        color: getColor(index),
        immediateRender: true
      })

      ScrollTrigger.create({
        trigger: item,
        start: 'top center+=2lh',
        end: 'bottom center-=2lh',
        onUpdate: (self) => {
          const progress = self.progress;
          let opacity;
          if (index === phrases.length - 1) {
            // "do it" stays at full opacity
            opacity = 1;
          } else if (progress < 0.3) {
            opacity = gsap.utils.clamp(0.2, 1, progress / 0.3);
          } else if (progress > 0.7) {
            opacity = gsap.utils.clamp(0.2, 1, (1 - progress) / 0.3);
          } else {
            opacity = 1;
          }
          gsap.to(item, {
            opacity: opacity,
            duration: 0.1,
            ease: 'none'
          });
        }
      })
    })

    gsap.to('html', {
      '--scroller': 'var(--end)',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        scrub: 0.1,
        start: 'top center-=1lh',
        end: 'bottom center+=1lh'
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="content fluid bg-[#1C1C1C]">
      <h2>
        <span aria-hidden="true">you can&nbsp;</span>
        <span className="sr-only">you can ship things.</span>
      </h2>
      <ul aria-hidden="true" style={{ '--count': phrases.length } as React.CSSProperties}>
        {phrases.map((phrase, index) => (
          <li
            key={index}
            ref={el => itemsRef.current[index] = el}
            style={{ '--i': index, color: getColor(index) } as React.CSSProperties}
          >
            {phrase}
          </li>
        ))}
      </ul>
    </section>
  )
}

