 import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
  {
    clerkId: { type: String, default: null },            
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', default: null }, 
    amount: { type: Number, required: true },          
    status: { 
      type: String, 
      enum: ['pending', 'succeeded', 'failed'], 
      default: 'pending' 
    },
    paymentIntentId: { type: String, default: null },   
  },
  {
    timestamps: { createdAt: true, updatedAt: false }   
  }
);


const Donation = mongoose.models.Donation || mongoose.model("Donation", DonationSchema);
export default Donation;

