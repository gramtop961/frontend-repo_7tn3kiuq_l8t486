import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Generator() {
  const [topic, setTopic] = useState('Linear equations')
  const [count, setCount] = useState(5)
  const [difficulty, setDifficulty] = useState('mixed')
  const [language, setLanguage] = useState('en')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!backend) {
      setError('Backend URL not configured')
      return
    }
    setLoading(true)
    try {
      const resp = await fetch(`${backend}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, count: Number(count), difficulty, language })
      })
      if (!resp.ok) throw new Error(`Generation failed: ${resp.status}`)
      const data = await resp.json()
      setResult(data.exercises)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Generate Exercises</h3>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Topic</label>
          <input value={topic} onChange={(e) => setTopic(e.target.value)} className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition" placeholder="e.g., Quadratic equations" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Count</label>
            <input type="number" min={1} max={20} value={count} onChange={(e) => setCount(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Difficulty</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="mt-1 w-full border rounded px-3 py-2">
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
              <option value="mixed">mixed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Language</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-1 w-full border rounded px-3 py-2">
              <option value="en">English</option>
              <option value="el">Greek</option>
            </select>
          </div>
        </div>
        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-600">
            {error}
          </motion.p>
        )}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2 rounded bg-emerald-600 text-white disabled:opacity-60 shadow-lg shadow-emerald-600/20"
        >
          {loading ? 'Generating...' : 'Generate Set'}
        </motion.button>
      </form>
      <AnimatePresence>
        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35 }}
            className="mt-6"
          >
            <h4 className="font-semibold mb-2">Exercises</h4>
            <motion.div layout className="prose max-w-none whitespace-pre-wrap bg-gray-50 p-4 rounded border">
              {result}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
