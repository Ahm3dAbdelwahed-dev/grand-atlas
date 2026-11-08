
import { Link } from 'react-router-dom'

function UnitCard({ unit }) {
  const statusColor =
    unit.status === 'Available'
      ? 'bg-green-500'
      : unit.status === 'Reserved'
      ? 'bg-amber-500'
      : 'bg-gray-500'

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">

      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={unit.image}
          alt={unit.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />

        <span className={`absolute right-3 top-3 rounded px-3 py-1 text-xs font-semibold text-white ${statusColor}`}>
          {unit.status}
        </span>
      </div>

      {/* Property Features */}
      <div className="grid grid-cols-3 gap-1 border-b border-gray-100 bg-gray-50 px-2 py-3 text-center text-xs text-gray-600">
        <span>{unit.bedrooms} Bedrooms</span>
        <span>{unit.bathrooms} Bathrooms</span>
        <span>{unit.area} m²</span>
      </div>

      {/* Property Content */}
      <div className="flex flex-1 flex-col p-4">

        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-bold text-[#8B1E2D]">
            {unit.title}
          </h3>

          <p className="font-bold text-[#8B1E2D]">
            {Number(unit.price).toLocaleString('en-EG')} EGP
          </p>
        </div>

        <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
          {unit.description}
        </p>

        <Link
          to={`/units/${unit.id}`}
          className="mt-5 block rounded-md border border-[#8B1E2D] px-4 py-2 text-center text-sm font-medium text-[#8B1E2D] transition hover:bg-[#8B1E2D] hover:text-white"
        >
          View Details
        </Link>

      </div>
    </article>
  )
}

export default UnitCard
