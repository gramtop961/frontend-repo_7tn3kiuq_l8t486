import { useState } from 'react'
import { motion } from 'framer-motion'

export default function OCRUploader({ onLaTeX }) {
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [language, setLanguage] = useState('en')
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
    if (!file && !imageUrl) {
      setError('Choose a file or provide an image URL')
      return
    }
    setLoading(true)
    try {
      const form = new FormData()
      if (file) form.append('file', file)
      if (imageUrl) form.append('image_url', imageUrl)
      form.append('language', language)

      const resp = await fetch(`${backend}/api/ocr`, { method: 'POST', body: form })
      if (!resp.ok) throw new Error(`OCR failed: ${resp.status}`)
      const data = await resp.json()
      onLaTeX(data.latex || '')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Image to LaTeX</h3>
      <form onSubmit={submit} className="space-y-4">
        <div className="group">
          <label className="block text-sm font-medium text-gray-700">Upload image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-1 block w-full transition focus:scale-[1.01]"
          />
        </div>
        <div className="group">
          <label className="block text-sm font-medium text-gray-700">...or Image URL</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            className="mt-1 w-full border rounded px-3 py-2 transition focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
          >
            <option value="en">English</option>
            <option value="el">Greek</option>
          </select>
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
          className="px-5 py-2 rounded bg-blue-600 text-white disabled:opacity-60 shadow-lg shadow-blue-600/20"
        >
          {loading ? 'Processing...' : 'Extract LaTeX'}
        </motion.button>
      </form>
    </motion.div>
  )
}
