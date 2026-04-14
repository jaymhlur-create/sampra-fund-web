'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function AdminApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all applications on component mount
  useEffect(() => {
    let isMounted = true; // Track if component is still mounted

    const fetchApplications = async () => {
      console.log('1️⃣ FETCH START: Beginning applications fetch');
      try {
        console.log('2️⃣ LOADING STATE: Setting loading = true');
        setLoading(true);
        setError(null);

        console.log('3️⃣ EXECUTING QUERY: Calling Supabase select');
        const { data, error: fetchError } = await supabase
          .from('applications')
          .select('*')
          .order('created_at', { ascending: false });

        console.log('4️⃣ QUERY RESPONSE RECEIVED:', {
          dataLength: data?.length || 0,
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
          console.log('5️⃣ ERROR STATE: Updated error state');
          return;
        }

        console.log('✅ QUERY SUCCESS: Setting applications data');
        setApplications(data || []);
        setError(null);
        console.log('6️⃣ SUCCESS STATE: Updated applications array with', data?.length || 0, 'items');
      } catch (err) {
        console.error('❌ CATCH BLOCK - Unexpected error:', err);
        if (isMounted) {
          const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
          setError(errorMsg);
          setApplications([]);
          console.log('7️⃣ EXCEPTION STATE: Updated error state');
        }
      } finally {
        console.log('8️⃣ FINALLY BLOCK: Setting loading = false');
        setLoading(false);
        console.log('9️⃣ LOADING DISABLED: Component should now render data or empty state');
      }
    };

    fetchApplications();

    // Cleanup function to mark component as unmounted
    return () => {
      isMounted = false;
      console.log('🧹 Cleanup: Component unmounted, marking isMounted = false');
    };
  }, []);

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

  // Shorten ID for display
  const shortenId = (id: string): string => {
    return id.substring(0, 8).toUpperCase();
  };

  // Handle view button click - navigate to detail page
  const handleViewApplication = (applicationId: string) => {
    console.log(`👁️ Navigating to application: ${applicationId}`);
    router.push(`/admin/applications/${applicationId}`);
  };

  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Page Header */}
      <div className="mb-8">
        <Link
          href="/admin"
          className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block"
        >
          ← Back to Admin Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-white mb-2">Funding Applications</h1>
        <p className="text-slate-400">View and manage all submitted funding applications</p>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-300 text-sm">
            <span className="font-semibold">Error:</span> {error}
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin">
              <div className="w-12 h-12 border-4 border-slate-600 border-t-blue-500 rounded-full"></div>
            </div>
            <p className="text-slate-400 mt-4">Loading applications...</p>
          </div>
        </div>
      ) : applications.length === 0 ? (
        // Empty State
        <div className="text-center py-12 bg-slate-700/20 border border-slate-600/50 rounded-lg">
          <p className="text-slate-400 text-lg">No applications found</p>
          <p className="text-slate-500 text-sm mt-2">
            Submitted applications will appear here
          </p>
        </div>
      ) : (
        // Applications Table
        <div className="overflow-x-auto rounded-lg border border-slate-600/50">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-slate-700/50 border-b border-slate-600/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Application ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Total Budget
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Submitted Date
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-600/30">
              {applications.map((application) => (
                <tr
                  key={application.id}
                  className="hover:bg-slate-700/30 transition-colors"
                >
                  {/* Application ID */}
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-col">
                      <span className="font-mono text-blue-300 font-medium">
                        {shortenId(application.id)}
                      </span>
                      <span className="text-xs text-slate-500 mt-1">
                        {application.id}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {application.status.charAt(0).toUpperCase() +
                        application.status.slice(1)}
                    </span>
                  </td>

                  {/* Total Budget */}
                  <td className="px-6 py-4 text-sm">
                    <span className="text-blue-300 font-semibold">
                      {formatCurrency(application.total_budget)}
                    </span>
                  </td>

                  {/* Created Date */}
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {formatDate(application.created_at)}
                  </td>

                  {/* View Button */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleViewApplication(application.id)}
                      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-200 hover:shadow-lg"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer Info */}
      {!loading && applications.length > 0 && (
        <div className="mt-6 text-sm text-slate-400 text-center">
          Total Applications: <span className="text-white font-semibold">{applications.length}</span>
        </div>
      )}
    </div>
  );
}
