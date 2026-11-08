import { catalogFetch } from '../lib/catalogFetch'
import { useEffect, useState } from 'react'
import HeroSection from '../components/HeroSection'
import ZoneCard from '../components/ZoneCard'

function Zones() {
  const [zones, setZones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchZones() {
      try {
        const response = await catalogFetch('http://localhost:3001/zones', {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error('Failed to load zones')
        const data = await response.json()
        if (!Array.isArray(data)) throw new Error('Invalid zones response')
        setZones(data)
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchZones()
    return () => controller.abort()
  }, [])

  return (
    <main>
      <HeroSection
        title={<>Destinations Defined by<br />Distinction</>}
        description="From the quiet pulse of the shoreline to the vibrant energy of the metropolitan center, explore our guide to the neighborhoods that mirror your ambition and your aesthetic."
        backgroundImage="/images/zones-hero.jpg"
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        {loading ? (
          <p className="text-center text-gray-600">Loading zones...</p>
        ) : error ? (
          <p role="alert" className="text-center text-red-700">
            {error}. Make sure JSON Server is running on port 3001.
          </p>
        ) : zones.length === 0 ? (
          <p className="text-center text-gray-600">No zones available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {zones.map((zone) => (
              <ZoneCard key={zone.id} zone={zone} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Zones
