import React, { useState, useEffect } from 'react';
import CollectableItem from './CollectableItem';

// Componente para gerenciar itens colecionáveis FUNCIONAIS
export default function ItemManager({ 
  items = [], 
  playerPosition, 
  collectedItems = [],
  currentEraId = '',
  onItemCollect 
}) {
  const [nearbyItems, setNearbyItems] = useState([]);
  
  // Função para verificar se um item foi coletado
  const isItemCollected = (index) => {
    const itemId = `${currentEraId}-${index}`;
    return collectedItems.includes(itemId);
  };
  
  // Verificar itens próximos ao jogador para coleta automática
  useEffect(() => {
    if (!playerPosition) return;
    
    const nearby = items
      .filter((item, index) => !isItemCollected(index))
      .filter((item, index) => {
        const distance = Math.sqrt(
          Math.pow(item.x - playerPosition.x, 2) + 
          Math.pow(item.y - playerPosition.y, 2)
        );
        
        // Se estiver muito próximo (menos de 60px), coletar automaticamente
        if (distance < 60) {
          handleCollectItem(item, index);
          return false;
        }
        
        // Se estiver próximo (menos de 150px), mostrar indicador
        return distance < 150;
      });
    
    setNearbyItems(nearby);
  }, [playerPosition, items, collectedItems, currentEraId]);
  
  // Função para coletar um item
  const handleCollectItem = (item, originalIndex) => {
    console.log('🔍 ItemManager.handleCollectItem chamado:', { item: item.name, originalIndex, currentEraId });
    
    if (onItemCollect) {
      console.log('🔍 ItemManager chamando onItemCollect com:', { originalIndex, item: item.name });
      onItemCollect(originalIndex, item); // Ordem correta: index primeiro
    } else {
      console.log('❌ ItemManager: onItemCollect não está definido!');
    }
  };
  
  // Renderizar itens colecionáveis
  return (
    <>
      {items.map((item, index) => (
        <CollectableItem
          key={`item-${currentEraId}-${index}`}
          item={item}
          position={{ x: item.x, y: item.y }}
          isCollected={isItemCollected(index)}
          onCollect={() => handleCollectItem(item, index)} // Ordem correta: item, index
        />
      ))}
      
      {/* Indicador global de itens próximos */}
      {nearbyItems.length > 0 && playerPosition && (
        <div 
          className="nearby-items-indicator"
          style={{
            position: 'absolute',
            left: `${playerPosition.x + 40}px`,
            top: `${playerPosition.y - 50}px`,
            background: 'linear-gradient(45deg, #FFD700, #FFA500)',
            borderRadius: '20px',
            padding: '8px 12px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333',
            animation: 'bounce 1s infinite ease-in-out',
            zIndex: 200,
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            border: '2px solid white',
          }}
        >
          🎯 {nearbyItems.length} item{nearbyItems.length > 1 ? 's' : ''} próximo{nearbyItems.length > 1 ? 's' : ''}!
        </div>
      )}
      
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </>
  );
}

