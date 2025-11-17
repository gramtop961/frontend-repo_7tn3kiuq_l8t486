import { motion } from 'framer-motion'

export default function Hero({ onUploadClick, onTypeClick }) {
  return (
    <section className="pt-16 pb-10">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
        >
          Mathimatikos.xyz
        </motion.h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          AI-powered math learning in English and Greek. Upload notes or type a problem — get LaTeX, solutions, and exercises in real time.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={onUploadClick} className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow">
            Upload Image / Screenshot
          </button>
          <button onClick={onTypeClick} className="px-6 py-3 rounded-lg bg-gray-900 hover:bg-black text-white font-semibold shadow">
            Type a Problem
          </button>
        </div>
      </div>
    </section>
  )
}
