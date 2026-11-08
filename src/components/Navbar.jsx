import logo from '../assets/logo/grand-atlas-logo.png'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { name: 'Home', path: '/' },
  { name: 'Units', path: '/units' },
  { name: 'Zones', path: '/zones' },
  { name: 'Developers', path: '/developers' },
  { name: 'Contact Us', path: '/contact' },
]

function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-5">


{/* Grand Atlas Logo */}
<Link
  to="/"
  className="flex shrink-0 items-center"
>
  <img
    src={logo}
    alt="Grand Atlas Logo"
    className="block h-[80px] w-auto max-w-none object-contain"
  />
</Link>



        <div className="flex flex-wrap items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `border-b-2 pb-1 text-sm transition ${
                  isActive
                    ? 'border-[#8B1E2D] font-semibold text-[#8B1E2D]'
                    : 'border-transparent text-gray-600 hover:text-[#8B1E2D]'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <Link
          to="/register"
          className="rounded bg-[#8B1E2D] px-6 py-2 text-sm text-white"
        >
          Register
        </Link>

      </nav>
    </header>
  )
}

export default Navbar
