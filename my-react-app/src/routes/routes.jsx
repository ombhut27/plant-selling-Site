import Home from "../components/Home";
import { Navigate } from "react-router-dom";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Shop from "../components/Shop/Shop";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import SignUpForm from "../components/Signup/Signup";
import LoginForm from "../components/Login/Login";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import Layout from "../components/Layout/Layout";
import Cart from "../components/Cart/Cart";
import PlaceOrder from "../components/PlaceOrder/PlaceOrder"
import MyOrders from "../components/MyOrders/MyOrders";
import Wishlist from "../components/Wishlist/Wishlist";
import Collection from "../components/ShopByCatagory/Collection";
export const routes = [
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Layout ><Navigate to="/home" /></Layout>,
      },
      {
        path: "*",
        element: <h1>404 : Not found</h1>,
      },
      {
        path: "home",
        element:<Layout ><Home /></Layout> ,
      },
      {
        path: "about",
        element: <Layout ><About /></Layout>,
      },
      {
        path: "contact",
        element: <Layout ><Contact /></Layout> ,
      },
      {
        path: "shop",
        element: <Layout ><Shop /></Layout>,
      },
      {
        path: "product-detail/:id",
        element: <Layout ><ProductDetail /></Layout>,
      },
      {
        path: "login",
        element: <Layout ><LoginForm /></Layout>,
      },
      {
        path: "signup",
        element: <Layout ><SignUpForm /></Layout>,
      },
      {
        path: "forgot-password",
        element: <Layout ><ForgotPassword /></Layout>,
      },
      {
        path: "cart",
        element: <Layout ><Cart /></Layout>,
      },
      {
        path: "place-order",
        element: <Layout ><PlaceOrder/></Layout>,
      },
      {
        path: "my-orders",
        element: <Layout><MyOrders/></Layout>,
      },
      {
        path: "wishlist",
        element: <Layout ><Wishlist/></Layout>,
      },
      {
        path: "/collection/:category",
        element: <Layout ><Collection/></Layout>,
      },
    ],
  },
];
