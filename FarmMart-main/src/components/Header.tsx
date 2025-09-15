"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User, LogIn, Menu, X, Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import NotificationBell from "./NotificationBell";
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  
  const redirectToProfile = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
      router.push('/profile');
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold text-gray-900">FarmMarket</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 font-semibold hover:text-primary-600">Home</Link>
            {isMounted && user?.role === "customer" && (<Link href="/products" className="text-gray-700 font-semibold hover:text-primary-600">Products</Link>)}
            {isMounted && user?.role === "farmer" && (<Link href="/dashboard" className="text-gray-700 font-semibold hover:text-primary-600">Dashboard</Link>)}
            {isMounted && user && (<Link href="/orders" className="text-gray-700 font-semibold hover:text-primary-600">Orders</Link>)}
          </nav>
          
          {/* Right-side Actions */}
          <div className="flex items-center space-x-2">
            {/* Desktop-only actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isMounted ? (
                <>
                  {user ? (
                    <>
                      <Link href="/cart" className="relative p-2 text-gray-700 rounded-full hover:bg-gray-100 hover:text-primary-600">
                        <ShoppingCart className="h-6 w-6" />
                        {cartItemCount > 0 && (<span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>)}
                      </Link>
                      <Link href="/wishlist" className="relative text-gray-700 rounded-full hover:bg-gray-100 hover:text-primary-600 p-2">
                        <Heart className="h-6 w-6" />
                      </Link>
                      <NotificationBell />
                      <button onClick={redirectToProfile} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                        <User className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-700 font-medium">{user.name}</span>
                      </button>
                      <button onClick={logout} className="text-sm font-medium text-gray-700 hover:text-primary-600">Logout</button>
                    </>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <Link href="/login" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"><LogIn className="h-5 w-5" /><span>Login</span></Link>
                      <Link href="/register" className="btn-primary">Sign Up</Link>
                    </div>
                  )}
                </>
              ) : ( <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div> )}
            </div>

            {/* Mobile Actions (Bell Icon and Menu Button) */}
            <div className="flex items-center md:hidden">
                {isMounted && user && <NotificationBell />}
                <button onClick={() => setIsMenuOpen(true)} className="pl-2 text-gray-700 hover:text-primary-600" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden" 
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <div 
        className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-bold">Menu</h2>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-500 hover:text-gray-800" aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-grow p-4">
            {isMounted && (
              <div className="flex flex-col space-y-4 text-lg">
                <Link href="/" className="text-gray-700 hover:text-primary-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
                {user?.role === "customer" && (<Link href="/products" className="text-gray-700 hover:text-primary-600" onClick={() => setIsMenuOpen(false)}>Products</Link>)}
                {user?.role === "farmer" && (<Link href="/dashboard" className="text-gray-700 hover:text-primary-600" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>)}
                {user && (<Link href="/orders" className="text-gray-700 hover:text-primary-600" onClick={() => setIsMenuOpen(false)}>Orders</Link>)}
                {user && (<Link href="/wishlist" className="flex items-center text-gray-700 hover:text-primary-600" onClick={() => setIsMenuOpen(false)}><Heart className="h-5 w-5 mr-3" /><span>Wishlist</span></Link>)}
                <Link href="/cart" className="flex items-center text-gray-700 hover:text-primary-600" onClick={() => setIsMenuOpen(false)}><ShoppingCart className="h-5 w-5 mr-3" /><span>Cart ({cartItemCount})</span></Link>
              </div>
            )}
          </nav>

          {/* User Actions Footer */}
          <div className="p-4 border-t">
            {isMounted && (
              user ? (
                <div className="flex flex-col space-y-3">
                  <button onClick={redirectToProfile} className="flex items-center space-x-3 text-lg text-gray-700"><User className="h-5 w-5" /><span>{user.name}</span></button>
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-left text-lg text-gray-700 hover:text-primary-600">Logout</button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link href="/login" className="flex items-center space-x-3 text-lg text-gray-700 hover:text-primary-600" onClick={() => setIsMenuOpen(false)}><LogIn className="h-5 w-5" /><span>Login</span></Link>
                  <Link href="/register" className="btn-primary text-center" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      {/* --- END: NEW MOBILE OVERLAY MENU --- */}
    </header>
  );
}