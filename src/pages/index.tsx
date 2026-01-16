import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { UpcomingRides } from "../components/UpcomingRides"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-orange-700 py-8 px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-5xl md:text-6xl font-light text-white tracking-tight">
            Woburn Cycling Club
          </h1>
          <StaticImage
            src="../images/bull-sil.png"
            alt="Bull silhouette"
            height={80}
            placeholder="blurred"
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-6">
          <p className="text-xl md:text-2xl text-gray-900 font-light leading-relaxed">
            The hard men and women of Woburn, MA.
          </p>

          <p className="text-lg text-gray-700 font-light leading-relaxed">
            We ride fast. We ride year-round. Through the bitter New England winters and
            hot summer days—if the roads and trails are calling, we're on them. Good company, hard efforts,
            and a healthy disregard for the thermometer.
          </p>
        </div>

        <section className="mt-16 pt-16 border-t border-gray-200">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-8">
            Upcoming Rides
          </h2>
          <UpcomingRides />
        </section>

        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-8">
            Full Calendar
          </h2>
          <div className="relative w-full h-[600px] md:h-[700px]">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=c991b2c0dc229bbeab4ab53c7fcec1fdd108045f089d1aeb1b8c69d4f9ce0224%40group.calendar.google.com&ctz=America%2FNew_York&mode=AGENDA"
              className="absolute top-0 left-0 w-full h-full border-0 rounded-lg shadow-sm"
              title="Woburn Cycling Club Ride Calendar"
            />
          </div>
        </section>
      </main>

      <footer className="mt-auto py-8 px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-light text-gray-600 italic mb-2">
            Industria et Velocitas
          </p>
          <p className="text-xs font-light text-gray-500">
            1640 | 1642 | 1889 | 2025
          </p>
        </div>
      </footer>
    </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>Woburn Cycling Club</title>
    <meta name="description" content="An informal cycling club in Woburn, Massachusetts" />
  </>
)
