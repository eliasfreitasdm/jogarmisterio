import React, { useState, useEffect } from 'react';

const EducationalPopup = ({ 
  isOpen, 
  onClose, 
  item, 
  onKnowledgeGain 
}) => {
  const [currentSection, setCurrentSection] = useState('intro');
  const [hasGainedKnowledge, setHasGainedKnowledge] = useState(false);

  // Reset state when popup opens
  useEffect(() => {
    if (isOpen) {
      setCurrentSection('intro');
      setHasGainedKnowledge(false);
    }
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleKnowledgeGain = () => {
    if (!hasGainedKnowledge) {
      onKnowledgeGain(item.points || 10);
      setHasGainedKnowledge(true);
    }
  };

  const handleClose = () => {
    handleKnowledgeGain();
    onClose();
  };

  const renderIntroSection = () => (
    <div className="educational-content">
      <div className="item-showcase">
        <div className="item-icon">
          {item.type === 'lamp' && '💡'}
          {item.type === 'document' && '📜'}
          {item.type === 'artifact' && '🏺'}
          {item.type === 'tool' && '🔨'}
          {item.type === 'coin' && '💰'}
          {item.type === 'radio' && '📻'}
          {item.type === 'solar' && '⚡'}
          {item.type === 'diploma' && '🎓'}
        </div>
        <h3 className="item-name">{item.name}</h3>
        <p className="item-description">{item.description}</p>
      </div>
      
      <div className="navigation-buttons">
        <button 
          onClick={() => setCurrentSection('history')}
          className="nav-button primary"
        >
          📚 Descobrir História
        </button>
        <button 
          onClick={() => setCurrentSection('context')}
          className="nav-button secondary"
        >
          🏛️ Contexto da Época
        </button>
        <button 
          onClick={() => setCurrentSection('trivia')}
          className="nav-button accent"
        >
          🤔 Curiosidades
        </button>
      </div>
    </div>
  );

  const renderHistorySection = () => (
    <div className="educational-content">
      <h3>📚 História do Item</h3>
      <div className="content-text">
        <p>{item.educationalText}</p>
      </div>
      <div className="navigation-buttons">
        <button 
          onClick={() => setCurrentSection('intro')}
          className="nav-button secondary"
        >
          ← Voltar
        </button>
        <button 
          onClick={() => setCurrentSection('context')}
          className="nav-button primary"
        >
          Contexto da Época →
        </button>
      </div>
    </div>
  );

  const renderContextSection = () => (
    <div className="educational-content">
      <h3>🏛️ Contexto Histórico</h3>
      <div className="content-text">
        <p>{item.historicalContext}</p>
      </div>
      <div className="navigation-buttons">
        <button 
          onClick={() => setCurrentSection('history')}
          className="nav-button secondary"
        >
          ← História
        </button>
        <button 
          onClick={() => setCurrentSection('trivia')}
          className="nav-button primary"
        >
          Curiosidades →
        </button>
      </div>
    </div>
  );

  const renderTriviaSection = () => (
    <div className="educational-content">
      <h3>🤔 Você Sabia?</h3>
      <div className="content-text">
        <p>{item.trivia || "Este item guarda segredos fascinantes da história de Boa Vista!"}</p>
      </div>
      <div className="knowledge-gain">
        <div className="points-display">
          <span className="points-icon">🌟</span>
          <span className="points-text">+{item.points || 10} Pontos de Conhecimento</span>
        </div>
      </div>
      <div className="navigation-buttons">
        <button 
          onClick={() => setCurrentSection('context')}
          className="nav-button secondary"
        >
          ← Contexto
        </button>
        <button 
          onClick={handleClose}
          className="nav-button success"
        >
          ✅ Concluir Aprendizado
        </button>
      </div>
    </div>
  );

  return (
    <div className="educational-popup-overlay">
      <div className="educational-popup">
        <div className="popup-header">
          <h2 className="popup-title">
            🎯 ITEM HISTÓRICO DESCOBERTO!
          </h2>
          <button 
            onClick={handleClose}
            className="close-button"
          >
            ✕
          </button>
        </div>

        <div className="popup-body">
          {currentSection === 'intro' && renderIntroSection()}
          {currentSection === 'history' && renderHistorySection()}
          {currentSection === 'context' && renderContextSection()}
          {currentSection === 'trivia' && renderTriviaSection()}
        </div>

        <div className="popup-footer">
          <div className="progress-indicator">
            <div className={`progress-dot ${currentSection === 'intro' ? 'active' : ''}`}></div>
            <div className={`progress-dot ${currentSection === 'history' ? 'active' : ''}`}></div>
            <div className={`progress-dot ${currentSection === 'context' ? 'active' : ''}`}></div>
            <div className={`progress-dot ${currentSection === 'trivia' ? 'active' : ''}`}></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .educational-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease-out;
        }

        .educational-popup {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow: hidden;
          animation: slideIn 0.4s ease-out;
        }

        .popup-header {
          background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
          color: white;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .popup-title {
          margin: 0;
          font-size: 1.4rem;
          font-weight: bold;
        }

        .close-button {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1.2rem;
          cursor: pointer;
          transition: background 0.3s;
        }

        .close-button:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .popup-body {
          padding: 30px;
          min-height: 300px;
        }

        .educational-content {
          text-align: center;
        }

        .item-showcase {
          margin-bottom: 30px;
        }

        .item-icon {
          font-size: 4rem;
          margin-bottom: 15px;
        }

        .item-name {
          font-size: 1.5rem;
          color: #2c3e50;
          margin-bottom: 10px;
        }

        .item-description {
          color: #6c757d;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .content-text {
          background: white;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .content-text p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #2c3e50;
          margin: 0;
        }

        .navigation-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .nav-button {
          padding: 12px 24px;
          border: none;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          min-width: 140px;
        }

        .nav-button.primary {
          background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
          color: white;
        }

        .nav-button.secondary {
          background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
          color: white;
        }

        .nav-button.accent {
          background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
          color: white;
        }

        .nav-button.success {
          background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
          color: white;
        }

        .nav-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .knowledge-gain {
          background: linear-gradient(135deg, #f1c40f 0%, #f39c12 100%);
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .points-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .points-icon {
          font-size: 1.5rem;
        }

        .points-text {
          font-size: 1.2rem;
          font-weight: bold;
          color: white;
        }

        .popup-footer {
          background: #f8f9fa;
          padding: 15px;
          border-top: 1px solid #dee2e6;
        }

        .progress-indicator {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .progress-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #dee2e6;
          transition: background 0.3s;
        }

        .progress-dot.active {
          background: #4a90e2;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 768px) {
          .educational-popup {
            width: 95%;
            max-height: 90vh;
          }

          .popup-body {
            padding: 20px;
          }

          .navigation-buttons {
            flex-direction: column;
            align-items: center;
          }

          .nav-button {
            width: 100%;
            max-width: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default EducationalPopup;

