import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Problema from './pages/Problema';
import Solucao from './pages/Solucao';
import Estrutura from './pages/Estrutura';
import SqlCode from './pages/SqlCode';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Problema />} />
            <Route path="/solucao" element={<Solucao />} />
            <Route path="/estrutura" element={<Estrutura />} />
            <Route path="/sql" element={<SqlCode />} />
          </Routes>
        </main>
        
        <footer style={{ 
          textAlign: 'center', 
          padding: '2rem', 
          color: 'var(--text-secondary)', 
          fontSize: '0.8rem',
          borderTop: '1px solid var(--glass-border)',
          marginTop: '4rem'
        }}>
          &copy; 2026 Wireless Festival Data Architect Solution | Created for Educational Purposes
        </footer>
      </div>
    </Router>
  );
}

export default App;
