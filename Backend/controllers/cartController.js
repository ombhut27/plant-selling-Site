import userModel from "../models/userModel.js";


const addToCart = async (req, res) => {
    try {
      const userId = req.user.id; 
      const { itemId } = req.body;
  
      const userData = await userModel.findById(userId);
      let cartData = userData.cartData || {};
  
      if (cartData[itemId]) {
        cartData[itemId] += 1;
      } else {
        cartData[itemId] = 1;
      }
  
      await userModel.findByIdAndUpdate(userId, { cartData });
  
      res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  


const updateCart = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { itemId, quantity } = req.body;

    if (!itemId || typeof quantity !== 'number') {
      return res.status(400).json({ success: false, message: "Invalid item or quantity" });
    }

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const getUserCart = async (req, res) => {
    try {
      const userId = req.user.id; 
  
      const userData = await userModel.findById(userId);
      const cartData = userData.cartData || {};
  
      res.json({ success: true, cartData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

export { addToCart, updateCart, getUserCart };
