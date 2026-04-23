'use client';

import { ApplicationData } from '@/src/types/application';

interface Step6UploadsProps {
  data: ApplicationData['step6'];
  onChange: (updates: Partial<ApplicationData['step6']>) => void;
}

export default function Step6Uploads({ data, onChange }: Step6UploadsProps) {

  // ✅ Store ID document locally (NO upload here)
  const handleIdUpload = (file: File | null) => {
    if (!file) return;

    onChange({
      applicant_id_document: file,
    });
  };

  // ✅ Store additional documents locally
  const handleAdditionalDocuments = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);

    onChange({
      additional_documents: [...(data.additional_documents || []), ...newFiles],
    });
  };

  const handleRemoveAdditionalDoc = (index: number) => {
    onChange({
      additional_documents: data.additional_documents.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Document Uploads</h2>

      {/* Applicant ID Document */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Applicant ID / Passport Document *
        </label>

        <input
          type="file"
          onChange={(e) => handleIdUpload(e.target.files?.[0] || null)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-yellow-400 file:text-gray-900 cursor-pointer hover:border-blue-500 transition-all"
          accept=".pdf,.jpg,.jpeg,.png"
        />

        {data.applicant_id_document && (
          <p className="text-sm text-green-400 mt-2">
            ✓ {data.applicant_id_document.name}
          </p>
        )}

        <p className="text-xs text-gray-400 mt-1">
          Accepted formats: PDF, JPG, PNG
        </p>
      </div>

      {/* Additional Documents */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Additional Documents (Optional)
        </label>

        <input
          type="file"
          multiple
          onChange={(e) => handleAdditionalDocuments(e.target.files)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-yellow-400 file:text-gray-900 cursor-pointer hover:border-blue-500 transition-all"
          accept=".pdf,.jpg,.jpeg,.png"
        />

        <p className="text-xs text-gray-400 mt-1">
          You can upload multiple files
        </p>

        {/* List */}
        {data.additional_documents?.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-gray-300">Uploaded Documents:</p>

            {data.additional_documents.map((doc: any, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-700/30 border border-slate-600/50 rounded-lg"
              >
                <span className="text-sm text-gray-300 truncate">
                  📎 {doc.name}
                </span>

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
          <li>• Maximum file size: 10MB per file</li>
        </ul>
      </div>
    </div>
  );
}