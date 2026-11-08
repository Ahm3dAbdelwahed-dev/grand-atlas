
import { Link } from 'react-router-dom'

function PropertyCard({ property, index }) {
  return (
    <Link
      to={`/units/${property.id}`}
      className="group block min-w-0"
    >

      {/* Property Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">

        <img
          src={property.image}
          alt={property.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

      </div>

      {/* Property Title */}
      <h3 className="mt-4 font-serif text-lg font-semibold text-[#30282A]">
        {String(index + 1).padStart(2, '0')}. {property.title}
      </h3>

    </Link>
  )
}

export default PropertyCard
