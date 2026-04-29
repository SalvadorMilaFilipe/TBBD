import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Users, WifiOff, RefreshCcw } from 'lucide-react';

const Problema = () => {
  return (
    <div className="section">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }} className="glowing-text">
          O Desafio <span className="text-error">Wireless</span>
        </h1>
        <p className="text-secondary" style={{ fontSize: '1.2rem', maxWidth: '800px' }}>
          Gestão de crise em tempo real: O cancelamento de Kanye West e a pressão sobre a infraestrutura de dados.
        </p>
      </motion.div>

      <div className="grid-2_col">
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(255, 51, 102, 0.1)', padding: '12px', borderRadius: '12px' }}>
              <AlertTriangle className="text-error" size={32} />
            </div>
            <h2 style={{ margin: 0 }}>Problema 1: O Caos Operacional</h2>
          </div>
          <p className="text-secondary">
            <strong>Cenário:</strong> Kanye West cancela a atuação. 50.000 pessoas estão dentro do recinto e 20.000 à porta. 
            O sistema de validação não pode parar e a integridade da base de dados é crítica para evitar entradas não autorizadas ou duplicadas.
          </p>
          <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.2rem', lineHeight: '1.8' }}>
            <li>Manter validação de entradas fluida em pico de tráfego.</li>
            <li>Gerir a frustração dos fãs com informações automáticas nos leitores.</li>
            <li>Evitar que o sistema colapse sob a carga de 70.000 requisições simultâneas.</li>
          </ul>
        </motion.div>

        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(0, 255, 136, 0.1)', padding: '12px', borderRadius: '12px' }}>
              <WifiOff className="text-accent" size={32} />
            </div>
            <h2 style={{ margin: 0 }}>Problema 2: O Dilema da Sincronização</h2>
          </div>
          <p className="text-secondary">
            <strong>Cenário:</strong> Como lidar com o modo Offline? Se uma pessoa pede reembolso online (após o cancelamento), como impedir que ela entre no recinto se os torniquetes estão a operar sem Wi-Fi?
          </p>
          <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.2rem', lineHeight: '1.8' }}>
            <li>Inconsistência entre a BD Central e os dispositivos locais.</li>
            <li>Risco de "double dipping" (reembolso + entrada no festival).</li>
            <li>Necessidade de uma "Blacklist" local atualizada periodicamente.</li>
          </ul>
        </motion.div>
      </div>

      <motion.div 
        className="glass-card" 
        style={{ marginTop: '2rem', width: '100%', borderLeft: '4px solid var(--accent-color)' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Users size={24} className="text-accent" />
          <h3 style={{ margin: 0 }}>Escala do Sistema: 70.000 Utilizadores em Tempo Real</h3>
        </div>
      </motion.div>
    </div>
  );
};

export default Problema;
