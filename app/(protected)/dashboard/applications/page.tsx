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

  // Navigate to application detail
  const handleViewApplication = (applicationId: string) => {
    console.log(`👁️ Navigating to application: ${applicationId}`);
    router.push(`/dashboard/applications/${applicationId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link
          href="/dashboard"
          className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-white mb-2">My Applications</h1>
        <p className="text-slate-400">Track the status of your funding applications</p>
      </div>

      {/* Error State */}
      {error && (
        <div className="max-w-6xl mx-auto mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-300 text-sm">
            <span className="font-semibold">Error:</span> {error}
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading || authLoading ? (
        <div className="max-w-6xl mx-auto flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin">
              <div className="w-12 h-12 border-4 border-slate-600 border-t-blue-500 rounded-full"></div>
            </div>
            <p className="text-slate-400 mt-4">Loading applications...</p>
          </div>
        </div>
      ) : applications.length === 0 ? (
        // Empty State
        <div className="max-w-6xl mx-auto text-center py-12 bg-slate-700/20 border border-slate-600/50 rounded-lg">
          <p className="text-slate-400 text-lg">You have not submitted any applications yet</p>
          <p className="text-slate-500 text-sm mt-2">
            Start by clicking "Start Application" on the dashboard
          </p>
          <Link
            href="/apply"
            className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
          >
            Create New Application
          </Link>
        </div>
      ) : (
        // Applications Grid
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map(application => (
              <div
                key={application.id}
                className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6 hover:border-blue-500/30 transition-all duration-200 hover:shadow-blue-500/10"
              >
                {/* Application ID */}
                <div className="mb-4">
                  <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
                    ID
                  </p>
                  <p className="font-mono text-blue-300 font-semibold text-sm">
                    {shortenId(application.id)}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="mb-4">
                  <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">
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
                <div className="space-y-3 mb-6 pb-6 border-b border-slate-700/50">
                  {/* Total Budget */}
                  <div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
                      Budget
                    </p>
                    <p className="text-blue-300 font-semibold">
                      {formatCurrency(application.total_budget)}
                    </p>
                  </div>

                  {/* Created Date */}
                  <div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
                      Submitted
                    </p>
                    <p className="text-slate-300 text-sm">
                      {formatDate(application.created_at)}
                    </p>
                  </div>
                </div>

                {/* View Button */}
                <button
                  onClick={() => handleViewApplication(application.id)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
                >
                  View Application
                </button>
              </div>
            ))}
          </div>

          {/* Applications Count */}
          <div className="mt-8 text-center text-sm text-slate-400">
            Showing <span className="text-white font-semibold">{applications.length}</span> application
            {applications.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  );
}
