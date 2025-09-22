"use client";

import React from "react";
import EventCard from "./EventCard";
import { Event } from "@/types";

type Props = {
  events: Event[];
  formatEventDate: (start: string, end: string) => string;
};

export default function EventList({ events, formatEventDate }: Props) {
  if (events.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400">No events found.</p>
    );
  }

  return (
    <ul className="space-y-6">
      {events.map((event) => (
        <li key={event.id}>
          <EventCard event={event} formatEventDate={formatEventDate} />
        </li>
      ))}
    </ul>
  );
}
