import { useState, useEffect } from 'react';
import './App.css';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// CRUD COM JSON SERVER

function App() {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [edit, setEdit] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const url = 'http://localhost:3000/products';

  useEffect(() => {
    if (isAuthenticated) {
      // Lista todos os produtos:
      const getProductsList = async () => {
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      }
      getProductsList();
    }
  }, [isAuthenticated]);

  const handleLogin = async (username, password) => {
    // Simulação de verificação de login com backend
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid username or password");
    }
  }

  const clearForm = () => {
    setName("");
    setPrice("");
    setStock("");
  }

  const getProductById = async (id) => {
    const res = await fetch(url + `/${id}`);
    const data = await res.json();
    setName(data.name);
    setPrice(data.price);
    setStock(data.stock);
    setId(data.id);
    setEdit(true);
  }

  const saveProduct = async (e) => {
    e.preventDefault();
    const saveRequestParams = {
      method: edit ? "PUT" : "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, price, stock })
    }
    const save_url = edit ? `${url}/${id}` : url;
    const res = await fetch(save_url, saveRequestParams);
    if (!res.ok) {
      console.error("Erro ao salvar produto:", res.statusText);
      return;
    }
    if (!edit) {
      const newProduct = await res.json();
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    }
    if (edit) {
      const editedProduct = await res.json();
      setProducts((prevProducts) => prevProducts.map(prod => prod.id === id ? editedProduct : prod));
    }
    clearForm();
    setEdit(false);
  }

  const deleteProduct = async (id) => {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
    });
    setProducts((prevProducts) => prevProducts.filter(prod => prod.id !== id));
  }

  const handleName = (e) => { setName(e.target.value) };
  const handlePrice = (e) => { setPrice(e.target.value) };
  const handleStock = (e) => { setStock(e.target.value) };

  if (!isAuthenticated) {
    return <LoginForm handleLogin={handleLogin} errorMessage={errorMessage} />;
  }

  return (
    <>
      {isAuthenticated && <Navbar />}
      <div className="content">
        <h2>CRUD com JSON Server</h2>
        <div>
          {
            products.length > 0 ? <ProductTable products={products} deleteProduct={deleteProduct} editProduct={getProductById} /> : <h3 style={{ marginBottom: '30px' }}>Nenhum produto cadastrado...</h3>
          }
        </div>
        <ProductForm name={name} price={price} stock={stock} handleName={handleName} handlePrice={handlePrice} handleStock={handleStock} saveProduct={saveProduct} />
      </div>
      {isAuthenticated && <Footer />}
    </>
  )
}

export default App;
