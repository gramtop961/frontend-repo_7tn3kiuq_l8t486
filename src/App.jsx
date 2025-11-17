import { useRef, useState } from 'react'
import Hero from './components/Hero'
import OCRUploader from './components/OCRUploader'
import Solver from './components/Solver'
import Generator from './components/Generator'

function App() {
  const solverRef = useRef(null)
  const [showType, setShowType] = useState(false)
  const [initialLatex, setInitialLatex] = useState('')

  const handleUploadClick = () => {
    setShowType(false)
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }
  const handleTypeClick = () => {
    setShowType(true)
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  const onLaTeX = (latex) => {
    setInitialLatex(latex)
    setShowType(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="sticky top-0 backdrop-blur bg-white/70 border-b z-10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Mathimatikos.xyz</div>
          <nav className="text-sm text-gray-600 flex gap-4">
            <a href="#solve" className="hover:text-gray-900">Solve</a>
            <a href="#generate" className="hover:text-gray-900">Generate</a>
            <a href="/test" className="hover:text-gray-900">System</a>
          </nav>
        </div>
      </header>

      <Hero onUploadClick={handleUploadClick} onTypeClick={handleTypeClick} />

      <main className="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-6" id="solve">
        <OCRUploader onLaTeX={onLaTeX} />
        <Solver key={showType ? 'typed' : 'empty'} initialLatex={initialLatex} />
      </main>

      <section id="generate" className="max-w-6xl mx-auto px-6 pb-24">
        <Generator />
      </section>

      <footer className="border-t py-8 text-center text-sm text-gray-600">
        <p>Made with ❤️ to transform how math is learned, taught, and experienced. English • Ελληνικά</p>
      </footer>
    </div>
  )
}

export default App
