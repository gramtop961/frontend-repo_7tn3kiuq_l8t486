import { motion } from 'framer-motion'

export default function Hero({ onUploadClick, onTypeClick }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <section className="relative pt-16 pb-12 overflow-hidden">
      {/* Decorative animated blobs */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="pointer-events-none select-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-blue-500/30 to-purple-500/30 blur-3xl"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.3, ease: 'easeOut', delay: 0.1 }}
        className="pointer-events-none select-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-400/30 to-cyan-400/30 blur-3xl"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto px-6 text-center"
      >
        <motion.h1
          variants={item}
          className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
        >
          Mathimatikos.xyz
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-4 text-lg md:text-xl text-gray-600"
        >
          AI-powered math learning in English and Greek. Upload notes or type a problem — get LaTeX, solutions, and exercises in real time.
        </motion.p>
        <motion.div variants={item} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={onUploadClick}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/20"
          >
            Upload Image / Screenshot
          </motion.button>
          <motion.button
            onClick={onTypeClick}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-lg bg-gray-900 hover:bg-black text-white font-semibold shadow-lg shadow-black/20"
          >
            Type a Problem
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
