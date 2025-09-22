"use client";

import { useEffect, useState } from "react";
import { DarkModeToggle } from "@/app/components/DarkModeToggle";
import EventList from "@/app/components/EventList";
import Tabs from "@/app/components/Tabs";
import { Event } from "@/types";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("https://api.maenox.com/events");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        // Sort events by start_date ascending
        data.sort(
          (a: Event, b: Event) =>
            new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );

        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  function formatEventDate(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    if (start === end) {
      return startDate.toLocaleDateString(undefined, options);
    } else {
      return `${startDate.toLocaleDateString(undefined, options)} – ${endDate.toLocaleDateString(undefined, options)}`;
    }
  }

  // Split into upcoming & past
  const now = new Date();
  const upcomingEvents = events.filter(
    (e) => new Date(e.start_date) >= now
  );
  const pastEvents = events.filter((e) => new Date(e.start_date) < now);

  return (
    <main className="p-8 max-w-4xl mx-auto relative">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        🎵🎷 Music Events in Greece
      </h1>
      {!loading && (
        <Tabs activeTab={activeTab} totalUpcomingEvents={upcomingEvents.length} totalPastEvents={pastEvents.length} setActiveTab={setActiveTab} />
      )}
      
      {loading && (
        <p className="text-gray-500 dark:text-gray-400">Loading events...</p>
      )}

      {!loading && activeTab === "upcoming" && (
        <EventList events={upcomingEvents} formatEventDate={formatEventDate} />
      )}
      {!loading && activeTab === "past" && (
        <EventList events={pastEvents} formatEventDate={formatEventDate} />
      )}
    </main>
  );
}
