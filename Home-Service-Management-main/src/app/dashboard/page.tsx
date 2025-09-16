'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { toast } from 'react-toastify';
import { CircleAlert } from 'lucide-react'

interface Request {
  _id: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  createdAt: string;
  providerId?: { name: string; email: string };
  customerId?: { name: string; email: string };
}

interface Provider {
  _id: string;
  userId: { _id: string; name: string; email: string; contact: string };
  skills: string[];
  availability: boolean;
  rating: number;
  subscriptionStatus?: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [requests, setRequests] = useState<Request[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [providerProfile, setProviderProfile] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) router.push('/login');
  }, [session, status, router]);

  useEffect(() => {
    if (session) {
      fetchRequests();
      if (session.user?.role === 'customer') {
        fetchProviders();
      } else if (session.user?.role === 'provider') {
        fetchProviderProfile();
      }
    }
  }, [session]);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/requests');
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProviders = async () => {
    try {
      const res = await fetch('/api/providers');
      if (res.ok) {
        const data = await res.json();
        setProviders(data);
      }
    } catch (error) {
      console.error('Error fetching providers:', error);
    }
  };

  const fetchProviderProfile = async () => {
    try {
      const res = await fetch('/api/providers/profile');
      if (res.ok) {
        const data = await res.json();
        setProviderProfile(data);
      }
    } catch (error) {
      console.error('Error fetching provider profile:', error);
    }
  };

  const updateRequestStatus = async (requestId: string, status: string) => {
    try {
      const res = await fetch(`/api/requests/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        fetchRequests();
        toast.success(`Request ${status === 'active' ? 'accepted' : 'completed'} successfully!`);
      } else {
        const error = await res.json();
        toast.error(`Error: ${error.error || 'Failed to update request'}`);
      }
    } catch (error) {
      console.error('Error updating request:', error);
      toast.error('Failed to update request. Please try again.');
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {session.user?.name}!</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              {session.user?.role === 'customer' && (
                <>
                  <Link
                    href="/services"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    Browse Services
                  </Link>
                  <Link
                    href="/dashboard/feedback"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                    Leave Feedback
                  </Link>
                </>
              )}
              {session.user?.role === 'provider' && (
                <>
                  <Link
                    href="/dashboard/subscription"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    Manage Subscription
                  </Link>
                  <Link
                    href="/profile"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    Update Profile
                  </Link>
                </>
              )}
              <Link
                href="/profile"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Settings
              </Link>
            </div>
          </div>

        {session.user?.role === 'customer' ? (
          <CustomerDashboard requests={requests} providers={providers} onRefreshRequests={fetchRequests} />
        ) : (
          <ProviderDashboard requests={requests} onUpdateStatus={updateRequestStatus} providerProfile={providerProfile} />
        )}
      </div>
    </div>
  );
}


function CustomerDashboard({ requests, providers, onRefreshRequests }: { requests: Request[], providers: Provider[], onRefreshRequests: () => Promise<void> }) {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [description, setDescription] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'active' | 'completed'>('all');

  const filteredAndSortedRequests = useMemo(() => {
    const statusOrder: Record<string, number> = { pending: 1, active: 2, completed: 3 };

    return requests
      .filter(request => {
        if (statusFilter !== 'all' && request.status !== statusFilter) {
          return false;
        }
        if (searchTerm && !request.description.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        return true;
      })
      .sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
  }, [requests, searchTerm, statusFilter]); 

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId: selectedProvider, description }),
      });
      if (res.ok) {
        toast.success('Request submitted successfully!');
        setShowRequestForm(false);
        setDescription('');
        setSelectedProvider('');
        // Refresh requests data instead of reloading the page
        onRefreshRequests();
      } else {
        const error = await res.json();
        toast.error(error.error || 'Failed to submit request');
      }
    } catch {
      toast.error('Error submitting request');
    }
  };

  const filterButtons = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-black">Quick Actions</h2>
        <button
          onClick={() => setShowRequestForm(!showRequestForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
        >
          {showRequestForm ? 'Cancel' : 'Request New Service'}
        </button>
      </div>

      {showRequestForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-black">Create Service Request</h3>
          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Provider</label>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Choose a provider...</option>
                {providers.map((provider) => (
                  <option key={provider.userId._id} value={provider.userId._id}>
                    {provider.userId.name} - {provider.skills.join(', ')} (Rating: {provider.rating.toFixed(1)})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Describe the service you need..."
                required
              />
            </div>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300">
              Submit Request
            </button>
          </form>
        </div>
      )}

      {/* My Requests Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold text-black">My Service Requests</h2>
          <input
            type="text"
            placeholder="Search by description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm font-medium text-gray-600 mr-2">Filter by status:</span>
          {filterButtons.map(({ label, value }) => (
            <button
              key={value}
              
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setStatusFilter(value as any)}
              className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${
                statusFilter === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {requests.length === 0 ? (
           <p className="text-gray-500 text-center py-8">No requests yet. Create your first service request!</p>
        ) : filteredAndSortedRequests.length === 0 ? (
           <p className="text-gray-500 text-center py-8">No requests match your filters.</p>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedRequests.map((request) => (
              <div key={request._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-black">{request.description}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'active' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Provider: {request.providerId?.name || 'Not assigned'}
                </p>
                <p className="text-xs text-gray-500">
                  Created: {new Date(request.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProviderDashboard({ requests, onUpdateStatus, providerProfile }: { requests: Request[], onUpdateStatus: (requestId: string, status: string) => Promise<void>, providerProfile: Provider | null }) {
  const activeRequests = requests.filter(request => request.status !== 'completed');

  return (
    <div className="space-y-8">
      {providerProfile && providerProfile.subscriptionStatus !== 'active' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CircleAlert className="h-6 w-6 text-red-400" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-semibold text-red-800">Subscription Required</h3>
              <p className="text-sm text-red-700 mt-1">
                Customers won&apos;t be able to see or book your services until you have an active subscription. Upgrade now to start receiving service requests.
              </p>
              <div className="mt-3">
                <Link
                  href="/dashboard/subscription"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Upgrade Subscription
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Requests</h3>
          <p className="text-3xl font-bold text-blue-600">{activeRequests.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {activeRequests.filter(r => r.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">In Progress</h3>
          <p className="text-3xl font-bold text-green-600">
            {activeRequests.filter(r => r.status === 'active').length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className='flex justify-between items-center mb-4'>
          <h2 className="text-xl font-semibold mb-4 text-black">Active Service Requests</h2>
          <Link
            href="/requests"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center"
            >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            View All Requests
          </Link>
        </div>
        {activeRequests.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No active requests</h3>
            <p className="text-gray-600 mb-4">You have no pending or active service requests at the moment.</p>
            <Link href="/requests" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200">
              View All Requests
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {activeRequests.map((request) => (
              <div key={request._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{request.description}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'active' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {request.status}
                    </span>
                    {request.status === 'pending' && (
                      <button onClick={() => onUpdateStatus(request._id, 'active')} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition duration-300">
                        Accept
                      </button>
                    )}
                    {request.status === 'active' && (
                      <button onClick={() => onUpdateStatus(request._id, 'completed')} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition duration-300">
                        Complete
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">Customer: {request.customerId?.name} ({request.customerId?.email})</p>
                <p className="text-xs text-gray-500">Created: {new Date(request.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
