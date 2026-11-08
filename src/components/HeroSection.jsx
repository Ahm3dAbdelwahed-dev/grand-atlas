
function HeroSection({
  title,
  description,
  buttonText,
  buttonLink,
  backgroundImage,
}) {
  return (
    <section
      className="relative flex min-h-[400px] items-center justify-center overflow-hidden bg-[#30282A] bg-cover bg-center px-6 py-16 text-center text-white md:min-h-[550px]"
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${backgroundImage})`,
            }
          : {}
      }
    >
      <div className="relative z-10 max-w-5xl">

        <h1 className="font-serif text-3xl font-bold leading-tight md:text-5xl">
          {title}
        </h1>

        <p className="mx-auto mt-5 max-w-4xl text-sm leading-7 text-white md:text-base">
          {description}
        </p>

        {buttonText && (
          <a
            href={buttonLink}
            className="mt-8 inline-block bg-[#8B1E2D] px-12 py-3 text-white transition hover:bg-[#681521]"
          >
            {buttonText}
          </a>
        )}

      </div>
    </section>
  )
}

export default HeroSection