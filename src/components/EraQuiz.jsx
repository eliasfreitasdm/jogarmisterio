import React, { useState } from 'react';

// Componente de questionário obrigatório entre eras
export default function EraQuiz({ era, onComplete, onClose }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // Questionários por era
  const quizzes = {
    'fazenda_1830': {
      title: 'Questionário: Fazenda Boa Vista (1830)',
      questions: [
        {
          question: 'Qual era a principal atividade econômica da Fazenda Boa Vista em 1830?',
          options: [
            'Mineração de ouro',
            'Criação de gado',
            'Plantação de café',
            'Pesca no rio'
          ],
          correct: 1,
          explanation: 'A criação de gado era a principal atividade da Fazenda Boa Vista, que foi fundamental para o desenvolvimento da região.'
        },
        {
          question: 'Quem foi o fundador da Fazenda Boa Vista?',
          options: [
            'Inácio Lopes de Magalhães',
            'José de Barros',
            'Manuel da Silva',
            'Antonio Pereira'
          ],
          correct: 0,
          explanation: 'Inácio Lopes de Magalhães foi o fundador da Fazenda Boa Vista, estabelecendo as bases para o futuro desenvolvimento da cidade.'
        },
        {
          question: 'Em que rio estava localizada a Fazenda Boa Vista?',
          options: [
            'Rio Negro',
            'Rio Amazonas',
            'Rio Branco',
            'Rio Solimões'
          ],
          correct: 2,
          explanation: 'A Fazenda Boa Vista estava estrategicamente localizada às margens do Rio Branco, facilitando o transporte e o comércio.'
        }
      ]
    }
  };

  const currentQuiz = quizzes[era?.id] || quizzes['fazenda_1830'];
  const questions = currentQuiz.questions;
  const totalQuestions = questions.length;

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Calcular pontuação final
      const finalScore = newAnswers.reduce((score, answer, index) => {
        return score + (answer === questions[index].correct ? 1 : 0);
      }, 0);
      setScore(finalScore);
      setShowResult(true);
    }
  };

  const handleComplete = () => {
    const passed = score >= Math.ceil(totalQuestions * 0.6); // 60% para passar
    onComplete(passed, score, totalQuestions);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setScore(0);
  };

  if (showResult) {
    const passed = score >= Math.ceil(totalQuestions * 0.6);
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '500px',
          width: '100%',
          border: '2px solid #FFD700',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>
            {passed ? '🎉' : '😔'}
          </div>
          
          <h2 style={{ color: '#FFD700', fontSize: '28px', marginBottom: '20px', fontWeight: 'bold' }}>
            {passed ? 'Parabéns!' : 'Que pena!'}
          </h2>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ color: 'white', fontSize: '36px', fontWeight: 'bold' }}>
              {score}/{totalQuestions}
            </div>
            <div style={{ color: '#FFD700', fontSize: '18px', marginTop: '5px' }}>
              {percentage}%
            </div>
          </div>
          
          <p style={{ color: '#E0E0E0', fontSize: '16px', lineHeight: 1.5, marginBottom: '30px' }}>
            {passed 
              ? 'Você demonstrou conhecimento suficiente sobre esta era histórica e pode avançar para a próxima!'
              : 'Você precisa de pelo menos 60% de acertos para avançar. Que tal tentar novamente?'
            }
          </p>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {passed ? (
              <button 
                onClick={handleComplete}
                style={{
                  background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Avançar para Próxima Era
              </button>
            ) : (
              <>
                <button 
                  onClick={handleRetry}
                  style={{
                    background: 'linear-gradient(45deg, #2196F3, #1976D2)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Tentar Novamente
                </button>
                <button 
                  onClick={onClose}
                  style={{
                    background: 'linear-gradient(45deg, #757575, #616161)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Voltar ao Jogo
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        borderRadius: '20px',
        padding: '30px',
        maxWidth: '600px',
        width: '100%',
        border: '2px solid #FFD700',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: '#FFD700', fontSize: '24px', marginBottom: '10px', fontWeight: 'bold' }}>
            {currentQuiz.title}
          </h2>
          <div style={{ color: '#E0E0E0', fontSize: '14px', marginBottom: '15px' }}>
            Pergunta {currentQuestion + 1} de {totalQuestions}
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #FFD700, #FFA500)',
              width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{
            color: 'white',
            fontSize: '20px',
            lineHeight: 1.4,
            marginBottom: '25px',
            textAlign: 'center'
          }}>
            {questions[currentQuestion].question}
          </h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px 20px',
                background: selectedAnswer === index 
                  ? 'rgba(255, 215, 0, 0.2)' 
                  : 'rgba(255, 255, 255, 0.1)',
                border: selectedAnswer === index 
                  ? '2px solid #FFD700' 
                  : '2px solid transparent',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                color: 'white',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{
                background: '#FFD700',
                color: '#1a1a2e',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                marginRight: '15px',
                flexShrink: 0
              }}>
                {String.fromCharCode(65 + index)}
              </span>
              <span style={{ lineHeight: 1.3 }}>{option}</span>
            </button>
          ))}
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            style={{
              background: selectedAnswer !== null 
                ? 'linear-gradient(45deg, #4CAF50, #45a049)' 
                : '#666',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed',
              opacity: selectedAnswer !== null ? 1 : 0.6
            }}
          >
            {currentQuestion < totalQuestions - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
}

