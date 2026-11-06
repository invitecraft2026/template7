function toUTCStamp(local: string): string {
  const d = new Date(local);
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export type CalendarEvent = {
  title: string;
  description: string;
  location: string;
  startISO: string;
  endISO: string;
};

export function googleCalendarUrl(e: CalendarEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    details: e.description,
    location: e.location,
    dates: `${toUTCStamp(e.startISO)}/${toUTCStamp(e.endISO)}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function icsContent(e: CalendarEvent): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding.invite`,
    `DTSTAMP:${toUTCStamp(new Date().toISOString())}`,
    `DTSTART:${toUTCStamp(e.startISO)}`,
    `DTEND:${toUTCStamp(e.endISO)}`,
    `SUMMARY:${e.title}`,
    `DESCRIPTION:${e.description}`,
    `LOCATION:${e.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(e: CalendarEvent, filename = "wedding.ics") {
  const blob = new Blob([icsContent(e)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function mapsDirectionsUrl(query: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}
