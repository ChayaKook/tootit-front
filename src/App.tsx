import React from 'react';
import logo from './assets/logo.jpg';
import './App.css';
import Home from './components/home/home.compoennt';
import reportWebVitals from './reportWebVitals';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from './components/admin-dashboard/adminDashboard';
import UserDashboard from './components/user-dashboard/userDashboard';
import LoginForm from './components/login-form/loginForm.component';
import ProductsList from './components/products/productsList.component';
import ReactDOM from "react-dom/client";
import NotFoundComponent from './components/not-found/notFound.component';
import { Toolbar } from 'primereact/toolbar';
import CustomToolbar from './components/tool-bar/toolBar.component';
import Order from './components/order/order.component';
import OrdersList from './components/orders-list/ordersList.component';
import ContactComponent from './components/contact/contact.component';


function App() {
  return (
    <BrowserRouter>
    <CustomToolbar></CustomToolbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="user" element={<UserDashboard />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="products" element={<ProductsList />} />
        <Route path="order" element={<Order />} />
        <Route path="orderslist" element={<OrdersList />} />
        <Route path="contact" element={<ContactComponent />} />



        <Route path="*" element={<NotFoundComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
