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
        return 'bg-blue-100 text-blue-800 border border-blue-300';
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/admin"
            className="text-yellow-400 hover:text-yellow-500 text-sm font-semibold mb-4 inline-block transition-colors"
          >
            ← Back to Admin Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Funding Applications</h1>
          <p className="text-gray-600">View and manage all submitted funding applications</p>
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
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="spinner h-12 w-12 border-4 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading applications...</p>
            </div>
          </div>
        ) : applications.length === 0 ? (
          // Empty State
          <div className="text-center py-12 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-700 text-lg font-medium">No applications found</p>
            <p className="text-gray-600 text-sm mt-2">
              Submitted applications will appear here
            </p>
          </div>
        ) : (
          // Applications Table
          <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
            <table className="w-full">
              {/* Table Header */}
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Application ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Total Budget
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Submitted Date
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100">
                {applications.map((application) => (
                  <tr
                    key={application.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Application ID */}
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-col">
                        <span className="font-mono text-gray-900 font-medium">
                          {shortenId(application.id)}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
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
                      <span className="text-gray-900 font-semibold">
                        {formatCurrency(application.total_budget)}
                      </span>
                    </td>

                    {/* Created Date */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(application.created_at)}
                    </td>

                    {/* View Button */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleViewApplication(application.id)}
                        className="px-4 py-2 text-sm font-semibold text-gray-900 bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-colors"
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
          <div className="mt-6 text-sm text-gray-600 text-center">
            Total Applications: <span className="text-gray-900 font-semibold">{applications.length}</span>
          </div>
        )}
      </main>
    </div>
  );
}
