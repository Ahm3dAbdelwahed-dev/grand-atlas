
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Grand Atlas Original Logo
import logo from '../assets/logo/grand-atlas-logo.png'

// Navigation Links
const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Inventories', path: '/units' },
  { name: 'Zones', path: '/zones' },
  { name: 'Developers', path: '/developers' },
  { name: 'Contact Us', path: '/contact' },
]

const aboutLinks = [
  'Grand Atlas',
  'Privacy Policy',
  'Legal',
  'Help',
  'Support',
]

function Footer() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubscribe(event) {
    event.preventDefault()

    // Newsletter API is not connected yet
    setMessage('Newsletter subscription is not available yet.')
  }

  return (
    <footer className="w-full bg-[#FAFAFA] px-5 pt-12 sm:px-8">

      {/* Main Footer Container */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 border-b border-gray-200 pb-12 sm:grid-cols-2 lg:grid-cols-4">

        {/* Column 1: Logo & Contact */}
        <div className="flex flex-col items-start">

          <Link
            to="/"
            className="inline-flex items-center"
          >
            <img
              src={logo}
              alt="Grand Atlas Logo"
              className="block h-[100px] w-auto max-w-full object-contain"
            />
          </Link>

          <a
            href="tel:+176355471297"
            className="mt-4 text-sm text-gray-600 hover:text-[#8B1E2D]"
          >
            +1 (7635) 547-12-97
          </a>

          <a
            href="mailto:support@lift.agency"
            className="mt-2 text-sm text-gray-600 hover:text-[#8B1E2D]"
          >
            support@lift.agency
          </a>

        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="mb-5 text-base font-semibold text-[#30282A]">
            Quick Links
          </h3>

          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-sm text-gray-500 transition-colors hover:text-[#8B1E2D]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: About */}
        <div>
          <h3 className="mb-5 text-base font-semibold text-[#30282A]">
            About
          </h3>

          <ul className="space-y-3">
            {aboutLinks.map((item) => (
              <li key={item}>
                <span className="text-sm text-gray-500">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Get In Touch */}
        <div>
          <h3 className="mb-5 text-base font-semibold text-[#30282A]">
            Get In Touch
          </h3>

          {/* Newsletter Form */}
          <form
            onSubmit={handleSubscribe}
            className="flex overflow-hidden rounded-md border border-[#8B1E2D]"
          >
            <input
              type="email"
              placeholder="Get product updates"
              aria-label="Email address"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="min-w-0 flex-1 bg-white px-3 py-3 text-sm outline-none"
            />

            <button
              type="submit"
              aria-label="Subscribe to newsletter"
              className="bg-[#8B1E2D] px-5 text-white transition hover:bg-[#681521]"
            >
              →
            </button>
          </form>

          {message && (
            <p className="mt-2 text-xs text-gray-500" role="status">
              {message}
            </p>
          )}

          {/* Social Media Icons: visual placeholders */}
          <div className="mt-6 flex items-center gap-3">

            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-sm font-semibold text-[#8B1E2D]"
              aria-label="LinkedIn"
            >
              in
            </span>

            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-sm font-semibold text-[#8B1E2D]"
              aria-label="Facebook"
            >
              f
            </span>

            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-sm font-semibold text-[#8B1E2D]"
              aria-label="Twitter"
            >
              X
            </span>

          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="py-6 text-center">
        <p className="text-xs text-gray-500">
          © 2020 Lift Media. All rights reserved.
        </p>
      </div>

    </footer>
  )
}

export default Footer
