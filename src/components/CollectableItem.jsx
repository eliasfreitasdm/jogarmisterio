import React, { useState, useEffect } from 'react';

// Componente para itens colecionáveis FUNCIONAIS
export default function CollectableItem({ 
  item, 
  position, 
  onCollect,
  isCollected = false
}) {
  const [showCollectEffect, setShowCollectEffect] = useState(false);
  const [isNearPlayer, setIsNearPlayer] = useState(false);
  
  // Determinar o ícone com base no tipo de item
  const getItemIcon = () => {
    switch (item.type) {
      case 'artifact':
        return '🏺';
      case 'document':
        return '📜';
      case 'tool':
        return '🔧';
      case 'book':
        return '📚';
      case 'relic':
        return '✨';
      case 'lamp':
        return '🪔';
      default:
        return '💎';
    }
  };
  
  // Função para coletar o item
  const handleClick = () => {
    console.log('🔍 CollectableItem.handleClick chamado:', { item: item.name, isCollected, showCollectEffect });
    
    if (!isCollected) { // Remover verificação de showCollectEffect
      console.log('✅ CollectableItem: Iniciando coleta do item:', item.name);
      setShowCollectEffect(true);
      
      // Notificar coleta imediatamente (sem delay)
      console.log('🔍 CollectableItem chamando onCollect para:', item.name);
      if (onCollect) {
        onCollect(item);
      }
      
      // Resetar efeito após animação
      setTimeout(() => {
        setShowCollectEffect(false);
      }, 1000);
    } else {
      console.log('❌ CollectableItem: Item já foi coletado:', item.name);
    }
  };
  
  // Não renderizar se já foi coletado
  if (isCollected) {
    return null;
  }
  
  // Estilos para o item
  const itemStyle = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    background: showCollectEffect 
      ? 'radial-gradient(circle, rgba(255,255,0,1) 0%, rgba(255,255,0,0) 100%)'
      : 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,215,0,0.4) 70%)',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    animation: showCollectEffect 
      ? 'collectAnimation 0.5s ease-out forwards' 
      : 'floatAnimation 2s infinite ease-in-out',
    opacity: showCollectEffect ? 0 : 1,
    transform: showCollectEffect 
      ? 'scale(2) translateY(-30px)' 
      : 'scale(1)',
    zIndex: 100,
    boxShadow: '0 0 15px rgba(255,215,0,0.6)',
    border: '2px solid rgba(255,255,255,0.8)',
  };
  
  return (
    <>
      <div 
        className="collectable-item"
        style={itemStyle}
        onClick={handleClick}
        title={`${item.name} - Clique para coletar`}
      >
        <span role="img" aria-label={item.name}>
          {getItemIcon()}
        </span>
      </div>
      
      {/* Indicador de item coletável */}
      <div
        style={{
          position: 'absolute',
          left: `${position.x + 25}px`,
          top: `${position.y - 20}px`,
          fontSize: '12px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '2px 6px',
          borderRadius: '10px',
          animation: 'pulse 1.5s infinite ease-in-out',
          zIndex: 101,
        }}
      >
        💡
      </div>
      
      <style jsx>{`
        @keyframes floatAnimation {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes collectAnimation {
          0% { 
            transform: scale(1) translateY(0px);
            opacity: 1;
          }
          50% {
            transform: scale(1.5) translateY(-15px);
            opacity: 0.8;
          }
          100% { 
            transform: scale(2) translateY(-30px);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
}

