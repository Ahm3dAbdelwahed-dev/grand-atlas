
function StrategicLocations({ mapImage }) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto mb-10 max-w-7xl px-6 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#30282A]">
          Strategic Locations
        </h2>

        <div className="mx-auto mt-3 h-[2px] w-24 bg-[#8B1E2D]" />
      </div>

      <div className="w-full overflow-hidden">
        <img
          src={mapImage}
          alt="Map showing Grand Atlas strategic locations"
          className="h-auto w-full object-cover"
        />
      </div>
    </section>
  )
}

export default StrategicLocations
