import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

// Componente para cutscenes animadas
export default function Cutscene({
  scenes = [],
  onComplete,
  autoAdvance = false,
  autoAdvanceDelay = 5000
}) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [showControls, setShowControls] = useState(true);
  
  const currentScene = scenes[currentSceneIndex];
  
  // Efeito para avançar automaticamente as cenas
  useEffect(() => {
    if (autoAdvance && isAnimating) {
      const timer = setTimeout(() => {
        handleNextScene();
      }, autoAdvanceDelay);
      
      return () => clearTimeout(timer);
    }
  }, [currentSceneIndex, autoAdvance, isAnimating]);
  
  // Avançar para a próxima cena
  const handleNextScene = () => {
    if (currentSceneIndex < scenes.length - 1) {
      setIsAnimating(true);
      setCurrentSceneIndex(currentSceneIndex + 1);
    } else {
      // Cutscene completa
      if (onComplete) {
        onComplete();
      }
    }
  };
  
  // Pular toda a cutscene
  const handleSkip = () => {
    if (onComplete) {
      onComplete();
    }
  };
  
  // Quando a animação terminar
  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };
  
  // Renderizar controles
  const renderControls = () => {
    if (!showControls) return null;
    
    return (
      <div
        className="cutscene-controls"
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          display: 'flex',
          gap: '10px',
          zIndex: 1000,
        }}
      >
        <button
          variant="secondary"
          size="sm"
          onClick={handleNextScene}
          disabled={isAnimating && autoAdvance}
        >
          {currentSceneIndex < scenes.length - 1 ? (
            <>
              Próximo <ChevronRight size={16} />
            </>
          ) : (
            'Concluir'
          )}
        </button>
        
        <button
          variant="outline"
          size="sm"
          onClick={handleSkip}
        >
          Pular
        </button>
      </div>
    );
  };
  
  // Renderizar cena atual
  const renderCurrentScene = () => {
    if (!currentScene) return null;
    
    return (
      <div
        className={`cutscene-frame ${isAnimating ? 'animating' : ''}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: currentScene.background ? `url(${currentScene.background})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '20px',
          animation: isAnimating ? 'fadeIn 1s ease-in-out' : 'none',
        }}
        onAnimationEnd={handleAnimationEnd}
      >
        {/* Personagens */}
        {currentScene.characters?.map((character, index) => (
          <div
            key={`character-${index}`}
            className="cutscene-character"
            style={{
              position: 'absolute',
              bottom: character.bottom || '0',
              left: character.left || 'auto',
              right: character.right || 'auto',
              width: character.width || '200px',
              height: character.height || 'auto',
              backgroundImage: `url(${character.image})`,
              backgroundSize: 'contain',
              backgroundPosition: 'bottom center',
              backgroundRepeat: 'no-repeat',
              zIndex: character.zIndex || 10,
              animation: isAnimating ? `${character.animation || 'slideInRight'} 1s ease-out` : 'none',
            }}
          />
        ))}
        
        {/* Caixa de diálogo */}
        {currentScene.dialogue && (
          <div
            className="cutscene-dialogue"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '20px',
              borderRadius: '10px',
              maxWidth: '80%',
              marginBottom: '20px',
              animation: isAnimating ? 'fadeIn 1s ease-in-out' : 'none',
              zIndex: 20,
            }}
          >
            {currentScene.speaker && (
              <div
                className="cutscene-speaker"
                style={{
                  fontWeight: 'bold',
                  color: currentScene.speakerColor || '#FFD700',
                  marginBottom: '5px',
                }}
              >
                {currentScene.speaker}
              </div>
            )}
            <div className="cutscene-text">{currentScene.dialogue}</div>
          </div>
        )}
        
        {/* Narração */}
        {currentScene.narration && (
          <div
            className="cutscene-narration"
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              right: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: '15px',
              borderRadius: '8px',
              fontStyle: 'italic',
              textAlign: 'center',
              animation: isAnimating ? 'fadeIn 1s ease-in-out' : 'none',
              zIndex: 20,
            }}
          >
            {currentScene.narration}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div
      className="cutscene-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        zIndex: 1000,
        overflow: 'hidden',
      }}
    >
      {renderCurrentScene()}
      {renderControls()}
      
      {/* Indicador de progresso */}
      <div
        className="cutscene-progress"
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '20px',
          display: 'flex',
          gap: '5px',
        }}
      >
        {scenes.map((_, index) => (
          <div
            key={`progress-${index}`}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: index === currentSceneIndex ? 'white' : 'rgba(255, 255, 255, 0.3)',
            }}
          />
        ))}
      </div>
      
      {/* Estilos para animações */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes slideInBottom {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

