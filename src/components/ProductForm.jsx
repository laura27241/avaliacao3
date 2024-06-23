import React from 'react';
import './ProductForm.css';

function ProductForm({ name, price, stock, handleName, handlePrice, handleStock, saveProduct }) {
  return (
    <div className="container">
      <h2>{name ? 'Editar Produto' : 'Adicionar Produto'}</h2>
      <form onSubmit={saveProduct}>
        <label className="form-label">Nome</label>
        <input className="form-input" type="text" value={name} onChange={handleName} required />
        <label className="form-label">Preço</label>
        <input className="form-input" type="number" value={price} onChange={handlePrice} required />
        <label className="form-label">Estoque</label>
        <input className="form-input" type="number" value={stock} onChange={handleStock} required />
        <button className="form-submit" type="submit">{name ? 'Atualizar' : 'Salvar'}</button>
      </form>
    </div>
  );
}

export default ProductForm;
