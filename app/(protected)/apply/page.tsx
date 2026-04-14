'use client';

import ApplicationForm from '@/src/components/funding-form/ApplicationForm';

/**
 * Application Page
 * Route: /apply
 * Protected: Requires authentication
 * 
 * Displays the multi-step funding application form
 */
export default function ApplicationPage() {
  return <ApplicationForm />;
}
