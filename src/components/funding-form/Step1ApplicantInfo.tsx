'use client';

import { ApplicationData } from '@/src/types/application';

interface Step1ApplicantInfoProps {
  data: ApplicationData['step1'];
  onChange: (updates: Partial<ApplicationData['step1']>) => void;
}

/**
 * Step 1 - Applicant Info
 * Collects basic applicant information and type
 */
export default function Step1ApplicantInfo({ data, onChange }: Step1ApplicantInfoProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Applicant Information</h2>

      {/* Name & Surname */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Name & Surname *
        </label>
        <input
          type="text"
          value={data.name_surname}
          onChange={(e) => onChange({ name_surname: e.target.value })}
          placeholder="John Doe"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
        />
      </div>

      {/* Email (Read-only, auto-filled from auth) */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Email Address (Auto-filled)
        </label>
        <input
          type="email"
          value={data.email}
          disabled
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed opacity-60"
        />
      </div>

      {/* Contact Number */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Contact Number *
        </label>
        <input
          type="tel"
          value={data.contact_number}
          onChange={(e) => onChange({ contact_number: e.target.value })}
          placeholder="+27 123 456 7890"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
        />
      </div>

      {/* Alternate Number */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Alternate Number (Optional)
        </label>
        <input
          type="tel"
          value={data.alternate_number}
          onChange={(e) => onChange({ alternate_number: e.target.value })}
          placeholder="+27 098 765 4321"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
        />
      </div>

      {/* Applying As */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Applying As *
        </label>
        <div className="space-y-2">
          {(['Individual', 'Company'] as const).map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="applying_as"
                value={option}
                checked={data.applying_as === option}
                onChange={(e) => onChange({ applying_as: e.target.value as 'Individual' | 'Company' })}
                className="w-4 h-4 accent-yellow-400"
              />
              <span className="text-gray-900 font-medium group-hover:text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
