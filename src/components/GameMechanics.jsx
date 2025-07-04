import { useState } from 'react'
import { X, ArrowRight } from 'lucide-react'

// Dados dos diálogos por personagem e época
const DIALOGUES = {
  fazenda_1830: {
    ana: {
      name: "Ana",
      messages: [
        "Uau! Olhem só este lugar! É a fazenda original de Boa Vista!",
        "Inácio Lopes de Magalhães fundou esta fazenda em 1830. Ele veio do Ceará em busca de novas oportunidades.",
        "Vejam o Rio Branco ali! Era a principal via de transporte da época. Tudo chegava e saía por barco!"
      ],
      knowledge: 10
    },
    lucas: {
      name: "Lucas",
      messages: [
        "Interessante... Esta fazenda tinha cerca de 1.000 cabeças de gado!",
        "O nome 'Boa Vista' vem da bela vista que se tem daqui para o Rio Branco e as montanhas.",
        "A capela que vemos ali foi construída em 1858, dedicada a Nossa Senhora do Carmo."
      ],
      knowledge: 15
    },
    sofia: {
      name: "Sofia",
      messages: [
        "Que lindo! Vejam como a natureza era preservada naquela época!",
        "Os campos que vemos são chamados de 'lavrado' - uma savana típica de Roraima.",
        "Os animais pastavam livremente e havia muito mais árvores nativas por toda parte!"
      ],
      knowledge: 12
    },
    ze: {
      name: "Zé",
      messages: [
        "Krawk! Eu vi tudo isso acontecer, crianças! Meus ancestrais voavam por aqui há séculos!",
        "Os povos indígenas Macuxi já conheciam estas terras muito antes da fazenda ser fundada.",
        "Esta região sempre foi um ponto de encontro entre diferentes culturas e tradições!"
      ],
      knowledge: 20
    }
  },
  vila_1900: {
    ana: {
      name: "Ana",
      messages: [
        "Incrível como a fazenda se transformou em uma vila próspera!",
        "Em 1890, Boa Vista foi oficialmente elevada à categoria de vila. Vejam as primeiras ruas organizadas!",
        "A Igreja Matriz ficou muito mais bonita e imponente, não acham?"
      ],
      knowledge: 10
    },
    lucas: {
      name: "Lucas",
      messages: [
        "O prédio da Intendência ali é onde funcionava a administração da vila.",
        "Nesta época, Boa Vista tinha cerca de 500 habitantes e era um importante centro comercial.",
        "As carroças de boi eram o principal meio de transporte terrestre da região."
      ],
      knowledge: 15
    },
    sofia: {
      name: "Sofia",
      messages: [
        "Vejam como começaram a organizar jardins e praças! Que planejamento cuidadoso!",
        "As árvores foram plantadas estrategicamente para dar sombra nas ruas principais.",
        "Mesmo com o crescimento urbano, ainda mantinham harmonia com a natureza."
      ],
      knowledge: 12
    },
    ze: {
      name: "Zé",
      messages: [
        "Krawk! A vila cresceu rapidamente com a chegada de mais famílias do Nordeste!",
        "O comércio fluvial pelo Rio Branco trouxe prosperidade e novos moradores.",
        "Foi nesta época que começaram as primeiras escolas e serviços públicos!"
      ],
      knowledge: 20
    }
  },
  capital_1940: {
    ana: {
      name: "Ana",
      messages: [
        "Que transformação incrível! Boa Vista virou capital do Território Federal de Roraima!",
        "Em 1943, o presidente Getúlio Vargas criou o Território Federal. Boa Vista foi escolhida como capital!",
        "Vejam os edifícios governamentais! Tudo foi planejado para ser uma capital moderna."
      ],
      knowledge: 10
    },
    lucas: {
      name: "Lucas",
      messages: [
        "O traçado urbano radial foi inspirado em Brasília e outras capitais planejadas.",
        "O Palácio do Governo e os prédios administrativos seguem o estilo neoclássico da época.",
        "A população cresceu de 500 para mais de 5.000 habitantes em poucos anos!"
      ],
      knowledge: 15
    },
    sofia: {
      name: "Sofia",
      messages: [
        "As praças foram cuidadosamente planejadas com jardins e arborização urbana!",
        "Plantaram espécies nativas e exóticas para criar um ambiente urbano agradável.",
        "O paisagismo respeitava o clima tropical e as características locais."
      ],
      knowledge: 12
    },
    ze: {
      name: "Zé",
      messages: [
        "Krawk! Que época de mudanças! Chegaram funcionários públicos de todo o Brasil!",
        "A infraestrutura melhorou muito: energia elétrica, telefone, correios...",
        "Boa Vista se tornou um importante centro administrativo da região Norte!"
      ],
      knowledge: 20
    }
  },
  boa_vista_moderna: {
    ana: {
      name: "Ana",
      messages: [
        "Uau! Boa Vista se tornou uma metrópole moderna e sustentável!",
        "A Ponte dos Macuxis é um símbolo da cidade moderna, conectando as duas margens do Rio Branco.",
        "Hoje Boa Vista tem mais de 400.000 habitantes e é a capital do estado de Roraima!"
      ],
      knowledge: 10
    },
    lucas: {
      name: "Lucas",
      messages: [
        "A cidade manteve o traçado radial original, mas se expandiu muito além do centro histórico.",
        "Boa Vista é conhecida como a única capital brasileira totalmente no Hemisfério Norte!",
        "A tecnologia e sustentabilidade são prioridades no planejamento urbano atual."
      ],
      knowledge: 15
    },
    sofia: {
      name: "Sofia",
      messages: [
        "Que maravilha! A Orla Taumanan preserva a natureza no coração da cidade!",
        "Os parques urbanos mantêm a biodiversidade local e oferecem lazer para todos.",
        "Boa Vista é exemplo de como crescer respeitando o meio ambiente!"
      ],
      knowledge: 12
    },
    ze: {
      name: "Zé",
      messages: [
        "Krawk! De uma simples fazenda a uma capital moderna! Que jornada incrível!",
        "Boa Vista é hoje porta de entrada para a Amazônia e ponte para outros países!",
        "A cidade honra sua história enquanto constrói um futuro sustentável!"
      ],
      knowledge: 20
    }
  }
}

// Puzzles educativos por época
const PUZZLES = {
  fazenda_1830: {
    question: "Em que ano Inácio Lopes de Magalhães fundou a Fazenda Boa Vista?",
    options: ["1825", "1830", "1835", "1840"],
    correct: 1,
    explanation: "A Fazenda Boa Vista foi fundada em 1830 por Inácio Lopes de Magalhães, que veio do Ceará em busca de novas oportunidades na pecuária.",
    knowledge: 25
  },
  vila_1900: {
    question: "Qual era o principal meio de transporte em Boa Vista no início do século XX?",
    options: ["Automóveis", "Carroças de boi", "Bicicletas", "Cavalos"],
    correct: 1,
    explanation: "As carroças puxadas por bois eram o principal meio de transporte terrestre, enquanto o Rio Branco servia para o transporte fluvial.",
    knowledge: 25
  },
  capital_1940: {
    question: "Quem criou o Território Federal de Roraima em 1943?",
    options: ["Juscelino Kubitschek", "Getúlio Vargas", "Eurico Gaspar Dutra", "Washington Luís"],
    correct: 1,
    explanation: "O presidente Getúlio Vargas criou o Território Federal de Roraima em 1943, escolhendo Boa Vista como sua capital.",
    knowledge: 25
  },
  boa_vista_moderna: {
    question: "Qual é a característica única de Boa Vista entre as capitais brasileiras?",
    options: ["Maior altitude", "Única no Hemisfério Norte", "Mais populosa", "Mais antiga"],
    correct: 1,
    explanation: "Boa Vista é a única capital brasileira localizada totalmente no Hemisfério Norte, uma característica geográfica única.",
    knowledge: 25
  }
}

// Componente de Diálogo
export function DialogueBox({ character, era, onClose, onKnowledgeGain }) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const dialogue = DIALOGUES[era.id]?.[character]
  
  if (!dialogue) return null
  
  const handleNext = () => {
    if (currentMessage < dialogue.messages.length - 1) {
      setCurrentMessage(currentMessage + 1)
    } else {
      onKnowledgeGain(dialogue.knowledge)
      onClose()
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-4">
      <div className="bg-white rounded-t-3xl w-full max-w-4xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {dialogue.name[0]}
            </div>
            <h3 className="text-xl font-bold text-gray-800">{dialogue.name}</h3>
          </div>
          <button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-2xl p-6 mb-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            {dialogue.messages[currentMessage]}
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {dialogue.messages.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index <= currentMessage ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <button onClick={handleNext} className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
            {currentMessage < dialogue.messages.length - 1 ? (
              <>Próximo <ArrowRight className="w-4 h-4 ml-2" /></>
            ) : (
              'Finalizar'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// Componente de Puzzle
export function PuzzleBox({ era, onClose, onKnowledgeGain }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const puzzle = PUZZLES[era.id]
  
  if (!puzzle) return null
  
  const handleSubmit = () => {
    setShowResult(true)
    if (selectedAnswer === puzzle.correct) {
      onKnowledgeGain(puzzle.knowledge)
    }
  }
  
  const handleClose = () => {
    onClose()
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Desafio Histórico</h3>
          <p className="text-gray-600">{era.name}</p>
        </div>
        
        {!showResult ? (
          <>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 mb-6">
              <p className="text-lg text-gray-800 font-medium leading-relaxed">
                {puzzle.question}
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              {puzzle.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-50 text-blue-800'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)})</span> {option}
                </button>
              ))}
            </div>
            
            <div className="flex justify-between">
              <button variant="outline" onClick={handleClose}>
                Pular
              </button>
              <button 
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white"
              >
                Responder
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={`text-center mb-6 p-6 rounded-2xl ${
              selectedAnswer === puzzle.correct 
                ? 'bg-green-50 border-2 border-green-200' 
                : 'bg-red-50 border-2 border-red-200'
            }`}>
              <div className="text-4xl mb-2">
                {selectedAnswer === puzzle.correct ? '🎉' : '😅'}
              </div>
              <h4 className={`text-xl font-bold mb-2 ${
                selectedAnswer === puzzle.correct ? 'text-green-800' : 'text-red-800'
              }`}>
                {selectedAnswer === puzzle.correct ? 'Parabéns!' : 'Quase lá!'}
              </h4>
              <p className="text-gray-700">
                {selectedAnswer === puzzle.correct 
                  ? `Você ganhou ${puzzle.knowledge} pontos de conhecimento!`
                  : 'Continue explorando para aprender mais!'
                }
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-6 mb-6">
              <h5 className="font-bold text-blue-800 mb-2">Explicação:</h5>
              <p className="text-blue-700 leading-relaxed">{puzzle.explanation}</p>
            </div>
            
            <div className="text-center">
              <button onClick={handleClose} className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                Continuar Aventura
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

