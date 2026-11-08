
function StatCard({ value, label }) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white px-5 py-6 text-center shadow-sm">

      <h3 className="font-serif text-3xl font-bold text-[#8B1E2D]">
        {value}
      </h3>

      <p className="mt-2 text-sm text-gray-600">
        {label}
      </p>

    </article>
  )
}

export default StatCard
