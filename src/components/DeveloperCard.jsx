import { Link } from 'react-router-dom'

function DeveloperCard({ developer }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        <img
          src={developer.image}
          alt={`${developer.name} development`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="absolute right-3 top-3 rounded bg-[#8B1E2D] px-3 py-1 text-xs text-white">
          {developer.location}
        </span>
      </div>

      <div className="my-4 flex min-h-14 items-center gap-3">
        {developer.logo && (
          <img
            src={developer.logo}
            alt={`${developer.name} logo`}
            className={developer.kind === 'hayah' ? 'h-12 w-12 shrink-0 object-contain' : 'h-12 max-w-[210px] object-contain'}
          />
        )}
        {developer.kind === 'hayah' && (
          <div>
            <h3 className="text-base font-semibold leading-5 text-[#30282A]">{developer.name}</h3>
            <p className="text-xs text-gray-500">{developer.subtitle}</p>
          </div>
        )}
        {developer.kind !== 'hayah' && <h3 className="sr-only">{developer.name}</h3>}
      </div>

      <Link
        to={`/developers/${developer.id}/projects`}
        className="mt-auto block rounded-md border border-[#8B1E2D] px-4 py-2 text-center text-sm font-medium text-[#8B1E2D] transition hover:bg-[#8B1E2D] hover:text-white"
      >
        View Projects
      </Link>
    </article>
  )
}

export default DeveloperCard
