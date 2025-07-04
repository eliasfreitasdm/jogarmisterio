import React, { useState } from 'react';
import { X } from 'lucide-react';

// Componente para desafios variados (puzzles, minijogos, etc.)
export default function Challenge({
  type,
  title,
  description,
  data,
  era,
  onComplete,
  onClose
}) {
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  
  // Renderizar conteúdo com base no tipo de desafio
  const renderChallengeContent = () => {
    switch (type) {
      case 'quiz':
        return renderQuiz();
      case 'memory':
        return renderMemoryGame();
      case 'puzzle':
        return renderPuzzle();
      case 'sequence':
        return renderSequenceGame();
      default:
        return (
          <div className="text-center py-8 text-gray-500">
            Tipo de desafio não reconhecido.
          </div>
        );
    }
  };
  
  // Renderizar quiz de múltipla escolha
  const renderQuiz = () => {
    const { question, options, correctAnswer, explanation } = data;
    
    const handleSubmit = () => {
      setAttempts(attempts + 1);
      
      if (selectedOption === correctAnswer) {
        setFeedback('Correto! ' + explanation);
        setIsCompleted(true);
        
        if (onComplete) {
          onComplete(Math.max(10 - attempts * 2, 5)); // Pontos baseados em tentativas
        }
      } else {
        setFeedback('Incorreto. Tente novamente!');
      }
    };
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800">{question}</h3>
        
        <div className="space-y-3">
          {options.map((option, index) => (
            <div
              key={`option-${index}`}
              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                selectedOption === index
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-white border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setSelectedOption(index)}
            >
              {option}
            </div>
          ))}
        </div>
        
        {feedback && (
          <div className={`p-4 rounded-lg ${isCompleted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {feedback}
          </div>
        )}
        
        <div className="flex justify-between">
          <button
            variant="outline"
            onClick={onClose}
          >
            Cancelar
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className={isCompleted ? 'bg-green-500 hover:bg-green-600' : ''}
          >
            {isCompleted ? 'Concluído' : 'Responder'}
          </button>
        </div>
      </div>
    );
  };
  
  // Renderizar jogo da memória
  const renderMemoryGame = () => {
    const { pairs, theme } = data;
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [isChecking, setIsChecking] = useState(false);
    
    const handleCardClick = (index) => {
      // Ignorar cliques durante verificação ou em cartas já viradas/combinadas
      if (
        isChecking ||
        flippedCards.includes(index) ||
        matchedPairs.includes(pairs[index].id)
      ) {
        return;
      }
      
      // Virar a carta
      const newFlippedCards = [...flippedCards, index];
      setFlippedCards(newFlippedCards);
      
      // Se duas cartas estiverem viradas, verificar se são um par
      if (newFlippedCards.length === 2) {
        setIsChecking(true);
        
        const [firstIndex, secondIndex] = newFlippedCards;
        const firstCard = pairs[firstIndex];
        const secondCard = pairs[secondIndex];
        
        if (firstCard.id === secondCard.id) {
          // Par encontrado
          setMatchedPairs([...matchedPairs, firstCard.id]);
          setFlippedCards([]);
          setIsChecking(false);
          
          // Verificar se o jogo foi concluído
          if (matchedPairs.length + 1 === pairs.length / 2) {
            setIsCompleted(true);
            setFeedback('Parabéns! Você completou o jogo da memória!');
            
            if (onComplete) {
              onComplete(15); // Pontos fixos para o jogo da memória
            }
          }
        } else {
          // Não é um par, virar as cartas de volta
          setTimeout(() => {
            setFlippedCards([]);
            setIsChecking(false);
          }, 1000);
        }
      }
    };
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800">Jogo da Memória: {theme}</h3>
        
        <div className="grid grid-cols-4 gap-3">
          {pairs.map((card, index) => (
            <div
              key={`card-${index}`}
              className={`aspect-square rounded-lg cursor-pointer transition-all transform ${
                flippedCards.includes(index) || matchedPairs.includes(card.id)
                  ? 'rotate-y-0'
                  : 'rotate-y-180 bg-amber-500'
              }`}
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.5s',
              }}
              onClick={() => handleCardClick(index)}
            >
              <div
                className={`w-full h-full flex items-center justify-center text-2xl ${
                  flippedCards.includes(index) || matchedPairs.includes(card.id)
                    ? 'opacity-100'
                    : 'opacity-0'
                }`}
              >
                {card.content}
              </div>
            </div>
          ))}
        </div>
        
        {feedback && (
          <div className="p-4 rounded-lg bg-green-100 text-green-800">
            {feedback}
          </div>
        )}
        
        <div className="flex justify-between">
          <button
            variant="outline"
            onClick={onClose}
          >
            Cancelar
          </button>
          
          {isCompleted && (
            <button
              onClick={onClose}
              className="bg-green-500 hover:bg-green-600"
            >
              Concluído
            </button>
          )}
        </div>
      </div>
    );
  };
  
  // Renderizar puzzle ambiental
  const renderPuzzle = () => {
    const { instructions, solution, hints } = data;
    const [currentHint, setCurrentHint] = useState(0);
    
    const handleSubmit = () => {
      setAttempts(attempts + 1);
      
      if (userAnswer.toLowerCase() === solution.toLowerCase()) {
        setFeedback('Correto! Você resolveu o puzzle!');
        setIsCompleted(true);
        
        if (onComplete) {
          onComplete(Math.max(15 - attempts * 2, 5)); // Pontos baseados em tentativas
        }
      } else {
        setFeedback('Incorreto. Tente novamente!');
        
        // Mostrar próxima dica após 2 tentativas
        if (attempts % 2 === 1 && currentHint < hints.length - 1) {
          setCurrentHint(currentHint + 1);
        }
      }
    };
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        
        <div className="p-4 bg-amber-50 rounded-lg">
          <p className="text-gray-800">{instructions}</p>
        </div>
        
        {attempts > 0 && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-2">Dicas:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {hints.slice(0, currentHint + 1).map((hint, index) => (
                <li key={`hint-${index}`} className="text-blue-700">
                  {hint}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sua resposta:
          </label>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Digite sua resposta aqui..."
          />
        </div>
        
        {feedback && (
          <div className={`p-4 rounded-lg ${isCompleted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {feedback}
          </div>
        )}
        
        <div className="flex justify-between">
          <button
            variant="outline"
            onClick={onClose}
          >
            Cancelar
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={!userAnswer.trim()}
            className={isCompleted ? 'bg-green-500 hover:bg-green-600' : ''}
          >
            {isCompleted ? 'Concluído' : 'Verificar'}
          </button>
        </div>
      </div>
    );
  };
  
  // Renderizar jogo de sequência
  const renderSequenceGame = () => {
    const { sequence, description, targetLength } = data;
    const [userSequence, setUserSequence] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    
    const handleStart = () => {
      setIsPlaying(true);
      setUserSequence([]);
      setCurrentStep(0);
      
      // Mostrar a sequência
      const showSequence = (step) => {
        if (step >= sequence.length) {
          setIsPlaying(false);
          return;
        }
        
        setTimeout(() => {
          setCurrentStep(step);
          setTimeout(() => {
            setCurrentStep(-1);
            setTimeout(() => {
              showSequence(step + 1);
            }, 300);
          }, 700);
        }, 500);
      };
      
      showSequence(0);
    };
    
    const handleItemClick = (index) => {
      if (isPlaying) return;
      
      const newSequence = [...userSequence, index];
      setUserSequence(newSequence);
      
      // Verificar se a sequência está correta até agora
      if (newSequence[newSequence.length - 1] !== sequence[newSequence.length - 1]) {
        setFeedback('Sequência incorreta! Tente novamente.');
        setAttempts(attempts + 1);
        setTimeout(() => {
          setUserSequence([]);
        }, 1000);
        return;
      }
      
      // Verificar se a sequência foi completada
      if (newSequence.length === targetLength) {
        setFeedback('Parabéns! Você completou a sequência corretamente!');
        setIsCompleted(true);
        
        if (onComplete) {
          onComplete(Math.max(20 - attempts * 3, 5)); // Pontos baseados em tentativas
        }
      }
    };
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        
        <div className="p-4 bg-amber-50 rounded-lg">
          <p className="text-gray-800">{description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={`seq-${index}`}
              className={`aspect-square rounded-lg cursor-pointer transition-all ${
                currentStep === index
                  ? 'bg-yellow-400 scale-110'
                  : userSequence.includes(index) && userSequence[userSequence.length - 1] === index
                  ? 'bg-blue-400'
                  : `bg-${['red', 'green', 'blue', 'purple'][index]}-500`
              }`}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </div>
        
        <div className="flex justify-center">
          <div className="bg-gray-100 px-4 py-2 rounded-lg">
            Sequência: {userSequence.length} / {targetLength}
          </div>
        </div>
        
        {feedback && (
          <div className={`p-4 rounded-lg ${isCompleted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {feedback}
          </div>
        )}
        
        <div className="flex justify-between">
          <button
            variant="outline"
            onClick={onClose}
          >
            Cancelar
          </button>
          
          {!isCompleted ? (
            <button
              onClick={handleStart}
              disabled={isPlaying}
            >
              {isPlaying ? 'Observando...' : 'Mostrar Sequência'}
            </button>
          ) : (
            <button
              onClick={onClose}
              className="bg-green-500 hover:bg-green-600"
            >
              Concluído
            </button>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-500">{era.name}</p>
          </div>
          <button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {renderChallengeContent()}
      </div>
    </div>
  );
}

