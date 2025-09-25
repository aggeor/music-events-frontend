"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type Props = {
  value: Date | null;
  onDateChange: (date: Date | null) => void;
};

export default function CalendarFilter({ value, onDateChange }: Props) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
        📅 Pick a Date
      </h2>
      <div className="react-calendar">
        <Calendar
          value={value}
          onChange={(date) => onDateChange(date as Date)}
        />
      </div>
      {value && (
        <button
          onClick={() => onDateChange(null)}
          className="mt-3 px-3 py-1 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600"
        >
          Clear
        </button>
      )}
    </div>
  );
}
