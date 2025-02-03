import { Home } from 'lucide-react'

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Home className="w-8 h-8 text-white" />
      <span className="text-2xl font-bold text-white">FrameUp</span>
    </div>
  )
}

