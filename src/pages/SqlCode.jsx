import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Zap, Terminal, Database } from 'lucide-react';

const SqlCode = () => {
  const sqlContent = `
-- =========================
-- ESTRUTURA CORE (Lab2.sql)
-- =========================

CREATE TABLE utilizadores (
    utilizador_id SERIAL PRIMARY KEY,
    nome_completo VARCHAR(200) NOT NULL,
    email_contacto VARCHAR(200) UNIQUE NOT NULL
);

CREATE TABLE ingressos (
    ingresso_id SERIAL PRIMARY KEY,
    codigo_rfid VARCHAR(120) UNIQUE NOT NULL,
    estado_ingresso VARCHAR(20) -- 'Pago', 'Entrou', 'Reembolsado'
);

CREATE TABLE portais (
    portal_id SERIAL PRIMARY KEY,
    descricao VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE registo_entradas (
    registo_id SERIAL PRIMARY KEY,
    ingresso_id INT NOT NULL REFERENCES ingressos(ingresso_id),
    portal_id INT NOT NULL REFERENCES portais(portal_id),
    momento_leitura TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- OTIMIZAÇÃO (Índice)
-- =========================

-- Desafio: A coluna consultada centenas de vezes é 'codigo_rfid'
CREATE INDEX idx_ingressos_rfid ON ingressos(codigo_rfid);

-- Justificação: O índice cria uma estrutura de árvore (B-Tree) que permite 
-- encontrar o ID em log(n) tempo, evitando que a BD leia as 70.000 linhas sequencialmente.

-- =========================
-- QUERIES DE EMERGÊNCIA
-- =========================

-- 1. Valor total reembolsado
SELECT SUM(valor_final) FROM ordens WHERE estado_ordem = 'Reembolsado';

-- 2. Quantas pessoas já estão dentro?
SELECT COUNT(*) FROM ingressos WHERE estado_ingresso = 'Entrou';

-- 3. Função Analítica de Contagem Acumulada
SELECT 
    registo_id,
    momento_leitura,
    COUNT(*) OVER(ORDER BY momento_leitura) as contagem_acumulada
FROM registo_entradas;

-- Vantagem: A função analítica permite calcular o total "on-the-fly" sem 
-- bloquear as tabelas com um novo SELECT de contagem a cada inserção.
  `;

  return (
    <div className="section">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '2rem' }}
      >
        <h1 className="glowing-text" style={{ fontSize: '3rem' }}><Terminal size={40} style={{ marginRight: '15px' }} /> Laboratório <span className="text-accent">SQL</span></h1>
        <p className="text-secondary">Implementação técnica e queries de gestão de crise.</p>
      </motion.div>

      <div className="glass-card" style={{ width: '100%', padding: '0', overflow: 'hidden' }}>
        <div style={{ 
          background: 'rgba(255,255,255,0.05)', 
          padding: '10px 20px', 
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>database_schema.sql</span>
          <div style={{ display: 'flex', gap: '5px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
          </div>
        </div>
        <pre style={{ 
          margin: 0, 
          padding: '2rem', 
          background: '#050a14', 
          color: '#d1d5db', 
          fontSize: '0.9rem', 
          lineHeight: '1.6', 
          overflowX: 'auto',
          fontFamily: 'Fira Code, monospace'
        }}>
          <code>{sqlContent.trim()}</code>
        </pre>
      </div>

      <div className="grid-2_col" style={{ marginTop: '2rem' }}>
        <div className="glass-card">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Zap className="text-accent" size={18} /> Performance</h4>
          <p className="text-secondary" style={{ fontSize: '0.85rem' }}>O índice transformou buscas de 5s em milissegundos.</p>
        </div>
        <div className="glass-card">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Database className="text-accent" size={18} /> Integridade</h4>
          <p className="text-secondary" style={{ fontSize: '0.85rem' }}>As FKs garantem que nenhum dado "fantasma" entre no sistema.</p>
        </div>
      </div>
    </div>
  );
};

export default SqlCode;
