
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Units from './pages/Units'
import UnitDetails from './pages/UnitDetails'
import Zones from './pages/Zones'
import ZoneProjects from './pages/ZoneProjects'
import ProjectDetails from './pages/ProjectDetails'
import Developers from './pages/Developers'
import DeveloperProjects from './pages/DeveloperProjects'
import Contact from './pages/Contact'
import Register from './pages/Register'

function ComingSoon({ title }) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-serif text-3xl font-bold text-[#8B1E2D]">
        {title}
      </h1>

      <p className="mt-4 text-gray-500">
        This page is under development.
      </p>
    </main>
  )
}

function App() {
  return (
    <div className="flex min-h-screen flex-col">

      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/units" element={<Units />} />

          <Route path="/units/:id" element={<UnitDetails />} />



          <Route path="/zones" element={<Zones />} />
          <Route path="/zones/:id/projects" element={<ZoneProjects />} />

          <Route
  path="/projects/:id"
  element={<ProjectDetails />}
/>

         <Route
  path="/developers"
  element={<Developers />}
/>

<Route
  path="/developers/:id/projects"
  element={<DeveloperProjects />}
/>
         <Route path="/contact" element={<Contact />} />

      <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={<ComingSoon title="Page Not Found" />}
          />
        </Routes>
      </div>

      <Footer />

    </div>
  )
}

export default App
