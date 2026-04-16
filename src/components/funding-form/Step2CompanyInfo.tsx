'use client';

import { ApplicationData } from '@/src/types/application';

interface Step2CompanyInfoProps {
  data: ApplicationData['step2'];
  onChange: (updates: Partial<ApplicationData['step2']>) => void;
  showStep: boolean;
}

/**
 * Step 2 - Company Info
 * Only shown if applying_as === "Company"
 */
export default function Step2CompanyInfo({ data, onChange, showStep }: Step2CompanyInfoProps) {
  if (!showStep) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Company Information</h2>

      {/* Company Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Company Name *
        </label>
        <input
          type="text"
          value={data.company_name}
          onChange={(e) => onChange({ company_name: e.target.value })}
          placeholder="ABC Music Productions"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
        />
      </div>

      {/* CIPC Registration Number */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          CIPC Registration Number *
        </label>
        <input
          type="text"
          value={data.cipc_registration_number}
          onChange={(e) => onChange({ cipc_registration_number: e.target.value })}
          placeholder="2024/123456"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
        />
      </div>

      {/* CIPC Document Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          CIPC Document *
        </label>
        <div className="relative">
          <input
            type="file"
            onChange={(e) => onChange({ cipc_document_upload: e.target.files?.[0] || null })}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-yellow-400 file:text-gray-900 cursor-pointer hover:border-yellow-400 transition-all"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          {data.cipc_document_upload && (
            <p className="text-sm text-green-600 mt-2">
              ✓ {data.cipc_document_upload.name}
            </p>
          )}
        </div>
      </div>

      {/* Directors */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Directors / Key Personnel *
        </label>
        <textarea
          value={data.directors}
          onChange={(e) => onChange({ directors: e.target.value })}
          placeholder="List all directors and their roles"
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all resize-none"
        />
      </div>

      {/* Company Postal Address */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Postal Address *
        </label>
        <input
          type="text"
          value={data.company_postal_address}
          onChange={(e) => onChange({ company_postal_address: e.target.value })}
          placeholder="123 Main Street, City, 0000"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
        />
      </div>

      {/* Company Physical Address */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Physical Address *
        </label>
        <input
          type="text"
          value={data.company_physical_address}
          onChange={(e) => onChange({ company_physical_address: e.target.value })}
          placeholder="123 Main Street, City, 0000"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
        />
      </div>
    </div>
  );
}
