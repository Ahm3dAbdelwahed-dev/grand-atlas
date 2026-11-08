import { catalogFetch } from '../lib/catalogFetch'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo/grand-atlas-logo.png'

const initialForm = {
  fullName: '',
  email: '',
  interest: '',
}

function Register() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setMessage('')
    setError('')

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.interest
    ) {
      setError('Please complete all fields.')
      return
    }

    setLoading(true)

    try {
      const response = await catalogFetch(
        'http://localhost:3001/registrations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: form.fullName.trim(),
            email: form.email.trim(),
            interest: form.interest,
            createdAt: new Date().toISOString(),
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Registration request failed.')
      }

      setMessage(
        'Demo registration request saved successfully. No real account has been created.'
      )

      setForm({ ...initialForm })

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[75vh] bg-[#F8F7F5] px-5 py-16">

      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg lg:grid-cols-2">

        {/* Left Side */}
        <div className="flex flex-col justify-center bg-[#8B1E2D] p-10 text-white md:p-14">

          <h1 className="font-serif text-4xl font-bold leading-tight">
            Your Journey to
            <br />
            Extraordinary Living
            <br />
            Starts Here.
          </h1>

          <p className="mt-6 text-sm leading-7 text-white/85">
            Discover carefully selected properties,
            explore exceptional communities,
            and connect with Grand Atlas.
          </p>

          <div className="mt-10 border-t border-white/30 pt-7">
            <p className="text-sm text-white/80">
              Already exploring our properties?
            </p>

            <Link
              to="/units"
              className="mt-4 inline-block rounded border border-white px-7 py-3 text-sm font-medium transition hover:bg-white hover:text-[#8B1E2D]"
            >
              Explore Properties
            </Link>
          </div>

        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12">

          <div className="mb-7 flex justify-center">
            <Link to="/">
              <img
                src={logo}
                alt="Grand Atlas Logo"
                className="h-24 w-auto object-contain"
              />
            </Link>
          </div>

          <h2 className="text-center font-serif text-3xl font-bold text-[#30282A]">
            Register
          </h2>

          <p className="mt-3 text-center text-sm text-gray-500">
            Create a demo registration request
            with Grand Atlas
          </p>

          <div className="mt-5 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-900">
            This is a demo form, not a real user account.
            Please use fictional information only.
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="off"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8B1E2D]"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="off"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8B1E2D]"
              />
            </div>

            {/* Interest */}
            <div>
              <label
                htmlFor="interest"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                I'm Interested In
              </label>

              <select
                id="interest"
                name="interest"
                value={form.interest}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#8B1E2D]"
              >
                <option value="">
                  Select an option
                </option>
                <option value="Buying Property">
                  Buying Property
                </option>
                <option value="Renting Property">
                  Renting Property
                </option>
                <option value="Exploring Projects">
                  Exploring Projects
                </option>
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <p
                role="alert"
                className="rounded bg-red-50 p-3 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {/* Success Message */}
            {message && (
              <p
                role="status"
                className="rounded bg-green-50 p-3 text-sm text-green-700"
              >
                {message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#8B1E2D] py-3 font-medium text-white transition hover:bg-[#681521] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Submitting...' : 'Register'}
            </button>

          </form>

          <p className="mt-7 text-center text-sm text-gray-500">
            Back to{' '}
            <Link
              to="/"
              className="font-semibold text-[#8B1E2D] hover:underline"
            >
              Home Page
            </Link>
          </p>

        </div>
      </div>
    </main>
  )
}

export default Register
