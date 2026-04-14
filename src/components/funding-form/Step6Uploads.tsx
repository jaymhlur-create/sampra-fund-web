'use client';

import { ApplicationData } from '@/src/types/application';

interface Step6UploadsProps {
  data: ApplicationData['step6'];
  onChange: (updates: Partial<ApplicationData['step6']>) => void;
}

/**
 * Step 6 - Document Uploads
 * Upload applicant ID and optional additional documents
 */
export default function Step6Uploads({ data, onChange }: Step6UploadsProps) {
  const handleAdditionalDocuments = (files: FileList | null) => {
    if (files) {
      onChange({
        additional_documents: [...data.additional_documents, ...Array.from(files)],
      });
    }
  };

  const handleRemoveAdditionalDoc = (index: number) => {
    onChange({
      additional_documents: data.additional_documents.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Document Uploads</h2>

      {/* Applicant ID Document */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Applicant ID / Passport Document *
        </label>
        <div className="relative">
          <input
            type="file"
            onChange={(e) => onChange({ applicant_id_document: e.target.files?.[0] || null })}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white cursor-pointer hover:border-blue-500 transition-all"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
          {data.applicant_id_document && (
            <p className="text-sm text-green-400 mt-2">
              ✓ {data.applicant_id_document.name}
            </p>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Accepted formats: PDF, JPG, PNG, DOC, DOCX
        </p>
      </div>

      {/* Additional Documents */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Additional Documents (Optional)
        </label>
        <div className="relative">
          <input
            type="file"
            multiple
            onChange={(e) => handleAdditionalDocuments(e.target.files)}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white cursor-pointer hover:border-blue-500 transition-all"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
        </div>
        <p className="text-xs text-slate-400 mt-1">
          You can upload multiple files at once
        </p>

        {/* List of additional documents */}
        {data.additional_documents.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-slate-300">Uploaded Documents:</p>
            {data.additional_documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-700/30 border border-slate-600/50 rounded-lg"
              >
                <span className="text-sm text-slate-300 truncate">📎 {doc.name}</span>
                <button
                  onClick={() => handleRemoveAdditionalDoc(index)}
                  className="text-xs text-red-400 hover:text-red-300 font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <p className="text-sm text-blue-300 mb-2 font-medium">📋 Document Requirements</p>
        <ul className="text-xs text-blue-200 space-y-1">
          <li>• Applicant ID or Passport is mandatory</li>
          <li>• All documents should be clear and legible</li>
          <li>• Maximum file size: 10MB per file (noted for backend)</li>
          <li>• Additional documents might include business permits, licenses, etc.</li>
        </ul>
      </div>
    </div>
  );
}
