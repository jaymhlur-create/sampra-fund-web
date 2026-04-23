/**
 * Application Service
 * Handles submission of funding applications to Supabase
 */

import { supabase } from './supabaseClient';
import { ApplicationData, Quotation } from '@/src/types/application';

interface SubmitApplicationResponse {
  success: boolean;
  data?: { id: string };
  error?: string;
};

/**
 * Upload file with FIXED PATH (supports replace via upsert)
 */
const uploadFile = async (
  bucket: string,
  path: string,
  file: File
) => {
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return {
    name: file.name,
    url: data.publicUrl,
    path,
  };
};

/**
 * Process Step 6 files (safe version)
 */
const processStep6Files = async (
  step6: any,
  userId: string,
  applicationId: string
) => {
  if (!step6) return step6;

  let idDocument = step6.applicant_id_document;
  let cipcDocument = step6.cipc_document_upload;

  // ID Document
  if (step6.applicant_id_document instanceof File) {
    const path = `${userId}/${applicationId}/documents/id_document`;
    idDocument = await uploadFile('documents', path, step6.applicant_id_document);
  }

  // CIPC Document
  if (step6.cipc_document_upload instanceof File) {
    const path = `${userId}/${applicationId}/documents/cipc_document`;
    cipcDocument = await uploadFile('documents', path, step6.cipc_document_upload);
  }

  return {
    ...step6,
    applicant_id_document: idDocument,
    cipc_document_upload: cipcDocument,
  };
};

/**
 * Process Step 7 quotation files
 */
const processStep7Files = async (
  step7: any,
  userId: string,
  applicationId: string
) => {
  if (!step7?.quotations) return step7;

  const processedQuotations = await Promise.all(
    step7.quotations.map(async (quotation: Quotation, index: number) => {
      let uploadedFile = quotation.quotation_file;

      if (quotation.quotation_file instanceof File) {
        const path = `${userId}/${applicationId}/quotations/quotation_${index + 1}`;

        uploadedFile = await uploadFile(
          'quotations',
          path,
          quotation.quotation_file
        );
      }

      return {
        ...quotation,
        quotation_file: uploadedFile,
      };
    })
  );

  return {
    ...step7,
    quotations: processedQuotations,
  };
};

/**
 * Calculate total budget
 */
export const calculateTotalBudget = (quotations: Quotation[]): number => {
  if (!Array.isArray(quotations)) return 0;

  return quotations.reduce((sum, quotation) => {
    return sum + (Number(quotation.quotation_amount) || 0);
  }, 0);
};

/**
 * Submit application (SAFE VERSION)
 */
export const submitApplication = async (
  formData: ApplicationData
): Promise<SubmitApplicationResponse> => {
  try {
    // AUTH CHECK
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    // CREATE DRAFT APPLICATION
    const { data: newApp, error: createError } = await supabase
      .from('applications')
      .insert([
        {
          user_id: user.id,
          status: 'draft',
          application_data: {},
          total_budget: 0,
        },
      ])
      .select()
      .single();

    if (createError || !newApp) {
      console.error('CREATE ERROR:', createError);
      return {
        success: false,
        error: 'Failed to create application record',
      };
    }

    const applicationId = newApp.id;

    // 🔥 SAFE DEBUG (NO CRASH RISK)
    console.log('🚀 SUBMIT START');
    console.log('STEP 6 EXISTS:', !!formData.step6);
    console.log('STEP 7 EXISTS:', !!formData.step7);

    // PROCESS FILES
    const processedStep6 = await processStep6Files(
      formData.step6,
      user.id,
      applicationId
    );

    const processedStep7 = await processStep7Files(
      formData.step7,
      user.id,
      applicationId
    );

    // FINAL DATA
    const processedFormData = {
      ...formData,
      step6: processedStep6,
      step7: processedStep7,
    };

    // FINAL DEBUG (SAFE STRINGIFY)
    console.log('STEP 6 FINAL:', processedStep6);
    console.log('STEP 7 FINAL:', processedStep7);

    // CALCULATE TOTAL
    const totalBudget = calculateTotalBudget(
      processedStep7?.quotations || []
    );

    // UPDATE APPLICATION
    const { error: updateError } = await supabase
      .from('applications')
      .update({
        application_data: processedFormData,
        total_budget: totalBudget,
        status: 'submitted',
      })
      .eq('id', applicationId);

    if (updateError) {
      console.error('UPDATE ERROR:', updateError);
      return {
        success: false,
        error: 'Failed to update application',
      };
    }

    console.log('✅ SUBMIT SUCCESS:', applicationId);

    return {
      success: true,
      data: { id: applicationId },
    };

  } catch (error) {
    console.error('SUBMIT FAILED:', error);

    return {
      success: false,
      error: error instanceof Error
        ? error.message
        : 'Unexpected error',
    };
  }
};