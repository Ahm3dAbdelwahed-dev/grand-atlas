import { catalogFetch } from '../lib/catalogFetch'

import { useEffect, useMemo, useState } from 'react'
import HeroSection from '../components/HeroSection'
import UnitCard from '../components/UnitCard'
import unitsHero from '../assets/images/units-hero.png'

const initialFilters = {
  search: '',
  bedrooms: '',
  developer: '',
  zone: '',
  project: '',
  status: '',
  priceRange: '',
}

const priceOptions = [
  { value: '', label: 'All Prices' },
  { value: 'under50', label: 'Under 50,000 EGP' },
  { value: '50to100', label: '50,000 - 100,000 EGP' },
  { value: 'over100', label: 'Over 100,000 EGP' },
]

function Units() {
  const [units, setUnits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [draftFilters, setDraftFilters] = useState(initialFilters)
  const [activeFilters, setActiveFilters] = useState(initialFilters)

  // Fetch units from API
  useEffect(() => {
    const controller = new AbortController()

    async function fetchUnits() {
      try {
        const response = await catalogFetch(
          'http://localhost:3001/units',
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch units')
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('Invalid units data')
        }

        setUnits(data)
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

    fetchUnits()

    return () => controller.abort()
  }, [])

  // Update filter field
  function handleFilterChange(event) {
    const { name, value } = event.target

    setDraftFilters((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  // Apply filters on Search
  function handleSearch(event) {
    event.preventDefault()
    setActiveFilters({ ...draftFilters })
  }

  // Reset filters
  function handleReset() {
    setDraftFilters({ ...initialFilters })
    setActiveFilters({ ...initialFilters })
  }

  // Get unique dropdown options from API data
  function getOptions(field) {
    return [...new Set(units.map((unit) => unit[field]))]
      .filter((value) => value !== null && value !== undefined && value !== '')
      .sort((a, b) => String(a).localeCompare(String(b)))
  }

  // Filter API results
  const filteredUnits = useMemo(() => {
    return units.filter((unit) => {
      const f = activeFilters

      const matchesSearch = unit.title
        .toLowerCase()
        .includes(f.search.toLowerCase().trim())

      const matchesBedrooms =
        !f.bedrooms || Number(unit.bedrooms) === Number(f.bedrooms)

      const matchesDeveloper =
        !f.developer || unit.developer === f.developer

      const matchesZone =
        !f.zone || unit.zone === f.zone

      const matchesProject =
        !f.project || unit.project === f.project

      const matchesStatus =
        !f.status || unit.status === f.status

      const price = Number(unit.price)

      let matchesPrice = true

      if (f.priceRange === 'under50') {
        matchesPrice = price < 50000
      } else if (f.priceRange === '50to100') {
        matchesPrice = price >= 50000 && price <= 100000
      } else if (f.priceRange === 'over100') {
        matchesPrice = price > 100000
      }

      return (
        matchesSearch &&
        matchesBedrooms &&
        matchesDeveloper &&
        matchesZone &&
        matchesProject &&
        matchesStatus &&
        matchesPrice
      )
    })
  }, [units, activeFilters])

  return (
    <main>
      {/* Hero */}
      <HeroSection
        title={
          <>
            Where Visionary Design
            <br />
            Meets Daily Life
          </>
        }
        description="Experience a collection of residences designed as personal sanctuaries. Each unit balances expansive city views with artisanal textures and quiet, light-filled interiors to create the ultimate retreat from the world."
        backgroundImage={unitsHero}
      />

      {/* Search & Filters */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <form onSubmit={handleSearch}>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">

            {/* Search Property */}
            <input
              type="text"
              name="search"
              placeholder="Search Property"
              aria-label="Search Property"
              value={draftFilters.search}
              onChange={handleFilterChange}
              className="w-full rounded border border-gray-300 px-3 py-3 text-sm outline-none focus:border-[#8B1E2D]"
            />

            {/* Bedrooms */}
            <select
              name="bedrooms"
              aria-label="Bedrooms"
              value={draftFilters.bedrooms}
              onChange={handleFilterChange}
              className="w-full rounded border border-gray-300 bg-white px-2 py-3 text-sm"
            >
              <option value="">Bedrooms</option>
              {getOptions('bedrooms').map((number) => (
                <option key={number} value={number}>
                  {number} Bedrooms
                </option>
              ))}
            </select>

            {/* Developer */}
            <select
              name="developer"
              aria-label="Developer"
              value={draftFilters.developer}
              onChange={handleFilterChange}
              className="w-full rounded border border-gray-300 bg-white px-2 py-3 text-sm"
            >
              <option value="">Developer</option>
              {getOptions('developer').map((developer) => (
                <option key={developer} value={developer}>
                  {developer}
                </option>
              ))}
            </select>

            {/* Zone */}
            <select
              name="zone"
              aria-label="Zone"
              value={draftFilters.zone}
              onChange={handleFilterChange}
              className="w-full rounded border border-gray-300 bg-white px-2 py-3 text-sm"
            >
              <option value="">Zone</option>
              {getOptions('zone').map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>

            {/* Projects */}
            <select
              name="project"
              aria-label="Projects"
              value={draftFilters.project}
              onChange={handleFilterChange}
              className="w-full rounded border border-gray-300 bg-white px-2 py-3 text-sm"
            >
              <option value="">Projects</option>
              {getOptions('project').map((project) => (
                <option key={project} value={project}>
                  {project}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              name="status"
              aria-label="Status"
              value={draftFilters.status}
              onChange={handleFilterChange}
              className="w-full rounded border border-gray-300 bg-white px-2 py-3 text-sm"
            >
              <option value="">Status</option>
              {getOptions('status').map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {/* Price Range */}
            <select
              name="priceRange"
              aria-label="Price Range"
              value={draftFilters.priceRange}
              onChange={handleFilterChange}
              className="w-full rounded border border-gray-300 bg-white px-2 py-3 text-sm"
            >
              <option value="">Price Range</option>
              {priceOptions.filter((option) => option.value).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search buttons */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              type="submit"
              className="rounded bg-[#8B1E2D] px-14 py-3 text-sm font-medium text-white hover:bg-[#681521]"
            >
              Search
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="rounded border border-gray-300 px-8 py-3 text-sm text-gray-600 hover:bg-gray-100"
            >
              Reset
            </button>
          </div>
        </form>
      </section>

      {/* Units Cards */}
      <section className="mx-auto max-w-7xl px-6 pb-20">

        {loading ? (
          <p className="py-10 text-center text-gray-500">
            Loading properties...
          </p>
        ) : error ? (
          <p className="py-10 text-center text-red-600" role="alert">
            {error}. Please check that JSON Server is running.
          </p>
        ) : (
          <>
            <p className="mb-6 text-sm text-gray-500">
              Showing {filteredUnits.length} of {units.length} properties
            </p>

            {filteredUnits.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredUnits.map((unit) => (
                  <UnitCard
                    key={unit.id}
                    unit={unit}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-gray-50 px-6 py-16 text-center">
                <h2 className="text-xl font-semibold text-gray-700">
                  No Properties Found
                </h2>

                <p className="mt-3 text-gray-500">
                  Try changing your search filters.
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-5 rounded bg-[#8B1E2D] px-6 py-3 text-sm text-white"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default Units
