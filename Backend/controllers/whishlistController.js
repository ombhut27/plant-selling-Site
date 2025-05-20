import userModel from "../models/userModel.js";

const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { itemId } = req.body;

        const userData = await userModel.findById(userId);
        const wishlistData = userData.wishlistData || {};

        if (!wishlistData[itemId]) {
            wishlistData[itemId] = true;
        }

        await userModel.findByIdAndUpdate(userId, { wishlistData });

        res.json({ success: true, message: "Added to Wishlist" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};


const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { itemId } = req.body;

        const userData = await userModel.findById(userId);
        const wishlistData = userData.wishlistData || {};

        if (wishlistData[itemId]) {
            delete wishlistData[itemId];
        }

        await userModel.findByIdAndUpdate(userId, { wishlistData });

        res.json({ success: true, message: "Removed from Wishlist" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const getUserWishlist = async (req, res) => {
    try {
        const userId = req.user.id;

        const userData = await userModel.findById(userId);
        const wishlistData = userData.wishlistData || {};

        res.json({ success: true, wishlistData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToWishlist, removeFromWishlist, getUserWishlist };
