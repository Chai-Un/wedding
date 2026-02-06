import Cover from '../components/sections/Cover'
import OurStory from '../components/sections/OurStory'
import CeremonyDetails from '../components/sections/CeremonyDetails'
import Schedule from '../components/sections/Schedule'
import Venue from '../components/sections/Venue'
import RSVPForm from '../components/sections/RSVPForm'
import Gallery from '../components/sections/Gallery'
import GiftRegistry from '../components/sections/GiftRegistry'
import { Mail, Phone } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <Cover />
        <OurStory />
        <CeremonyDetails />
        <Schedule />
        <Venue />
        <RSVPForm />
        <Gallery />
        <GiftRegistry />
      </main>
      
      {/* Contact Us Section */}
      <section className="bg-[#2a2722] py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-[#d4c5ad] mb-8 italic">
            Contact Us
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] bg-gradient-to-br from-stone-400 to-stone-300 rounded">
              <div className="w-full h-full flex items-center justify-center text-stone-500">
                Add photo
              </div>
            </div>
            <div className="space-y-6 text-[#d4c5ad]">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="w-5 h-5" />
                <a href="tel:+11234567890" className="hover:text-[#e8dcc8] transition-colors">
                  (123) 456-7890
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span>@reallygreatsite</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="w-5 h-5" />
                <a href="mailto:hello@reallygreatsite.com" className="hover:text-[#e8dcc8] transition-colors">
                  hello@reallygreatsite.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#2a2722] py-8 text-center text-[#d4c5ad]/60 text-sm">
        <div className="space-x-4">
          <a href="#" className="hover:text-[#d4c5ad] transition-colors">Terms & Support</a>
          <span>•</span>
          <a href="#" className="hover:text-[#d4c5ad] transition-colors">Privacy Policy</a>
        </div>
        <p className="mt-4">
          © 2030 Hoang & Ngan
        </p>
      </footer>
    </div>
  )
}
