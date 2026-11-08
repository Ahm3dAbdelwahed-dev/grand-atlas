import { catalogFetch } from '../lib/catalogFetch'

import { useEffect, useState } from 'react'
import StatCard from './StatCard'

function StatsSection() {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchStats() {
      try {
        const response = await catalogFetch(
          'http://localhost:3001/stats',
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch statistics')
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('Invalid statistics data')
        }

        setStats(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchStats()

    return () => controller.abort()
  }, [])

  return (
    <section
      id="benchmarks"
      className="mx-auto max-w-7xl px-6 py-16"
    >
      <h2 className="mb-10 text-center font-serif text-3xl font-bold text-[#30282A]">
        Benchmarks of Success
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">
          Loading statistics...
        </p>
      ) : error ? (
        <p className="text-center text-red-600">
          Error: {error}
        </p>
      ) : stats.length === 0 ? (
        <p className="text-center text-gray-500">
          No statistics available.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default StatsSection
