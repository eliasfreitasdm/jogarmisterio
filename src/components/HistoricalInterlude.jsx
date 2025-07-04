import React, { useState } from 'react';
import { ChevronRight, Award } from 'lucide-react';

// Componente para interlúdios com personagens históricos
export default function HistoricalInterlude({
  character = {},
  onComplete,
  onKnowledgeGain
}) {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Avançar para o próximo diálogo
  const handleNextDialogue = () => {
    if (currentDialogueIndex < character.dialogue.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    } else {
      // Diálogo completo, mostrar quiz
      setShowQuiz(true);
    }
  };
  
  // Selecionar resposta do quiz
  const handleSelectAnswer = (index) => {
    setSelectedAnswer(index);
  };
  
  // Verificar resposta do quiz
  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isAnswerCorrect = selectedAnswer === character.quiz.correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);
    
    // Ganhar pontos de conhecimento
    if (isAnswerCorrect && onKnowledgeGain) {
      onKnowledgeGain(character.quiz.points || 10);
    }
  };
  
  // Concluir interlúdio
  const handleComplete = () => {
    if (onComplete) {
      onComplete(isCorrect);
    }
  };
  
  // Renderizar diálogo
  const renderDialogue = () => {
    const dialogue = character.dialogue[currentDialogueIndex];
    
    return (
      <div
        className="historical-dialogue"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div
          className="dialogue-content"
          style={{
            flex: 1,
            display: 'flex',
            padding: '20px',
          }}
        >
          {/* Imagem do personagem */}
          <div
            className="character-image"
            style={{
              width: '40%',
              backgroundImage: `url(${character.image})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: '10px',
              marginRight: '20px',
            }}
          />
          
          {/* Conteúdo do diálogo */}
          <div
            className="dialogue-text"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                marginBottom: '10px',
                color: '#333',
              }}
            >
              {character.name}
              <span
                style={{
                  fontSize: '16px',
                  color: '#666',
                  marginLeft: '10px',
                }}
              >
                ({character.period})
              </span>
            </h2>
            
            <p
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#444',
                flex: 1,
              }}
            >
              {dialogue}
            </p>
            
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '20px',
              }}
            >
              <div
                style={{
                  fontSize: '14px',
                  color: '#666',
                }}
              >
                {currentDialogueIndex + 1} / {character.dialogue.length}
              </div>
              
              <button
                onClick={handleNextDialogue}
              >
                {currentDialogueIndex < character.dialogue.length - 1 ? (
                  <>
                    Continuar <ChevronRight size={16} />
                  </>
                ) : (
                  'Responder Quiz'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Renderizar quiz
  const renderQuiz = () => {
    const quiz = character.quiz;
    
    return (
      <div
        className="historical-quiz"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '20px',
        }}
      >
        <h2
          style={{
            fontSize: '24px',
            marginBottom: '20px',
            color: '#333',
            textAlign: 'center',
          }}
        >
          Quiz: {character.name}
        </h2>
        
        <div
          className="quiz-question"
          style={{
            fontSize: '18px',
            marginBottom: '20px',
            color: '#444',
            textAlign: 'center',
          }}
        >
          {quiz.question}
        </div>
        
        <div
          className="quiz-options"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          {quiz.options.map((option, index) => (
            <div
              key={`option-${index}`}
              className={`quiz-option ${selectedAnswer === index ? 'selected' : ''} ${
                showResult && index === quiz.correctAnswer ? 'correct' : ''
              } ${showResult && selectedAnswer === index && index !== quiz.correctAnswer ? 'incorrect' : ''}`}
              style={{
                padding: '15px',
                borderRadius: '8px',
                border: '2px solid',
                borderColor: selectedAnswer === index
                  ? '#3B82F6'
                  : showResult && index === quiz.correctAnswer
                    ? '#10B981'
                    : showResult && selectedAnswer === index && index !== quiz.correctAnswer
                      ? '#EF4444'
                      : '#E5E7EB',
                backgroundColor: selectedAnswer === index
                  ? 'rgba(59, 130, 246, 0.1)'
                  : showResult && index === quiz.correctAnswer
                    ? 'rgba(16, 185, 129, 0.1)'
                    : showResult && selectedAnswer === index && index !== quiz.correctAnswer
                      ? 'rgba(239, 68, 68, 0.1)'
                      : 'white',
                cursor: showResult ? 'default' : 'pointer',
              }}
              onClick={() => !showResult && handleSelectAnswer(index)}
            >
              {option}
            </div>
          ))}
        </div>
        
        {!showResult ? (
          <button
            onClick={handleCheckAnswer}
            disabled={selectedAnswer === null}
          >
            Verificar Resposta
          </button>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div
              className="quiz-result"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                borderRadius: '10px',
                backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: `2px solid ${isCorrect ? '#10B981' : '#EF4444'}`,
              }}
            >
              {isCorrect ? (
                <>
                  <Award size={40} color="#10B981" />
                  <h3
                    style={{
                      fontSize: '20px',
                      color: '#10B981',
                      marginTop: '10px',
                    }}
                  >
                    Correto!
                  </h3>
                  <p
                    style={{
                      textAlign: 'center',
                      marginTop: '10px',
                    }}
                  >
                    Você ganhou {quiz.points || 10} pontos de conhecimento!
                  </p>
                </>
              ) : (
                <>
                  <div
                    style={{
                      fontSize: '40px',
                    }}
                  >
                    ❌
                  </div>
                  <h3
                    style={{
                      fontSize: '20px',
                      color: '#EF4444',
                      marginTop: '10px',
                    }}
                  >
                    Incorreto
                  </h3>
                  <p
                    style={{
                      textAlign: 'center',
                      marginTop: '10px',
                    }}
                  >
                    A resposta correta era: {quiz.options[quiz.correctAnswer]}
                  </p>
                </>
              )}
            </div>
            
            <button
              onClick={handleComplete}
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div
      className="historical-interlude"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="interlude-container"
        style={{
          width: '80%',
          maxWidth: '900px',
          height: '80%',
          backgroundColor: 'white',
          borderRadius: '15px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          className="interlude-header"
          style={{
            backgroundColor: '#F3F4F6',
            padding: '15px 20px',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '20px',
              color: '#111827',
              margin: 0,
            }}
          >
            Encontro Histórico
          </h1>
          
          <button
            variant="outline"
            size="sm"
            onClick={handleComplete}
          >
            Fechar
          </button>
        </div>
        
        <div
          className="interlude-content"
          style={{
            flex: 1,
            overflow: 'auto',
          }}
        >
          {!showQuiz ? renderDialogue() : renderQuiz()}
        </div>
      </div>
    </div>
  );
}

