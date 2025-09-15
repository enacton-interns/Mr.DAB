import mongoose from "mongoose";
// --- THIS IS THE FIX ---
// Import the User model to ensure it is registered with Mongoose before the Product schema uses it as a ref.
import "./User";

export interface IProduct extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  category: "fruits" | "vegetables" | "dairy" | "meat" | "grains" | "herbs";
  quantity: number;
  unit: string;
  farmLocation: {
    city: string;
    state: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  farmer: mongoose.Types.ObjectId; 
  images: string[];
  isAvailable: boolean;
  harvestDate: Date;
  expiryDate?: Date;
  organic: boolean;
  averageRating: number;
  reviews: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  likes: mongoose.Types.ObjectId[];
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: 0,
    },
    category: {
      type: String,
      enum: ["fruits", "vegetables", "dairy", "meat", "grains", "herbs"],
      required: [true, "Please provide a category"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide quantity"],
      min: 0,
    },
    unit: {
      type: String,
      required: [true, "Please provide a unit"],
      enum: ["kg", "lb", "piece", "bunch", "dozen", "liter", "gallon", "pint"],
    },
    farmLocation: {
      city: {
        type: String,
        required: [true, "Please provide a city"],
      },
      state: {
        type: String,
        required: [true, "Please provide a state"],
      },
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // This ref now works because 'User' is guaranteed to be registered
      required: [true, "Please provide a farmer"],
    },
    images: [
      {
        type: String,
        required: [true, "Please provide at least one image"],
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    harvestDate: {
      type: Date,
      required: [true, "Please provide harvest date"],
    },
    expiryDate: {
      type: Date,
    },
    organic: {
      type: Boolean,
      default: false,
    },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", productSchema);
