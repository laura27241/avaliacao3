import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const RoutesComponent = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/products" element={<ProductsComponent />} />
      <Route path="/add-product" element={<ProductForm />} />
      <Route path="/users" element={<UsersComponent />} />
      <Route path="/add-user" element={<UserForm />} />
    </Routes>
    <Footer />
  </Router>
);

const ProductsComponent = () => (
  <div className="content">
    <h2>CRUD de Produtos</h2>
    <ProductTable />
  </div>
);

const UsersComponent = () => (
  <div className="content">
    <h2>CRUD de Usuários</h2>
    <UserTable />
  </div>
);

export default RoutesComponent;
