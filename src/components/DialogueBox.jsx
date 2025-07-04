import React, { useState, useEffect } from 'react';

// Componente para diálogos educativos funcionais
export default function DialogueBox({ 
  character, 
  era, 
  onClose, 
  onKnowledgeGain 
}) {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  
  // Conteúdo educativo EXPANDIDO com múltiplos diálogos por personagem
  const educationalContent = {
    fazenda_1830: {
      ana: {
        dialogues: [
          "Olá! Sou Ana, sua guia histórica! Estamos em 1830, na Fazenda Boa Vista de Inácio Lopes de Magalhães.",
          "Esta fazenda foi o primeiro núcleo de povoamento da região, dedicada à criação de gado.",
          "O Rio Branco era fundamental para o transporte e abastecimento da fazenda.",
          "Você sabia que o nome 'Boa Vista' vem da bela vista que se tinha do rio?",
          "A fazenda tinha cerca de 3.000 cabeças de gado e era uma das maiores da região!",
          "Os vaqueiros vinham de várias partes do Brasil para trabalhar aqui."
        ],
        questions: [
          {
            question: "Qual era a principal atividade da Fazenda Boa Vista?",
            options: ["Agricultura", "Criação de gado", "Mineração", "Pesca"],
            correct: 1,
            explanation: "A Fazenda Boa Vista era dedicada principalmente à criação de gado, atividade que marcou o início do povoamento da região."
          }
        ]
      },
      lucas: {
        dialogues: [
          "Eu sou Lucas, especialista em economia histórica! Vou te contar sobre o desenvolvimento econômico.",
          "A Fazenda Boa Vista foi estabelecida por Inácio Lopes de Magalhães em 1830.",
          "Era uma das primeiras fazendas de gado da região, aproveitando as vastas pastagens naturais.",
          "O Rio Branco servia como via de transporte para escoar a produção.",
          "Esta fazenda foi o embrião da futura cidade de Boa Vista!",
          "O gado era vendido para outras regiões, gerando riqueza para a área."
        ],
        questions: [
          {
            question: "Quem fundou a Fazenda Boa Vista?",
            options: ["José da Silva", "Inácio Lopes de Magalhães", "Pedro Álvares", "Manuel Santos"],
            correct: 1,
            explanation: "Inácio Lopes de Magalhães foi o fundador da Fazenda Boa Vista em 1830, marco inicial do povoamento da região."
          }
        ]
      },
      sofia: {
        dialogues: [
          "Oi! Sou Sofia, bióloga e especialista em meio ambiente! Vou te mostrar a natureza da época.",
          "Observe a rica biodiversidade ao redor da fazenda!",
          "O Rio Branco abriga diversas espécies de peixes e aves aquáticas.",
          "As matas ciliares protegem as margens do rio e servem de abrigo para a fauna.",
          "A convivência harmoniosa com a natureza era essencial para o sucesso da fazenda.",
          "Havia onças, capivaras, jacarés e centenas de espécies de aves na região!"
        ],
        questions: [
          {
            question: "Qual a importância das matas ciliares?",
            options: ["Decoração", "Proteção das margens", "Madeira", "Frutas"],
            correct: 1,
            explanation: "As matas ciliares protegem as margens dos rios contra erosão e servem de habitat para diversas espécies."
          }
        ]
      },
      ze_papagaio: {
        dialogues: [
          "Oi! Sou Zé Papagaio, morador antigo da região! Vou te contar curiosidades!",
          "Eu vi tudo acontecer desde o início! A fazenda era um lugar muito movimentado.",
          "Os vaqueiros cantavam músicas típicas enquanto trabalhavam com o gado.",
          "Havia festas tradicionais onde se comia carne assada e se dançava forró!",
          "As crianças da fazenda brincavam no rio e aprendiam a pescar desde pequenas.",
          "Todo mundo se conhecia e se ajudava - era como uma grande família!"
        ],
        questions: [
          {
            question: "Como era a vida social na fazenda?",
            options: ["Isolada", "Como uma grande família", "Conflituosa", "Silenciosa"],
            correct: 1,
            explanation: "A vida na fazenda era comunitária, onde todos se conheciam e se ajudavam como uma grande família."
          }
        ]
      }
    },
    vila_1900: {
      ana: {
        dialogues: [
          "Agora estamos em 1900, quando Boa Vista se tornou uma vila!",
          "A população cresceu e surgiram as primeiras ruas organizadas.",
          "Foi construída a primeira igreja e estabelecidos os primeiros comércios.",
          "A vila começou a atrair imigrantes de outras regiões do Brasil.",
          "Havia cerca de 500 habitantes vivendo de forma mais urbana.",
          "As casas eram de adobe e madeira, com telhados de palha ou telha."
        ],
        questions: [
          {
            question: "O que caracterizou Boa Vista em 1900?",
            options: ["Permaneceu fazenda", "Tornou-se vila", "Virou cidade", "Foi abandonada"],
            correct: 1,
            explanation: "Em 1900, Boa Vista foi elevada à categoria de vila, marcando seu crescimento urbano organizado."
          }
        ]
      },
      lucas: {
        dialogues: [
          "A vila de Boa Vista cresceu rapidamente no início do século XX.",
          "Chegaram os primeiros comerciantes e artesãos, diversificando a economia.",
          "A navegação pelo Rio Branco trouxe produtos e pessoas de outras regiões.",
          "Foi um período de grande transformação social e econômica!",
          "Surgiram as primeiras escolas e serviços públicos básicos.",
          "O comércio de borracha também começou a se desenvolver na região."
        ],
        questions: [
          {
            question: "O que impulsionou o crescimento da vila?",
            options: ["Mineração", "Navegação fluvial", "Estrada de ferro", "Aviação"],
            correct: 1,
            explanation: "A navegação pelo Rio Branco foi fundamental para o crescimento, trazendo comércio e pessoas."
          }
        ]
      },
      sofia: {
        dialogues: [
          "A natureza ainda era abundante ao redor da vila.",
          "Os moradores dependiam dos recursos naturais para sobreviver.",
          "A pesca no Rio Branco era uma atividade importante.",
          "As plantas medicinais da região eram amplamente utilizadas.",
          "Havia hortas comunitárias onde se plantava mandioca, milho e feijão.",
          "A coleta de frutos nativos como açaí e buriti era comum."
        ],
        questions: [
          {
            question: "Como os moradores utilizavam a natureza?",
            options: ["Apenas contemplação", "Recursos para sobrevivência", "Turismo", "Exportação"],
            correct: 1,
            explanation: "Os moradores dependiam dos recursos naturais para alimentação, medicina e materiais de construção."
          }
        ]
      },
      ze_papagaio: {
        dialogues: [
          "A vila era muito animada! Havia feiras semanais na praça central.",
          "As pessoas se reuniam para contar histórias e tocar música.",
          "Chegavam barcos com novidades de Manaus e outras cidades.",
          "As crianças brincavam de roda e empinavam papagaio.",
          "Havia um barbeiro que também era dentista e contador de histórias!",
          "Todo domingo tinha missa seguida de almoço comunitário."
        ],
        questions: [
          {
            question: "Onde aconteciam as feiras da vila?",
            options: ["No rio", "Na praça central", "Na igreja", "Nas casas"],
            correct: 1,
            explanation: "As feiras aconteciam na praça central, que era o coração social da vila."
          }
        ]
      }
    }
  };
  
  const currentContent = educationalContent[era?.id]?.[character?.id];
  const currentDialogue = currentContent?.dialogues[currentDialogueIndex];
  const currentQuestion = currentContent?.questions[0];
  
  const handleNext = () => {
    if (currentDialogueIndex < currentContent.dialogues.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    } else {
      setShowOptions(true);
    }
  };
  
  const handleAnswerQuestion = (selectedIndex) => {
    const isCorrect = selectedIndex === currentQuestion.correct;
    
    if (isCorrect) {
      onKnowledgeGain(15); // Ganhar pontos por resposta correta
      alert(`Correto! ${currentQuestion.explanation}`);
    } else {
      alert(`Incorreto. ${currentQuestion.explanation}`);
    }
    
    onClose();
  };
  
  if (!currentContent) {
    return null;
  }
  
  return (
    <div 
      className="dialogue-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div 
        className="dialogue-box"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '30px',
          maxWidth: '600px',
          width: '90%',
          color: 'white',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
      >
        {/* Cabeçalho do personagem */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <img 
            src={character.image} 
            alt={character.name}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              marginRight: '15px',
              border: '3px solid white',
            }}
          />
          <div>
            <h3 style={{ margin: 0, fontSize: '24px' }}>{character.name}</h3>
            <p style={{ margin: 0, opacity: 0.8 }}>{era?.name}</p>
          </div>
        </div>
        
        {!showOptions ? (
          // Modo diálogo
          <>
            <div 
              style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px',
                marginBottom: '20px',
                fontSize: '18px',
                lineHeight: '1.6',
              }}
            >
              {currentDialogue}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 20px',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Fechar
              </button>
              
              <button
                onClick={handleNext}
                style={{
                  background: 'rgba(255,255,255,0.3)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 20px',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                {currentDialogueIndex < currentContent.dialogues.length - 1 ? 'Próximo' : 'Pergunta'}
              </button>
            </div>
          </>
        ) : (
          // Modo pergunta
          <>
            <div 
              style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px',
                marginBottom: '20px',
              }}
            >
              <h4 style={{ marginTop: 0, color: '#FFD700' }}>🧠 Teste seu conhecimento:</h4>
              <p style={{ fontSize: '18px', marginBottom: '20px' }}>{currentQuestion.question}</p>
              
              <div style={{ display: 'grid', gap: '10px' }}>
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerQuestion(index)}
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderRadius: '10px',
                      padding: '15px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '16px',
                      textAlign: 'left',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.3)';
                      e.target.style.borderColor = 'rgba(255,255,255,0.6)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.2)';
                      e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                    }}
                  >
                    {String.fromCharCode(65 + index)}) {option}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 20px',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Pular Pergunta
            </button>
          </>
        )}
      </div>
    </div>
  );
}

