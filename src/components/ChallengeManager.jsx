import React, { useState, useEffect } from 'react';
import Challenge from './Challenge';

// Dados de desafios para cada era
const CHALLENGES_DATA = {
  fazenda_1830: [
    {
      type: 'quiz',
      title: 'Origens de Boa Vista',
      description: 'Teste seus conhecimentos sobre a fundação da Fazenda Boa Vista',
      data: {
        question: 'Em que ano Inácio Lopes de Magalhães fundou a Fazenda Boa Vista?',
        options: [
          'A) 1800',
          'B) 1830',
          'C) 1845',
          'D) 1858'
        ],
        correctAnswer: 1,
        explanation: 'A Fazenda Boa Vista foi fundada em 1830 por Inácio Lopes de Magalhães, sendo o marco inicial do que viria a se tornar a cidade.'
      }
    },
    {
      type: 'puzzle',
      title: 'O Mistério do Rio',
      description: 'Decifre o enigma sobre o Rio Branco',
      data: {
        instructions: 'O Rio Branco foi fundamental para o desenvolvimento da região. Decifre o enigma: "Sou a via que traz vida, meu nome contradiz minha cor, mas represento a esperança que flui. O que sou?"',
        solution: 'Rio Branco',
        hints: [
          'É uma via de transporte natural',
          'Seu nome tem relação com uma cor',
          'Foi essencial para o comércio e comunicação na região'
        ]
      }
    },
    {
      type: 'memory',
      title: 'Memória da Fazenda',
      description: 'Encontre os pares relacionados à vida na fazenda',
      data: {
        theme: 'Vida na Fazenda (1830)',
        pairs: [
          { id: 1, content: '🐄' },
          { id: 1, content: '🥛' },
          { id: 2, content: '🌱' },
          { id: 2, content: '🌿' },
          { id: 3, content: '🏠' },
          { id: 3, content: '🛖' },
          { id: 4, content: '🐎' },
          { id: 4, content: '🐴' },
          { id: 5, content: '🌽' },
          { id: 5, content: '🍚' },
          { id: 6, content: '🔥' },
          { id: 6, content: '🪵' }
        ]
      }
    }
  ],
  vila_1900: [
    {
      type: 'quiz',
      title: 'Vila de Boa Vista',
      description: 'Teste seus conhecimentos sobre a Vila de Boa Vista',
      data: {
        question: 'Qual evento elevou Boa Vista à categoria de vila?',
        options: [
          'A) Construção da primeira igreja',
          'B) Decreto do Imperador D. Pedro II',
          'C) Lei Provincial do Amazonas',
          'D) Chegada dos primeiros comerciantes'
        ],
        correctAnswer: 2,
        explanation: 'Boa Vista foi elevada à categoria de vila por meio da Lei Provincial do Amazonas em 1890.'
      }
    },
    {
      type: 'sequence',
      title: 'Sequência do Desenvolvimento',
      description: 'Repita a sequência que representa o desenvolvimento da vila',
      data: {
        sequence: [0, 1, 3, 2, 0, 1],
        description: 'Observe e repita a sequência que representa as etapas de desenvolvimento da Vila de Boa Vista.',
        targetLength: 6
      }
    },
    {
      type: 'puzzle',
      title: 'O Enigma do Comércio',
      description: 'Decifre o enigma sobre o comércio na vila',
      data: {
        instructions: 'O comércio fluvial foi essencial para o crescimento da vila. Complete a frase: "Navegando pelo _____, os comerciantes traziam mercadorias de Manaus para a vila."',
        solution: 'Rio Branco',
        hints: [
          'É o principal rio da região',
          'Seu nome é também uma cor',
          'Conecta Boa Vista a Manaus'
        ]
      }
    }
  ],
  capital_1940: [
    {
      type: 'quiz',
      title: 'Capital do Território',
      description: 'Teste seus conhecimentos sobre Boa Vista como capital',
      data: {
        question: 'Quem foi o engenheiro responsável pelo planejamento urbano radial de Boa Vista?',
        options: [
          'A) Darcy Aleixo Derenusson',
          'B) Getúlio Vargas',
          'C) Ene Garcez',
          'D) Inácio Lopes de Magalhães'
        ],
        correctAnswer: 0,
        explanation: 'O engenheiro civil Darcy Aleixo Derenusson foi o responsável pelo planejamento urbano radial de Boa Vista, inspirado no modelo de Paris.'
      }
    },
    {
      type: 'puzzle',
      title: 'O Plano Radial',
      description: 'Decifre o enigma sobre o planejamento urbano',
      data: {
        instructions: 'O planejamento urbano de Boa Vista seguiu um modelo específico. Qual cidade europeia inspirou esse modelo?',
        solution: 'Paris',
        hints: [
          'É conhecida como a Cidade Luz',
          'Tem uma famosa torre de ferro',
          'Capital da França'
        ]
      }
    },
    {
      type: 'memory',
      title: 'Memória Administrativa',
      description: 'Encontre os pares relacionados à administração do território',
      data: {
        theme: 'Administração Territorial (1940)',
        pairs: [
          { id: 1, content: '🏛️' },
          { id: 1, content: '📜' },
          { id: 2, content: '👨‍⚖️' },
          { id: 2, content: '⚖️' },
          { id: 3, content: '🏢' },
          { id: 3, content: '🏫' },
          { id: 4, content: '🚔' },
          { id: 4, content: '👮' },
          { id: 5, content: '📝' },
          { id: 5, content: '📋' },
          { id: 6, content: '🗺️' },
          { id: 6, content: '🧭' }
        ]
      }
    }
  ],
  boa_vista_moderna: [
    {
      type: 'quiz',
      title: 'Boa Vista Contemporânea',
      description: 'Teste seus conhecimentos sobre a Boa Vista moderna',
      data: {
        question: 'Em que ano Roraima foi elevado à categoria de Estado?',
        options: [
          'A) 1962',
          'B) 1975',
          'C) 1988',
          'D) 1995'
        ],
        correctAnswer: 2,
        explanation: 'Roraima foi elevado à categoria de Estado pela Constituição Federal de 1988, deixando de ser um Território Federal.'
      }
    },
    {
      type: 'sequence',
      title: 'Sequência do Desenvolvimento Moderno',
      description: 'Repita a sequência que representa o desenvolvimento moderno de Boa Vista',
      data: {
        sequence: [2, 0, 3, 1, 2, 0, 3],
        description: 'Observe e repita a sequência que representa as etapas do desenvolvimento moderno de Boa Vista.',
        targetLength: 7
      }
    },
    {
      type: 'puzzle',
      title: 'O Cartão Postal',
      description: 'Decifre o enigma sobre o cartão postal de Boa Vista',
      data: {
        instructions: 'Qual é o nome do principal cartão postal de Boa Vista, uma orla às margens do Rio Branco?',
        solution: 'Orla Taumanan',
        hints: [
          'É uma área de lazer às margens do Rio Branco',
          'Seu nome tem origem indígena',
          'Foi inaugurada no início dos anos 2000'
        ]
      }
    }
  ]
};

// Componente para gerenciar desafios no jogo
export default function ChallengeManager({
  era,
  onChallengeComplete,
  onClose
}) {
  // Estado dos desafios
  const [availableChallenges, setAvailableChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  
  // Carregar desafios disponíveis para a era atual
  useEffect(() => {
    if (era && era.id) {
      const challenges = CHALLENGES_DATA[era.id] || [];
      setAvailableChallenges(challenges);
    }
  }, [era]);
  
  // Iniciar um desafio
  const startChallenge = (challenge) => {
    setCurrentChallenge(challenge);
  };
  
  // Completar um desafio
  const handleChallengeComplete = (points) => {
    if (currentChallenge) {
      // Adicionar à lista de desafios completados
      setCompletedChallenges([...completedChallenges, currentChallenge]);
      
      // Notificar o componente pai
      if (onChallengeComplete) {
        onChallengeComplete(points);
      }
      
      // Fechar o desafio atual após um breve delay
      setTimeout(() => {
        setCurrentChallenge(null);
      }, 2000);
    }
  };
  
  // Fechar o desafio atual
  const handleCloseChallenge = () => {
    setCurrentChallenge(null);
  };
  
  // Fechar o gerenciador de desafios
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl p-8 shadow-2xl">
        {currentChallenge ? (
          <Challenge
            {...currentChallenge}
            era={era}
            onComplete={handleChallengeComplete}
            onClose={handleCloseChallenge}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Desafios de {era.name}</h2>
                <p className="text-sm text-gray-500">Escolha um desafio para testar seus conhecimentos</p>
              </div>
              <button variant="ghost" onClick={handleClose}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {availableChallenges.map((challenge, index) => {
                const isCompleted = completedChallenges.some(
                  (c) => c.title === challenge.title && c.type === challenge.type
                );
                
                return (
                  <div
                    key={`challenge-${index}`}
                    className={`p-4 border rounded-xl cursor-pointer transition-all ${
                      isCompleted
                        ? 'bg-green-50 border-green-300'
                        : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                    onClick={() => !isCompleted && startChallenge(challenge)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">
                        {challenge.type === 'quiz' ? '❓' :
                         challenge.type === 'puzzle' ? '🧩' :
                         challenge.type === 'memory' ? '🎮' :
                         challenge.type === 'sequence' ? '📋' : '🎯'}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 flex items-center">
                          {challenge.title}
                          {isCompleted && (
                            <span className="ml-2 text-green-600">✓</span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-between">
              <div className="text-sm text-gray-500">
                Desafios completados: {completedChallenges.length} / {availableChallenges.length}
              </div>
              
              <button
                variant="outline"
                onClick={handleClose}
              >
                Fechar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

