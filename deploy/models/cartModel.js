import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
  
    user: {
      type: mongoose.ObjectId,
      ref: "users",
    },
   cartItem: {
        type: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("carts", cartSchema);
