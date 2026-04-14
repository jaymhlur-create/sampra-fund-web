'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/src/lib/supabaseClient';
import Link from 'next/link';

interface Application {
  id: string;
  user_id: string;
  status: string;
  application_data: Record<string, any>;
  total_budget: number;
  created_at: string;
}

type AdminStatus = 'submitted' | 'under_review' | 'approved' | 'rejected';

interface AdminAction {
  status: AdminStatus | null;
  message: string;
}

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const applicationId = params?.id as string;

  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Admin action state
  const [adminAction, setAdminAction] = useState<AdminAction>({
    status: null,
    message: '',
  });

  // Image preview modal state
  const [previewImage, setPreviewImage] = useState<{ url: string; name: string } | null>(null);

  // Fetch single application on component mount
  useEffect(() => {
    if (!applicationId) {
      setError('Application ID not found');
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchApplication = async () => {
      console.log('1️⃣ DETAIL FETCH START: Fetching application', applicationId);
      try {
        console.log('2️⃣ LOADING STATE: Setting loading = true');
        setLoading(true);
        setError(null);

        console.log('3️⃣ EXECUTING QUERY: Calling Supabase select with id =', applicationId);
        const { data, error: fetchError } = await supabase
          .from('applications')
          .select('*')
          .eq('id', applicationId)
          .single();

        console.log('4️⃣ QUERY RESPONSE RECEIVED:', {
          found: !!data,
          hasError: !!fetchError,
          errorMessage: fetchError?.message || 'none',
        });

        if (!isMounted) {
          console.log('⚠️ Component unmounted, skipping state updates');
          return;
        }

        if (fetchError) {
          console.error('❌ QUERY ERROR:', fetchError);
          
          // Handle "not found" error specifically
          if (fetchError.code === 'PGRST116') {
            setError('Application not found');
          } else {
            setError(`Failed to load application: ${fetchError.message}`);
          }
          setApplication(null);
          return;
        }

        if (!data) {
          console.log('⚠️ No data returned');
          setError('Application not found');
          setApplication(null);
          return;
        }

        console.log('✅ QUERY SUCCESS: Loaded application');
        setApplication(data);
        setError(null);
        console.log('5️⃣ SUCCESS STATE: Application data loaded');
      } catch (err) {
        console.error('❌ CATCH BLOCK - Unexpected error:', err);
        if (isMounted) {
          const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
          setError(errorMsg);
          setApplication(null);
          console.log('6️⃣ EXCEPTION STATE: Updated error state');
        }
      } finally {
        console.log('7️⃣ FINALLY BLOCK: Setting loading = false');
        setLoading(false);
        console.log('8️⃣ LOADING DISABLED: Ready to render');
      }
    };

    fetchApplication();

    return () => {
      isMounted = false;
      console.log('🧹 Cleanup: Component unmounted');
    };
  }, [applicationId]);

  // Format date to readable format
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-ZA', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  // Format currency
  const formatCurrency = (amount: number | null | undefined): string => {
    const safeAmount = Number(amount) || 0;
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(safeAmount);
  };

  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      case 'under_review':
        return 'bg-orange-500/20 text-orange-300 border border-orange-500/30';
      case 'approved':
        return 'bg-green-500/20 text-green-300 border border-green-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-300 border border-red-500/30';
      case 'draft':
        return 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
    }
  };

  // Get human-readable status label
  const getStatusLabel = (status: string): string => {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Shorten ID for display
  const shortenId = (id: string): string => {
    return id.substring(0, 8).toUpperCase();
  };

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSuccessMessage('Copied to clipboard!');
    setTimeout(() => setSuccessMessage(null), 2000);
  };

  // Parse application data for structured display
  const parseApplicationData = (data: Record<string, any>) => {
    const sections = [];

    // Personal Information (Step 1)
    if (data.step1) {
      sections.push({
        title: '👤 Personal Information',
        items: [
          { label: 'Name', value: data.step1.name_surname },
          { label: 'Email', value: data.step1.email },
          { label: 'Contact Number', value: data.step1.contact_number },
          { label: 'Alternate Number', value: data.step1.alternate_number },
          { label: 'Applying As', value: data.step1.applying_as },
        ],
      });
    }

    // Company Information (Step 2)
    if (data.step2 && data.step1?.applying_as === 'Company') {
      sections.push({
        title: '🏢 Company Information',
        items: [
          { label: 'Company Name', value: data.step2.company_name },
          { label: 'CIPC Registration', value: data.step2.cipc_registration_number },
          { label: 'Directors', value: data.step2.directors },
          { label: 'Postal Address', value: data.step2.company_postal_address },
          { label: 'Physical Address', value: data.step2.company_physical_address },
        ],
      });
    }

    // Application Type (Step 3)
    if (data.step3) {
      sections.push({
        title: '📋 Application Type',
        items: [{ label: 'Type', value: data.step3.application_type }],
      });
    }

    // Event Details (Step 4)
    if (data.step4) {
      sections.push({
        title: '📅 Event Details',
        items: [
          { label: 'Event Name', value: data.step4.event_name },
          { label: 'Date', value: data.step4.event_date },
          { label: 'Venue', value: data.step4.venue },
          { label: 'SAMPRA License', value: data.step4.sampra_license },
          { label: 'Estimated Attendance', value: data.step4.estimated_attendance },
        ],
      });
    }

    // Project Information (Step 5)
    if (data.step5) {
      sections.push({
        title: '🎨 Project Information',
        items: [
          { label: 'About Applicant', value: data.step5.about_applicant },
          { label: 'Project Concept', value: data.step5.project_concept },
          { label: 'Previous Events', value: data.step5.previous_events_history },
          { label: 'Project Timeline', value: data.step5.project_timeline },
          { label: 'Marketing Plan & ROI', value: data.step5.marketing_plan_roi },
        ],
      });
    }

    // Quotations (Dynamic Path)
    const quotations = getQuotations();
    if (quotations && quotations.length > 0) {
      sections.push({
        title: '💾 Quotations & Budget',
        isQuotations: true,
        quotations,
      });
    }

    return sections;
  };

  // Get file type from filename
  const getFileType = (filename: string): string => {
    if (!filename) return 'file';
    const ext = filename.split('.').pop()?.toLowerCase() || 'file';
    if (['pdf'].includes(ext)) return 'pdf';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image';
    return ext;
  };

  // Handle file download
  const handleDownload = async (file: any) => {
    try {
      const response = await fetch(file.url);
      if (!response.ok) throw new Error('Failed to download file');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name || 'download';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download failed:', err);
      setUpdateError('Failed to download file');
    }
  };

  // Handle view file based on type
  const handleViewFile = (file: any) => {
    const fileType = getFileType(file.name);
    
    if (fileType === 'pdf') {
      // Open PDF in new tab
      window.open(file.url, '_blank');
    } else if (fileType === 'image') {
      // Open image in preview modal
      setPreviewImage({ url: file.url, name: file.name });
    } else {
      // Download other files
      handleDownload(file);
    }
  };

  // Safely search for quotations in any nested path
  const getQuotations = () => {
    const data = application?.application_data || {};
    console.log('🔍 Searching for quotations in:', JSON.stringify(data));
    
    // Direct paths to check
    const paths = [
      data.quotations,
      data.step7?.quotations,
      data.budget?.quotations,
      data.files?.quotations,
      data.step4?.quotations,
    ];
    
    // Find first non-empty quotations array
    const found = paths.find(q => Array.isArray(q) && q.length > 0);
    
    if (found) {
      console.log('✅ Found quotations:', found);
      return found;
    }
    
    // Fallback: deep search for any "quotation" key
    const deepSearch = (obj: any, depth = 0): any[] => {
      if (depth > 5) return []; // Prevent infinite recursion
      if (!obj || typeof obj !== 'object') return [];
      
      if (Array.isArray(obj)) {
        if (obj.some(item => item?.quotation_name || item?.quotation_amount)) {
          return obj;
        }
        for (const item of obj) {
          const result = deepSearch(item, depth + 1);
          if (result.length > 0) return result;
        }
      } else {
        for (const key in obj) {
          if (key.toLowerCase().includes('quotation')) {
            if (Array.isArray(obj[key]) && obj[key].length > 0) {
              return obj[key];
            }
          }
          const result = deepSearch(obj[key], depth + 1);
          if (result.length > 0) return result;
        }
      }
      return [];
    };
    
    const deepResult = deepSearch(data);
    if (deepResult.length > 0) {
      console.log('✅ Found quotations via deep search:', deepResult);
      return deepResult;
    }
    
    console.log('⚠️ No quotations found');
    return [];
  };

  // Collect all attachments from application data
  const collectAttachments = () => {
    const attachments: any[] = [];
    const data = application?.application_data || {};
    
    if (data.attachments && Array.isArray(data.attachments)) {
      attachments.push(...data.attachments);
    }
    
    // Also collect quotation files
    const quotations = getQuotations();
    quotations.forEach((q: any) => {
      if (q?.quotation_file) {
        attachments.push(q.quotation_file);
      }
    });
    
    return attachments;
  };

  // Handle status update
  const handleStatusUpdate = async (newStatus: AdminStatus) => {
    if (!application) return;

    setUpdating(true);
    setUpdateError(null);

    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', application.id);

      if (error) {
        setUpdateError(`Failed to update: ${error.message}`);
        setUpdating(false);
        return;
      }

      // Update local state
      setApplication(prev => (prev ? { ...prev, status: newStatus } : null));
      setAdminAction({ status: null, message: '' });
      setSuccessMessage(`Application marked as ${getStatusLabel(newStatus)}`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setUpdateError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/applications"
          className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block"
        >
          ← Back to Applications List
        </Link>
        <h1 className="text-4xl font-bold text-white">Application Review Control Center</h1>
        <p className="text-slate-400 mt-2">Manage and process funding applications</p>
      </div>

      {/* Global Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-300 text-sm">
            <span className="font-semibold">Error:</span> {error}
          </p>
        </div>
      )}

      {updateError && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-300 text-sm">
            <span className="font-semibold">Update Error:</span> {updateError}
          </p>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-300 text-sm">{successMessage}</p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block animate-spin">
              <div className="w-12 h-12 border-4 border-slate-600 border-t-blue-500 rounded-full"></div>
            </div>
            <p className="text-slate-400 mt-4">Loading application details...</p>
          </div>
        </div>
      ) : application ? (
        /* 3-Column Layout */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* LEFT: Applicant Info Panel (1 column) */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6 space-y-6 sticky top-6">
              {/* Status Badge */}
              <div className="text-center">
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                    application.status
                  )}`}
                >
                  {getStatusLabel(application.status)}
                </span>
              </div>

              {/* Application ID */}
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">
                  Application ID
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-blue-300 font-mono text-sm bg-slate-900/50 px-3 py-2 rounded-lg break-all">
                    {shortenId(application.id)}
                  </code>
                  <button
                    onClick={() => copyToClipboard(application.id)}
                    className="text-slate-400 hover:text-blue-300 transition-colors"
                    title="Copy full ID"
                  >
                    📋
                  </button>
                </div>
              </div>

              {/* User ID */}
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">
                  User ID
                </p>
                <code className="text-slate-300 font-mono text-sm bg-slate-900/50 px-3 py-2 rounded-lg break-all block">
                  {application.user_id.substring(0, 8)}...
                </code>
              </div>

              {/* Total Budget */}
              <div className="border-t border-slate-700/50 pt-6">
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">
                  Budget Total
                </p>
                <p className="text-2xl font-bold text-blue-300">
                  {formatCurrency(application.total_budget)}
                </p>
              </div>

              {/* Submission Date */}
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">
                  Submitted
                </p>
                <p className="text-slate-300 text-sm">
                  {formatDate(application.created_at)}
                </p>
              </div>
            </div>
          </div>

          {/* CENTER: Application Data (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {parseApplicationData(application.application_data).map((section, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8"
              >
                <h2 className="text-xl font-bold text-white mb-6">{section.title}</h2>

                {section.isQuotations ? (
                  /* Quotations Display with Enhanced SaaS Cards */
                  <div className="space-y-4">
                    {section.quotations && section.quotations.length > 0 ? (
                      section.quotations.map((quote: any, qidx: number) => (
                        <div
                          key={qidx}
                          className="bg-slate-800/60 rounded-xl p-5 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all duration-200"
                        >
                          {/* Header: Title + Amount */}
                          <div className="flex justify-between items-start gap-3 mb-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-white text-lg">
                                {quote?.quotation_name || `Quotation ${qidx + 1}`}
                              </h3>
                              {quote?.vendor_name && (
                                <p className="text-sm text-slate-400 mt-1">Vendor: {quote.vendor_name}</p>
                              )}
                            </div>
                            <p className="text-lg font-bold text-blue-300 whitespace-nowrap">
                              {formatCurrency(quote?.quotation_amount || 0)}
                            </p>
                          </div>

                          {/* Description */}
                          {quote?.description && (
                            <p className="text-sm text-slate-300 mb-4 bg-slate-900/30 p-3 rounded-lg">
                              {quote.description}
                            </p>
                          )}

                          {/* File Preview and Buttons */}
                          {(quote?.quotation_file || quote?.file?.url) && (
                            <div className="mb-4 bg-slate-900/50 rounded-lg p-3 border border-slate-600/50">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-sm font-medium text-slate-300">📎 Attached File:</span>
                                <span className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded uppercase">
                                  {getFileType(
                                    quote?.quotation_file?.name || quote?.file?.name || 'file'
                                  )}
                                </span>
                              </div>
                              <p className="text-sm text-slate-400 truncate mb-3" title={quote?.quotation_file?.name || quote?.file?.name}>
                                {quote?.quotation_file?.name || quote?.file?.name || 'Quotation File'}
                              </p>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleViewFile(
                                    quote?.quotation_file || quote?.file || { name: 'quotation', url: quote?.file?.url }
                                  )}
                                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
                                >
                                  👁️ View
                                </button>
                                <button
                                  onClick={() => handleDownload(
                                    quote?.quotation_file || quote?.file || { name: 'quotation', url: quote?.file?.url }
                                  )}
                                  className="flex-1 px-3 py-2 bg-slate-600 hover:bg-slate-500 text-white text-xs font-semibold rounded-lg transition-colors"
                                >
                                  ⬇️ Download
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Footer: Reference */}
                          <div className="text-xs text-slate-500 pt-3 border-t border-slate-700/50">
                            Reference: Quotation #{qidx + 1}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 bg-slate-900/30 rounded-lg border border-slate-700/50 text-slate-400">
                        <p>No quotations found</p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Regular Fields Display */
                  <div className="space-y-4">
                    {section.items && section.items.map((item: any, iidx: number) => (
                      <div key={iidx} className="flex justify-between items-start py-3 border-b border-slate-700/30 last:border-0">
                        <span className="text-slate-400 text-sm font-medium">{item.label}</span>
                        <span className="text-right text-white font-medium max-w-xs">
                          {item.value || '—'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Attachments & Quotations Viewer */}
            {collectAttachments().length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8">
                <h2 className="text-xl font-bold text-white mb-6">📎 Attachments & Files</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {collectAttachments().map((file: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50 hover:border-slate-500/50 hover:bg-slate-700/40 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white truncate" title={file.name}>
                            {file.name}
                          </p>
                          <span className="inline-block mt-2 px-2 py-1 bg-slate-600/50 text-slate-300 text-xs font-medium rounded uppercase">
                            {getFileType(file.name)}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleViewFile(file)}
                          className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                          title={getFileType(file.name) === 'pdf' ? 'Open in browser' : getFileType(file.name) === 'image' ? 'Preview' : 'Download'}
                        >
                          {getFileType(file.name) === 'pdf' ? '📄 View' : getFileType(file.name) === 'image' ? '👁️ Preview' : '📥 View'}
                        </button>
                        <button
                          onClick={() => handleDownload(file)}
                          className="flex-1 px-3 py-2 bg-slate-600 hover:bg-slate-500 text-white text-sm font-medium rounded-lg transition-colors"
                          title="Download file"
                        >
                          ⬇️ Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Admin Actions Panel (1 column) */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6 space-y-6 sticky top-6">
              <h3 className="text-lg font-bold text-white">Admin Actions</h3>

              {/* Status Update Buttons */}
              <div className="space-y-3">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                  Change Status
                </p>

                <button
                  onClick={() => handleStatusUpdate('under_review')}
                  disabled={application.status === 'under_review' || updating}
                  className="w-full px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg text-sm"
                >
                  {updating ? '⏳ Updating...' : '⏱️ Under Review'}
                </button>

                <button
                  onClick={() => handleStatusUpdate('approved')}
                  disabled={application.status === 'approved' || updating}
                  className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg text-sm"
                >
                  {updating ? '✅ Updating...' : '✅ Approve'}
                </button>

                <button
                  onClick={() => handleStatusUpdate('rejected')}
                  disabled={application.status === 'rejected' || updating}
                  className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg text-sm"
                >
                  {updating ? '❌ Updating...' : '❌ Reject'}
                </button>
              </div>

              <div className="border-t border-slate-700/50"></div>

              {/* Message Box */}
              <div>
                <label className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-3 block">
                  Message to Applicant
                </label>
                <textarea
                  value={adminAction.message}
                  onChange={(e) =>
                    setAdminAction(prev => ({ ...prev, message: e.target.value }))
                  }
                  placeholder="Write a message..."
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 resize-none"
                  rows={5}
                />
              </div>

              <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg text-sm">
                💬 Send Message
              </button>
            </div>
          </div>
        </div>
      ) : (
        !error && (
          <div className="text-center py-12 bg-slate-700/20 border border-slate-600/50 rounded-lg">
            <p className="text-slate-400 text-lg">No application data available</p>
          </div>
        )
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <p className="text-white font-semibold truncate pr-4">{previewImage.name}</p>
              <button
                onClick={() => setPreviewImage(null)}
                className="text-slate-400 hover:text-white transition-colors flex-shrink-0"
                aria-label="Close preview"
              >
                ✕
              </button>
            </div>

            {/* Image Container */}
            <div className="flex-1 overflow-auto flex items-center justify-center bg-black/40 p-4">
              <img
                src={previewImage.url}
                alt={previewImage.name}
                className="max-w-full max-h-full object-contain rounded-lg"
                onError={() => (
                  <div className="text-slate-400 text-center">
                    <p className="mb-4">Failed to load image</p>
                    <button
                      onClick={() => handleDownload({ name: previewImage.name, url: previewImage.url })}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      Download Instead
                    </button>
                  </div>
                )}
              />
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-slate-700">
              <button
                onClick={() => handleDownload({ name: previewImage.name, url: previewImage.url })}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                ⬇️ Download
              </button>
              <button
                onClick={() => setPreviewImage(null)}
                className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

