
import HeroSection from '../components/HeroSection'
import StatsSection from '../components/StatsSection'
import AboutSection from '../components/AboutSection'
import FeaturedProperties from '../components/FeaturedProperties'
import StrategicLocations from '../components/StrategicLocations'
import FutureLandmarks from '../components/FutureLandmarks'

// Images
import homeHero from '../assets/images/home-hero.png'
import aboutImage from '../assets/images/about.png'
import strategicMap from '../assets/images/strategic-map.png'

function Home() {
  return (
    <main>

      {/* 1. Hero Section */}
      <HeroSection
        title={
          <>
            Redefining the Horizon
            <br />
            of Modern Luxury Living
          </>
        }
        description="We believe a home should be a sanctuary of innovation and an extension of your personal brand. By combining cutting-edge market data with a keen eye for world-class design, we help you navigate the complexities of the luxury market to find a space that inspires your best work and your deepest rest."
        buttonText="Explore"
        buttonLink="#benchmarks"
        backgroundImage={homeHero}
      />

      {/* 2. Statistics From API */}
      <StatsSection />

      {/* 3. About Grand Atlas */}
      <AboutSection image={aboutImage} />

      {/* 4. Featured Properties From API */}
      <FeaturedProperties />

      {/* 5. Strategic Locations */}
      <StrategicLocations mapImage={strategicMap} />

      {/* 6. Future Landmarks From API */}
      <FutureLandmarks />

    </main>
  )
}

export default Home
