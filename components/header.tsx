import Logo from './logo'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1C1C1C] shadow-md">
      <div className="container mx-auto px-6 py-4">
        <Logo />
      </div>
    </header>
  )
}

