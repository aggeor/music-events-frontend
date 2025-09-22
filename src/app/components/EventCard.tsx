"use client";

import React from "react";
import { Event } from "@/types";

type Props = {
  event: Event;
  formatEventDate: (start: string, end: string) => string;
};

export default function EventCard({ event, formatEventDate }: Props) {
  return (
    <div
      onClick={() => event.detailsUrl && window.open(event.detailsUrl, "_blank")}
      className="cursor-pointer block border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition hover:bg-gray-50 dark:hover:bg-gray-800"
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
            {formatEventDate(event.start_date, event.end_date)}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-2">{event.location}</p>

          <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
            Source:{" "}
            <a
              href={event.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} // prevent card click
              className="text-blue-500 dark:text-blue-400 hover:underline"
            >
              {event.sourceName}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
