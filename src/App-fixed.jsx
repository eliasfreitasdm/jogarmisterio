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
    // Plataformas para o nível
    platforms: [
      // Chão principal
      { x: 0, y: 550, width: 2000, height: 50, type: 'grass' },
      // Plataformas adicionais
      { x: 300, y: 450, width: 200, height: 20, type: 'wood' },
      { x: 600, y: 400, width: 150, height: 20, type: 'wood' },
      { x: 850, y: 350, width: 200, height: 20, type: 'wood' },
      { x: 1200, y: 400, width: 250, height: 20, type: 'wood' },
      { x: 1500, y: 350, width: 200, height: 20, type: 'wood' },
      { x: 1800, y: 300, width: 200, height: 20, type: 'wood' },
    ],
    // Itens colecionáveis com explicações educativas detalhadas
    items: [
      { 
        x: 380, y: 420, type: 'lamp', name: 'Lamparina Antiga', 
        description: 'Lamparina a óleo usada pelos primeiros habitantes da fazenda.',
        educationalText: 'Esta lamparina representa a vida simples dos primeiros colonos. Sem energia elétrica, eles dependiam de lamparinas a óleo de mamona ou querosene para iluminar suas casas durante a noite. Era um item essencial para a sobrevivência na fronteira.',
        historicalContext: 'Em 1830, Boa Vista era apenas uma fazenda isolada. Os habitantes viviam de forma muito simples, criando gado e plantando para subsistência.',
        points: 15, collected: false 
      },
      { 
        x: 720, y: 370, type: 'document', name: 'Escritura da Fazenda', 
        description: 'Documento original da fundação da Fazenda Boa Vista.',
        educationalText: 'Este documento marca o início oficial de Boa Vista. A fazenda foi estabelecida por Inácio Lopes de Magalhães, que recebeu uma sesmaria (concessão de terra) da Coroa Portuguesa para criar gado na região.',
        historicalContext: 'As sesmarias eram a forma como Portugal distribuía terras no Brasil colonial. Esta fazenda se tornaria o núcleo da futura capital de Roraima.',
        points: 25, collected: false 
      },
      { 
        x: 1300, y: 350, type: 'artifact', name: 'Ferradura Antiga', 
        description: 'Ferradura usada nos cavalos da fazenda original.',
        educationalText: 'Os cavalos eram fundamentais para o transporte e trabalho na fazenda. Esta ferradura mostra como os colonos cuidavam de seus animais, essenciais para a sobrevivência na região isolada do extremo norte do Brasil.',
        historicalContext: 'O gado e os cavalos eram a base da economia local. A pecuária foi a primeira atividade econômica importante da região que hoje é Boa Vista.',
        points: 20, collected: false 
      },
    ],
    // Inimigos
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
      { x: 250, y: 400, type: 'document', name: 'Decreto de Vila', description: 'Documento que elevou Boa Vista à categoria de vila.', points: 15, collected: false },
      { x: 700, y: 350, type: 'artifact', name: 'Sino da Igreja', description: 'Miniatura do sino da primeira igreja da vila.', points: 10, collected: false },
      { x: 1400, y: 350, type: 'artifact', name: 'Moeda Antiga', description: 'Moeda do período imperial usada na vila.', points: 10, collected: false },
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
      { x: 350, y: 500, type: 'shadow', name: 'Sombra da Modernização', health: 3, damage: 2, movePattern: 'chase' },
      { x: 800, y: 500, type: 'shadow', name: 'Sombra da Modernização', health: 3, damage: 2, movePattern: 'chase' },
      { x: 1400, y: 500, type: 'shadow', name: 'Sombra da Modernização', health: 3, damage: 2, movePattern: 'chase' },
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
      { x: 150, y: 400, type: 'document', name: 'Constituição Estadual', description: 'Documento da criação do Estado de Roraima.', points: 15, collected: false },
      { x: 500, y: 350, type: 'artifact', name: 'Maquete da Orla', description: 'Miniatura da Orla Taumanan, cartão postal da cidade.', points: 10, collected: false },
      { x: 1500, y: 200, type: 'artifact', name: 'Placa Solar', description: 'Símbolo da sustentabilidade na Boa Vista moderna.', points: 10, collected: false },
    ],
    // Inimigos
    enemies: [
      { x: 300, y: 500, type: 'ghost', name: 'Fantasma do Passado', health: 4, damage: 2, movePattern: 'teleport' },
      { x: 900, y: 500, type: 'ghost', name: 'Fantasma do Passado', health: 4, damage: 2, movePattern: 'teleport' },
      { x: 1600, y: 500, type: 'ghost', name: 'Fantasma do Passado', health: 4, damage: 2, movePattern: 'teleport' },
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

