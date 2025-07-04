import React, { useState, useEffect } from 'react';

// Componente de narrativa entre eras com diálogos
export default function EraNarrative({ era, character, onComplete, onClose }) {
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showContinue, setShowContinue] = useState(false);

  // Narrativas por era com diálogos entre personagem e papagaio
  const narratives = {
    'fazenda-1830': {
      title: 'Chegada à Fazenda Boa Vista - 1830',
      background: 'linear-gradient(135deg, #2D5016, #8B4513)',
      dialogues: [
        {
          speaker: 'ze',
          name: 'Zé Papagaio',
          text: 'Olá, jovem aventureiro! Bem-vindo à Fazenda Boa Vista em 1830. Eu sou Zé Papagaio, e tenho vivido aqui há muito tempo...',
          emotion: 'wise'
        },
        {
          speaker: 'character',
          name: character?.name || 'Aventureiro',
          text: 'Oi, Zé! Este lugar parece muito diferente do que eu esperava. Onde estamos exatamente?',
          emotion: 'curious'
        },
        {
          speaker: 'ze',
          name: 'Zé Papagaio',
          text: 'Estamos na fazenda de gado de Inácio Lopes de Magalhães, às margens do Rio Branco. Esta é a origem de tudo que você conhece como Boa Vista!',
          emotion: 'explaining'
        },
        {
          speaker: 'character',
          name: character?.name || 'Aventureiro',
          text: 'Incrível! Mas por que não me lembro de nada sobre a história deste lugar?',
          emotion: 'confused'
        },
        {
          speaker: 'ze',
          name: 'Zé Papagaio',
          text: 'Ah, meu jovem... O tempo fez vocês esquecerem suas raízes. Por isso estou aqui - para ajudá-los a redescobrir a rica história de Roraima!',
          emotion: 'wise'
        },
        {
          speaker: 'character',
          name: character?.name || 'Aventureiro',
          text: 'Então você vai me ensinar sobre o passado? Estou pronto para aprender!',
          emotion: 'excited'
        },
        {
          speaker: 'ze',
          name: 'Zé Papagaio',
          text: 'Exato! Vamos explorar juntos cada era desta terra. Colete itens históricos, converse com as pessoas e descubra os segredos de cada época!',
          emotion: 'encouraging'
        }
      ]
    },
    'vila-1900': {
      title: 'Transformação em Vila - 1900',
      background: 'linear-gradient(135deg, #8B4513, #CD853F)',
      dialogues: [
        {
          speaker: 'ze',
          name: 'Zé Papagaio',
          text: 'Veja só como as coisas mudaram! Agora estamos em 1900, e a fazenda se transformou numa pequena vila.',
          emotion: 'amazed'
        },
        {
          speaker: 'character',
          name: character?.name || 'Aventureiro',
          text: 'Nossa! Há mais casas e pessoas. O que aconteceu para essa transformação?',
          emotion: 'curious'
        },
        {
          speaker: 'ze',
          name: 'Zé Papagaio',
          text: 'O crescimento populacional e o desenvolvimento do comércio! O Rio Branco se tornou uma importante via de transporte.',
          emotion: 'explaining'
        },
        {
          speaker: 'character',
          name: character?.name || 'Aventureiro',
          text: 'E as pessoas? Como viviam nesta época?',
          emotion: 'interested'
        },
        {
          speaker: 'ze',
          name: 'Zé Papagaio',
          text: 'Muito melhor que antes! Surgiram casas comerciais, pequenas indústrias e até uma escola. A vida estava ficando mais organizada.',
          emotion: 'proud'
        },
        {
          speaker: 'character',
          name: character?.name || 'Aventureiro',
          text: 'Que evolução incrível! Mal posso esperar para ver o que vem a seguir.',
          emotion: 'excited'
        }
      ]
    },
    'capital-1940': {
      title: 'Elevação à Capital - 1940',
      background: 'linear-gradient(135deg, #4682B4, #87CEEB)',
      dialogues: [
        {
          speaker: 'ze',
          name: 'Zé Papagaio',
          text: 'Chegamos a 1940! Um momento histórico - Boa Vista se tornou oficialmente a capital do Território Federal de Roraima!',
          emotion: 'celebratory'
        },
        {
          speaker: 'character',
          name: character?.name || 'Aventureiro',
          text: 'Capital? Isso é muito importante! Como isso aconteceu?',
          emotion: 'amazed'
        },
        {
          speaker: 'ze',
          name: 'Zé Papagaio',
          text: 'O governo federal criou territórios para melhor administrar as fronteiras. Boa Vista foi escolhida por sua localização estratégica!',
          emotion: 'explaining'
        },
        {
          speaker: 'character',
          name: character?.name || 'Aventureiro',
          text: 'E isso trouxe mudanças para a cidade?',
          emotion: 'curious'
        },
        {
          speaker: 'ze',
          name: 'Zé Papagaio',
          text: 'Muitas! Chegaram funcionários públicos, melhorou a infraestrutura, construíram-se prédios governamentais. A cidade cresceu rapidamente!',
          emotion: 'enthusiastic'
        },
        {
          speaker: 'character',
          name: character?.name || 'Aventureiro',
          text: 'Que transformação! De uma simples fazenda para capital em pouco mais de 100 anos.',
          emotion: 'impressed'
        }
      ]
    }
  };

  const currentNarrative = narratives[era?.id] || narratives['fazenda-1830'];
  const dialogues = currentNarrative.dialogues;
  const totalDialogues = dialogues.length;

  // Efeito de digitação
  useEffect(() => {
    if (currentDialogue < totalDialogues) {
      const dialogue = dialogues[currentDialogue];
      setIsTyping(true);
      setDisplayedText('');
      setShowContinue(false);

      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < dialogue.text.length) {
          setDisplayedText(dialogue.text.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          setShowContinue(true);
          clearInterval(typingInterval);
        }
      }, 50); // Velocidade da digitação

      return () => clearInterval(typingInterval);
    }
  }, [currentDialogue, dialogues, totalDialogues]);

  const handleNext = () => {
    if (currentDialogue < totalDialogues - 1) {
      setCurrentDialogue(currentDialogue + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    setDisplayedText(dialogues[currentDialogue].text);
    setIsTyping(false);
    setShowContinue(true);
  };

  if (currentDialogue >= totalDialogues) {
    return null;
  }

  const dialogue = dialogues[currentDialogue];
  const isCharacterSpeaking = dialogue.speaker === 'character';

  return (
    <div className="narrative-overlay">
      <div className="narrative-container" style={{ background: currentNarrative.background }}>
        <div className="narrative-header">
          <h2 className="narrative-title">{currentNarrative.title}</h2>
          <div className="dialogue-progress">
            {currentDialogue + 1} de {totalDialogues}
          </div>
        </div>

        <div className="dialogue-content">
          <div className={`dialogue-box ${isCharacterSpeaking ? 'character-speaking' : 'parrot-speaking'}`}>
            <div className="speaker-info">
              <div className={`speaker-avatar ${dialogue.speaker}`}>
                {dialogue.speaker === 'ze' ? '🦜' : '👤'}
              </div>
              <div className="speaker-details">
                <div className="speaker-name">{dialogue.name}</div>
                <div className={`speaker-emotion ${dialogue.emotion}`}>
                  {dialogue.emotion === 'wise' && '🧙‍♂️ Sábio'}
                  {dialogue.emotion === 'curious' && '🤔 Curioso'}
                  {dialogue.emotion === 'explaining' && '📚 Explicando'}
                  {dialogue.emotion === 'confused' && '😕 Confuso'}
                  {dialogue.emotion === 'excited' && '😃 Animado'}
                  {dialogue.emotion === 'encouraging' && '💪 Encorajador'}
                  {dialogue.emotion === 'amazed' && '😲 Impressionado'}
                  {dialogue.emotion === 'interested' && '🧐 Interessado'}
                  {dialogue.emotion === 'proud' && '😊 Orgulhoso'}
                  {dialogue.emotion === 'celebratory' && '🎉 Comemorativo'}
                  {dialogue.emotion === 'enthusiastic' && '🔥 Entusiasmado'}
                  {dialogue.emotion === 'impressed' && '👏 Impressionado'}
                </div>
              </div>
            </div>

            <div className="dialogue-text">
              {displayedText}
              {isTyping && <span className="typing-cursor">|</span>}
            </div>

            <div className="dialogue-actions">
              {isTyping ? (
                <button className="btn-skip" onClick={handleSkip}>
                  Pular Animação
                </button>
              ) : showContinue && (
                <button className="btn-continue" onClick={handleNext}>
                  {currentDialogue < totalDialogues - 1 ? 'Continuar' : 'Começar Aventura'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="narrative-footer">
          <button className="btn-close" onClick={onClose}>
            Pular Narrativa
          </button>
        </div>
      </div>

    </div>
  );
}

