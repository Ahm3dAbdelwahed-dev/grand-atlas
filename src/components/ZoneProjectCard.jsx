import { Link } from 'react-router-dom'

function ZoneProjectCard({ project }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="aspect-[16/10] w-full object-cover"
      />

      <div className="grid grid-cols-3 gap-1 border-b border-gray-100 bg-gray-50 px-3 py-3 text-center text-xs text-gray-600">
        <span>{project.units} Units</span>
        <span>{project.gyms} Gyms</span>
        <span>{project.area}</span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-lg font-semibold text-[#8B1E2D]">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
          {project.description}
        </p>
        <Link
          to={`/projects/${project.id}`}
          className="mt-5 block rounded-md border border-[#8B1E2D] px-4 py-2 text-center text-sm font-medium text-[#8B1E2D] transition hover:bg-[#8B1E2D] hover:text-white"
        >
          View Details
        </Link>
      </div>
    </article>
  )
}

export default ZoneProjectCard
