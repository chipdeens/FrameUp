import Hero from '@/components/hero'
import ScrollableContent from '@/components/scrollable-content'
import ChatSection from '@/components/chat-section'
import CheckboxSection from '@/components/checkbox-section'
import LeadForm from '@/components/lead-form'
import Header from '@/components/header'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <main>
        <ScrollableContent />
        <ChatSection />
        <CheckboxSection />
        <LeadForm />
      </main>
    </>
  )
}

