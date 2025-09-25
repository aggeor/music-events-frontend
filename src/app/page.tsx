"use client";

import { useEffect, useState } from "react";
import { DarkModeToggle } from "@/app/components/DarkModeToggle";
import EventList from "@/app/components/EventList";
import Tabs from "@/app/components/Tabs";
import CalendarFilter from "@/app/components/CalendarFilter";
import { Event } from "@/types";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
      return `${startDate.toLocaleDateString(
        undefined,
        options
      )} – ${endDate.toLocaleDateString(undefined, options)}`;
    }
  }

  // Split into upcoming & past
  const now = new Date();
  const upcomingEvents = events.filter(
    (e) => new Date(e.start_date) >= now || new Date(e.end_date) >= now
  );
  const pastEvents = events.filter(
    (e) => new Date(e.start_date) < now && new Date(e.end_date) < now
  );

  // Filter events by selected date or active tab
  const filteredEvents = selectedDate
    ? events.filter(
        (e) =>
          new Date(e.start_date).toDateString() ===
            selectedDate.toDateString() ||
          new Date(e.end_date).toDateString() === selectedDate.toDateString() ||
          (new Date(e.start_date) <= selectedDate &&
            new Date(e.end_date) >= selectedDate)
      )
    : activeTab === "upcoming"
    ? upcomingEvents
    : pastEvents;

  // Handle tab click: deselect date & set active tab
  function handleTabClick(tab: "upcoming" | "past") {
    setSelectedDate(null);
    setActiveTab(tab);
  }

  return (
    <main className="p-8 max-w-6xl mx-auto relative grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left side: Events */}
      <div className="md:col-span-2">
        <div className="absolute top-4 right-4">
          <DarkModeToggle />
        </div>

        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          🎵🎷 Music Events in Greece
        </h1>

        {/* Tabs always visible */}
        {!loading && (
          <Tabs
            activeTab={selectedDate ? undefined : activeTab} // unselected if a date is chosen
            totalUpcomingEvents={upcomingEvents.length}
            totalPastEvents={pastEvents.length}
            setActiveTab={handleTabClick}
          />
        )}

        {loading && (
          <p className="text-gray-500 dark:text-gray-400">Loading events...</p>
        )}

        {!loading && (
          <EventList
            events={filteredEvents}
            formatEventDate={formatEventDate}
          />
        )}
      </div>

      {/* Right side: Calendar */}
      {!loading && (
        <div className="absolute top-24 right-4">
          <CalendarFilter value={selectedDate} onDateChange={setSelectedDate} />
        </div>
      )}
    </main>
  );
}
