import { catalogFetch } from '../lib/catalogFetch'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProjectGallery from '../components/ProjectGallery'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

async function fetchProjectById(id, signal) {
  // Zone Projects use IDs such as 101; Home Future Landmarks use IDs 1, 2, 3.
  // Both link to /projects/:id in the existing application.
  const endpoints = [
    `${API_BASE}/zoneProjects/${encodeURIComponent(id)}`,
    `${API_BASE}/futureLandmarks/${encodeURIComponent(id)}`,
  ]

  for (const endpoint of endpoints) {
    const response = await catalogFetch(endpoint, { signal })
    if (response.status === 404) continue
    if (!response.ok) throw new Error('Could not load project details')
    return response.json()
  }
  throw new Error('Project not found')
}

function ProjectDetailsContent({ id }) {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const data = await fetchProjectById(id, controller.signal)
        if (!controller.signal.aborted) setProject(data)
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message || 'Unable to load project details')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [id])

  if (loading) {
    return <main className="min-h-[55vh] px-6 py-20 text-center">Loading project details...</main>
  }

  if (error || !project) {
    return (
      <main className="min-h-[55vh] px-6 py-20 text-center">
        <p role="alert" className="text-red-700">{error || 'Project not found'}</p>
        <Link to="/zones" className="mt-5 inline-block text-[#8B1E2D] underline">Back to Zones</Link>
      </main>
    )
  }

  const details = project.details || {}
  const mainTitle = project.title || project.name || 'Project'
  const heading = details.heading || `${mainTitle} Project`
  const images = Array.isArray(details.images) && details.images.length
    ? details.images
    : project.image ? [project.image] : []
  const facts = Array.isArray(details.facts) ? details.facts : []
  const backHref = project.zoneId ? `/zones/${project.zoneId}/projects` : '/'

  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-20 pt-8 sm:px-6">
      <Link to={backHref} className="text-sm text-[#8B1E2D] hover:underline">
        ← Back to {project.zoneId ? 'Zone Projects' : 'Home'}
      </Link>

      <header className="mb-9 mt-6 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#30282A] md:text-4xl">
          {heading}
        </h1>
        <div className="mx-auto mt-3 h-[3px] w-32 bg-[#8B1E2D]" />
      </header>

      <ProjectGallery images={images} title={mainTitle} />

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-[#8B1E2D] md:text-3xl">
          {details.propertyTitle || mainTitle}
        </h2>
        {(details.location || project.location) && (
          <p className="mt-2 text-sm text-gray-500 md:text-base">
            📍 {details.location || project.location}
          </p>
        )}
      </section>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
        <section>
          <h3 className="mb-5 text-xl font-semibold text-[#30282A]">At a glance</h3>
          {facts.length ? (
            <ul className="list-disc space-y-4 pl-6 text-gray-600">
              {facts.map((fact, index) => (
                <li key={`${fact.label}-${index}`}>
                  <span>{fact.label}: </span>
                  <span>{fact.value}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Project specifications are not available yet.</p>
          )}
        </section>

        <section>
          <h3 className="mb-5 text-xl font-semibold text-[#30282A]">Overview</h3>
          <p className="whitespace-pre-line leading-8 text-gray-600">
            {details.overview || project.description || 'Project overview is not available yet.'}
          </p>
        </section>
      </div>
    </main>
  )
}

function ProjectDetails() {
  const { id } = useParams()
  return <ProjectDetailsContent key={id} id={id} />
}

export default ProjectDetails
