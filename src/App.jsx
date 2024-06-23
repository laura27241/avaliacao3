import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [editProduct, setEditProduct] = useState(false);

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [editUser, setEditUser] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const productsUrl = 'http://localhost:3000/products';
  const usersUrl = 'http://localhost:3000/users';

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(productsUrl);
          if (!response.ok) {
            throw new Error('Falha ao carregar produtos.');
          }
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Erro ao carregar produtos:', error);
        }
      };

      const fetchUsers = async () => {
        try {
          const response = await fetch(usersUrl);
          if (!response.ok) {
            throw new Error('Falha ao carregar usuários.');
          }
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error('Erro ao carregar usuários:', error);
        }
      };

      fetchProducts();
      fetchUsers();
    }
  }, [isAuthenticated]);

  const handleLogin = async (username, password) => {
    if (username === 'AmandaELaura' && password === '123456') {
      setIsAuthenticated(true);
      setErrorMessage("");
      navigate('/products');
    } else {
      setErrorMessage("Nome ou senha inválido!");
    }
  };

  const clearProductForm = () => {
    setProductName("");
    setProductPrice("");
    setProductStock("");
    setEditProduct(false);
    setProductId("");
  };

  const clearUserForm = () => {
    setUserName("");
    setUserEmail("");
    setEditUser(false);
    setUserId("");
  };

  const getProductById = async (id) => {
    try {
      const response = await fetch(`${productsUrl}/${id}`);
      if (!response.ok) {
        throw new Error('Produto não encontrado.');
      }
      const data = await response.json();
      setProductName(data.name);
      setProductPrice(data.price);
      setProductStock(data.stock);
      setProductId(data.id);
      setEditProduct(true);
      navigate('/add-product');
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
    }
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const saveRequestParams = {
      method: editProduct ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: productName, price: productPrice, stock: productStock })
    };
    const saveUrl = editProduct ? `${productsUrl}/${productId}` : productsUrl;
    try {
      const response = await fetch(saveUrl, saveRequestParams);
      if (!response.ok) {
        throw new Error(editProduct ? 'Falha ao atualizar produto.' : 'Falha ao adicionar produto.');
      }
      const updatedProduct = await response.json();
      if (!editProduct) {
        setProducts(prevProducts => [...prevProducts, updatedProduct]);
      } else {
        setProducts(prevProducts => prevProducts.map(prod => prod.id === updatedProduct.id ? updatedProduct : prod));
      }
      clearProductForm();
      navigate('/products');
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${productsUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error('Falha ao deletar produto.');
      }
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${usersUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error('Falha ao deletar usuário.');
      }
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await fetch(`${usersUrl}/${id}`);
      if (!response.ok) {
        throw new Error('Usuário não encontrado.');
      }
      const data = await response.json();
      setUserName(data.name);
      setUserEmail(data.email);
      setUserId(data.id);
      setEditUser(true);
      navigate('/add-user');
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  };

  const saveUser = async (e) => {
    e.preventDefault();
    const saveRequestParams = {
      method: editUser ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: userName, email: userEmail })
    };
    const saveUrl = editUser ? `${usersUrl}/${userId}` : usersUrl;
    try {
      const response = await fetch(saveUrl, saveRequestParams);
      if (!response.ok) {
        throw new Error(editUser ? 'Falha ao atualizar usuário.' : 'Falha ao adicionar usuário.');
      }
      const updatedUser = await response.json();
      if (!editUser) {
        setUsers(prevUsers => [...prevUsers, updatedUser]);
      } else {
        setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
      }
      clearUserForm();
      navigate('/users');
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  if (!isAuthenticated) {
    return <LoginForm handleLogin={handleLogin} errorMessage={errorMessage} />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/products" element={
          <div className="content">
            <h2>CRUD de Produtos</h2>
            {
              products.length > 0 ?
                <ProductTable products={products} deleteProduct={deleteProduct} editProduct={getProductById} />
                :
                <h3 style={{ marginBottom: '30px' }}>Nenhum produto cadastrado...</h3>
            }
          </div>
        } />
        <Route path="/add-product" element={
          <div className="content">
            <ProductForm
              name={productName}
              price={productPrice}
              stock={productStock}
              handleName={e => setProductName(e.target.value)}
              handlePrice={e => setProductPrice(e.target.value)}
              handleStock={e => setProductStock(e.target.value)}
              saveProduct={saveProduct}
            />
          </div>
        } />
        <Route path="/users" element={
          <div className="content">
            <h2>CRUD de Usuários</h2>
            {
              users.length > 0 ?
                <UserTable users={users} deleteUser={deleteUser} editUser={getUserById} />
                :
                <h3 style={{ marginBottom: '30px' }}>Nenhum usuário cadastrado...</h3>
            }
          </div>
        } />
        <Route path="/add-user" element={
          <div className="content">
            <UserForm
              name={userName}
              email={userEmail}
              handleName={e => setUserName(e.target.value)}
              handleEmail={e => setUserEmail(e.target.value)}
              saveUser={saveUser}
            />
          </div>
        } />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
