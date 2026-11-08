import { catalogFetch } from '../lib/catalogFetch'

import { useEffect, useState } from 'react'
import PropertyCard from './PropertyCard'

function FeaturedProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProperties() {
      try {
        const response = await catalogFetch(
          'http://localhost:3001/featuredProperties',
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch properties')
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('Invalid properties data')
        }

        setProperties(data)

      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchProperties()

    return () => controller.abort()
  }, [])

  return (
    <section className="bg-white px-6 py-16">

      <div className="mx-auto max-w-7xl">

        {/* Section Title */}
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold text-[#30282A]">
            Hand-Selected Masterpieces
          </h2>

          <div className="mx-auto mt-3 h-[2px] w-24 bg-[#8B1E2D]"></div>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">
            Loading properties...
          </p>
        )}

        {/* Error */}
        {error && !loading && (
          <p className="text-center text-red-600">
            {error}
          </p>
        )}

        {/* Dynamic Property Cards */}
        {!loading && !error && (
          properties.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

              {properties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  index={index}
                />
              ))}

            </div>
          ) : (
            <p className="text-center text-gray-500">
              No properties available.
            </p>
          )
        )}

      </div>

    </section>
  )
}

export default FeaturedProperties
