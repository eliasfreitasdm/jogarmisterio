import { useState, useEffect } from 'react'
import './App.css'
import MainMenu from './components/MainMenu'
import GameIntro from './components/GameIntro'
import VictoryScreen from './components/VictoryScreen'
import DialogueBox from './components/DialogueBox'
import HistoricalPuzzle from './components/HistoricalPuzzle'
import GameLevel from './components/GameLevel'
import GameHUD from './components/GameHUD'
import Inventory from './components/Inventory'
import GameFooter from './components/GameFooter'
import './components/GameAnimations.css'

// Importar assets dos personagens com fallbacks
let anaImg, lucasImg, sofiaImg, zeImg;
let fazenda1830, vila1900, capital1940, boaVistaModerna;

try {
  anaImg = new URL('./assets/personagens/ana-personagem.png', import.meta.url).href;
  lucasImg = new URL('./assets/personagens/lucas-personagem.png', import.meta.url).href;
  sofiaImg = new URL('./assets/personagens/sofia-personagem.png', import.meta.url).href;
  zeImg = new URL('./assets/personagens/ze-papagaio.png', import.meta.url).href;
  
  fazenda1830 = new URL('./assets/cenarios/fazenda-1830.png', import.meta.url).href;
  vila1900 = new URL('./assets/cenarios/vila-1900.png', import.meta.url).href;
  capital1940 = new URL('./assets/cenarios/capital-1940.png', import.meta.url).href;
  boaVistaModerna = new URL('./assets/cenarios/boa-vista-moderna.png', import.meta.url).href;
} catch (error) {
  console.warn('Erro ao carregar assets, usando fallbacks:', error);
  // Fallbacks para caso os assets não carreguem
  anaImg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGRkQ3MDAiLz4KPHN2Zz4K';
  lucasImg = anaImg;
  sofiaImg = anaImg;
  zeImg = anaImg;
  fazenda1830 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjODdDRUVCIi8+Cjwvc3ZnPgo=';
  vila1900 = fazenda1830;
  capital1940 = fazenda1830;
  boaVistaModerna = fazenda1830;
}

// Personagens do jogo
const CHARACTERS = [
  {
    id: 'ana',
    name: 'Ana',
    image: anaImg,
    description: 'Uma jovem curiosa e inteligente que adora história'
  },
  {
    id: 'lucas', 
    name: 'Lucas',
    image: lucasImg,
    description: 'Um garoto aventureiro que gosta de explorar'
  },
  {
    id: 'sofia',
    name: 'Sofia',
    image: sofiaImg,
    description: 'Uma menina corajosa que resolve problemas'
  },
  {
    id: 'ze',
    name: 'Zé Papagaio',
    image: zeImg,
    description: 'O papagaio sábio que conhece todos os segredos de Roraima'
  }
]

// Estados do jogo
const GAME_STATES = {
  MENU: 'menu',
  INTRO: 'intro',
  PLAYING: 'playing',
  DIALOGUE: 'dialogue',
  PUZZLE: 'puzzle',
  TRANSITION: 'transition',
  VICTORY: 'victory',
  INVENTORY: 'inventory'
}

// Épocas históricas
const ERAS = {
 FAZENDA_1830: {
  id: 'fazenda_1830',
  name: 'Fazenda Boa Vista (1830)',
  background: fazenda1830,
  description: 'O início de tudo: a fazenda de gado de Inácio Lopes de Magalhães',
  colors: {
    primary: '#2D5016',
    secondary: '#8B4513',
    accent: '#F5DEB3'
  },
  platforms: [
    { x: 0, y: 550, width: 2000, height: 50, type: 'grass' },
    { x: 300, y: 450, width: 200, height: 20, type: 'wood' },
    { x: 600, y: 400, width: 150, height: 20, type: 'wood' },
    { x: 850, y: 350, width: 200, height: 20, type: 'wood' },
    { x: 1200, y: 400, width: 250, height: 20, type: 'wood' },
    { x: 1500, y: 350, width: 200, height: 20, type: 'wood' },
    { x: 1800, y: 300, width: 200, height: 20, type: 'wood' },
  ],
  items: [
    {
      x: 280,
      y: 420,
      type: 'document',
      name: 'Concessão de Sesmaria',
      description: 'Documento que concedia terras a Inácio Lopes de Magalhães.',
      points: 20,
      collected: false,
      popup: {
        title: '📜 DOCUMENTO HISTÓRICO ENCONTRADO!',
        subtitle: 'Concessão de Sesmaria – 1830',
        educationalText: 'Este documento representa o início da ocupação formal da região. Inácio Lopes de Magalhães recebeu a sesmaria como direito de uso da terra para criação de gado.',
        historicalContext: 'As sesmarias eram a forma oficial de distribuir terras no Brasil colonial e imperial. Essa concessão foi fundamental para a fundação da Fazenda Boa Vista.',
        trivia: 'A palavra "sesmaria" vem do termo "seis marias", que significava divisão de terras em lotes.',
        buttonLabel: 'Fechar'
      }
    },
    {
      x: 700,
      y: 370,
      type: 'artifact',
      name: 'Marca de Ferrão',
      description: 'Símbolo utilizado para marcar o gado da fazenda.',
      points: 15,
      collected: false,
      popup: {
        title: '🐄 OBJETO PECUÁRIO HISTÓRICO!',
        subtitle: 'Marca de Ferrão – Início do Século XIX',
        educationalText: 'A criação de gado era a principal atividade econômica da Fazenda Boa Vista. As marcas de ferrão identificavam os animais de cada fazenda.',
        historicalContext: 'Essas marcas eram registradas oficialmente e eram uma forma de garantir a posse sobre os animais em tempos sem cercas.',
        trivia: 'A marca da fazenda de Inácio tinha formato de cruz estilizada.',
        buttonLabel: 'Fechar'
      }
    },
    {
      x: 1100,
      y: 350,
      type: 'tool',
      name: 'Machado de Madeira',
      description: 'Usado para abrir caminhos e construir moradias.',
      points: 10,
      collected: false,
      popup: {
        title: '🪓 FERRAMENTA DO COLONO!',
        subtitle: 'Machado – Ferramenta de Sobrevivência',
        educationalText: 'Ferramentas como este machado eram essenciais para abrir trilhas na mata, cortar lenha e construir estruturas simples de madeira.',
        historicalContext: 'A instalação da fazenda exigia muito trabalho braçal e resistência. A sobrevivência dependia da adaptação ao ambiente.',
        trivia: 'Os primeiros casebres eram feitos de palha, barro e madeira das margens do Rio Branco.',
        buttonLabel: 'Fechar'
      }
    },
    {
      x: 1450,
      y: 300,
      type: 'artifact',
      name: 'Lamparina a Óleo',
      description: 'Usada para iluminar a fazenda antes da energia elétrica.',
      points: 10,
      collected: false,
      popup: {
        title: '💡 OBJETO DE ILUMINAÇÃO COLONIAL',
        subtitle: 'Lamparina – Século XIX',
        educationalText: 'As noites eram iluminadas com lamparinas alimentadas por óleo de mamona ou gordura animal.',
        historicalContext: 'Boa Vista só recebeu energia elétrica cerca de um século depois da fundação da fazenda. A lamparina era símbolo de resistência e adaptação.',
        trivia: 'Mesmo após a chegada da luz elétrica, muitas famílias ainda usavam lamparinas na zona rural.',
        buttonLabel: 'Fechar'
      }
    },
    {
      x: 1750,
      y: 270,
      type: 'person',
      name: 'Retrato de Inácio',
      description: 'Representação artística do fundador da Fazenda Boa Vista.',
      points: 25,
      collected: false,
      popup: {
        title: '👤 PERSONAGEM HISTÓRICO DESBLOQUEADO!',
        subtitle: 'Inácio Lopes de Magalhães',
        educationalText: 'Inácio foi o responsável pela fundação da fazenda que daria origem à cidade. Sua iniciativa e trabalho ajudaram a consolidar a ocupação da margem direita do Rio Branco.',
        historicalContext: 'A criação de gado e a instalação de um núcleo produtivo rural foram os primeiros passos para o surgimento de Boa Vista.',
        trivia: 'A cidade só começou a se organizar como vila em 1890, quase 60 anos depois da chegada de Inácio.',
        buttonLabel: 'Fechar'
      }
    }
  ],
  enemies: [
    { x: 500, y: 500, type: 'spirit', name: 'Espírito da Floresta', health: 1, damage: 1, movePattern: 'patrol' },
    { x: 1000, y: 500, type: 'spirit', name: 'Espírito da Floresta', health: 1, damage: 1, movePattern: 'patrol' },
    { x: 1600, y: 500, type: 'spirit', name: 'Espírito da Floresta', health: 1, damage: 1, movePattern: 'patrol' },
  ]
 },
  VILA_1900: {
    id: 'vila_1900',
    name: 'Vila de Boa Vista (1900)',
    background: vila1900,
    description: 'A transformação em vila e o crescimento urbano',
    colors: {
      primary: '#1E90FF',
      secondary: '#32CD32',
      accent: '#FFA500'
    },
    // Plataformas para o nível
    platforms: [
      // Chão principal
      { x: 0, y: 550, width: 2000, height: 50, type: 'stone' },
      // Plataformas adicionais (edifícios, etc.)
      { x: 200, y: 450, width: 300, height: 20, type: 'stone' },
      { x: 600, y: 400, width: 200, height: 20, type: 'stone' },
      { x: 900, y: 350, width: 250, height: 20, type: 'stone' },
      { x: 1300, y: 400, width: 200, height: 20, type: 'stone' },
      { x: 1600, y: 350, width: 300, height: 20, type: 'stone' },
    ],
    // Itens colecionáveis
    items: [
      {
      "x": 380,
      "y": 420,
      "type": "lamp",
      "name": "Lamparina Antiga",
      "description": "Lamparina a óleo usada pelos primeiros habitantes da fazenda.",
      "points": 15,
      "collected": false,
      "popup": {
        "title": "💡 OBJETO HISTÓRICO DESBLOQUEADO!",
        "subtitle": "Lamparina Antiga – Século XIX",
        "educationalText": "Antes da chegada da energia elétrica, os moradores da Fazenda Boa Vista usavam lamparinas de querosene ou óleo de mamona para se orientar à noite.",
        "historicalContext": "No início do século XIX, a vida era rústica e os recursos eram limitados. A iluminação artificial era essencial para atividades noturnas.",
        "trivia": "Sabia que a eletrificação de Boa Vista só começou nas décadas de 1930 e 1940?",
        "buttonLabel": "Fechar"
      }
    },
    {
      "x": 720,
      "y": 370,
      "type": "document",
      "name": "Sesmaria de Inácio Lopes",
      "description": "Documento que concedeu a terra da Fazenda Boa Vista.",
      "points": 25,
      "collected": false,
      "popup": {
        "title": "📜 DOCUMENTO HISTÓRICO",
        "subtitle": "Sesmaria de Inácio Lopes – 1830",
        "educationalText": "As sesmarias eram concessões de terras feitas pela Coroa Portuguesa a colonos para promover o povoamento. Inácio Lopes recebeu uma dessas sesmarias onde fundou a Fazenda Boa Vista.",
        "historicalContext": "Esse sistema de distribuição de terras foi usado durante a colonização brasileira para estimular o desenvolvimento do interior.",
        "trivia": "A sesmaria de Boa Vista é o embrião da capital de Roraima!",
        "buttonLabel": "Fechar"
      }
    },
    {
      "x": 1300,
      "y": 350,
      "type": "artifact",
      "name": "Ferradura de Tropas",
      "description": "Ferradura usada por tropas que cruzavam a região.",
      "points": 20,
      "collected": false,
      "popup": {
        "title": "🐴 OBJETO RURAL HISTÓRICO",
        "subtitle": "Ferradura de Tropas – Século XIX",
        "educationalText": "As tropas eram grupos de cavalos ou bois usados para transporte de mercadorias entre povoados distantes. Era a principal forma de comércio.",
        "historicalContext": "Boa Vista era isolada e dependia das tropas para trocar produtos com outras regiões do país.",
        "trivia": "As tropas levavam desde sal e tecidos até cartas e alimentos!",
        "buttonLabel": "Fechar"
      }
    },
    ],
    // Inimigos
    enemies: [
      { x: 400, y: 500, type: 'explorer', name: 'Explorador Fantasmagórico', health: 2, damage: 1, movePattern: 'patrol' },
      { x: 1100, y: 500, type: 'explorer', name: 'Explorador Fantasmagórico', health: 2, damage: 1, movePattern: 'patrol' },
      { x: 1700, y: 500, type: 'explorer', name: 'Explorador Fantasmagórico', health: 2, damage: 1, movePattern: 'patrol' },
    ]
  },
  CAPITAL_1940: {
    id: 'capital_1940',
    name: 'Capital do Território Federal (1944)',
    background: capital1940,
    description: 'A modernização e o planejamento urbano radial',
    colors: {
      primary: '#003366',
      secondary: '#DAA520',
      accent: '#F8F8FF'
    },
    // Plataformas para o nível
    platforms: [
      // Chão principal
      { x: 0, y: 550, width: 2000, height: 50, type: 'stone' },
      // Plataformas adicionais (edifícios governamentais, etc.)
      { x: 150, y: 450, width: 250, height: 20, type: 'stone' },
      { x: 500, y: 400, width: 300, height: 20, type: 'stone' },
      { x: 900, y: 350, width: 200, height: 20, type: 'stone' },
      { x: 1200, y: 300, width: 250, height: 20, type: 'stone' },
      { x: 1500, y: 250, width: 300, height: 20, type: 'stone' },
      { x: 1850, y: 200, width: 150, height: 20, type: 'stone' },
    ],
    // Itens colecionáveis
    items: [
      { x: 200, y: 400, type: 'document', name: 'Decreto Territorial', description: 'Decreto de criação do Território Federal de Roraima.', points: 15, collected: false },
      { x: 600, y: 350, type: 'artifact', name: 'Planta Urbana', description: 'Planta original do planejamento radial de Boa Vista.', points: 15, collected: false },
      { x: 1300, y: 250, type: 'artifact', name: 'Distintivo Oficial', description: 'Distintivo dos primeiros funcionários públicos do território.', points: 10, collected: false },
    ],
    // Inimigos
    enemies: [
 {
      "x": 250,
      "y": 400,
      "type": "document",
      "name": "Criação da Vila",
      "description": "Documento que elevou Boa Vista à condição de vila.",
      "points": 15,
      "collected": false,
      "popup": {
        "title": "🏘️ BOA VISTA VIROU VILA!",
        "subtitle": "Elevação à Vila – 1890",
        "educationalText": "Boa Vista foi oficialmente elevada à categoria de vila no final do século XIX, o que permitiu a instalação de autoridades locais.",
        "historicalContext": "Esse status significava mais autonomia administrativa e início da urbanização.",
        "trivia": "Nessa época, começaram a surgir ruas e praças planejadas!",
        "buttonLabel": "Fechar"
      }
    },
    {
      "x": 700,
      "y": 350,
      "type": "artifact",
      "name": "Sino da Igreja Matriz",
      "description": "Símbolo da religiosidade e reunião da comunidade.",
      "points": 10,
      "collected": false,
      "popup": {
        "title": "🔔 SINO HISTÓRICO",
        "subtitle": "Sino da Igreja – 1900",
        "educationalText": "O sino da Igreja Matriz chamava a população para missas, reuniões e alertava sobre emergências.",
        "historicalContext": "A Igreja era o ponto central da vida em comunidade e da organização social na vila.",
        "trivia": "A primeira paróquia da vila foi dedicada a Nossa Senhora do Carmo.",
        "buttonLabel": "Fechar"
      }
    },
    {
      "x": 1400,
      "y": 350,
      "type": "artifact",
      "name": "Moeda de Cobre",
      "description": "Moeda usada no comércio da vila.",
      "points": 10,
      "collected": false,
      "popup": {
        "title": "🪙 RELÍQUIA DO COMÉRCIO",
        "subtitle": "Moeda de Cobre – Início do século XX",
        "educationalText": "O comércio local usava moedas de cobre e prata para compra de produtos essenciais como farinha, querosene e tecidos.",
        "historicalContext": "O mercado da vila cresceu com o aumento da população e da atividade extrativista.",
        "trivia": "A moeda também era usada para pagar impostos coloniais.",
        "buttonLabel": "Fechar"
      }
    },
    ]
  },
  BOA_VISTA_MODERNA: {
    id: 'boa_vista_moderna',
    name: 'Boa Vista Moderna',
    background: boaVistaModerna,
    description: 'A cidade contemporânea: tecnologia e sustentabilidade',
    colors: {
      primary: '#0066CC',
      secondary: '#00CC66',
      accent: '#FF6600'
    },
    // Plataformas para o nível
    platforms: [
      // Chão principal
      { x: 0, y: 550, width: 2000, height: 50, type: 'stone' },
      // Plataformas adicionais (edifícios modernos, etc.)
      { x: 100, y: 450, width: 200, height: 20, type: 'stone' },
      { x: 400, y: 400, width: 250, height: 20, type: 'stone' },
      { x: 750, y: 350, width: 200, height: 20, type: 'stone' },
      { x: 1050, y: 300, width: 250, height: 20, type: 'stone' },
      { x: 1400, y: 250, width: 200, height: 20, type: 'stone' },
      { x: 1700, y: 200, width: 300, height: 20, type: 'stone' },
    ],
    // Itens colecionáveis
    items: [
    {
      "x": 200,
      "y": 400,
      "type": "document",
      "name": "Criação do Território",
      "description": "Decreto que cria o Território Federal do Rio Branco.",
      "points": 15,
      "collected": false,
      "popup": {
        "title": "📃 NOVA ERA POLÍTICA",
        "subtitle": "Criação do Território Federal – 1943",
        "educationalText": "O presidente Getúlio Vargas criou o Território Federal do Rio Branco, separando a região do Amazonas e nomeando Boa Vista como capital.",
        "historicalContext": "A decisão visava aumentar a presença do governo federal na fronteira.",
        "trivia": "O território só se chamaria Roraima anos depois.",
        "buttonLabel": "Fechar"
      }
    },
    {
      "x": 600,
      "y": 350,
      "type": "artifact",
      "name": "Mapa Radial",
      "description": "Mapa do projeto urbano de Boa Vista.",
      "points": 15,
      "collected": false,
      "popup": {
        "title": "🗺️ CIDADE PLANEJADA",
        "subtitle": "Mapa Radial – Década de 1940",
        "educationalText": "Boa Vista foi planejada com ruas que partem do centro em forma de leque, inspirada em cidades europeias modernas.",
        "historicalContext": "Esse projeto visava facilitar o crescimento ordenado e o acesso aos bairros.",
        "trivia": "É uma das poucas capitais brasileiras com plano radial.",
        "buttonLabel": "Fechar"
      }
    },
    {
      "x": 1300,
      "y": 250,
      "type": "artifact",
      "name": "Farda Territorial",
      "description": "Uniforme dos primeiros funcionários do novo território.",
      "points": 10,
      "collected": false,
      "popup": {
        "title": "👔 SÍMBOLO FUNCIONAL",
        "subtitle": "Farda Territorial – 1944",
        "educationalText": "A criação do território trouxe servidores federais com fardas e crachás específicos.",
        "historicalContext": "O governo instalou delegacias, postos médicos e escolas.",
        "trivia": "Essas fardas eram costuradas por costureiras locais!",
        "buttonLabel": "Fechar"
      }
    },
    ],
    // Inimigos
    enemies: [
    {
      "x": 150,
      "y": 400,
      "type": "document",
      "name": "Constituição Estadual",
      "description": "Documento que formalizou a criação do Estado de Roraima.",
      "points": 15,
      "collected": false,
      "popup": {
        "title": "📘 ESTADO CRIADO",
        "subtitle": "Constituição de Roraima – 1991",
        "educationalText": "Com a Constituição Estadual, Roraima deixou de ser território e se tornou um estado com autonomia política e administrativa.",
        "historicalContext": "Boa Vista foi escolhida como capital pela sua infraestrutura e localização estratégica.",
        "trivia": "Roraima foi o último estado a ser criado no Brasil!",
        "buttonLabel": "Fechar"
      }
    },
    {
      "x": 500,
      "y": 350,
      "type": "artifact",
      "name": "Maquete da Orla Taumanan",
      "description": "Miniatura de um dos principais pontos turísticos da cidade.",
      "points": 10,
      "collected": false,
      "popup": {
        "title": "🏞️ BELEZA NATURAL",
        "subtitle": "Orla Taumanan – Século XXI",
        "educationalText": "A orla foi construída para revitalizar o centro da cidade e oferecer lazer à população.",
        "historicalContext": "É um dos cartões postais de Boa Vista, com vista para o rio Branco.",
        "trivia": "‘Taumanan’ significa ‘paz’ na língua Macuxi.",
        "buttonLabel": "Fechar"
      }
    },
    {
      "x": 1500,
      "y": 200,
      "type": "artifact",
      "name": "Placa Solar",
      "description": "Símbolo da preocupação ambiental e energia limpa.",
      "points": 10,
      "collected": false,
      "popup": {
        "title": "⚡ ENERGIA DO FUTURO",
        "subtitle": "Placa Solar – Atualidade",
        "educationalText": "Boa Vista é referência nacional no uso de energia solar em prédios públicos e escolas.",
        "historicalContext": "A energia renovável é parte da estratégia de sustentabilidade urbana da cidade.",
        "trivia": "Boa Vista já venceu prêmios de cidade inteligente no Brasil.",
        "buttonLabel": "Fechar"
      }
    },
    ]
  }
}

// Componente Principal da Aplicação
function App() {
  // Estados básicos do jogo
  const [gameState, setGameState] = useState(GAME_STATES.MENU)
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0)
  const [currentEraIndex, setCurrentEraIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [knowledge, setKnowledge] = useState(0)
  const [health, setHealth] = useState(5)
  const [energy, setEnergy] = useState(100)
  const [inventory, setInventory] = useState([])
  
  // Estados de interface
  const [activeDialogue, setActiveDialogue] = useState(null)
  const [showPuzzle, setShowPuzzle] = useState(false)
  const [showInventory, setShowInventory] = useState(false)
  
  // Estados de progresso
  const [collectedItems, setCollectedItems] = useState([])
  
  // Error boundary simples
  const [hasError, setHasError] = useState(false);
  
  const eras = Object.values(ERAS)
  const currentEra = eras[currentEraIndex]
  
  // Error handling
  useEffect(() => {
    const handleError = (error) => {
      console.error('Erro capturado:', error);
      setHasError(true);
    };
    
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);
  
  // Função para abrir puzzles históricos
  const handleChallengeClick = () => {
    setShowPuzzle(true)
  }
  
  // Função para completar puzzle
  const handlePuzzleComplete = (points) => {
    setKnowledge(prev => prev + points)
    setShowPuzzle(false)
    alert(`Parabéns! Você ganhou ${points} pontos de conhecimento!`)
  }
  
  // Função para fechar puzzle
  const handlePuzzleClose = () => {
    setShowPuzzle(false)
  }
  
  // Recuperar energia ao longo do tempo - APENAS quando jogando
  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING && energy < 100) {
      const energyRecoveryInterval = setInterval(() => {
        setEnergy(prevEnergy => Math.min(prevEnergy + 5, 100));
      }, 1000);
      
      return () => clearInterval(energyRecoveryInterval);
    }
  }, [gameState, energy]);
  
  // Sistema de controles globais para troca de personagens - APENAS quando jogando
  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING) {
      const handleGlobalKeyDown = (e) => {
        switch (e.key) {
          case '1':
            setCurrentCharacterIndex(0); // Ana
            break;
          case '2':
            setCurrentCharacterIndex(1); // Lucas
            break;
          case '3':
            setCurrentCharacterIndex(2); // Sofia
            break;
          case '4':
            setCurrentCharacterIndex(3); // Zé Papagaio
            break;
          default:
            break;
        }
      };
      
      document.addEventListener('keydown', handleGlobalKeyDown);
      
      return () => {
        document.removeEventListener('keydown', handleGlobalKeyDown);
      };
    }
  }, [gameState]);
  
  // Log de debug para deploy - APENAS uma vez
  useEffect(() => {
    console.log('🎮 Jogo Mistérios de Roraima carregado!');
    console.log('Estado atual:', gameState);
    console.log('Era atual:', currentEra?.name);
    console.log('Personagem atual:', CHARACTERS[currentCharacterIndex]?.name);
  }, []);

  const handleStartGame = () => {
    setGameState(GAME_STATES.INTRO)
  }
  
  const handleContinueFromIntro = () => {
    setGameState(GAME_STATES.PLAYING)
  }
  
  const handleNextEra = () => {
    if (currentEraIndex < eras.length - 1) {
      setCurrentEraIndex(prev => prev + 1)
      setProgress(0)
    } else {
      setGameState(GAME_STATES.VICTORY)
    }
  }
  
  const handleDialogueClick = () => {
    setActiveDialogue({
      era: currentEra,
      character: CHARACTERS[currentCharacterIndex]
    })
  }
  
  const handleDialogueClose = () => {
    setActiveDialogue(null)
  }
  
  const handleKnowledgeGain = (points) => {
    setKnowledge(prev => prev + points)
  }
  
  const handleItemCollect = (index, item) => {
    console.log('🔍 App.handleItemCollect chamado:', { index, item: item.name, currentEraId: currentEra.id });
    
    const itemId = `${currentEra.id}-${index}`
    console.log('🔍 App verificando itemId:', { itemId, collectedItems });
    
    if (!collectedItems.includes(itemId)) {
      console.log('✅ App: Item não foi coletado antes, coletando agora!');
      
      setCollectedItems(prev => {
        const newCollected = [...prev, itemId];
        console.log('🔍 App: Atualizando collectedItems:', newCollected);
        return newCollected;
      });
      
      setInventory(prev => {
        const newInventory = [...prev, item];
        console.log('🔍 App: Atualizando inventory:', newInventory);
        return newInventory;
      });
      
      setKnowledge(prev => {
        const newKnowledge = prev + (item.points || 15);
        console.log('🔍 App: Atualizando knowledge:', newKnowledge);
        return newKnowledge;
      });
      
      // Mostrar explicação educativa detalhada
      const educationalPopup = `
🎉 ITEM HISTÓRICO DESCOBERTO! 🎉

📜 ${item.name}

📖 O QUE É:
${item.description}

🎓 IMPORTÂNCIA HISTÓRICA:
${item.educationalText || 'Item histórico importante para a compreensão da época.'}

🏛️ CONTEXTO DA ÉPOCA:
${item.historicalContext || 'Este item representa um aspecto importante da história de Boa Vista.'}

💎 Conhecimento adquirido: +${item.points || 15} pontos!
📦 Item adicionado ao inventário!
      `.trim()
      
      alert(educationalPopup)
    } else {
      console.log('❌ App: Item já foi coletado antes:', itemId);
    }
  }
  
  const handleHealthChange = (delta) => {
    setHealth(prev => Math.max(0, Math.min(5, prev + delta)))
  }
  
  const handleEnergyChange = (delta) => {
    setEnergy(prev => Math.max(0, Math.min(100, prev + delta)))
  }
  
  const handleUseItem = (item) => {
    // Lógica para usar itens
    console.log('Usando item:', item)
  }
  
  const handleEnemyContact = (enemy) => {
    handleHealthChange(-1)
    handleEnergyChange(-10)
  }
  
  const handleExitReached = () => {
    handleNextEra()
  }

  if (hasError) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div>
          <h1>🎮 Mistérios de Roraima</h1>
          <p>Ocorreu um erro inesperado. Recarregue a página para tentar novamente.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#FFD700',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Recarregar Jogo
          </button>
        </div>
      </div>
    );
  }
  
  // Renderização principal
  if (gameState === GAME_STATES.MENU) {
    return <MainMenu onStartGame={handleStartGame} />
  }
  
  if (gameState === GAME_STATES.INTRO) {
    return <GameIntro onContinue={handleContinueFromIntro} />
  }
  
  if (gameState === GAME_STATES.VICTORY) {
    return (
      <VictoryScreen 
        knowledge={knowledge}
        itemsCollected={inventory.length}
        onRestart={() => {
          setGameState(GAME_STATES.MENU)
          setCurrentEraIndex(0)
          setProgress(0)
          setKnowledge(0)
          setHealth(5)
          setEnergy(100)
          setInventory([])
          setCollectedItems([])
        }}
      />
    )
  }
  
  return (
    <div className="App">
      <GameHUD 
        era={currentEra}
        character={CHARACTERS[currentCharacterIndex]}
        progress={progress}
        knowledge={knowledge}
        health={health}
        energy={energy}
        onDialogueClick={handleDialogueClick}
        onChallengeClick={handleChallengeClick}
        onInventoryClick={() => setShowInventory(!showInventory)}
        onMapClick={() => console.log('Mapa clicado')}
      />
      
      <GameLevel
        era={currentEra}
        backgroundImage={currentEra.background}
        platforms={currentEra.platforms}
        items={currentEra.items}
        enemies={currentEra.enemies}
        character={CHARACTERS[currentCharacterIndex]}
        onCharacterChange={setCurrentCharacterIndex}
        onProgressChange={setProgress}
        onKnowledgeGain={handleKnowledgeGain}
        onHealthChange={handleHealthChange}
        onEnergyChange={handleEnergyChange}
        onUseItem={handleUseItem}
        onItemCollect={handleItemCollect}
        collectedItems={collectedItems}
        currentEraId={currentEra.id}
        onEnemyContact={handleEnemyContact}
        onExitReached={handleExitReached}
        onInventoryToggle={() => setShowInventory(!showInventory)}
      />
      
      {/* BOTÃO DE PORTAL SEMPRE VISÍVEL */}
      <button 
        onClick={() => {
          console.log('Portal clicado - avançando para próxima era!');
          handleNextEra();
        }}
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          width: '120px',
          height: '120px',
          backgroundColor: '#9C27B0',
          color: 'white',
          border: '4px solid #FFD700',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(156, 39, 176, 0.8)',
          animation: 'portalPulse 2s infinite ease-in-out'
        }}
      >
        <div style={{ fontSize: '40px', marginBottom: '5px' }}>🌀</div>
        <div style={{ fontSize: '12px' }}>PORTAL</div>
        <div style={{ fontSize: '10px' }}>Próxima Era</div>
      </button>
      
      {showInventory && (
        <Inventory
          items={inventory}
          onClose={() => setShowInventory(false)}
          onUseItem={handleUseItem}
        />
      )}
      
      {activeDialogue && (
        <DialogueBox
          era={activeDialogue.era}
          character={activeDialogue.character}
          onClose={handleDialogueClose}
          onKnowledgeGain={handleKnowledgeGain}
        />
      )}
      
      {showPuzzle && (
        <HistoricalPuzzle
          era={currentEra}
          onComplete={handlePuzzleComplete}
          onClose={handlePuzzleClose}
        />
      )}
      
      {/* Rodapé com controles e logos */}
      <GameFooter />
    </div>
  )
}

export default App

