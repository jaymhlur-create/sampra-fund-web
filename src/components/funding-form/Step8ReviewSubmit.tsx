'use client';

import { ApplicationData } from '@/src/types/application';

interface Step8ReviewSubmitProps {
  data: ApplicationData;
  onEdit: (step: number) => void;
  onSubmit: () => Promise<void> | void;
  isSubmitting?: boolean;
}

export default function Step8ReviewSubmit({
  data,
  onEdit,
  onSubmit,
  isSubmitting = false,
}: Step8ReviewSubmitProps) {

  // 🔥 SAFETY GUARD (prevents crashes if step7 is undefined)
  const quotations = data.step7?.quotations || [];

  // Calculate total safely
  const quotationTotal = quotations.reduce(
    (sum, q) => sum + (Number(q?.quotation_amount) || 0),
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
    <div className="bg-gray-700/30 border border-slate-600/50 rounded-lg p-6 mb-4">
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
      <span className="text-gray-400">{label}:</span>
      <span className="text-gray-200 font-medium">
        {value === null || value === undefined || value === ''
          ? '—'
          : typeof value === 'boolean'
          ? value ? 'Yes' : 'No'
          : String(value)}
      </span>
    </div>
  );

  // 🔥 HARD VALIDATION BEFORE SUBMIT
  const handleSubmit = async () => {
    try {
      console.log('🚀 SUBMIT START');
      console.log('📦 Full application data:', data);
      console.log("step 8 clicked")

      // 🧠 VALIDATION: ID DOCUMENT
      if (!data.step6?.applicant_id_document?.url) {
        alert('Applicant ID Document is required');
        return;
      }

      // 🧠 VALIDATION: must have at least 1 quotation
      if (quotations.length === 0) {
        alert('At least one quotation is required');
        return;
      }

      console.log('✅ Validation passed, submitting...');

      await onSubmit();

      console.log('✅ Submit completed successfully');
      console.log('✅ onSubmit completed, waiting for response...');
    } catch (error) {
      console.error('❌ Submit failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Review Your Application
      </h2>

      {/* Step 1 */}
      <ReviewSection step={1} title="Applicant Information">
        <ReviewItem label="Name & Surname" value={data.step1?.name_surname} />
        <ReviewItem label="Email" value={data.step1?.email} />
        <ReviewItem label="Contact Number" value={data.step1?.contact_number} />
        <ReviewItem label="Alternate Number" value={data.step1?.alternate_number || '—'} />
        <ReviewItem label="Applying As" value={data.step1?.applying_as} />
      </ReviewSection>

      {/* Step 5 (FIXED DISPLAY SAFETY) */}
      <ReviewSection step={5} title="Project Information">
        <ReviewItem label="About Applicant" value={data.step5?.about_applicant} />
        <ReviewItem label="Project Concept" value={data.step5?.project_concept} />
        <ReviewItem label="Previous Experience" value={data.step5?.previous_events_history} />
        <ReviewItem label="Marketing & ROI" value={data.step5?.marketing_plan_roi} />
      </ReviewSection>

      {/* Step 6 */}
      <ReviewSection step={6} title="Documents">
        {data.step6?.applicant_id_document?.name ? (
          <p className="text-gray-200 text-sm">
            📎 ID Document:{' '}
            <span className="font-medium">
              {data.step6.applicant_id_document.name}
            </span>
          </p>
        ) : (
          <p className="text-red-400 text-sm">
            ⚠️ No ID document uploaded
          </p>
        )}
      </ReviewSection>

      {/* Step 7 */}
      <ReviewSection step={7} title="Budget Quotations">
        {quotations.length === 0 ? (
          <p className="text-gray-300 text-sm italic">
            No quotations added
          </p>
        ) : (
          <>
            {quotations.map((q) => (
              <div
                key={q.id}
                className="flex justify-between py-2 border-b border-slate-600/30"
              >
                <span className="text-gray-300">
                  {q.quotation_name || 'Unnamed'}
                </span>
                <span className="text-gray-200 font-medium">
                  R {Number(q.quotation_amount || 0).toLocaleString('en-ZA', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            ))}

            <div className="flex justify-between py-3 bg-gray-700/50 px-3 rounded mt-4">
              <span className="text-white font-semibold">
                Total Budget:
              </span>
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

      {/* Submit */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mt-8">
        <p className="text-sm text-blue-300 mb-4">
          ✓ All information has been reviewed.
        </p>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
        >
          {isSubmitting ? 'Submitting...' : '✓ Submit Application'}
        </button>
      </div>
    </div>
  );
}