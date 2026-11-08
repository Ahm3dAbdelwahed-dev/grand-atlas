
import { Link } from 'react-router-dom'

function ProjectCard({ project }) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

      {/* Project Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">

        <img
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover"
        />

        {/* Location Badge */}
        <span className="absolute right-3 top-3 rounded-sm bg-[#8B1E2D] px-3 py-1 text-xs text-white">
          {project.location}
        </span>
      </div>

      {/* Project Information */}
      <div className="p-4">

        <h3 className="font-serif text-lg font-bold text-[#30282A]">
          {project.name}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {project.developer}
        </p>

        <Link
          to={`/projects/${project.id}`}
          className="mt-5 block rounded border border-[#8B1E2D] px-4 py-2 text-center text-sm font-medium text-[#8B1E2D] transition hover:bg-[#8B1E2D] hover:text-white"
        >
          View Details
        </Link>

      </div>
    </article>
  )
}

export default ProjectCard
