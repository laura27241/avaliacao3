import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Gerenciador</h1>
      <ul>
        <li>
          <Link to="/products">Produtos</Link>
        </li>
        <li>
          <Link to="/add-product">Adicionar Produto</Link>
        </li>
        <li>
          <Link to="/users">Usuários</Link>
        </li>
        <li>
          <Link to="/add-user">Adicionar Usuário</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
