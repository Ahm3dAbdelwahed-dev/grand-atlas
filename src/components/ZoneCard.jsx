import { Link } from 'react-router-dom'

function ZoneCard({ zone }) {
  return (
    <Link
      to={`/zones/${zone.id}/projects`}
      className="group relative block aspect-[3/2] overflow-hidden rounded-lg bg-stone-200 shadow-sm"
      aria-label={`Explore projects in ${zone.name}`}
    >
      <img
        src={zone.image}
        alt={zone.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
      <h2 className="absolute bottom-4 left-4 font-serif text-xl font-semibold text-white">
        {zone.name}
      </h2>
    </Link>
  )
}

export default ZoneCard
