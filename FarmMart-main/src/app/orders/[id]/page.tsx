"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  ArrowLeft,
  MapPin,
  User,
  Phone,
  Mail,
  Edit,
  Save,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import toast from "react-hot-toast";
import { OrderStatus } from "@/types";
import ReviewModal from '@/components/ReviewModal';
// import { OrderItem } from '@/types';

interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    farmer: {
      name: string;
    };
  };
  quantity: number;
  price: number;
  isReviewed: boolean;
}

interface Order {
  _id: string;
  customer: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod: string;
  stripePaymentIntentId?: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  deliveryDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  processing: {
    label: "Processing",
    icon: Package,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
};

const paymentStatusConfig = {
  pending: {
    label: "Pending",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  paid: { label: "Paid", color: "text-green-600", bgColor: "bg-green-100" },
  failed: { label: "Failed", color: "text-red-600", bgColor: "bg-red-100" },
  refunded: {
    label: "Refunded",
    color: "text-gray-600",
    bgColor: "bg-gray-100",
  },
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedItemForReview, setSelectedItemForReview] = useState<OrderItem | null>(null);

  useEffect(() => {
    if (params.id && user) {
      fetchOrder();
    }
  }, [params.id, user]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/orders/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setOrder(data.order);
        setNotes(data.order.notes || "");
      } else {
        toast.error("Order not found");
        router.push("/orders");
      }
    } catch  {
      toast.error("Failed to fetch order");
      router.push("/orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!order) return;

    try {
      const response = await fetch(`/api/orders/${order._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success("Order status updated successfully");
        fetchOrder();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to update order status");
      }
    } catch {
      toast.error("Failed to update order status");
    }
  };

  const handleNotesUpdate = async () => {
    if (!order) return;

    try {
      const response = await fetch(`/api/orders/${order._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ notes }),
      });

      if (response.ok) {
        toast.success("Notes updated successfully");
        setEditingNotes(false);
        fetchOrder();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to update notes");
      }
    } catch {
      toast.error("Failed to update notes");
    }
  };

  const handleOpenReviewModal = (item: OrderItem) => {
    setSelectedItemForReview(item);
    setIsReviewModalOpen(true);
  };

  const handleReviewSubmit = async (rating: number, comment: string) => {
    if (!selectedItemForReview || !order) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          orderId: order._id,
          productId: selectedItemForReview.product._id,
          rating,
          comment,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit review.");
      }
      
      toast.success("Thank you for your review!");
      fetchOrder(); 
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred.");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config?.icon || Clock;
    return <IconComponent className="h-5 w-5" />;
  };

  const canUpdateStatus = () => {
    return user?.role === "farmer";
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Please log in to view order details
            </h2>
            <button
              onClick={() => router.push("/login")}
              className="btn-primary"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Order not found
            </h2>
            <button
              onClick={() => router.push("/orders")}
              className="btn-primary"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Order #{order._id.slice(-8).toUpperCase()}</h1>
                        <p className="text-gray-600 mt-1">Placed on {formatDate(order.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[order.status]?.bgColor} ${statusConfig[order.status]?.color}`}>{getStatusIcon(order.status)} {statusConfig[order.status]?.label}</span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${paymentStatusConfig[order.paymentStatus]?.bgColor} ${paymentStatusConfig[order.paymentStatus]?.color}`}>{paymentStatusConfig[order.paymentStatus]?.label}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900">Order Items</h2>
              </div>
              
              <ul className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li key={item.product._id} className="p-6 flex items-start space-x-6">
                    <div className="flex items-start space-x-6">
                    <Image
                      src={item.product.images?.[0] || "/placeholder.png"}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-800">{item.product.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Farmer: {item.product.farmer?.name ?? "Unknown"}</p>
                      <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                    </div>
                    <div className="text-base font-semibold text-gray-900">
                      ${(item.quantity * item.price).toFixed(2)}
                    </div>
                    </div>
                    {user?.role === 'customer' && order.status === 'delivered' && (
                      <div className="mt-4 text-right">
                        {item.isReviewed ? (
                          <p className="text-sm text-green-600 font-medium">✓ You&apos;ve reviewed this item</p>
                        ) : (
                          <button
                            onClick={() => handleOpenReviewModal(item)}
                            className="btn-primary-sm"
                          >
                            Leave a Review
                          </button>
                        )}
                      </div>
                    )}
                    </li>
                  ))}
                </ul>
              

              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <dl className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600"><dt>Subtotal</dt><dd className="font-medium text-gray-800">${order.totalAmount.toFixed(2)}</dd></div>
                  <div className="flex justify-between text-sm text-gray-600"><dt>Shipping</dt><dd className="font-medium text-gray-800">$0.00</dd></div>
                  <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-200 pt-3 mt-3"><dt>Total</dt><dd>${order.totalAmount.toFixed(2)}</dd></div>
                </dl>
              </div>
            </div>
          </div>
          
          {/* Sidebar Column */}
          <div className="space-y-6">
            {canUpdateStatus() && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
                    <select value={order.status} onChange={(e) => handleStatusUpdate(e.target.value as OrderStatus)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        {Object.entries(statusConfig).map(([key, config]) => (<option key={key} value={key}>{config.label}</option>))}
                    </select>
                </div>
            )}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{user.role === "farmer" ? "Customer Information" : "Your Information"}</h3>
              <div className="space-y-3">
                  <div className="flex items-center"><User className="h-4 w-4 text-gray-400 mr-3" /><span className="text-sm text-gray-600">{order.customer.name}</span></div>
                  <div className="flex items-center"><Mail className="h-4 w-4 text-gray-400 mr-3" /><span className="text-sm text-gray-600">{order.customer.email}</span></div>
                  <div className="flex items-center"><Phone className="h-4 w-4 text-gray-400 mr-3" /><span className="text-sm text-gray-600">{order.customer.phone}</span></div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <address className="text-sm text-gray-600 not-italic">
                  <p>{order.shippingAddress.street}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                </address>
              </div>
            </div>
            {/* Notes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
                {canUpdateStatus() && (
                  <button
                    onClick={() => setEditingNotes(!editingNotes)}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {editingNotes ? (
                      <Save className="h-4 w-4" />
                    ) : (
                      <Edit className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>

              {editingNotes ? (
                <div className="space-y-2">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Add notes about this order..."
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleNotesUpdate}
                      className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingNotes(false);
                        setNotes(order.notes || "");
                      }}
                      className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  {order.notes || "No notes added yet."}
                </p>
              )}
            </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Timeline
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Order Placed
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
                {order.updatedAt !== order.createdAt && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Last Updated
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(order.updatedAt)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <ReviewModal
              isOpen={isReviewModalOpen}
              onClose={() => setIsReviewModalOpen(false)}
              productName={selectedItemForReview?.product.name || ''}
              onSubmit={handleReviewSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}