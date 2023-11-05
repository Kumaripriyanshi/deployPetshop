import cartModel from "../models/cartModel.js";

export const addInCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = cartModel.findById(userId);
    const cartItem = cart.cartItem
    if (cartItem.includes()) {
      return res.status(200).send({
        success: false,
        message: "Already in the Cart",
      });
    }
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "Error in adding to the Cart",
    });
  }
};
