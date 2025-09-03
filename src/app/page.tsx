"use client";

import { useEffect, useState } from "react";
import { DarkModeToggle } from "@/app/components/DarkModeToggle";

type Event = {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  location: string;
  imageUrl: string;
  detailsUrl: string;
  sourceName: string;
  sourceUrl: string;
};

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("https://api.maenox.com/events");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <main className="p-8 max-w-4xl mx-auto relative">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        🎵🎷 Music Events in Greece
      </h1>

      {loading && <p className="text-gray-500 dark:text-gray-400">Loading events...</p>}
      {!loading && events.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No events found.</p>
      )}

      <ul className="space-y-6">
        {events.map((event) => (
          <li key={event.id}>
            <a
              href={event.detailsUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full md:w-48 h-32 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1 text-gray-800 dark:text-gray-100">
                    {event.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {event.start_date} – {event.end_date}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 mb-2">{event.location}</p>

                  <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                    Source:{" "}
                    <a
                      href={event.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()} // prevent card navigation
                      className="text-blue-500 dark:text-blue-400 hover:underline"
                    >
                      {event.sourceName}
                    </a>
                  </p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
