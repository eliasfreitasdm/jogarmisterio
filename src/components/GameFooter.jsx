import React from 'react';
import logoFetec from '/src/logo-fetec.png'; // ajuste o caminho conforme necessário

export default function GameFooter() {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.95))',
      backdropFilter: 'blur(10px)',
      borderTop: '2px solid rgba(255, 215, 0, 0.3)',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000,
      boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.3)'
    }}>
      {/* Seção de Controles */}
      <div style={{ flex: 1, maxWidth: '600px' }}>
        <h3 style={{
          color: '#FFD700',
          fontSize: '14px',
          fontWeight: 'bold',
          margin: '0 0 8px 0',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
        }}>
          🎮 Controles do Jogo
        </h3>
        <div style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {[
            { key: 'W', desc: 'Movimento' },
            { key: 'A', desc: 'Movimento' },
            { key: 'S', desc: 'Movimento' },
            { key: 'D', desc: 'Movimento' },
            { key: 'Espaço', desc: 'Pular' },
            { key: '1-4', desc: 'Trocar Personagem' },
            { key: 'I', desc: 'Inventário' },
            { key: 'Q', desc: 'Usar Item' }
          ].map((control, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px'
            }}>
              <div style={{
                background: 'linear-gradient(145deg, #4a4a4a, #2a2a2a)',
                color: 'white',
                padding: control.key === 'Espaço' ? '4px 16px' : '4px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 'bold',
                border: '1px solid #666',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                minWidth: '24px',
                textAlign: 'center'
              }}>
                {control.key}
              </div>
              <div style={{
                color: '#E0E0E0',
                fontSize: '11px',
                textAlign: 'center',
                fontWeight: '500'
              }}>
                {control.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Única Logo Centralizada */}
      <div style={{
        width: '80px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        borderRadius: '8px',
        border: '1px solid rgba(255, 215, 0, 0.3)'
      }}>
        <img
          src={logoFetec}
          alt="Logo FETEC"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain'
          }}
        />
      </div>
    </div>
  );
}
