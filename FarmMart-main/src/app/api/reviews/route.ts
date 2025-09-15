import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Review from '@/models/reviews';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { OrderItem } from '@/types';
import { getUserFromRequest } from '@/lib/auth'; 

export const dynamic = 'force-dynamic';


export async function POST(req: NextRequest) {
  try {
    await dbConnect(); 
    const user = getUserFromRequest(req);
    
    if (!user) {
      return NextResponse.json({ error: "Authentication required. Please log in." }, { status: 401 });
    }

    const { orderId, productId, rating, comment } = await req.json();

    if (!orderId || !productId || !rating) {
      return NextResponse.json({ error: "Missing required fields: orderId, productId, and rating are required." }, { status: 400 });
    }
    if (rating < 1 || rating > 5) {
        return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });
    }

    const order = await Order.findById(orderId);

    if (!order || order.customer.toString() !== user.userId) {
      return NextResponse.json({ error: "Order not found or you are not authorized to review it." }, { status: 404 });
    }

    if (order.status !== 'delivered') {
      return NextResponse.json({ error: "You can only review items from delivered orders." }, { status: 403 });
    }

    const itemToReview = order.items.find((item: OrderItem) => item.product.toString() === productId);
    if (!itemToReview) {
      return NextResponse.json({ error: "The product you are trying to review was not found in this order." }, { status: 404 });
    }
    if (itemToReview.isReviewed) {
      return NextResponse.json({ error: "You have already reviewed this item from this order." }, { status: 409 }); // 409 Conflict
    }

    const newReview = new Review({
      user: user.userId,
      product: productId,
      order: orderId,
      rating,
      comment,
    });
    await newReview.save();

    const allReviewsForProduct = await Review.find({ product: productId });
    const totalRating = allReviewsForProduct.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = allReviewsForProduct.length > 0 
      ? totalRating / allReviewsForProduct.length 
      : 0;

    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: newReview._id },
      $set: { averageRating: averageRating }
    });

    itemToReview.isReviewed = true;
    await order.save();
    
    return NextResponse.json({ message: "Review submitted successfully!" }, { status: 201 });

  } catch (error) {
    console.error("Submit Review Error:", error);
    // Provide a generic error message for security
    return NextResponse.json({ error: "An internal server error occurred while submitting your review." }, { status: 500 });
  }
}