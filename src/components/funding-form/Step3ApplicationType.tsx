'use client';

import { ApplicationData, APPLICATION_TYPES } from '@/src/types/application';

interface Step3ApplicationTypeProps {
  data: ApplicationData['step3'];
  onChange: (updates: Partial<ApplicationData['step3']>) => void;
}

/**
 * Step 3 - Application Type
 * Select the type of application
 */
export default function Step3ApplicationType({ data, onChange }: Step3ApplicationTypeProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Application Type</h2>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-4">
          What type of application is this? *
        </label>
        <select
          value={data.application_type}
          onChange={(e) => onChange({ 
            application_type: e.target.value as ApplicationData['step3']['application_type']
          })}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
        >
          <option value="">-- Select Application Type --</option>
          {APPLICATION_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Application Type Info Cards */}
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Music Production:</strong> For studio production, recording, and music creation projects.
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Travel and Touring:</strong> For artist tours and travel-related music events.
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Festivals and Concerts:</strong> For organizing festivals and concert events.
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Musicals:</strong> For theatrical musical productions and performances.
          </p>
        </div>
        <div className="md:col-span-2 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Cultural Organizations:</strong> For cultural initiatives and organizational support.
          </p>
        </div>
      </div>
    </div>
  );
}
