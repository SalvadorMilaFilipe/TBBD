import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Zap, Terminal, Database } from 'lucide-react';

const SqlCode = () => {
  const sqlContent = `
-- =============================================
-- ESQUEMA COMPLETO: Wireless Architect (PostgreSQL)
-- =============================================

-- 1. ENTIDADES CORE
CREATE TABLE utilizadores (
    utilizador_id SERIAL PRIMARY KEY,
    nome_completo VARCHAR(200) NOT NULL,
    email_contacto VARCHAR(200) UNIQUE NOT NULL,
    telemovel VARCHAR(15),
    estado_conta VARCHAR(20) DEFAULT 'Ativo'
);

CREATE TABLE ordens (
    ordem_id SERIAL PRIMARY KEY,
    utilizador_id INT NOT NULL REFERENCES utilizadores(utilizador_id),
    total_bilhetes SMALLINT NOT NULL,
    valor_final NUMERIC(9,2) NOT NULL,
    estado_ordem VARCHAR(20) -- 'Pago', 'Reembolsado', 'Pendente'
);

CREATE TABLE ingressos (
    ingresso_id SERIAL PRIMARY KEY,
    ordem_id INT NOT NULL REFERENCES ordens(ordem_id) ON DELETE CASCADE,
    codigo_rfid VARCHAR(120) UNIQUE NOT NULL,
    estado_ingresso VARCHAR(20), -- 'Válido', 'Entrou', 'Inválido'
    emitido_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. INFRAESTRUTURA FÍSICA
CREATE TABLE portais (
    portal_id SERIAL PRIMARY KEY,
    descricao VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE registo_entradas (
    registo_id SERIAL PRIMARY KEY,
    ingresso_id INT NOT NULL REFERENCES ingressos(ingresso_id),
    portal_id INT NOT NULL REFERENCES portais(portal_id),
    momento_leitura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_validacao VARCHAR(30)
);

-- 3. GESTÃO DE CRISE (REEMBOLSOS)
CREATE TABLE transacoes (
    transacao_id SERIAL PRIMARY KEY,
    ordem_id INT NOT NULL REFERENCES ordens(ordem_id),
    metodo_pagamento VARCHAR(50),
    valor NUMERIC(9,2)
);

CREATE TABLE devolucoes (
    devolucao_id SERIAL PRIMARY KEY,
    transacao_id INT NOT NULL REFERENCES transacoes(transacao_id),
    valor_devolvido NUMERIC(9,2),
    motivo TEXT DEFAULT 'Cancelamento Artista Principal'
);

-- 4. OTIMIZAÇÃO DE PERFORMANCE
CREATE INDEX idx_ingressos_rfid ON ingressos(codigo_rfid);
CREATE INDEX idx_registo_data ON registo_entradas(momento_leitura);

-- =============================================
-- ANALYTICS: GESTÃO DE IMPACTO (Kanye West)
-- =============================================

-- Query 1: Total de Valor a Reembolsar (Impacto Financeiro)
SELECT 
    COUNT(ordem_id) as total_ordens,
    SUM(valor_final) as prejuizo_potencial
FROM ordens 
WHERE estado_ordem = 'Pago';

-- Query 2: Taxa de Entrada em Tempo Real vs Lotação
SELECT 
    p.descricao as porta,
    COUNT(r.registo_id) as entradas_registadas
FROM portais p
LEFT JOIN registo_entradas r ON p.portal_id = r.portal_id
GROUP BY p.descricao;

-- Query 3: Identificação de Clientes Premium para Compensação
SELECT 
    u.nome_completo, 
    u.email_contacto, 
    SUM(o.valor_final) as investimento_total
FROM utilizadores u
JOIN ordens o ON u.utilizador_id = o.utilizador_id
GROUP BY u.utilizador_id
HAVING SUM(o.valor_final) > 500
ORDER BY investimento_total DESC;
  `;

  return (
    <div className="section">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <h1 className="glowing-text" style={{ fontSize: '3rem' }}><Terminal size={40} style={{ marginRight: '15px', color: 'var(--accent-color)' }} /> Engine <span className="text-accent">SQL</span></h1>
        <p className="text-secondary">Definição de DDL e DML para escalabilidade massiva.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card" 
        style={{ 
          width: '100%', 
          padding: '0', 
          marginBottom: '3rem', 
          overflow: 'hidden',
          border: '1px solid rgba(0, 255, 136, 0.2)',
          background: 'transparent'
        }}
      >
        <div style={{ 
          padding: '1.5rem', 
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(255,255,255,0.02)'
        }}>
          <h3 style={{ color: 'var(--accent-color)', margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <Database size={20} /> Modelo Relacional (Diagrama ER)
          </h3>
        </div>
        <img 
          src="/BD_Image.png" 
          alt="Modelo Relacional" 
          style={{ 
            width: '100%', 
            display: 'block',
            height: 'auto'
          }} 
        />
      </motion.div>

      <div className="glass-card" style={{ width: '100%', padding: '0', overflow: 'hidden', border: '1px solid rgba(0, 255, 136, 0.1)' }}>
        <div style={{ 
          background: 'rgba(255,255,255,0.05)', 
          padding: '12px 24px', 
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Database size={16} className="text-accent" />
            <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: '600', letterSpacing: '1px' }}>LAB2_SCHEMA.SQL</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', boxShadow: '0 0 5px #ff5f56' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', boxShadow: '0 0 5px #ffbd2e' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', boxShadow: '0 0 5px #27c93f' }}></div>
          </div>
        </div>
        <div style={{ maxHeight: '600px', overflowY: 'auto', background: '#050a14' }}>
          <pre style={{ 
            margin: 0, 
            padding: '2.5rem', 
            color: '#a1a1aa', 
            fontSize: '0.85rem', 
            lineHeight: '1.7', 
            fontFamily: '"Fira Code", "Courier New", monospace',
            tabSize: 4
          }}>
            <code>{sqlContent.trim()}</code>
          </pre>
        </div>
      </div>

      <div className="grid-2_col" style={{ marginTop: '3rem' }}>
        <motion.div 
          className="glass-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(0, 255, 136, 0.1)', padding: '10px', borderRadius: '10px' }}>
              <Zap className="text-accent" size={20} />
            </div>
            <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Otimização de Índices</h4>
          </div>
          <p className="text-secondary" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
            A aplicação de índices B-Tree nas colunas de <strong>RFID</strong> e <strong>Timestamp</strong> reduz a complexidade de busca de O(n) para O(log n), essencial para validações em menos de 100ms durante picos de entrada.
          </p>
        </motion.div>

        <motion.div 
          className="glass-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '10px', borderRadius: '10px' }}>
              <Database className="text-accent" size={20} style={{ color: '#3b82f6' }} />
            </div>
            <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Integridade Referencial</h4>
          </div>
          <p className="text-secondary" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
            O uso rigoroso de <code>FOREIGN KEYS</code> e restrições <code>ON DELETE CASCADE</code> garante que a anulação de uma ordem de compra limpe automaticamente todos os ingressos associados, evitando inconsistências.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SqlCode;
