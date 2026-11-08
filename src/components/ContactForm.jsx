import { catalogFetch } from '../lib/catalogFetch'
import { useState } from 'react'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

const fieldClass =
  'mt-2 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-[#30282A] outline-none transition focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/15'

function ContactForm() {
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', text: '' })

  function handleChange(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
    if (feedback.text) setFeedback({ type: '', text: '' })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (submitting) return

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
      createdAt: new Date().toISOString(),
    }

    if (!payload.name || !payload.email || !payload.phone || !payload.message) {
      setFeedback({ type: 'error', text: 'Please complete all fields.' })
      return
    }

    setSubmitting(true)
    setFeedback({ type: '', text: '' })

    try {
      const response = await catalogFetch('http://localhost:3001/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Unable to save your message (HTTP ${response.status}).`)
      }

      setForm(emptyForm)
      setFeedback({
        type: 'success',
        text: 'Message saved in the local demo API. It has not been sent to Grand Atlas.',
      })
    } catch (error) {
      setFeedback({
        type: 'error',
        text: error.message,
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md sm:p-8">
      <h2 className="mb-7 font-serif text-2xl font-bold text-[#30282A]">
        Send us a message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium text-[#30282A]">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-[#30282A]">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={160}
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="text-sm font-medium text-[#30282A]">
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            maxLength={30}
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="text-sm font-medium text-[#30282A]">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={3}
            maxLength={2000}
            rows={5}
            value={form.message}
            onChange={handleChange}
            className={`${fieldClass} resize-y`}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-[#8B1E2D] px-6 py-3 font-medium text-white transition hover:bg-[#721525] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Sending...' : 'Send Message'}
        </button>

        {feedback.text && (
          <p
            role="status"
            aria-live="polite"
            className={`text-sm ${feedback.type === 'error' ? 'text-red-700' : 'text-green-700'}`}
          >
            {feedback.text}
          </p>
        )}
      </form>
    </div>
  )
}

export default ContactForm
