import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Database, ShieldAlert, Cpu, Code2 } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { path: '/', label: 'O Problema', icon: <ShieldAlert size={20} /> },
    { path: '/solucao', label: 'Solução', icon: <Cpu size={20} /> },
    { path: '/estrutura', label: 'Estrutura', icon: <Database size={20} /> },
    { path: '/sql', label: 'Código SQL', icon: <Code2 size={20} /> },
  ];

  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ 
          background: 'var(--accent-color)', 
          padding: '8px', 
          borderRadius: '8px',
          boxShadow: '0 0 15px var(--accent-color-glow)'
        }}>
          <Database size={24} color="#0b0f19" />
        </div>
        <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'white' }}>REEMBOLSO <span className="text-accent">WIRELESS</span></span>
      </div>
      <div className="nav-links">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
