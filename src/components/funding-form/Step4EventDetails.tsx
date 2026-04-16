'use client';

import { ApplicationData } from '@/src/types/application';

interface Step4EventDetailsProps {
  data: ApplicationData['step4'];
  onChange: (updates: Partial<ApplicationData['step4']>) => void;
}

/**
 * Step 4 - Event Details
 * Collect event-specific information
 */
export default function Step4EventDetails({ data, onChange }: Step4EventDetailsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Event Details</h2>

      {/* Event Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Event Name *
        </label>
        <input
          type="text"
          value={data.event_name}
          onChange={(e) => onChange({ event_name: e.target.value })}
          placeholder="Annual Music Festival 2024"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
        />
      </div>

      {/* Event Date */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Event Date *
        </label>
        <input
          type="date"
          value={data.event_date}
          onChange={(e) => onChange({ event_date: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
        />
      </div>

      {/* Venue */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Venue / Location *
        </label>
        <input
          type="text"
          value={data.venue}
          onChange={(e) => onChange({ venue: e.target.value })}
          placeholder="Johannesburg Civic Centre"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
        />
      </div>

      {/* SAMPRA License */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Do you have a SAMPRA License? *
        </label>
        <div className="space-y-2">
          {(['Yes', 'No'] as const).map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="sampra_license"
                value={option}
                checked={data.sampra_license === option}
                onChange={(e) => onChange({ sampra_license: e.target.value as 'Yes' | 'No' })}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-gray-200 group-hover:text-gray-100">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Estimated Attendance */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Estimated Attendance *
        </label>
        <input
          type="number"
          value={data.estimated_attendance}
          onChange={(e) => onChange({ estimated_attendance: e.target.value })}
          placeholder="500"
          min="0"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
        />
      </div>
    </div>
  );
}
