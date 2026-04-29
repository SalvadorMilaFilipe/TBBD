import React from 'react';
import { motion } from 'framer-motion';
import { Table, Link2, Key, Info } from 'lucide-react';

const Estrutura = () => {
  const tables = [
    {
      name: 'UTILIZADORES',
      columns: ['utilizador_id (PK)', 'nome_completo', 'email_contacto', 'telemovel', 'estado_conta'],
      desc: 'Entidade central que armazena os dados cadastrais dos clientes e fãns.'
    },
    {
      name: 'CREDENCIAIS',
      columns: ['credencial_id (PK)', 'utilizador_id (FK)', 'login_nome', 'email_login', 'password_hash'],
      desc: 'Dados sensíveis de autenticação e segurança de acesso à plataforma.'
    },
    {
      name: 'ORDENS',
      columns: ['ordem_id (PK)', 'utilizador_id (FK)', 'total_bilhetes', 'valor_final', 'estado_ordem'],
      desc: 'Regista as intenções de compra e o estado global da transação comercial.'
    },
    {
      name: 'INGRESSOS',
      columns: ['ingresso_id (PK)', 'ordem_id (FK)', 'codigo_rfid (UK)', 'codigo_qr', 'estado_ingresso'],
      desc: 'Unidade individual de acesso. Cada ingresso está ligado a uma ordem de compra.'
    },
    {
      name: 'TRANSACOES',
      columns: ['transacao_id (PK)', 'ordem_id (FK)', 'metodo_pagamento', 'valor', 'estado_pagamento'],
      desc: 'Fluxo financeiro detalhado, incluindo tokens de gateway e referências bancárias.'
    },
    {
      name: 'PORTAIS',
      columns: ['portal_id (PK)', 'descricao'],
      desc: 'Pontos físicos de controlo de acessos (VIP, Geral, Backstage).'
    },
    {
      name: 'REGISTO_ENTRADAS',
      columns: ['registo_id (PK)', 'ingresso_id (FK)', 'portal_id (FK)', 'momento_leitura', 'estado_validacao'],
      desc: 'Logs em tempo real de cada tentativa de entrada no recinto.'
    },
    {
      name: 'DEVOLUCOES',
      columns: ['devolucao_id (PK)', 'transacao_id (FK)', 'valor_devolvido', 'motivo', 'estado_devolucao'],
      desc: 'Gestão de estornos e cancelamentos para garantir conformidade financeira.'
    },
    {
      name: 'REGISTOS_LOGIN',
      columns: ['registo_id (PK)', 'utilizador_id (FK)', 'data_login', 'ip_acesso', 'dispositivo'],
      desc: 'Auditoria de segurança para rastrear acessos suspeitos ou geolocalização de utilizadores.'
    }
  ];

  return (
    <div className="section">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <h1 className="glowing-text" style={{ fontSize: '3rem' }}>Modelo de <span className="text-accent">Dados</span></h1>
        <p className="text-secondary">Arquitetura Escalável e Integridade Relacional (PostgreSQL).</p>
      </motion.div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {tables.map((table, idx) => (
            <motion.div 
              key={table.name}
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ marginBottom: '1rem' }}>
                <h3 className="text-accent" style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Table size={18} />
                  {table.name}
                </h3>
                <p className="text-secondary" style={{ fontSize: '0.9rem', marginTop: '8px', lineHeight: '1.4' }}>{table.desc}</p>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: 'auto' }}>
                {table.columns.map(col => (
                  <span key={col} style={{ 
                    fontSize: '0.7rem', 
                    background: 'rgba(255,255,255,0.03)', 
                    padding: '3px 8px', 
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: col.includes('(PK)') ? 'var(--accent-color)' : 
                           col.includes('(FK)') ? '#a855f7' : 'var(--text-secondary)'
                  }}>
                    {col}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="glass-card" style={{ background: 'rgba(0, 255, 136, 0.02)', borderLeft: '4px solid var(--accent-color)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Link2 className="text-accent" /> Ecossistema Relacional</h3>
          <p className="text-secondary">
            A estrutura foi desenhada para garantir <strong>consistência atómica</strong>:
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem', 
            marginTop: '1rem' 
          }}>
            <div>
              <h4 className="text-accent" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Fluxo Comercial</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Utilizadores → Ordens → Transações → Ingressos. <br/>
                Garante que nenhum bilhete é gerado sem um pagamento validado.
              </p>
            </div>
            <div>
              <h4 className="text-accent" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Fluxo Operacional</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Ingressos + Portais → Registo de Entradas. <br/>
                Permite monitorizar a lotação do recinto em tempo real por porta específica.
              </p>
            </div>
            <div>
              <h4 className="text-accent" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Segurança & Auditoria</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Credenciais + Registos Login. <br/>
                Isolamento de dados sensíveis e rastreabilidade total de acessos à conta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estrutura;
