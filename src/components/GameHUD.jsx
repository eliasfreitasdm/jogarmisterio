import React, { useState, useEffect } from 'react';
import { Book, Heart, Zap, Map, Compass, Award, MessageCircle, Backpack } from 'lucide-react';

// Componente para o HUD do jogo
export default function GameHUD({
  knowledge = 0,
  maxKnowledge = 100,
  health = 100,
  maxHealth = 100,
  energy = 100,
  maxEnergy = 100,
  era,
  onDialogueClick,
  onPuzzleClick,
  onInventoryClick,
  onMapClick
}) {
  // Estado do HUD
  const [showTooltip, setShowTooltip] = useState(null);
  const [showMiniMap, setShowMiniMap] = useState(false);
  
  // Calcular porcentagens para as barras
  const knowledgePercent = (knowledge / maxKnowledge) * 100;
  const healthPercent = (health / maxHealth) * 100;
  const energyPercent = (energy / maxEnergy) * 100;
  
  // Determinar cor da barra de saúde com base no valor
  const getHealthColor = () => {
    if (healthPercent > 70) return '#4CAF50';
    if (healthPercent > 30) return '#FFC107';
    return '#F44336';
  };
  
  // Determinar cor da barra de energia com base no valor
  const getEnergyColor = () => {
    if (energyPercent > 70) return '#2196F3';
    if (energyPercent > 30) return '#03A9F4';
    return '#90CAF9';
  };
  
  // Alternar exibição do mini-mapa
  const toggleMiniMap = () => {
    setShowMiniMap(!showMiniMap);
  };
  
  // Renderizar mini-mapa
  const renderMiniMap = () => {
    if (!showMiniMap) return null;
    
    return (
      <div
        className="mini-map"
        style={{
          position: 'absolute',
          top: '80px',
          right: '20px',
          width: '200px',
          height: '150px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          border: '2px solid #555',
          borderRadius: '8px',
          padding: '8px',
          zIndex: 1000,
        }}
      >
        <div className="mini-map-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{ color: 'white', fontSize: '12px' }}>{era?.name || 'Mapa'}</span>
          <button
            variant="ghost"
            size="sm"
            onClick={toggleMiniMap}
            style={{ padding: '0', minWidth: '20px', height: '20px', color: 'white' }}
          >
            ×
          </button>
        </div>
        
        <div
          className="mini-map-content"
          style={{
            width: '100%',
            height: 'calc(100% - 25px)',
            backgroundColor: '#333',
            borderRadius: '4px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Fundo do mapa baseado na era atual */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: era?.miniMapBackground ? `url(${era.miniMapBackground})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.7,
            }}
          />
          
          {/* Marcador do jogador */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '8px',
              height: '8px',
              backgroundColor: '#FF5722',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 4px #FFF',
            }}
          />
          
          {/* Marcadores de pontos de interesse */}
          {era?.pointsOfInterest?.map((poi, index) => (
            <div
              key={`poi-${index}`}
              style={{
                position: 'absolute',
                top: `${poi.y}%`,
                left: `${poi.x}%`,
                width: '6px',
                height: '6px',
                backgroundColor: poi.completed ? '#4CAF50' : '#FFEB3B',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              title={poi.name}
            />
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <>
      {/* Barra superior */}
      <div
        className="game-hud-top"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          zIndex: 1000,
        }}
      >
        {/* Barra de progresso do livro */}
        <div
          className="knowledge-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '20px',
          }}
          onMouseEnter={() => setShowTooltip('knowledge')}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Book className="mr-2" size={24} color="#FFD700" />
          <div
            className="knowledge-bar"
            style={{
              width: '200px',
              height: '12px',
              backgroundColor: '#333',
              borderRadius: '6px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              className="knowledge-progress"
              style={{
                width: `${knowledgePercent}%`,
                height: '100%',
                backgroundColor: '#FFD700',
                borderRadius: '6px',
                transition: 'width 0.5s ease',
              }}
            />
          </div>
          <span
            style={{
              color: 'white',
              marginLeft: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            {Math.floor(knowledge)}/{maxKnowledge}
          </span>
          
          {showTooltip === 'knowledge' && (
            <div
              className="tooltip"
              style={{
                position: 'absolute',
                top: '60px',
                left: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                zIndex: 1001,
                width: '200px',
              }}
            >
              <p className="font-bold mb-1">Progresso do Livro</p>
              <p>Conhecimento adquirido sobre a história de Boa Vista. Complete desafios e diálogos para aumentar.</p>
            </div>
          )}
        </div>
        
        {/* Indicador de saúde */}
        <div
          className="health-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '20px',
          }}
          onMouseEnter={() => setShowTooltip('health')}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Heart className="mr-2" size={24} color={getHealthColor()} fill={getHealthColor()} />
          <div
            className="health-bar"
            style={{
              width: '120px',
              height: '8px',
              backgroundColor: '#333',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              className="health-progress"
              style={{
                width: `${healthPercent}%`,
                height: '100%',
                backgroundColor: getHealthColor(),
                borderRadius: '4px',
                transition: 'width 0.3s ease, background-color 0.3s ease',
              }}
            />
          </div>
          
          {showTooltip === 'health' && (
            <div
              className="tooltip"
              style={{
                position: 'absolute',
                top: '60px',
                left: '220px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                zIndex: 1001,
                width: '180px',
              }}
            >
              <p className="font-bold mb-1">Saúde</p>
              <p>Diminui ao entrar em contato com inimigos. Recupere usando itens de cura.</p>
            </div>
          )}
        </div>
        
        {/* Indicador de energia */}
        <div
          className="energy-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: 'auto',
          }}
          onMouseEnter={() => setShowTooltip('energy')}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Zap className="mr-2" size={24} color={getEnergyColor()} />
          <div
            className="energy-bar"
            style={{
              width: '120px',
              height: '8px',
              backgroundColor: '#333',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              className="energy-progress"
              style={{
                width: `${energyPercent}%`,
                height: '100%',
                backgroundColor: getEnergyColor(),
                borderRadius: '4px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          
          {showTooltip === 'energy' && (
            <div
              className="tooltip"
              style={{
                position: 'absolute',
                top: '60px',
                left: '360px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                zIndex: 1001,
                width: '180px',
              }}
            >
              <p className="font-bold mb-1">Energia</p>
              <p>Usada para pular e correr. Recupera automaticamente com o tempo.</p>
            </div>
          )}
        </div>
        
        {/* Botões de ação */}
        <div className="action-buttons" style={{ display: 'flex', gap: '10px' }}>
          <button
            variant="ghost"
            size="sm"
            onClick={onDialogueClick}
            className="hud-button"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              borderRadius: '8px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Conversar"
          >
            <MessageCircle size={20} />
          </button>
          
          <button
            variant="ghost"
            size="sm"
            onClick={onPuzzleClick}
            className="hud-button"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              borderRadius: '8px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Desafios"
          >
            <Award size={20} />
          </button>
          
          <button
            variant="ghost"
            size="sm"
            onClick={onInventoryClick}
            className="hud-button"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              borderRadius: '8px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Inventário"
          >
            <Backpack size={20} />
          </button>
          
          <button
            variant="ghost"
            size="sm"
            onClick={toggleMiniMap}
            className="hud-button"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              borderRadius: '8px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Mapa"
          >
            <Map size={20} />
          </button>
        </div>
      </div>
      
      {/* Indicador de era atual */}
      <div
        className="era-indicator"
        style={{
          position: 'absolute',
          top: '70px',
          left: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        <Compass className="mr-2" size={16} />
        <span>{era?.name || 'Era Desconhecida'}</span>
      </div>
      
      {/* Mini-mapa */}
      {renderMiniMap()}
    </>
  );
}

