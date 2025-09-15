"use client";

import { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { Edit, Save, Loader2, ShoppingBag, DollarSign, ListOrdered, TrendingUp, ArrowDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { Order } from '@/types'; 
import { format } from 'date-fns';

type ProfileFormData = {
  name: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
};

export default function ProfilePage() {
  const { user, loading: isAuthLoading, updateUser } = useAuth();
  const router = useRouter();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    phone: '',
    address: { street: '', city: '', state: '', zipCode: '' },
  });

  const [orders, setOrders] = useState<Order[]>([]);
  const [salesOrders, setSalesOrders] = useState<Order[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }
    if (!user) {
      router.push('/login');
      return;
    }

    // If a user exists, fetch their order history.
    const fetchOrders = async () => {
      setIsOrdersLoading(true);
      try {
        const token = localStorage.getItem('token');

        // Fetch purchases (orders made)
        const purchasesResponse = await fetch('/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!purchasesResponse.ok) {
          const errorData = await purchasesResponse.json();
          throw new Error(errorData.error || "Failed to fetch orders");
        }

        const purchasesData = await purchasesResponse.json();
        setOrders(purchasesData.orders || purchasesData);
        setTotalCount(purchasesData.pagination?.total || 0);

        // If farmer, fetch sales (orders got)
        if (user.role === 'farmer') {
          const salesResponse = await fetch('/api/orders?view=sales', {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (salesResponse.ok) {
            const salesData = await salesResponse.json();
            setSalesOrders(salesData.orders || salesData);
            setSalesCount(salesData.pagination?.total || 0);
          }
        }

      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Could not load your order history.");
      } finally {
        setIsOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [user, isAuthLoading, router]); 

 
  const handleEditClick = () => {
    if (user) {
      setFormData({
        name: user.name,
        phone: user.phone,
        address: user.address,
      });
      setIsEditMode(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData((prev) => ({ ...prev, address: { ...prev.address, [name]: value } }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const updatedUser = await response.json();
      if (!response.ok) throw new Error(updatedUser.error || 'Failed to update profile.');

      updateUser(updatedUser);
      toast.success('Profile updated successfully!');
      setIsEditMode(false); // Exit edit mode
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unknown error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthLoading || !user) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome back, {user.name.split(' ')[0]}!
        </h1>

        {/* Dashboard Stats Section */}
        {user.role === 'farmer' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3"><ShoppingBag className="h-6 w-6" /></div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Orders Got</p>
                {isOrdersLoading ? (
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mt-1"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{salesCount}</p>
                )}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="bg-purple-100 text-purple-600 rounded-full p-3"><ListOrdered className="h-6 w-6" /></div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Orders Made</p>
                {isOrdersLoading ? (
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mt-1"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
                )}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="bg-green-100 text-green-600 rounded-full p-3"><TrendingUp className="h-6 w-6" /></div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Earned</p>
                {isOrdersLoading ? (
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mt-1"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">
                    ${salesOrders.reduce((acc, order) => acc + order.totalAmount, 0).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="bg-red-100 text-red-600 rounded-full p-3"><ArrowDown className="h-6 w-6" /></div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Spent</p>
                {isOrdersLoading ? (
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mt-1"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">
                    ${orders.reduce((acc, order) => acc + order.totalAmount, 0).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3"><ShoppingBag className="h-6 w-6" /></div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Orders</p>
                {isOrdersLoading ? (
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mt-1"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
                )}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="bg-green-100 text-green-600 rounded-full p-3"><DollarSign className="h-6 w-6" /></div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Spent</p>
                {isOrdersLoading ? (
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mt-1"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">
                    ${orders.reduce((acc, order) => acc + order.totalAmount, 0).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tabbed Interface */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              <button onClick={() => setActiveTab('orders')} className={`${activeTab === 'orders' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>{user.role === 'farmer' ? 'Purchases' : 'Order History'}</button>
              <button onClick={() => setActiveTab('settings')} className={`${activeTab === 'settings' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Account Settings</button>
            </nav>
          </div>

          <div className="p-6 md:p-8">
            {/* Order History Tab Content */}
            {activeTab === 'orders' && (
              <div>
                {isOrdersLoading ? (
                  <div className="text-center py-10"><Loader2 className="h-8 w-8 mx-auto animate-spin text-gray-400" /><p className="mt-2 text-gray-500">Loading orders...</p></div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-10"><ListOrdered className="h-10 w-10 mx-auto text-gray-400" /><h3 className="mt-2 text-lg font-medium text-gray-900">No Orders Yet</h3><p className="mt-1 text-sm text-gray-500">When you place an order, it will appear here.</p></div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {orders.map(order => (
                      <li key={order._id} className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                        <div>
                          <p className="text-sm font-medium text-primary-600">Order #{order._id.slice(-6)}</p>
                          <p className="text-sm text-gray-500">Placed on {format(new Date(order.createdAt), 'MMMM d, yyyy')}</p>
                        </div>
                        <div className="flex items-center gap-4">
                           <span className="text-sm font-semibold text-gray-900">${order.totalAmount.toFixed(2)}</span>
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status}</span>
                           <button onClick={() => router.push(`/orders/${order._id}`)} className="text-sm font-medium text-primary-600 hover:underline">View Details</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <button onClick={() => router.push('/orders')} className="mt-6 inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700">
                  View More Orders
                </button>
              </div>
            )}

            {/* Account Settings Tab Content */}
            {activeTab === 'settings' && (
              <div>
                {isEditMode ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500"/>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500"/>
                    </div>
                    <div className="border-t pt-6">
                      <p className="text-base font-medium text-gray-800">Shipping Address</p>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
                          <input type="text" name="street" id="street" value={formData.address.street} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                        </div>
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                          <input type="text" name="city" id="city" value={formData.address.city} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                          <input type="text" name="state" id="state" value={formData.address.state} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                        </div>
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                          <input type="text" name="zipCode" id="zipCode" value={formData.address.zipCode} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-4 border-t pt-6">
                      <button type="button" onClick={() => setIsEditMode(false)} className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300">Cancel</button>
                      <button type="submit" disabled={isSubmitting} className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 disabled:opacity-50">
                        {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin"/> : <Save className="h-4 w-4 mr-2" />}
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-gray-900">{user.email} <span className="text-xs text-gray-400">(cannot be changed)</span></p>
                      </div>
                      <button onClick={handleEditClick} className="inline-flex items-center text-sm font-medium text-primary-600 hover:underline">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-gray-500">Full Name</p>
                      <p className="text-gray-900">{user.name}</p>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="text-gray-900">{user.phone}</p>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-gray-500">Default Shipping Address</p>
                      <p className="text-gray-900">{user.address.street}, {user.address.city}, {user.address.state} {user.address.zipCode}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
