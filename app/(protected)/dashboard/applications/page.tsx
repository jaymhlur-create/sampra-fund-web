'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
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

export default function UserApplicationsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user's applications on component mount
  useEffect(() => {
    if (authLoading) {
      return; // Wait for auth to load
    }

    if (!user) {
      router.replace('/login');
      return;
    }

    let isMounted = true;

    const fetchApplications = async () => {
      console.log('1️⃣ USER APPS FETCH START: Fetching applications for user', user.id);
      try {
        console.log('2️⃣ LOADING STATE: Setting loading = true');
        setLoading(true);
        setError(null);

        console.log('3️⃣ EXECUTING QUERY: Calling Supabase select for user_id =', user.id);
        const { data, error: fetchError } = await supabase
          .from('applications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        console.log('4️⃣ QUERY RESPONSE RECEIVED:', {
          count: data?.length || 0,
          hasError: !!fetchError,
          errorMessage: fetchError?.message || 'none',
        });

        if (!isMounted) {
          console.log('⚠️ Component unmounted, skipping state updates');
          return;
        }

        if (fetchError) {
          console.error('❌ QUERY ERROR:', fetchError);
          setError(`Failed to load applications: ${fetchError.message}`);
          setApplications([]);
          return;
        }

        console.log('✅ QUERY SUCCESS: Loaded', data?.length || 0, 'applications');
        setApplications(data || []);
        setError(null);
        console.log('5️⃣ SUCCESS STATE: Applications data loaded');
      } catch (err) {
        console.error('❌ CATCH BLOCK - Unexpected error:', err);
        if (isMounted) {
          const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
          setError(errorMsg);
          setApplications([]);
          console.log('6️⃣ EXCEPTION STATE: Updated error state');
        }
      } finally {
        console.log('7️⃣ FINALLY BLOCK: Setting loading = false');
        setLoading(false);
        console.log('8️⃣ LOADING DISABLED: Ready to render');
      }
    };

    fetchApplications();

    return () => {
      isMounted = false;
      console.log('🧹 Cleanup: Component unmounted');
    };
  }, [user, authLoading, router]);

  // Format date to readable format
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-ZA', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
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

  // Shorten ID for display
  const shortenId = (id: string): string => {
    return id.substring(0, 8).toUpperCase();
  };

  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800 border border-blue-300';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
      case 'approved':
        return 'bg-green-100 text-green-800 border border-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border border-red-300';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  // Get human-readable status label
  const getStatusLabel = (status: string): string => {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Navigate to application detail
  const handleViewApplication = (applicationId: string) => {
    console.log(`👁️ Navigating to application: ${applicationId}`);
    router.push(`/dashboard/applications/${applicationId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/dashboard"
            className="text-yellow-400 hover:text-yellow-500 text-sm font-semibold mb-4 inline-block transition-colors"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
          <p className="text-gray-600">Track the status of your funding applications</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-semibold">
              <span className="font-bold">Error:</span> {error}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading || authLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="spinner h-12 w-12 border-4 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading applications...</p>
            </div>
          </div>
        ) : applications.length === 0 ? (
          // Empty State
          <div className="text-center py-12 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-700 text-lg font-medium">You have not submitted any applications yet</p>
            <p className="text-gray-600 text-sm mt-2">
              Start by clicking "Start Application" on the dashboard
            </p>
            <Link
              href="/apply"
              className="inline-block mt-4 btn-primary"
            >
              Create New Application
            </Link>
          </div>
        ) : (
          // Applications Grid
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {applications.map(application => (
                <div
                  key={application.id}
                  className="bg-white rounded-lg border border-gray-100 p-6 hover:shadow-lg transition-shadow"
                >
                  {/* Application ID */}
                  <div className="mb-4">
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                      ID
                    </p>
                    <p className="font-mono text-gray-900 font-semibold text-sm">
                      {shortenId(application.id)}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-4">
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
                      Status
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {getStatusLabel(application.status)}
                    </span>
                  </div>

                  {/* Budget & Date Info */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                    {/* Total Budget */}
                    <div>
                      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                        Budget
                      </p>
                      <p className="text-gray-900 font-semibold">
                        {formatCurrency(application.total_budget)}
                      </p>
                    </div>

                    {/* Created Date */}
                    <div>
                      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                        Submitted
                      </p>
                      <p className="text-gray-700 text-sm">
                        {formatDate(application.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* View Button */}
                  <button
                    onClick={() => handleViewApplication(application.id)}
                    className="w-full btn-primary"
                  >
                    View Application
                  </button>
                </div>
              ))}
            </div>

            {/* Applications Count */}
            <div className="mt-8 text-center text-sm text-gray-600">
              Showing <span className="text-gray-900 font-semibold">{applications.length}</span> application
              {applications.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
