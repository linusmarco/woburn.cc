import * as React from "react"

interface CalendarEvent {
  id: string
  summary: string
  start: {
    dateTime?: string
    date?: string
  }
  end: {
    dateTime?: string
    date?: string
  }
  description?: string
}

const CALENDAR_ID = "c991b2c0dc229bbeab4ab53c7fcec1fdd108045f089d1aeb1b8c69d4f9ce0224@group.calendar.google.com"
const API_KEY = process.env.GATSBY_GOOGLE_CALENDAR_API_KEY || ""

export const UpcomingRides: React.FC = () => {
  const [events, setEvents] = React.useState<CalendarEvent[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const now = new Date()
        const sevenDaysFromNow = new Date()
        sevenDaysFromNow.setDate(now.getDate() + 7)

        const params = new URLSearchParams({
          key: API_KEY,
          timeMin: now.toISOString(),
          timeMax: sevenDaysFromNow.toISOString(),
          singleEvents: 'true',
          orderBy: 'startTime',
          maxResults: '10',
        })

        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${params}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch calendar events')
        }

        const data = await response.json()
        setEvents(data.items || [])
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const formatDate = (event: CalendarEvent) => {
    const dateStr = event.start.dateTime || event.start.date
    if (!dateStr) return ''

    const date = new Date(dateStr)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const isToday = date.toDateString() === today.toDateString()
    const isTomorrow = date.toDateString() === tomorrow.toDateString()

    if (isToday) return 'Today'
    if (isTomorrow) return 'Tomorrow'

    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
  }

  const formatTime = (event: CalendarEvent) => {
    if (!event.start.dateTime) return 'All day'

    const date = new Date(event.start.dateTime)
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  if (loading) {
    return (
      <div className="text-gray-600 font-light">Loading upcoming rides...</div>
    )
  }

  if (error) {
    return (
      <div className="text-gray-600 font-light">Unable to load upcoming rides. Please check the calendar below.</div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-gray-600 font-light">No rides scheduled in the next 7 days. Check back soon!</div>
    )
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="border-l-4 border-orange-700 pl-4 py-2"
        >
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-medium text-orange-700">
              {formatDate(event)}
            </span>
            <span className="text-sm text-gray-500">
              {formatTime(event)}
            </span>
          </div>
          <h3 className="text-lg font-light text-gray-900 mt-1">
            {event.summary}
          </h3>
          {event.description && (
            <p className="text-sm text-gray-600 mt-1 font-light">
              {event.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
