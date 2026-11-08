
import { Link } from 'react-router-dom'

function AboutSection({ image }) {
  return (
    <section className="bg-white px-6 py-16">

      <div className="mx-auto max-w-7xl">

        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-[#30282A]">
            About Grand Atlas
          </h2>

          <div className="mx-auto mt-3 h-[2px] w-24 bg-[#8B1E2D]"></div>
        </div>

        {/* Image And Content */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">

          {/* About Image */}
          <div>
            <img
              src={image}
              alt="Grand Atlas luxury property"
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>

          {/* About Content */}
          <div className="text-gray-600">

            <p className="text-sm leading-7 md:text-base">
              We began with a singular, uncompromising vision:
              to bridge the gap between world-class architecture
              and the individuals who define our global culture.
              We believe that a home is more than a physical
              structure. It is a personal space reflecting
              exceptional design and a life well-lived.
            </p>

            <p className="mt-5 text-sm leading-7 md:text-base">
              Our journey is built on a commitment to excellence,
              prioritizing quality over quantity and offering
              a personalized real estate experience tailored
              to every client.
            </p>

            <p className="mt-5 text-sm leading-7 md:text-base">
              We don't just find you a home; we aim to provide
              confidence, privacy, and peace of mind throughout
              your real estate journey.
            </p>

            {/* Know More Button */}
            <Link
              to="/contact"
              className="mt-8 inline-block rounded bg-[#8B1E2D] px-10 py-3 text-sm font-medium text-white transition hover:bg-[#681521]"
            >
              Know More →
            </Link>

          </div>

        </div>
      </div>

    </section>
  )
}

export default AboutSection
