'use client';

import { Quotation } from '@/src/types/application';

interface Step7QuotationsProps {
  quotations: Quotation[];
  onAddQuotation: (quotation: Quotation) => void;
  onRemoveQuotation: (id: string) => void;
  onUpdateQuotation: (id: string, data: Partial<Quotation>) => void;
  errors?: Record<string, string>; // ✅ NEW
}

export default function Step7Quotations({
  quotations,
  onAddQuotation,
  onRemoveQuotation,
  onUpdateQuotation,
  errors = {}, // ✅ NEW
}: Step7QuotationsProps) {

  const total = quotations.reduce((sum, q) => sum + (Number(q.quotation_amount) || 0), 0);

  const handleAddQuotation = () => {
    const newQuotation: Quotation = {
      id: `quotation-${Date.now()}`,
      quotation_name: '',
      quotation_amount: '',
      quotation_file: null,
    };
    onAddQuotation(newQuotation);
  };

  const sanitizeNumericInput = (value: string): string => {
    if (value === '') return '';
    let sanitized = value.replace(/[^\d.]/g, '');
    const parts = sanitized.split('.');
    if (parts.length > 2) {
      sanitized = parts[0] + '.' + parts.slice(1).join('');
    }
    if (sanitized.startsWith('0') && sanitized.length > 1 && sanitized[1] !== '.') {
      sanitized = sanitized.replace(/^0+/, '');
    }
    return sanitized;
  };

  // ✅ Store file locally ONLY
  const handleFileUpload = (quotationId: string, file: File | null) => {
    if (!file) return;

    onUpdateQuotation(quotationId, {
      quotation_file: file,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Budget Quotations</h2>

      {/* General Error */}
      {errors.general && (
        <p className="text-red-400 text-sm">{errors.general}</p>
      )}

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <p className="text-sm text-blue-300 mb-2 font-medium">💡 About Quotations</p>
        <p className="text-xs text-blue-200">
          Add all quotations related to your project budget. The system will automatically calculate the total.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-600">
            <tr className="bg-gray-700/30">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                Quotation Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                Amount (ZAR)
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                Document
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-600/50">
            {quotations.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                  No quotations added yet. Click "Add Quotation" to get started.
                </td>
              </tr>
            ) : (
              quotations.map((quotation, index) => {
                const prefix = `quotation_${index}`;

                return (
                  <tr key={quotation.id} className="hover:bg-gray-700/20 transition-colors">

                    {/* Name */}
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={quotation.quotation_name}
                        onChange={(e) =>
                          onUpdateQuotation(quotation.id, { quotation_name: e.target.value })
                        }
                        placeholder="e.g., PA System Rental"
                        className="w-full px-3 py-2 border border-gray-200 rounded text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500"
                      />
                      {errors[`${prefix}_name`] && (
                        <p className="text-xs text-red-400 mt-1">
                          {errors[`${prefix}_name`]}
                        </p>
                      )}
                    </td>

                    {/* Amount */}
                    <td className="px-4 py-3">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium pointer-events-none">
                          R
                        </span>
                        <input
                          type="text"
                          value={quotation.quotation_amount}
                          onChange={(e) => {
                            const sanitized = sanitizeNumericInput(e.target.value);
                            onUpdateQuotation(quotation.id, {
                              quotation_amount: sanitized,
                            });
                          }}
                          placeholder="0.00"
                          className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      {errors[`${prefix}_amount`] && (
                        <p className="text-xs text-red-400 mt-1">
                          {errors[`${prefix}_amount`]}
                        </p>
                      )}
                    </td>

                    {/* File */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">

                        <input
                          type="file"
                          onChange={(e) =>
                            handleFileUpload(quotation.id, e.target.files?.[0] || null)
                          }
                          className="text-xs file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-yellow-400 file:text-gray-900 cursor-pointer"
                          accept=".pdf,.jpg,.jpeg,.png"
                        />

                        {quotation.quotation_file && (
                          <span className="text-xs text-green-400">
                            ✓ {quotation.quotation_file.name}
                          </span>
                        )}

                        {errors[`${prefix}_file`] && (
                          <p className="text-xs text-red-400">
                            {errors[`${prefix}_file`]}
                          </p>
                        )}

                      </div>
                    </td>

                    {/* Remove */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => onRemoveQuotation(quotation.id)}
                        className="px-3 py-1 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                      >
                        Remove
                      </button>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-200">Total Budget:</span>
        <span className="text-2xl font-bold text-blue-400">
          R {total.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>

      <button
        onClick={handleAddQuotation}
        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
      >
        + Add Quotation
      </button>
    </div>
  );
}