import React from 'react';
import { motion } from 'framer-motion';
import { Network, Database, Zap, ShieldCheck, ArrowRight, CreditCard, RefreshCcw, WifiOff, XCircle, CheckCircle2, AlertCircle } from 'lucide-react';

const FlowSection = ({ title, steps, color = "var(--accent-color)" }) => (
  <motion.div 
    className="glass-card" 
    style={{ marginBottom: '2rem', borderLeft: `4px solid ${color}` }}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
  >
    <h3 style={{ color: color, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
      {title}
    </h3>
    <div className="flow-container">
      {steps.map((step, idx) => (
        <React.Fragment key={idx}>
          <div className="flow-node" style={{ borderColor: step.type === 'decision' ? '#f59e0b' : color }}>
            {step.icon}
            <div className="node-content">
              <span className="node-label">{step.label}</span>
              {step.sub && <span className="node-sub">{step.sub}</span>}
            </div>
            {step.type === 'decision' && <div className="decision-tag">DECISÃO</div>}
          </div>
          {idx < steps.length - 1 && <ArrowRight size={20} className="flow-arrow" />}
        </React.Fragment>
      ))}
    </div>
  </motion.div>
);

const Solucao = () => {
  const fluxos = [
    {
      title: "Fluxo de Compra (Online/Offline)",
      color: "#00ff88",
      steps: [
        { label: "Seleção", sub: "Tipo de Bilhete", icon: <CreditCard size={18} /> },
        { label: "Stock?", type: "decision", sub: "Verificar Disponibilidade", icon: <Database size={18} /> },
        { label: "Pagamento", sub: "MBWay/Cartão/PayPal", icon: <Zap size={18} /> },
        { label: "Aprovação", type: "decision", sub: "Gateway de Pagamento", icon: <ShieldCheck size={18} /> },
        { label: "Ativação", sub: "Gerar ID & RFID", icon: <CheckCircle2 size={18} /> }
      ]
    },
    {
      title: "Fluxo de Validação (Acesso RFID)",
      color: "#3b82f6",
      steps: [
        { label: "Leitura", sub: "Scan Pulseira", icon: <Zap size={18} /> },
        { label: "Cache Local", sub: "Procurar Bilhete", icon: <Database size={18} /> },
        { label: "Validar", type: "decision", sub: "Estado/Porta/Data", icon: <ShieldCheck size={18} /> },
        { label: "Registo", sub: "Entrada Local", icon: <CheckCircle2 size={18} /> }
      ]
    },
    {
      title: "Fluxo Offline & Sincronização",
      color: "#a855f7",
      steps: [
        { label: "Modo Offline", sub: "Cache e Fila Local", icon: <WifiOff size={18} /> },
        { label: "Ligação?", type: "decision", sub: "Detectar Internet", icon: <Network size={18} /> },
        { label: "Sync", sub: "Enviar Logs / Receber Blacklist", icon: <RefreshCcw size={18} /> },
        { label: "Update", sub: "Atualizar Cache Local", icon: <Database size={18} /> }
      ]
    },
    {
      title: "Fluxo de Reembolso (Caso Kanye)",
      color: "#f43f5e",
      steps: [
        { label: "Pedido", sub: "Portal do Cliente", icon: <AlertCircle size={18} /> },
        { label: "Elegível?", type: "decision", sub: "Verificar Regras", icon: <ShieldCheck size={18} /> },
        { label: "Anulação", sub: "Blacklist & Invalidação", icon: <XCircle size={18} /> },
        { label: "Estorno", sub: "Devolução de Valor", icon: <CreditCard size={18} /> }
      ]
    }
  ];

  return (
    <div className="section">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <h1 className="glowing-text" style={{ fontSize: '3rem' }}>Lógica da <span className="text-accent">Solução</span></h1>
        <p className="text-secondary">Processos detalhados de transação, segurança e contingência offline.</p>
      </motion.div>

      <div style={{ width: '100%' }}>
        {fluxos.map((fluxo, i) => (
          <FlowSection key={i} {...fluxo} />
        ))}
      </div>

      <div className="grid-2_col" style={{ marginTop: '2rem' }}>
        <div className="glass-card">
          <h3 className="text-accent">Arquitetura de Dados</h3>
          <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
            Para suportar <strong>1000+ leituras/segundo</strong>, utilizamos Redis para cache de bilhetes ativos e PostgreSQL para persistência. 
            Em caso de cancelamento de artista, alteramos apenas o estado na tabela <code>Cartaz</code>, propagando a invalidação instantaneamente.
          </p>
        </div>
        <div className="glass-card">
          <h3 className="text-accent">Protocolo de Emergência</h3>
          <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
            O fluxo de sincronização garante que mesmo leitores sem rede recebam a <strong>Blacklist</strong> de reembolsos assim que detectam 1ms de conetividade, 
            impedindo o uso de bilhetes já devolvidos.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .flow-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          overflow-x: auto;
          padding: 10px 5px;
          scrollbar-width: thin;
        }
        .flow-node {
          min-width: 160px;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }
        .node-content {
          display: flex;
          flex-direction: column;
        }
        .node-label {
          font-weight: 700;
          font-size: 0.9rem;
          color: #fff;
        }
        .node-sub {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .decision-tag {
          position: absolute;
          top: -8px;
          right: 10px;
          background: #f59e0b;
          color: #000;
          font-size: 0.6rem;
          font-weight: 900;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .flow-arrow {
          color: rgba(255, 255, 255, 0.2);
          flex-shrink: 0;
        }
      `}} />
    </div>
  );
};

export default Solucao;
