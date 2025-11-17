import { useState } from 'react'

export default function Solver({ initialLatex = '' }) {
  const [latex, setLatex] = useState(initialLatex)
  const [language, setLanguage] = useState('en')
  const [grade, setGrade] = useState('')
  const [solution, setSolution] = useState('')
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
    if (!latex.trim()) {
      setError('Enter LaTeX or extract it via OCR')
      return
    }
    setLoading(true)
    try {
      const resp = await fetch(`${backend}/api/solve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latex, language, grade: grade || null })
      })
      if (!resp.ok) throw new Error(`Solve failed: ${resp.status}`)
      const data = await resp.json()
      setSolution(data.solution)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Solve & Explain</h3>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Problem (LaTeX)</label>
          <textarea value={latex} onChange={(e) => setLatex(e.target.value)} rows={6} className="mt-1 w-full border rounded px-3 py-2 font-mono" placeholder={String.raw`\\int_0^1 x^2\\,dx`} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Language</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-1 w-full border rounded px-3 py-2">
              <option value="en">English</option>
              <option value="el">Greek</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Grade (optional)</label>
            <input value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="e.g., high school" className="mt-1 w-full border rounded px-3 py-2" />
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading} className="px-5 py-2 rounded bg-purple-600 text-white disabled:opacity-60">
          {loading ? 'Thinking...' : 'Get Step-by-step Solution'}
        </button>
      </form>

      {solution && (
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Result</h4>
          <div className="prose max-w-none whitespace-pre-wrap bg-gray-50 p-4 rounded border">
            {solution}
          </div>
        </div>
      )}
    </div>
  )
}
