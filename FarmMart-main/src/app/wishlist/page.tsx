// src/app/wishlist/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard'; // Ensure this component exists
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { HeartCrack, Loader2 } from 'lucide-react'; // Added a Loader icon

export default function WishlistPage() {
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  // This state tracks the loading of the liked products data specifically.
  const [isPageLoading, setIsPageLoading] = useState(true);
  
  // Destructure the `user` and `loading` state from the auth context.
  // `isAuthLoading` tells us if the initial authentication check is complete.
  const { user, loading: isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If the auth provider is still loading, we don't know if a user is logged in yet.
    // So, we wait by returning early.
    if (isAuthLoading) {
      return; 
    }

    // If the auth check is finished AND there is no user, redirect to the login page.
    if (!user) {
      router.push('/login');
      return;
    }
    
    // If we reach this point, the auth check is finished and a user exists.
    // We can now safely fetch their liked products.
    const fetchLikedProducts = async () => {
      setIsPageLoading(true); // Start loading state for the data fetch.
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/products/liked', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // Handle errors like token expiration, etc.
          throw new Error('Failed to fetch liked products');
        }

        const data = await response.json();
        setLikedProducts(data.products);
      } catch (error) {
        console.error('An error occurred while fetching liked products:', error);
        // Optionally show a toast message to the user here.
      } finally {
        setIsPageLoading(false); // Stop loading state, regardless of outcome.
      }
    };

    fetchLikedProducts();
    
  }, [user, isAuthLoading, router]); // Effect dependencies are correct.

  // The loading screen should be shown if EITHER the auth state is being resolved
  // OR the page data is being fetched.
  if (isAuthLoading || isPageLoading) {
    return (
      <>
        <Header />
        <div className="flex flex-col justify-center items-center h-[60vh]">
            <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
            <p className="mt-4 text-gray-600">Loading your wishlist...</p>
        </div>
      </>
    );
  }

  // This JSX is only rendered after all loading is complete and we are sure a user is logged in.
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
          My Wishlist
        </h1>

        {likedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {likedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          // This is the "empty state" UI, shown when the user has not liked any products.
          <div className="text-center py-20 bg-white rounded-lg border border-dashed">
            <HeartCrack className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-xl font-medium text-gray-900">
              Your wishlist is empty
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Click the heart icon on a product to add it here.
            </p>
            <button
              onClick={() => router.push('/products')}
              className="mt-6 px-5 py-2.5 bg-primary-600 text-white font-medium rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Browse Products
            </button>
          </div>
        )}
      </main>
    </div>
  );
}