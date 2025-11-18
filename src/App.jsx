import { useRef, useState } from 'react'
import { Sigma, Image as ImageIcon, FileText, Sparkles } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 text-slate-900">
      <header className="sticky top-0 backdrop-blur bg-white/70 border-b z-10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-extrabold">
            <Sigma className="h-5 w-5 text-blue-600" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Mathimatikos.xyz</span>
          </div>
          <nav className="text-sm text-gray-600 flex gap-4">
            <a href="#ocr" className="hover:text-gray-900 flex items-center gap-1"><ImageIcon className="h-4 w-4"/>Image→LaTeX</a>
            <a href="#solve" className="hover:text-gray-900 flex items-center gap-1"><FileText className="h-4 w-4"/>Solve</a>
            <a href="#generate" className="hover:text-gray-900 flex items-center gap-1"><Sparkles className="h-4 w-4"/>Generate</a>
          </nav>
        </div>
      </header>

      <Hero onUploadClick={handleUploadClick} onTypeClick={handleTypeClick} />

      <section className="max-w-6xl mx-auto px-6 mt-2 grid grid-cols-1 lg:grid-cols-2 gap-6" id="ocr">
        <OCRUploader onLaTeX={onLaTeX} />
        <div className="hidden lg:block" aria-hidden>
          <div className="h-full rounded-xl bg-gradient-to-br from-white to-slate-50 border shadow-sm p-6 flex flex-col justify-center">
            <h4 className="text-slate-700 font-semibold mb-3 flex items-center gap-2"><ImageIcon className="h-5 w-5 text-blue-600"/>Clarity first</h4>
            <p className="text-slate-600 leading-relaxed">Upload a photo or paste a link. We detect the math and return clean LaTeX you can edit or send to the solver. Works in English and Greek.</p>
            <ul className="mt-4 text-sm text-slate-600 list-disc list-inside space-y-1">
              <li>Handwritten and printed notes</li>
              <li>Precise LaTeX output</li>
              <li>Language-aware OCR</li>
            </ul>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-6" id="solve">
        <Solver key={showType ? 'typed' : 'empty'} initialLatex={initialLatex} />
        <section id="generate" className="lg:col-start-2 lg:row-start-1">
          <Generator />
        </section>
      </main>

      <footer className="border-t py-8 text-center text-sm text-gray-600">
        <p>Made with ❤️ to transform how math is learned, taught, and experienced. English • Ελληνικά</p>
      </footer>
    </div>
  )
}

export default App
