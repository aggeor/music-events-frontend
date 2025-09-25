"use client";

import React from "react";

type Props = {
  activeTab: "upcoming" | "past" | undefined;
  setActiveTab: (tab: "upcoming" | "past") => void;
  totalUpcomingEvents: number;
  totalPastEvents: number;
};

export default function Tabs({ activeTab, setActiveTab, totalUpcomingEvents, totalPastEvents }: Props) {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => setActiveTab("upcoming")}
        className={`px-4 py-2 rounded-lg ${
          activeTab === "upcoming"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        }`}
      >
        Upcoming ({totalUpcomingEvents})
      </button>
      <button
        onClick={() => setActiveTab("past")}
        className={`px-4 py-2 rounded-lg ${
          activeTab === "past"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        }`}
      >
        Past ({totalPastEvents})
      </button>
    </div>
  );
}
