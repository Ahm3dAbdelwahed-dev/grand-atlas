import { useState } from 'react'

function ProjectGallery({ images = [], title = 'Project' }) {
  const [selected, setSelected] = useState(0)
  if (!images.length) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
        No project images available
      </div>
    )
  }

  return (
    <section aria-label="Project image gallery">
      <div className="overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={images[selected]}
          alt={`${title} - image ${selected + 1}`}
          className="aspect-[2.4/1] w-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {images.map((src, index) => (
            <button
              type="button"
              key={`${src}-${index}`}
              aria-label={`Show project image ${index + 1}`}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
              className={`overflow-hidden rounded-lg border-2 transition ${
                selected === index
                  ? 'border-[#8B1E2D]'
                  : 'border-transparent hover:border-gray-400'
              }`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="aspect-[1.5/1] w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  )
}

export default ProjectGallery
