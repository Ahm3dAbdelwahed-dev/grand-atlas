import { catalogFetch } from '../lib/catalogFetch'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ZoneProjectCard from '../components/ZoneProjectCard'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function DeveloperProjectsContent({ id }) {
  const [developer, setDeveloper] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const [devResponse, projectsResponse] = await Promise.all([
          catalogFetch(`${API_BASE}/developers/${encodeURIComponent(id)}`, { signal: controller.signal }),
          catalogFetch(`${API_BASE}/developerProjects?developerId=${encodeURIComponent(id)}`, { signal: controller.signal }),
        ])
        if (!devResponse.ok || !projectsResponse.ok) {
          throw new Error('Could not load developer projects')
        }
        const [devData, projectsData] = await Promise.all([
          devResponse.json(),
          projectsResponse.json(),
        ])
        if (!Array.isArray(projectsData)) throw new Error('Invalid projects response')
        if (!controller.signal.aborted) {
          setDeveloper(devData)
          setProjects(projectsData)
        }
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message || 'Unable to load projects')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [id])

  return (
    <main className="mx-auto min-h-[60vh] w-full max-w-7xl px-5 pb-20 pt-10 sm:px-6">
      <Link to="/developers" className="text-sm text-[#8B1E2D] hover:underline">
        ← Back to Developers
      </Link>

      <header className="mb-9 mt-5 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#30282A] md:text-4xl">
          Developers Projects
        </h1>
        <div className="mx-auto mt-3 h-[3px] w-32 bg-[#8B1E2D]" />
        {developer && <p className="mt-3 text-sm text-gray-500">{developer.name}</p>}
      </header>

      {loading ? (
        <p className="py-12 text-center text-gray-500">Loading projects...</p>
      ) : error ? (
        <p role="alert" className="py-12 text-center text-red-600">{error}</p>
      ) : (
        <>
          <img
            src="/images/developers-projects-banner.jpg"
            alt="Grand Atlas developments"
            className="mb-10 aspect-[16/6] w-full rounded-2xl object-cover"
          />

          {projects.length === 0 ? (
            <p className="text-center text-gray-500">No projects found for this developer.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ZoneProjectCard
                  key={project.id}
                  project={{ ...project, id: project.sourceProjectId }}
                />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  )
}

function DeveloperProjects() {
  const { id } = useParams()
  return <DeveloperProjectsContent key={id} id={id} />
}

export default DeveloperProjects
