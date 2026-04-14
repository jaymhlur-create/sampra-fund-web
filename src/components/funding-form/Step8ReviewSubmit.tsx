'use client';

import { ApplicationData, STEPS } from '@/src/types/application';

interface Step8ReviewSubmitProps {
  data: ApplicationData;
  onEdit: (step: number) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

/**
 * Step 8 - Review & Submit
 * Final review of all entered data with edit capabilities
 */
export default function Step8ReviewSubmit({
  data,
  onEdit,
  onSubmit,
  isSubmitting = false,
}: Step8ReviewSubmitProps) {
  // Calculate total from quotations
  const quotationTotal = data.step7.quotations.reduce(
    (sum, q) => sum + (Number(q.quotation_amount) || 0),
    0
  );

  const ReviewSection = ({
    step,
    title,
    children,
  }: {
    step: number;
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <button
          onClick={() => onEdit(step)}
          className="px-3 py-1 text-sm font-medium text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded transition-colors"
        >
          Edit
        </button>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );

  const ReviewItem = ({ label, value }: { label: string; value: any }) => (
    <div className="flex justify-between py-2 border-b border-slate-600/30">
      <span className="text-slate-400">{label}:</span>
      <span className="text-slate-200 font-medium">
        {value === null || value === undefined || value === ''
          ? '—'
          : typeof value === 'boolean'
          ? value
            ? 'Yes'
            : 'No'
          : String(value)}
      </span>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Review Your Application</h2>

      {/* Step 1 - Applicant Info */}
      <ReviewSection step={1} title="Applicant Information">
        <ReviewItem label="Name & Surname" value={data.step1.name_surname} />
        <ReviewItem label="Email" value={data.step1.email} />
        <ReviewItem label="Contact Number" value={data.step1.contact_number} />
        <ReviewItem label="Alternate Number" value={data.step1.alternate_number || '—'} />
        <ReviewItem label="Applying As" value={data.step1.applying_as} />
      </ReviewSection>

      {/* Step 2 - Company Info (if applicable) */}
      {data.step1.applying_as === 'Company' && (
        <ReviewSection step={2} title="Company Information">
          <ReviewItem label="Company Name" value={data.step2.company_name} />
          <ReviewItem label="CIPC Number" value={data.step2.cipc_registration_number} />
          <ReviewItem label="Directors" value={data.step2.directors || '—'} />
          <ReviewItem label="Postal Address" value={data.step2.company_postal_address} />
          <ReviewItem label="Physical Address" value={data.step2.company_physical_address} />
          {data.step2.cipc_document_upload && (
            <ReviewItem
              label="CIPC Document"
              value={`📎 ${data.step2.cipc_document_upload.name}`}
            />
          )}
        </ReviewSection>
      )}

      {/* Step 3 - Application Type */}
      <ReviewSection step={3} title="Application Type">
        <ReviewItem label="Application Type" value={data.step3.application_type} />
      </ReviewSection>

      {/* Step 4 - Event Details */}
      <ReviewSection step={4} title="Event Details">
        <ReviewItem label="Event Name" value={data.step4.event_name} />
        <ReviewItem label="Event Date" value={data.step4.event_date} />
        <ReviewItem label="Venue" value={data.step4.venue} />
        <ReviewItem label="SAMPRA License" value={data.step4.sampra_license} />
        <ReviewItem label="Estimated Attendance" value={data.step4.estimated_attendance} />
      </ReviewSection>

      {/* Step 5 - Project Info */}
      <ReviewSection step={5} title="Project Information">
        <div className="space-y-3">
          <div>
            <p className="text-sm text-slate-400 font-medium">About You:</p>
            <p className="text-slate-200 text-sm mt-1">{data.step5.about_applicant || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Project Concept:</p>
            <p className="text-slate-200 text-sm mt-1">{data.step5.project_concept || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Previous Experience:</p>
            <p className="text-slate-200 text-sm mt-1">
              {data.step5.previous_events_history || '—'}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Project Timeline:</p>
            <p className="text-slate-200 text-sm mt-1">{data.step5.project_timeline || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Marketing Plan & ROI:</p>
            <p className="text-slate-200 text-sm mt-1">{data.step5.marketing_plan_roi || '—'}</p>
          </div>
        </div>
      </ReviewSection>

      {/* Step 6 - Documents */}
      <ReviewSection step={6} title="Documents">
        {data.step6.applicant_id_document ? (
          <p className="text-slate-200 text-sm">
            📎 ID Document: <span className="font-medium">{data.step6.applicant_id_document.name}</span>
          </p>
        ) : (
          <p className="text-red-400 text-sm">⚠️ No ID document uploaded</p>
        )}
        {data.step6.additional_documents.length > 0 && (
          <div className="mt-3">
            <p className="text-slate-400 text-sm font-medium">Additional Documents:</p>
            <ul className="text-slate-300 text-sm mt-1 space-y-1">
              {data.step6.additional_documents.map((doc, idx) => (
                <li key={idx}>📎 {doc.name}</li>
              ))}
            </ul>
          </div>
        )}
      </ReviewSection>

      {/* Step 7 - Quotations */}
      <ReviewSection step={7} title="Budget Quotations">
        {data.step7.quotations.length === 0 ? (
          <p className="text-slate-300 text-sm italic">No quotations added</p>
        ) : (
          <>
            <div className="space-y-2">
              {data.step7.quotations.map((q) => (
                <div
                  key={q.id}
                  className="flex items-center justify-between py-2 border-b border-slate-600/30"
                >
                  <span className="text-slate-300">{q.quotation_name || 'Unnamed'}</span>
                  <span className="text-slate-200 font-medium">
                    R {Number(q.quotation_amount).toLocaleString('en-ZA', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between py-3 bg-slate-700/50 px-3 rounded -mx-6 px-6 mt-4">
              <span className="text-white font-semibold">Total Budget:</span>
              <span className="text-xl font-bold text-blue-400">
                R {quotationTotal.toLocaleString('en-ZA', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </>
        )}
      </ReviewSection>

      {/* Submit Section */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mt-8">
        <p className="text-sm text-blue-300 mb-4">
          ✓ All information has been reviewed. Click "Submit Application" to proceed with your submission.
        </p>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
        >
          {isSubmitting ? 'Submitting...' : '✓ Submit Application'}
        </button>
      </div>
    </div>
  );
}
