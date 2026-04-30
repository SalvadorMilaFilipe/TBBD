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
                  node: { 
                    label: "Esgotado", 
                    sub: "Notificar Utilizador", 
                    icon: <XCircle />, 
                    branches: [{ type: "yes", node: { label: "Fim", sub: "Processo Encerrado", icon: <ArrowRight />, type: "end" } }]
                  }
                },
                {
                  type: "yes",
                  node: {
                    label: "Registo Compra",
                    sub: "estado de pagamento pendente",
                    icon: <Database />,
                    branches: [
                      {
                        type: "yes",
                        node: {
                          label: "Método Pagamento",
                          sub: "MBWay, Multibanco, Visa/Mastercard, PayPal",
                          icon: <Zap />,
                          branches: [
                            {
                              type: "no",
                              node: { 
                                label: "Recusado", 
                                sub: "Erro na Gateway", 
                                icon: <AlertCircle />, 
                                branches: [{ type: "yes", node: { label: "Fim", sub: "Tentar Novamente", icon: <ArrowRight />, type: "end" } }]
                              }
                            },
                            {
                              type: "yes",
                              node: { 
                                label: "Ativo", 
                                sub: "Gerar bilhete (ID único), Associar Bilhete, Gerar RFID", 
                                icon: <CheckCircle2 />, 
                                branches: [{ type: "yes", node: { label: "Fim", sub: "Com Estado Ativo e Confirmação enviada", icon: <ArrowRight />, type: "end" } }]
                              }
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
        ]
      }
    },
    {
      title: "Fluxo de Validação de Acesso (com RFID)",
      color: "#3b82f6",
      root: {
        label: "Leitura RFID",
        sub: "Início Processo",
        icon: <Zap />,
        branches: [
          {
            type: "yes",
            node: {
              label: "Procurar bilhete",
              sub: "(cache local)",
              icon: <Database />,
              branches: [
                {
                  type: "yes",
                  node: {
                    label: "Bilhete existe?",
                    type: "decision",
                    sub: "Verificação DB",
                    icon: <ShieldCheck />,
                    branches: [
                      {
                        type: "no",
                        node: { label: "Fim", sub: "Bilhete Inexistente", icon: <ArrowRight />, type: "end" }
                      },
                      {
                        type: "yes",
                        node: {
                          label: "Bilhete inválido?",
                          type: "decision",
                          sub: "Check Estado",
                          icon: <XCircle />,
                          branches: [
                            {
                              type: "yes",
                              node: { 
                                label: "Bilhete inválido", 
                                sub: "Estado Inválido", 
                                icon: <XCircle />, 
                                branches: [{ type: "yes", node: { label: "Fim", sub: "Processo Encerrado", icon: <ArrowRight />, type: "end" } }]
                              }
                            },
                            {
                              type: "no",
                              node: {
                                label: "Porta Correta?",
                                type: "decision",
                                sub: "Zona de Acesso",
                                icon: <Network />,
                                branches: [
                                  {
                                    type: "no",
                                    node: { 
                                      label: "Negado", 
                                      sub: "Bilhete não é por hoje", 
                                      icon: <AlertCircle />, 
                                      branches: [{ type: "yes", node: { label: "Fim", sub: "Acesso Recusado", icon: <ArrowRight />, type: "end" } }]
                                    }
                                  },
                                  {
                                    type: "yes",
                                    node: {
                                      label: "Já Registada?",
                                      type: "decision",
                                      sub: "Controlo de Entrada",
                                      icon: <RefreshCcw />,
                                      branches: [
                                        {
                                          type: "yes",
                                          node: { 
                                            label: "Entrada Já Registada", 
                                            sub: "Duplicado", 
                                            icon: <AlertCircle />, 
                                            branches: [{ type: "yes", node: { label: "Fim", sub: "Acesso Recusado", icon: <ArrowRight />, type: "end" } }]
                                          }
                                        },
                                        {
                                          type: "no",
                                          node: {
                                            label: "Permitir Acesso",
                                            sub: "Registar entrada local",
                                            icon: <CheckCircle2 />,
                                            branches: [{ type: "yes", node: { label: "Fim", sub: "Acesso Concedido", icon: <ArrowRight />, type: "end" } }]
                                          }
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
      title: "Fluxo Normal (Offline Simples)",
      color: "#a855f7",
      root: {
        label: "Leitura RFID",
        sub: "Modo Offline",
        icon: <Zap />,
        branches: [
          {
            type: "yes",
            node: {
              label: "Verificar Cache",
              sub: "(base local)",
              icon: <Database />,
              branches: [
                {
                  type: "yes",
                  node: {
                    label: "Existe e Válido?",
                    type: "decision",
                    sub: "Check Local",
                    icon: <ShieldCheck />,
                    branches: [
                      {
                        type: "no",
                        node: { 
                          label: "Negar Acesso", 
                          sub: "Entrada Recusada", 
                          icon: <XCircle />, 
                          branches: [{ type: "yes", node: { label: "Fim", sub: "Processo Encerrado", icon: <ArrowRight />, type: "end" } }]
                        }
                      },
                      {
                        type: "yes",
                        node: {
                          label: "Permitir Acesso",
                          sub: "Registar entrada local",
                          icon: <CheckCircle2 />,
                          branches: [{ type: "yes", node: { label: "Fim", sub: "Acesso Offline", icon: <ArrowRight />, type: "end" } }]
                        }
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
      title: "Fluxo de Reembolso (Gestão de Crise)",
      color: "#f43f5e",
      root: {
        label: "Pedido Reembolso",
        sub: "Cliente pede reembolso",
        icon: <RefreshCcw />,
        branches: [
          {
            type: "yes",
            node: {
              label: "Validar elegibilidade",
              sub: "Check Regras",
              icon: <ShieldCheck />,
              branches: [
                {
                  type: "yes",
                  node: {
                    label: "Elegível?",
                    type: "decision",
                    sub: "Decisão do Sistema",
                    icon: <ShieldCheck />,
                    branches: [
                      {
                        type: "no",
                        node: { 
                          label: "Rejeitar Pedido", 
                          sub: "Ineligível", 
                          icon: <XCircle />, 
                          branches: [{ type: "yes", node: { label: "Fim", sub: "Processo Encerrado", icon: <ArrowRight />, type: "end" } }]
                        }
                      },
                      {
                        type: "yes",
                        node: {
                          label: "Atualizar Compra",
                          sub: "Estado = Reembolsado",
                          icon: <Database />,
                          branches: [
                            {
                              type: "yes",
                              node: {
                                label: "Atualizar Bilhete",
                                sub: "Estado = Inválido",
                                icon: <XCircle />,
                                branches: [
                                  {
                                    type: "yes",
                                    node: {
                                      label: "Add Blacklist",
                                      sub: "Adicionar ID à Blacklist",
                                      icon: <ShieldCheck />,
                                      branches: [
                                        {
                                          type: "yes",
                                          node: {
                                            label: "Inc. Versão",
                                            sub: "Incrementar Versão Bilhete",
                                            icon: <Zap />,
                                            branches: [
                                              {
                                                type: "yes",
                                                node: {
                                                  label: "Enviar Update",
                                                  sub: "Propagar no Sistema",
                                                  icon: <Network />,
                                                  branches: [
                                                    {
                                                      type: "yes",
                                                      node: {
                                                        label: "Sync Leitores",
                                                        sub: "Leitores recebem Blacklist",
                                                        icon: <RefreshCcw />,
                                                        branches: [{ type: "yes", node: { label: "Fim", sub: "Finalizado", icon: <ArrowRight />, type: "end" } }]
                                                      }
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
                                ]
                              }
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
          <React.Fragment key={i}>
            <div className="flow-card-full">
              <h2 style={{ color: fluxo.color, marginBottom: '2rem' }}>{fluxo.title}</h2>
              <div className="logic-tree">
                <LogicNode {...fluxo.root} color={fluxo.color} />
              </div>
            </div>
            
            {i === 0 && (
              <motion.div 
                className="glass-card" 
                style={{ borderLeft: '4px solid #00ff88', background: 'rgba(0, 255, 136, 0.02)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 style={{ color: '#00ff88', marginBottom: '1rem' }}>Matriz de Confirmação de Pagamento</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table className="payment-table">
                    <thead>
                      <tr>
                        <th>Método</th>
                        <th>Tipo de Confirmação</th>
                        <th>Impacto no Fluxo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>MBWay</strong></td>
                        <td><span className="badge-immediate">IMEDIATA</span></td>
                        <td>Geração instantânea da pulseira RFID.</td>
                      </tr>
                      <tr>
                        <td><strong>Cartão (Visa/MC)</strong></td>
                        <td><span className="badge-immediate">IMEDIATA</span></td>
                        <td>Geração instantânea da pulseira RFID.</td>
                      </tr>
                      <tr>
                        <td><strong>PayPal</strong></td>
                        <td><span className="badge-redirect">REDIRECIONAMENTO</span></td>
                        <td>Confirmação após retorno da gateway externa.</td>
                      </tr>
                      <tr>
                        <td><strong>Multibanco</strong></td>
                        <td><span className="badge-delay">DIFERIDA / DEMORA</span></td>
                        <td>Estado 'Pendente' até confirmação da rede SIBS.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </React.Fragment>
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

        .payment-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
          color: #fff;
          font-size: 0.9rem;
        }
        .payment-table th {
          text-align: left;
          padding: 12px;
          border-bottom: 2px solid rgba(255,255,255,0.1);
          color: var(--accent-color);
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 1px;
        }
        .payment-table td {
          padding: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .badge-immediate {
          background: rgba(0, 255, 136, 0.1);
          color: #00ff88;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 700;
        }
        .badge-redirect {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 700;
        }
        .badge-delay {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 700;
        }
      `}} />
    </div>
  );
};

export default Solucao;

