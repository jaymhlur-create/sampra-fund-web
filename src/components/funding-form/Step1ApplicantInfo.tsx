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
      <h2 className="text-2xl font-bold text-white mb-6">Applicant Information</h2>

      {/* Name & Surname */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Name & Surname *
        </label>
        <input
          type="text"
          value={data.name_surname}
          onChange={(e) => onChange({ name_surname: e.target.value })}
          placeholder="John Doe"
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>

      {/* Email (Read-only, auto-filled from auth) */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Email Address (Auto-filled)
        </label>
        <input
          type="email"
          value={data.email}
          disabled
          className="w-full px-4 py-3 bg-slate-600/30 border border-slate-600 rounded-lg text-slate-400 cursor-not-allowed opacity-60"
        />
      </div>

      {/* Contact Number */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Contact Number *
        </label>
        <input
          type="tel"
          value={data.contact_number}
          onChange={(e) => onChange({ contact_number: e.target.value })}
          placeholder="+27 123 456 7890"
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>

      {/* Alternate Number */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Alternate Number (Optional)
        </label>
        <input
          type="tel"
          value={data.alternate_number}
          onChange={(e) => onChange({ alternate_number: e.target.value })}
          placeholder="+27 098 765 4321"
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>

      {/* Applying As */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-3">
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
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-slate-200 group-hover:text-slate-100">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
