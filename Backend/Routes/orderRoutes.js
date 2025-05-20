import express from 'express'
import {placeOrder,  allOrders, userOrders, updateStatus,placeOrderRazorpay, verifyRazorpay,updatePaymentStatus} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import userAuth from '../middleware/userAuth.js'

const orderRouter = express.Router()

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

orderRouter.post('/place',userAuth,placeOrder)

orderRouter.post('/userorders',userAuth,userOrders)
orderRouter.post('/verifyRazorpay',userAuth, verifyRazorpay)
orderRouter.post('/razorpay',userAuth,placeOrderRazorpay)
orderRouter.post('/payment-status', adminAuth, updatePaymentStatus);




export default orderRouter