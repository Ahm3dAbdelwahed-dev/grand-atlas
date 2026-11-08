import { catalogFetch } from '../lib/catalogFetch'

import { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'

function FutureLandmarks() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProjects() {
      try {
        const response = await catalogFetch(
          'http://localhost:3001/futureLandmarks',
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('Invalid projects data')
        }

        setProjects(data)
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

    fetchProjects()

    return () => controller.abort()
  }, [])

  return (
    <section className="bg-white px-6 py-16">

      <div className="mx-auto max-w-7xl">

        {/* Section Title */}
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold text-[#30282A]">
            Future Landmarks
          </h2>

          <div className="mx-auto mt-3 h-[2px] w-24 bg-[#8B1E2D]" />
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">
            Loading projects...
          </p>
        )}

        {/* Error */}
        {error && !loading && (
          <p className="text-center text-red-600">
            {error}
          </p>
        )}

        {/* Project Cards */}
        {!loading && !error && (
          projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No projects available.
            </p>
          )
        )}

      </div>
    </section>
  )
}

export default FutureLandmarks
