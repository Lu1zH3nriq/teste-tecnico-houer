import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './Header.css';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-content" style={{ cursor: 'pointer' }}>
        <h1 onClick={() => navigate('/dashboard')}>Infraestrutura Escolar</h1>
        <nav className="flex gap-6 ml-8">
          <Link
            to="/dashboard"
            className="text-base font-medium text-white hover:text-indigo-200 transition-colors duration-200 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Arquivo CSV
          </Link>
          <Link
            to="/crud"
            className="text-base font-medium text-white hover:text-indigo-200 transition-colors duration-200 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            CRUD
          </Link>
        </nav>
        <div className="user-info">
          <span>Olá, {user?.first_name || user?.nome?.split(' ')[0] || 'Usuário'}!</span>
          <button onClick={handleLogout} className="logout-button">
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
