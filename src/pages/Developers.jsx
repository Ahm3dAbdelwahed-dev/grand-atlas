import { catalogFetch } from '../lib/catalogFetch'
import { useEffect, useState } from 'react'
import HeroSection from '../components/HeroSection'
import DeveloperCard from '../components/DeveloperCard'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function Developers() {
  const [developers, setDevelopers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadDevelopers() {
      try {
        const response = await catalogFetch(`${API_BASE}/developers`, { signal: controller.signal })
        if (!response.ok) throw new Error('Could not load developers')
        const data = await response.json()
        if (!Array.isArray(data)) throw new Error('Invalid developers response')
        if (!controller.signal.aborted) setDevelopers(data)
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message || 'Unable to load developers')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadDevelopers()
    return () => controller.abort()
  }, [])

  return (
    <main>
      <HeroSection
        title={<>Defining the Future<br />Skyline.</>}
        description="Great developments require more than just capital; they require a narrative. We provide the elite marketing and specialized brokerage services needed to position your landmark projects in front of the world's most discerning buyers."
        backgroundImage="/images/developers-hero.jpg"
      />

      <section aria-label="Developers" className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20">
        {loading ? (
          <p className="text-center text-gray-500">Loading developers...</p>
        ) : error ? (
          <p role="alert" className="text-center text-red-600">{error}</p>
        ) : developers.length === 0 ? (
          <p className="text-center text-gray-500">No developers available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {developers.map((developer) => (
              <DeveloperCard key={developer.id} developer={developer} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Developers
