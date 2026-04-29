import React from 'react';
import { motion } from 'framer-motion';
import { Network, Database, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

const Solucao = () => {
  return (
    <div className="section">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <h1 className="glowing-text" style={{ fontSize: '3rem' }}>Resolução <span className="text-accent">Arquitetural</span></h1>
        <p className="text-secondary">Estratégias de performance, integridade e fluxos lógicos.</p>
      </motion.div>

      {/* Fluxograma Section */}
      <h2 style={{ alignSelf: 'flex-start', marginBottom: '1.5rem' }}>1. Fluxograma do Sistema</h2>
      <div className="glass-card" style={{ width: '100%', marginBottom: '4rem', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: '800px', padding: '20px' }}>
          <div className="flow-step">
            <Zap className="text-accent" />
            <span>Leitura RFID</span>
          </div>
          <ArrowRight className="text-secondary" />
          <div className="flow-step">
            <Database className="text-accent" />
            <span>Cache Local / DB</span>
          </div>
          <ArrowRight className="text-secondary" />
          <div className="flow-step">
            <ShieldCheck className="text-accent" />
            <span>Validação (Pago?)</span>
          </div>
          <ArrowRight className="text-secondary" />
          <div className="flow-step" style={{ borderColor: 'var(--error-color)' }}>
            <Network className="text-error" />
            <span>Aviso: Kanye Cancelou!</span>
          </div>
        </div>
        <p className="text-secondary" style={{ marginTop: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
          O sistema verifica se o bilhete está validado e, em caso afirmativo, exibe instantaneamente a mensagem de cancelamento e oferta de voucher.
        </p>
      </div>

      {/* Technical Answers */}
      <div className="grid-2_col">
        <div className="glass-card">
          <h3 className="text-accent">Q1. Conetividade & Sincronização</h3>
          <p className="text-secondary">
            <strong>Solução:</strong> Utilização de uma <strong>Base de Dados Local (SQLite/IndexedDB)</strong> nos leitores portáteis. 
            Em caso de falha Wi-Fi, o leitor guarda o timestamp e ID da pulseira em cache. Assim que a rede é restabelecida, o sistema envia os logs em 
            pendência para o servidor central através de uma "Delayed Queue".
          </p>
        </div>
        <div className="glass-card">
          <h3 className="text-accent">Q2. Normalização vs Performance</h3>
          <p className="text-secondary">
            <strong>Resposta:</strong> É mais eficiente usar um <strong>ID_Artista (Normalizado)</strong>. 
            No caso de um cancelamento massivo como este, basta alterar o estado do artista numa única linha na tabela `Cartaz` para que todo o front-end 
            e sistema de validação saibam do cancelamento, sem ter de percorrer e atualizar 70.000 bilhetes individualmente.
          </p>
        </div>
        <div className="glass-card" style={{ gridColumn: 'span 2' }}>
          <h3 className="text-accent">Q3. Performance em Pico ( &gt; 1000 req/s)</h3>
          <p className="text-secondary">
            <strong>Técnica:</strong> Implementação de <strong>Caching (Redis)</strong>. 
            Para garantir respostas inferiores a 1 segundo, os dados dos 70.000 bilhetes são carregados em memória (RAM). Uma base de dados relacional 
            tradicional teria dificuldade em processar milhares de leituras por segundo em disco, mas o Redis entrega os dados em milissegundos.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .flow-step {
          border: 1px solid var(--accent-color);
          padding: 1.5rem;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          min-width: 150px;
          background: rgba(0, 255, 136, 0.05);
        }
        .flow-step span { font-weight: 600; font-size: 0.9rem; }
      `}} />
    </div>
  );
};

export default Solucao;
