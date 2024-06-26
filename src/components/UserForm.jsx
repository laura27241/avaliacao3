import React from 'react';
import './UserForm.css';

function UserForm({ name, email, senha, handleName, handleEmail, handleSenha, saveUser }) {
  return (
    <div className="container">
      <h2>{name ? 'Editar Usuário' : 'Adicionar Usuário'}</h2>
      <form onSubmit={saveUser}>
        <label className="form-label">Nome</label>
        <input className="form-input" type="text" value={name} onChange={handleName} required />
        <label className="form-label">Email</label>
        <input className="form-input" type="email" value={email} onChange={handleEmail} required />
        <label className="form-label">Senha</label>
        <input className="form-input" type="password" value={senha} onChange={handleSenha} required />
        <button className="form-submit" type="submit">{name ? 'Atualizar' : 'Salvar'}</button>
      </form>
    </div>
  );
}

export default UserForm;
