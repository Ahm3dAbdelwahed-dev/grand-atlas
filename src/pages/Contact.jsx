import HeroSection from '../components/HeroSection'
import ContactForm from '../components/ContactForm'
import contactHero from '../assets/images/contact-hero.jpg'

const workDays = [
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
]

function InfoIcon({ type }) {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 shrink-0 text-[#8B1E2D]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {type === 'location' && (
        <>
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="2.7" />
        </>
      )}
      {type === 'email' && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </>
      )}
      {type === 'phone' && (
        <path d="M6.3 3.6 9 3l2 4-2.3 2a14 14 0 0 0 6.3 6.3L17 13l4 2-.6 2.7a3 3 0 0 1-3.2 2.4A17 17 0 0 1 3.9 6.8 3 3 0 0 1 6.3 3.6Z" />
      )}
    </svg>
  )
}

function Contact() {
  return (
    <main>
      <HeroSection
        title={
          <>
            Connected Globally.
            <br />
            Available Locally.
          </>
        }
        description="With experts positioned in the world's most influential markets, we are never more than a conversation away. Reach out to our team to experience a new standard of real estate advisory."
        backgroundImage={contactHero}
      />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#30282A]">
              Contact Information
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 md:text-base">
              Our team is available for private consultations and off-market
              inquiries. We operate with absolute discretion to ensure your real
              estate objectives are met with precision.
            </p>

            <address className="mt-8 space-y-4 not-italic">
              <div className="flex items-start gap-3 text-sm text-[#8B1E2D]">
                <InfoIcon type="location" />
                <span>Minusio, Lake Maggiore, Switzerland — ref. LOC1771</span>
              </div>
              <a
                href="mailto:Grand.Atlas.Support@gmail.com"
                className="flex items-center gap-3 text-sm text-[#8B1E2D] hover:underline"
              >
                <InfoIcon type="email" />
                Grand.Atlas.Support@gmail.com
              </a>
              <a
                href="tel:01247859622"
                className="flex items-center gap-3 text-sm text-[#8B1E2D] hover:underline"
              >
                <InfoIcon type="phone" />
                01247859622
              </a>
              <a
                href="tel:035987124"
                className="flex items-center gap-3 text-sm text-[#8B1E2D] hover:underline"
              >
                <InfoIcon type="phone" />
                035987124
              </a>
            </address>

            <div className="mt-9">
              <h3 className="font-serif text-lg font-semibold text-[#30282A]">
                Follow us on social media
              </h3>
              <div className="mt-3 flex gap-3" aria-label="Social media icons (links not configured)">
                {/* Design-only icons: replace with verified URLs before publishing. */}
                {[
                  { label: 'Facebook', text: 'f' },
                  { label: 'X', text: 'X' },
                  { label: 'Instagram', text: '◎' },
                  { label: 'TikTok', text: '♪' },
                ].map((social) => (
                  <span
                    key={social.label}
                    title={`${social.label} - link not configured`}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#8B1E2D] text-sm font-bold text-[#8B1E2D]"
                  >
                    {social.text}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-9">
              <h3 className="font-serif text-lg font-semibold text-[#30282A]">
                Working Hours
              </h3>
              <dl className="mt-3 space-y-2">
                {workDays.map((day) => (
                  <div key={day} className="flex gap-5 text-sm">
                    <dt className="w-28 shrink-0 text-[#8B1E2D]">{day} :</dt>
                    <dd className="text-gray-600">9:00 AM - 5:00 PM</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </main>
  )
}

export default Contact
