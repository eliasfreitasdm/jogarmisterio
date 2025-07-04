import React, { useState, useEffect } from 'react';
import { ChevronRight, Award, BookOpen, Map } from 'lucide-react';

// Componente para a conclusão narrativa
export default function NarrativeConclusion({
  playerName = 'Aventureiro',
  knowledge = 0,
  maxKnowledge = 100,
  itemsCollected = [],
  totalItems = 0,
  areasExplored = [],
  totalAreas = 4,
  achievements = [],
  onRestart,
  onExit
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showCredits, setShowCredits] = useState(false);
  
  // Calcular porcentagem de conclusão
  const completionPercent = Math.round((knowledge / maxKnowledge) * 100);
  const itemsPercent = Math.round((itemsCollected.length / totalItems) * 100);
  const areasPercent = Math.round((areasExplored.length / totalAreas) * 100);
  
  // Determinar classificação com base na porcentagem de conclusão
  const getRank = () => {
    const avgPercent = (completionPercent + itemsPercent + areasPercent) / 3;
    
    if (avgPercent >= 90) return { title: 'Mestre Historiador', description: 'Você dominou completamente a história de Boa Vista!' };
    if (avgPercent >= 75) return { title: 'Historiador Experiente', description: 'Seu conhecimento sobre Boa Vista é impressionante!' };
    if (avgPercent >= 50) return { title: 'Aprendiz de História', description: 'Você aprendeu muito sobre Boa Vista, mas ainda há mais a descobrir.' };
    return { title: 'Turista Curioso', description: 'Você começou sua jornada pelo conhecimento de Boa Vista.' };
  };
  
  const rank = getRank();
  
  // Avançar para o próximo passo
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowCredits(true);
    }
  };
  
  // Renderizar passo atual
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderSummary();
      case 1:
        return renderAchievements();
      case 2:
        return renderCollectibles();
      case 3:
        return renderFinalWords();
      default:
        return null;
    }
  };
  
  // Renderizar resumo
  const renderSummary = () => {
    return (
      <div className="conclusion-summary">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Jornada Completa!
        </h2>
        
        <div className="bg-blue-50 rounded-xl p-6 mb-6">
          <p className="text-lg mb-4">
            Parabéns, <span className="font-bold">{playerName}</span>! Você completou sua jornada através da história de Boa Vista, desde a fazenda original até a moderna capital de Roraima.
          </p>
          
          <p className="text-lg mb-4">
            Durante sua aventura, você explorou {areasExplored.length} de {totalAreas} áreas históricas, coletou {itemsCollected.length} de {totalItems} artefatos históricos, e acumulou {knowledge} pontos de conhecimento.
          </p>
          
          <div className="bg-white rounded-lg p-4 border border-blue-200 mb-4">
            <h3 className="text-xl font-bold text-blue-700 mb-2">
              Seu Título: {rank.title}
            </h3>
            <p>{rank.description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-amber-50 rounded-lg p-4 text-center">
            <BookOpen className="mx-auto mb-2" size={32} color="#B45309" />
            <div className="text-2xl font-bold text-amber-700">{knowledge}</div>
            <div className="text-sm text-amber-600">Pontos de Conhecimento</div>
            <div className="w-full bg-amber-200 rounded-full h-2 mt-2">
              <div
                className="bg-amber-500 h-2 rounded-full"
                style={{ width: `${completionPercent}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-emerald-50 rounded-lg p-4 text-center">
            <Award className="mx-auto mb-2" size={32} color="#047857" />
            <div className="text-2xl font-bold text-emerald-700">{itemsCollected.length}/{totalItems}</div>
            <div className="text-sm text-emerald-600">Artefatos Coletados</div>
            <div className="w-full bg-emerald-200 rounded-full h-2 mt-2">
              <div
                className="bg-emerald-500 h-2 rounded-full"
                style={{ width: `${itemsPercent}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <Map className="mx-auto mb-2" size={32} color="#7E22CE" />
            <div className="text-2xl font-bold text-purple-700">{areasExplored.length}/{totalAreas}</div>
            <div className="text-sm text-purple-600">Áreas Exploradas</div>
            <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${areasPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Renderizar conquistas
  const renderAchievements = () => {
    return (
      <div className="conclusion-achievements">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">
          Suas Conquistas
        </h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {achievements.map((achievement, index) => (
            <div
              key={`achievement-${index}`}
              className="bg-white rounded-lg p-4 border border-purple-200 flex items-center"
            >
              <div
                className="achievement-icon mr-4 bg-purple-100 rounded-full p-3"
                style={{
                  color: achievement.color || '#7E22CE',
                }}
              >
                {achievement.icon || '🏆'}
              </div>
              <div>
                <h3 className="font-bold text-purple-900">{achievement.title}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            </div>
          ))}
          
          {achievements.length === 0 && (
            <div className="col-span-2 text-center py-8 bg-purple-50 rounded-lg">
              <p className="text-lg text-purple-700">Continue explorando para desbloquear conquistas!</p>
            </div>
          )}
        </div>
        
        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-purple-800 mb-2">Próximos Desafios</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encontre todos os artefatos históricos escondidos em cada época</li>
            <li>Complete todos os desafios de conhecimento com 100% de acertos</li>
            <li>Desbloqueie todos os personagens históricos para diálogos especiais</li>
            <li>Explore todas as áreas secretas em cada época histórica</li>
          </ul>
        </div>
      </div>
    );
  };
  
  // Renderizar colecionáveis
  const renderCollectibles = () => {
    return (
      <div className="conclusion-collectibles">
        <h2 className="text-3xl font-bold mb-6 text-center text-emerald-800">
          Artefatos Históricos
        </h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6 max-h-96 overflow-y-auto pr-2">
          {itemsCollected.map((item, index) => (
            <div
              key={`item-${index}`}
              className="bg-white rounded-lg p-4 border border-emerald-200 flex items-start"
            >
              <div
                className="item-icon mr-4 bg-emerald-100 rounded-full p-3 text-2xl"
              >
                {item.type === 'document' ? '📜' : item.type === 'artifact' ? '🏺' : '🔍'}
              </div>
              <div>
                <h3 className="font-bold text-emerald-900">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                <div className="text-xs text-emerald-600 font-semibold">+{item.points} pontos</div>
              </div>
            </div>
          ))}
          
          {itemsCollected.length === 0 && (
            <div className="col-span-2 text-center py-8 bg-emerald-50 rounded-lg">
              <p className="text-lg text-emerald-700">Nenhum artefato coletado ainda. Continue explorando!</p>
            </div>
          )}
        </div>
        
        <div className="bg-emerald-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-emerald-800 mb-2">Coleção de Artefatos</h3>
          <p className="mb-2">
            Você coletou {itemsCollected.length} de {totalItems} artefatos históricos ({itemsPercent}% completo).
          </p>
          <div className="w-full bg-emerald-200 rounded-full h-4 mb-4">
            <div
              className="bg-emerald-500 h-4 rounded-full transition-all duration-1000"
              style={{ width: `${itemsPercent}%` }}
            ></div>
          </div>
          <p className="text-sm text-emerald-700">
            {itemsPercent < 100 
              ? `Ainda faltam ${totalItems - itemsCollected.length} artefatos para completar sua coleção!` 
              : 'Parabéns! Você completou sua coleção de artefatos históricos!'}
          </p>
        </div>
      </div>
    );
  };
  
  // Renderizar palavras finais
  const renderFinalWords = () => {
    return (
      <div className="conclusion-final-words">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Uma Nova Aventura Aguarda
        </h2>
        
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 mb-6 text-center">
          <p className="text-xl mb-6">
            Sua jornada pela história de Boa Vista pode ter chegado ao fim, mas o conhecimento que você adquiriu permanecerá para sempre.
          </p>
          
          <p className="text-lg mb-6">
            Esperamos que esta aventura tenha despertado seu interesse pela rica história de Roraima e sua capital, Boa Vista.
          </p>
          
          <div className="inline-block bg-white rounded-lg p-6 border border-blue-200 mb-6">
            <h3 className="text-2xl font-bold text-blue-700 mb-2">
              {rank.title}
            </h3>
            <p className="text-lg">{rank.description}</p>
          </div>
          
          <p className="text-lg">
            Que tal compartilhar seu conhecimento com amigos e familiares? Ou talvez iniciar uma nova aventura para descobrir mais segredos?
          </p>
        </div>
        
        <div className="bg-blue-800 text-white rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Próxima Aventura</h3>
          <p className="mb-4">
            Em breve: "Lendas de Roraima" - Uma nova aventura explorando os mitos e lendas da região amazônica!
          </p>
        </div>
      </div>
    );
  };
  
  // Renderizar créditos
  const renderCredits = () => {
    return (
      <div
        className="conclusion-credits"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          className="credits-content"
          style={{
            animation: 'scrollCredits 60s linear',
          }}
        >
          <h1
            style={{
              fontSize: '36px',
              marginBottom: '40px',
            }}
          >
            Mistérios de Roraima
          </h1>
          
          <div
            style={{
              marginBottom: '60px',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                marginBottom: '20px',
              }}
            >
              Desenvolvimento
            </h2>
            <p
              style={{
                fontSize: '18px',
                marginBottom: '10px',
              }}
            >
              Equipe Manus
            </p>
          </div>
          
          <div
            style={{
              marginBottom: '60px',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                marginBottom: '20px',
              }}
            >
              Pesquisa Histórica
            </h2>
            <p
              style={{
                fontSize: '18px',
                marginBottom: '10px',
              }}
            >
              Baseado em documentos históricos e relatos sobre Boa Vista e Roraima
            </p>
          </div>
          
          <div
            style={{
              marginBottom: '60px',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                marginBottom: '20px',
              }}
            >
              Arte e Design
            </h2>
            <p
              style={{
                fontSize: '18px',
                marginBottom: '10px',
              }}
            >
              Ilustrações e design de personagens por IA
            </p>
            <p
              style={{
                fontSize: '18px',
                marginBottom: '10px',
              }}
            >
              Design de interface por Equipe Manus
            </p>
          </div>
          
          <div
            style={{
              marginBottom: '60px',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                marginBottom: '20px',
              }}
            >
              Agradecimentos Especiais
            </h2>
            <p
              style={{
                fontSize: '18px',
                marginBottom: '10px',
              }}
            >
              A todos os historiadores e pesquisadores de Roraima
            </p>
            <p
              style={{
                fontSize: '18px',
                marginBottom: '10px',
              }}
            >
              Ao povo de Boa Vista por preservar sua rica história
            </p>
          </div>
          
          <div
            style={{
              marginBottom: '60px',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                marginBottom: '20px',
              }}
            >
              © 2025 Mistérios de Roraima
            </h2>
            <p
              style={{
                fontSize: '18px',
                marginBottom: '40px',
              }}
            >
              Todos os direitos reservados
            </p>
          </div>
          
          <div
            style={{
              marginBottom: '100px',
            }}
          >
            <p
              style={{
                fontSize: '20px',
              }}
            >
              Obrigado por jogar!
            </p>
          </div>
        </div>
        
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            display: 'flex',
            gap: '10px',
          }}
        >
          <button
            onClick={onRestart}
          >
            Jogar Novamente
          </button>
          
          <button
            variant="outline"
            onClick={onExit}
          >
            Sair
          </button>
        </div>
        
        <style jsx>{`
          @keyframes scrollCredits {
            0% {
              transform: translateY(100%);
            }
            100% {
              transform: translateY(-100%);
            }
          }
        `}</style>
      </div>
    );
  };
  
  return (
    <div
      className="narrative-conclusion"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        zIndex: 1000,
        overflow: 'hidden',
      }}
    >
      {!showCredits ? (
        <div
          className="conclusion-container"
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '40px 20px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            className="conclusion-header"
            style={{
              marginBottom: '20px',
            }}
          >
            <h1
              className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Mistérios de Roraima
            </h1>
          </div>
          
          <div
            className="conclusion-content"
            style={{
              flex: 1,
              overflow: 'auto',
            }}
          >
            {renderCurrentStep()}
          </div>
          
          <div
            className="conclusion-footer"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid #E5E7EB',
            }}
          >
            <div
              className="step-indicator"
              style={{
                display: 'flex',
                gap: '5px',
              }}
            >
              {[0, 1, 2, 3].map((step) => (
                <div
                  key={`step-${step}`}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: step === currentStep ? '#3B82F6' : '#E5E7EB',
                  }}
                />
              ))}
            </div>
            
            <div
              className="action-buttons"
              style={{
                display: 'flex',
                gap: '10px',
              }}
            >
              <button
                variant="outline"
                onClick={onExit}
              >
                Menu Principal
              </button>
              
              <button
                onClick={handleNextStep}
              >
                {currentStep < 3 ? (
                  <>
                    Próximo <ChevronRight size={16} />
                  </>
                ) : (
                  'Ver Créditos'
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        renderCredits()
      )}
    </div>
  );
}

