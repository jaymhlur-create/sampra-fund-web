'use client';

import { useReducer, useEffect, useState } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ApplicationData, initialApplicationData, STEPS } from '@/src/types/application';
import { submitApplication } from '@/src/lib/applicationService';
import { applicationReducer } from './reducer';
import StepNavigation from './StepNavigation';
import Step1ApplicantInfo from './Step1ApplicantInfo';
import Step2CompanyInfo from './Step2CompanyInfo';
import Step3ApplicationType from './Step3ApplicationType';
import Step4EventDetails from './Step4EventDetails';
import Step5ProjectInfo from './Step5ProjectInfo';
import Step6Uploads from './Step6Uploads';
import Step7Quotations from './Step7Quotations';
import Step8ReviewSubmit from './Step8ReviewSubmit';

/**
 * Main Funding Application Form Component
 * Multi-step form with state management and validation
 */
export default function ApplicationForm() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, dispatch] = useReducer(applicationReducer, initialApplicationData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Initialize email from auth user
  useEffect(() => {
    if (user?.email && !formData.step1.email) {
      dispatch({
        type: 'UPDATE_STEP1',
        payload: { email: user.email },
      });
    }
  }, [user, formData.step1.email]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  // Validate current step before moving to next
  const validateStep = (step: number): boolean => {
    const newErrors: string[] = [];

    switch (step) {
      case 1:
        if (!formData.step1.name_surname.trim())
          newErrors.push('Name & Surname is required');
        if (!formData.step1.contact_number.trim())
          newErrors.push('Contact Number is required');
        if (!formData.step1.applying_as)
          newErrors.push('Please select Applying As');
        break;

      case 2:
        if (formData.step1.applying_as === 'Company') {
          if (!formData.step2.company_name.trim())
            newErrors.push('Company Name is required');
          if (!formData.step2.cipc_registration_number.trim())
            newErrors.push('CIPC Registration Number is required');
          if (!formData.step2.cipc_document_upload)
            newErrors.push('CIPC Document is required');
          if (!formData.step2.directors.trim())
            newErrors.push('Directors list is required');
          if (!formData.step2.company_postal_address.trim())
            newErrors.push('Postal Address is required');
          if (!formData.step2.company_physical_address.trim())
            newErrors.push('Physical Address is required');
        }
        break;

      case 3:
        if (!formData.step3.application_type)
          newErrors.push('Application Type is required');
        break;

      case 4:
        if (!formData.step4.event_name.trim()) newErrors.push('Event Name is required');
        if (!formData.step4.event_date) newErrors.push('Event Date is required');
        if (!formData.step4.venue.trim()) newErrors.push('Venue is required');
        if (!formData.step4.sampra_license) newErrors.push('SAMPRA License selection is required');
        if (!formData.step4.estimated_attendance)
          newErrors.push('Estimated Attendance is required');
        break;

      case 5:
        if (!formData.step5.about_applicant.trim())
          newErrors.push('About You is required');
        if (!formData.step5.project_concept.trim())
          newErrors.push('Project Concept is required');
        if (!formData.step5.previous_events_history.trim())
          newErrors.push('Previous Events History is required');
        if (!formData.step5.project_timeline.trim())
          newErrors.push('Project Timeline is required');
        if (!formData.step5.marketing_plan_roi.trim())
          newErrors.push('Marketing Plan & ROI is required');
        break;

      case 6:
        if (!formData.step6.applicant_id_document)
          newErrors.push('Applicant ID Document is required');
        break;

      case 7:
        if (formData.step7.quotations.length === 0)
          newErrors.push('At least one quotation is required');
        else {
          formData.step7.quotations.forEach((q, index) => {
            if (!q.quotation_name.trim())
              newErrors.push(`Quotation ${index + 1}: Name is required`);
            if (!q.quotation_amount || Number(q.quotation_amount) <= 0)
              newErrors.push(`Quotation ${index + 1}: Amount must be greater than 0`);
            if (!q.quotation_file)
              newErrors.push(`Quotation ${index + 1}: Document is required`);
          });
        }
        break;
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Handle next step
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < STEPS.length) {
        // Skip step 2 if not company
        if (currentStep === 1 && formData.step1.applying_as !== 'Company') {
          setCurrentStep(3);
        } else {
          setCurrentStep(currentStep + 1);
        }
      }
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      // Skip step 2 if not company when going back
      if (currentStep === 3 && formData.step1.applying_as !== 'Company') {
        setCurrentStep(1);
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  // Handle step click from navigation
  const handleStepClick = (step: number) => {
    // Only allow clicking back or to completed steps
    if (step <= currentStep) {
      if (step === 2 && formData.step1.applying_as !== 'Company') {
        // Can't click step 2 if not company
        return;
      }
      setCurrentStep(step);
      setErrors([]);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (validateStep(7)) {
      setIsSubmitting(true);
      try {
        // Submit to Supabase
        const response = await submitApplication(formData);

        if (response.success) {
          // Show success message with application ID
          alert(
            `✅ Application submitted successfully!\nApplication ID: ${response.data?.id}`
          );

          // Reset form
          dispatch({ type: 'RESET_FORM' });
          setCurrentStep(1);
          setErrors([]);

          // Optionally redirect to dashboard
          setTimeout(() => {
            router.push('/dashboard');
          }, 1500);
        } else {
          // Show error message
          const errorMsg = response.error || 'Failed to submit application';
          setErrors([errorMsg]);
          alert(`❌ ${errorMsg}`);
        }
      } catch (error) {
        console.error('Submission error:', error);
        const errorMsg = error instanceof Error ? error.message : 'An unexpected error occurred';
        setErrors([errorMsg]);
        alert(`❌ ${errorMsg}`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="spinner h-12 w-12 border-4"></div>
      </div>
    );
  }

  if (!user) return null;

  // Determine if current step is company info and should be shown
  const showStep2 = formData.step1.applying_as === 'Company';
  const actualCurrentStep =
    currentStep === 3 && !showStep2
      ? 2
      : currentStep === 2 && !showStep2
      ? 1
      : currentStep;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Funding Application</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            SAMPRA Funding Application
          </h2>
          <p className="text-gray-600 text-lg">
            Complete all steps to submit your funding application
          </p>
        </div>

        {/* Step Navigation */}
        <StepNavigation currentStep={actualCurrentStep} onStepClick={handleStepClick} />

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-900 font-bold mb-2">Please fix the following errors:</p>
            <ul className="space-y-1">
              {errors.map((error, idx) => (
                <li key={idx} className="text-red-700 text-sm">
                  • {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 mb-8">
          {/* Step 1 */}
          {currentStep === 1 && (
            <Step1ApplicantInfo
              data={formData.step1}
              onChange={(updates) =>
                dispatch({ type: 'UPDATE_STEP1', payload: updates })
              }
            />
          )}

          {/* Step 2 - Conditional */}
          {currentStep === 2 && (
            <Step2CompanyInfo
              data={formData.step2}
              onChange={(updates) =>
                dispatch({ type: 'UPDATE_STEP2', payload: updates })
              }
              showStep={showStep2}
            />
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <Step3ApplicationType
              data={formData.step3}
              onChange={(updates) =>
                dispatch({ type: 'UPDATE_STEP3', payload: updates })
              }
            />
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <Step4EventDetails
              data={formData.step4}
              onChange={(updates) =>
                dispatch({ type: 'UPDATE_STEP4', payload: updates })
              }
            />
          )}

          {/* Step 5 */}
          {currentStep === 5 && (
            <Step5ProjectInfo
              data={formData.step5}
              onChange={(updates) =>
                dispatch({ type: 'UPDATE_STEP5', payload: updates })
              }
            />
          )}

          {/* Step 6 */}
          {currentStep === 6 && (
            <Step6Uploads
              data={formData.step6}
              onChange={(updates) =>
                dispatch({ type: 'UPDATE_STEP6', payload: updates })
              }
            />
          )}

          {/* Step 7 */}
          {currentStep === 7 && (
            <Step7Quotations
              quotations={formData.step7.quotations}
              onAddQuotation={(quotation) =>
                dispatch({ type: 'ADD_QUOTATION', payload: quotation })
              }
              onRemoveQuotation={(id) =>
                dispatch({ type: 'REMOVE_QUOTATION', payload: id })
              }
              onUpdateQuotation={(id, data) =>
                dispatch({ type: 'UPDATE_QUOTATION', payload: { id, data } })
              }
            />
          )}

          {/* Step 8 */}
          {currentStep === 8 && (
            <Step8ReviewSubmit
              data={formData}
              onEdit={setCurrentStep}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-between">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-bold rounded-full transition-all duration-200"
          >
            ← Previous
          </button>

          <button
            onClick={currentStep === 8 ? handleSubmit : handleNextStep}
            disabled={isSubmitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === 8
              ? isSubmitting
                ? 'Submitting...'
                : 'Submit Application'
              : 'Next →'}
          </button>
        </div>
      </main>
    </div>
  );
}
