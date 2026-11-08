import { catalogFetch } from '../lib/catalogFetch'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ZoneProjectCard from '../components/ZoneProjectCard'

const API_URL = 'http://localhost:3001'

function ZoneProjects() {
  const { id } = useParams()
  const [zone, setZone] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadZoneProjects() {
      setLoading(true)
      setError('')

      try {
        const [zoneResponse, projectsResponse] = await Promise.all([
          catalogFetch(`${API_URL}/zones/${encodeURIComponent(id)}`, {
            signal: controller.signal,
          }),
          catalogFetch(`${API_URL}/zoneProjects?zoneId=${encodeURIComponent(id)}`, {
            signal: controller.signal,
          }),
        ])

        if (!zoneResponse.ok) throw new Error('Zone not found')
        if (!projectsResponse.ok) throw new Error('Could not load zone projects')

        const zoneData = await zoneResponse.json()
        const projectsData = await projectsResponse.json()

        if (!Array.isArray(projectsData)) {
          throw new Error('Invalid projects response')
        }

        setZone(zoneData)
        setProjects(projectsData)
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadZoneProjects()
    return () => controller.abort()
  }, [id])

  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-20 pt-12 sm:px-6">
      <Link to="/zones" className="text-sm text-[#8B1E2D] hover:underline">
        ← Back to Zones
      </Link>

      <header className="my-10 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#30282A] md:text-4xl">
          Zone Projects
        </h1>
        <div className="mx-auto mt-3 h-[2px] w-24 bg-[#8B1E2D]" />
        {zone && (
          <p className="mt-4 text-sm text-gray-500">
            {zone.name}
          </p>
        )}
      </header>

      {loading ? (
        <p className="py-16 text-center text-gray-500">Loading zone projects...</p>
      ) : error ? (
        <p role="alert" className="py-16 text-center text-red-600">
          {error}. Please check the API on port 3001.
        </p>
      ) : (
        <>
          <img
            src="/images/zone-projects-banner.png"
            alt="Residential neighborhood in the selected zone"
            className="mb-10 h-56 w-full rounded-xl object-cover sm:h-72 lg:h-96"
          />

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ZoneProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p className="rounded-lg bg-gray-50 px-6 py-16 text-center text-gray-500">
              No projects available for this zone.
            </p>
          )}
        </>
      )}
    </main>
  )
}

export default ZoneProjects
