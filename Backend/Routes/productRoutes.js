import express from 'express'
import { addProduct } from '../controllers/productController.js';
import { removeProduct } from '../controllers/productController.js';
import { singleProduct } from '../controllers/productController.js';
import { listProducts,DisplayProducts,filterProductsByCategoryAndFlags } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct);
productRouter.post('/remove',adminAuth,removeProduct);
productRouter.get('/single/:productId',singleProduct);
productRouter.get('/list',listProducts);
productRouter.get('/display',DisplayProducts); 

productRouter.get('/filter', filterProductsByCategoryAndFlags);

export default productRouter
