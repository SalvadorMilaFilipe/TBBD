import React from 'react';
import { motion } from 'framer-motion';
import { 
  Network, Database, Zap, ShieldCheck, ArrowRight, 
  CreditCard, RefreshCcw, WifiOff, XCircle, CheckCircle2, 
  AlertCircle, CornerRightDown 
} from 'lucide-react';

const LogicNode = ({ label, sub, icon, type, color, branches }) => {
  return (
    <div className="logic-node-wrapper">
      <div className={`logic-node ${type}`} style={{ borderColor: color }}>
        <div className="node-icon" style={{ background: `${color}22`, color: color }}>
          {icon}
        </div>
        <div className="node-text">
          <span className="node-label">{label}</span>
          <span className="node-sub">{sub}</span>
        </div>
        {type === 'decision' && <div className="decision-badge">?</div>}
      </div>
      
      {branches && (
        <div className="node-branches">
          {branches.map((branch, idx) => (
            <div key={idx} className={`branch-path ${branch.type}`}>
              <div className="branch-line">
                {branch.type === 'no' ? <CornerRightDown size={20} /> : <ArrowRight size={20} />}
              </div>
              <div className="branch-content">
                <span className={`branch-tag ${branch.type}`}>{branch.type === 'yes' ? 'SIM' : 'NÃO'}</span>
                <LogicNode {...branch.node} color={branch.type === 'yes' ? color : '#f43f5e'} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Solucao = () => {
  const fluxosLógicos = [
    {
      title: "Fluxo de Compra e Pagamento",
      color: "#00ff88",
      root: {
        label: "Nova Compra",
        sub: "Seleção de Bilhete",
        icon: <CreditCard />,
        branches: [
          {
            type: "yes",
            node: {
              label: "Disponível?",
              type: "decision",
              sub: "Check Database",
              icon: <Database />,
              branches: [
                {
                  type: "no",
                  node: { label: "Esgotado", sub: "Fim do Processo", icon: <XCircle />, type: "end" }
                },
                {
                  type: "yes",
                  node: {
                    label: "Pagamento",
                    sub: "Gateway / MBWay",
                    icon: <Zap />,
                    branches: [
                      {
                        type: "no",
                        node: { label: "Recusado", sub: "Erro de Transação", icon: <AlertCircle />, type: "end" }
                      },
                      {
                        type: "yes",
                        node: { label: "Ativo", sub: "Gerar RFID / Email", icon: <CheckCircle2 />, type: "end" }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      title: "Fluxo de Validação de Acesso (Offline-First)",
      color: "#3b82f6",
      root: {
        label: "Leitura RFID",
        sub: "Scan Pulseira",
        icon: <Zap />,
        branches: [
          {
            type: "yes",
            node: {
              label: "Existe Cache?",
              type: "decision",
              sub: "Base Dados Local",
              icon: <Database />,
              branches: [
                {
                  type: "no",
                  node: { label: "Negado", sub: "Bilhete Inexistente", icon: <XCircle />, type: "end" }
                },
                {
                  type: "yes",
                  node: {
                    label: "Válido?",
                    type: "decision",
                    sub: "Blacklist / Porta",
                    icon: <ShieldCheck />,
                    branches: [
                      {
                        type: "no",
                        node: { label: "Barrado", sub: "Porta ou Data Errada", icon: <AlertCircle />, type: "end" }
                      },
                      {
                        type: "yes",
                        node: { label: "Acesso", sub: "Portão Aberto", icon: <CheckCircle2 />, type: "end" }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      title: "Sincronização de Dados e Reembolsos",
      color: "#f43f5e",
      root: {
        label: "Pedido Reembolso",
        sub: "Portal Cliente",
        icon: <RefreshCcw />,
        branches: [
          {
            type: "yes",
            node: {
              label: "Elegível?",
              type: "decision",
              sub: "Check Regras",
              icon: <ShieldCheck />,
              branches: [
                {
                  type: "no",
                  node: { label: "Rejeitado", sub: "Fora de Prazo", icon: <XCircle />, type: "end" }
                },
                {
                  type: "yes",
                  node: {
                    label: "Sync Blacklist",
                    sub: "Update Terminais",
                    icon: <Network />,
                    branches: [
                      {
                        type: "yes",
                        node: { label: "Concluído", sub: "ID Inutilizado", icon: <CheckCircle2 />, type: "end" }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ];

  return (
    <div className="section">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <h1 className="glowing-text" style={{ fontSize: '3rem' }}>Fluxos de <span className="text-accent">Decisão</span></h1>
        <p className="text-secondary">Lógica condicional aplicada à integridade da base de dados.</p>
      </motion.div>

      <div className="logic-flows-wrapper">
        {fluxosLógicos.map((fluxo, i) => (
          <div key={i} className="flow-card-full">
            <h2 style={{ color: fluxo.color, marginBottom: '2rem' }}>{fluxo.title}</h2>
            <div className="logic-tree">
              <LogicNode {...fluxo.root} color={fluxo.color} />
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .logic-flows-wrapper {
          display: flex;
          flex-direction: column;
          gap: 4rem;
          width: 100%;
        }
        .flow-card-full {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 3rem;
          overflow-x: auto;
        }
        .logic-tree {
          display: flex;
          justify-content: flex-start;
          min-width: fit-content;
        }
        .logic-node-wrapper {
          display: flex;
          align-items: flex-start;
        }
        .logic-node {
          width: 180px;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          display: flex;
          gap: 12px;
          position: relative;
          z-index: 2;
        }
        .logic-node.decision { background: rgba(245, 158, 11, 0.05); }
        .logic-node.end { background: rgba(244, 63, 94, 0.05); }
        
        .node-icon {
          padding: 8px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .node-text { display: flex; flex-direction: column; }
        .node-label { font-weight: 700; font-size: 0.85rem; color: #fff; }
        .node-sub { font-size: 0.7rem; color: var(--text-secondary); }
        
        .decision-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #f59e0b;
          color: #000;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 0.7rem;
        }

        .node-branches {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-left: 0;
        }
        .branch-path {
          display: flex;
          align-items: flex-start;
        }
        .branch-line {
          margin: 20px 10px 0 10px;
          color: rgba(255, 255, 255, 0.2);
        }
        .branch-content {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .branch-tag {
          font-size: 0.6rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
          width: fit-content;
        }
        .branch-tag.yes { background: rgba(0, 255, 136, 0.2); color: #00ff88; }
        .branch-tag.no { background: rgba(244, 63, 94, 0.2); color: #f43f5e; }

        @media (max-width: 900px) {
          .logic-node { width: 140px; }
          .flow-card-full { padding: 1.5rem; }
        }
      `}} />
    </div>
  );
};

export default Solucao;

