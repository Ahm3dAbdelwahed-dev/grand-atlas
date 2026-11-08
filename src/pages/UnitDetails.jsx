import { catalogFetch } from '../lib/catalogFetch'

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function UnitDetails() {
  const { id } = useParams()

  const [unit, setUnit] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchUnit() {
      setLoading(true)
      setError('')

      try {
        const response = await catalogFetch(
          `http://localhost:3001/units/${id}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Unit not found')
        }

        const data = await response.json()
        setUnit(data)
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

    fetchUnit()

    return () => controller.abort()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-[60vh] p-10 text-center">
        Loading unit details...
      </main>
    )
  }

  if (error || !unit) {
    return (
      <main className="min-h-[60vh] p-10 text-center">
        <p className="text-red-600">{error || 'Unit not found'}</p>
        <Link to="/units" className="mt-4 inline-block text-[#8B1E2D]">
          Back to Units
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      <Link to="/units" className="text-sm text-[#8B1E2D]">
        ← Back to Units
      </Link>

      {/* Main Property Image */}
      <img
        src={unit.image}
        alt={unit.title}
        className="mt-6 h-[300px] w-full rounded-xl object-cover md:h-[480px]"
      />

      {/* Title & Price */}
      <div className="mt-8 flex flex-wrap items-start justify-between gap-5">

        <div>
          <h1 className="font-serif text-3xl font-bold text-[#8B1E2D]">
            {unit.title}
          </h1>

          <p className="mt-2 text-gray-500">
            {unit.zone} | {unit.project}
          </p>
        </div>

        <p className="text-2xl font-bold text-[#8B1E2D]">
          {Number(unit.price).toLocaleString('en-EG')} EGP
        </p>

      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">

        {/* At a Glance */}
        <div>
          <h2 className="mb-6 text-xl font-bold">
            At a Glance
          </h2>

          <ul className="space-y-4 text-gray-600">
            <li>Bedrooms: {unit.bedrooms}</li>
            <li>Bathrooms: {unit.bathrooms}</li>
            <li>Area: {unit.area} m²</li>
            <li>Status: {unit.status}</li>
            <li>Developer: {unit.developer}</li>
            <li>Project: {unit.project}</li>
          </ul>
        </div>

        {/* Overview */}
        <div>
          <h2 className="mb-6 text-xl font-bold">
            Overview
          </h2>

          <p className="leading-8 text-gray-600">
            {unit.description}
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-block rounded bg-[#8B1E2D] px-10 py-3 text-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  )
}

export default UnitDetails
