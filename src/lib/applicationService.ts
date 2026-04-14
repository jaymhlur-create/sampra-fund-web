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
}

/**
 * Calculate total budget from quotations array
 * Safely converts string/number amounts to numbers
 */
export const calculateTotalBudget = (quotations: Quotation[]): number => {
  if (!Array.isArray(quotations)) return 0;

  return quotations.reduce((sum, quotation) => {
    const amount = Number(quotation.quotation_amount) || 0;
    return sum + amount;
  }, 0);
};

/**
 * Submit funding application to Supabase
 * @param formData - Complete application form data
 * @returns Promise with success status and data/error
 */
export const submitApplication = async (
  formData: ApplicationData
): Promise<SubmitApplicationResponse> => {
  try {
    // Step 1: Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('Auth error:', authError);
      return {
        success: false,
        error: 'User not authenticated. Please log in and try again.',
      };
    }

    // Step 2: Calculate total budget from quotations
    const totalBudget = calculateTotalBudget(formData.step7?.quotations || []);

    // Step 3: Prepare application data for database
    const applicationPayload = {
      user_id: user.id,
      status: 'submitted',
      application_data: formData,
      total_budget: totalBudget,
    };

    // Step 4: Insert into applications table
    const { data, error: insertError } = await supabase
      .from('applications')
      .insert([applicationPayload])
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return {
        success: false,
        error: `Failed to save application: ${insertError.message}`,
      };
    }

    // Step 5: Log success
    console.log('✅ Application submitted successfully');
    console.log('Application ID:', data?.id);
    console.log('Total Budget:', totalBudget);
    console.log('User:', user.email);

    return {
      success: true,
      data: { id: data?.id || '' },
    };
  } catch (error) {
    console.error('Unexpected error during submission:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};
