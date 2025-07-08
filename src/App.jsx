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
import EducationalPopup from './components/EducationalPopup'
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

// Componente Principal da Aplicação
function App() {
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
  ];

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
  };

  // Épocas históricas com itens educativos autênticos
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
          x: 380,
          y: 420,
          type: 'lamp',
          name: 'Lamparina dos Primeiros Colonos',
          description: 'Lamparina de ferro com pavio, usada para iluminação noturna pelos primeiros habitantes da fazenda.',
          points: 15,
          collected: false,
          educationalText: 'Esta lamparina representa a vida simples dos primeiros moradores da Fazenda Boa Vista. Sem energia elétrica, eles usavam óleo de mamona ou querosene para iluminar suas casas à noite. Era um item essencial para a sobrevivência, permitindo atividades após o pôr do sol.',
          historicalContext: 'Em 1830, Boa Vista era apenas uma fazenda isolada no extremo norte do Brasil. Os colonos criavam gado, plantavam para subsistência e dependiam completamente de tecnologias simples como esta lamparina para viver.',
          trivia: 'A energia elétrica só chegou a Boa Vista na década de 1930, quase 100 anos depois da fundação da fazenda!'
        },
        {
          x: 720,
          y: 370,
          type: 'document',
          name: 'Escritura da Sesmaria',
          description: 'Documento original da concessão de terras pela Coroa Portuguesa para estabelecer a fazenda.',
          points: 25,
          collected: false,
          educationalText: 'Este documento marca o início oficial de Boa Vista. A fazenda foi estabelecida por Inácio Lopes de Magalhães, que recebeu uma sesmaria (concessão de terra) da Coroa Portuguesa para criar gado na região do Rio Branco.',
          historicalContext: 'As sesmarias eram a forma como Portugal distribuía terras no Brasil colonial. Esta fazenda se tornaria o núcleo da futura capital de Roraima, mostrando como pequenos assentamentos podem crescer e se tornar grandes cidades.',
          trivia: 'O sistema de sesmarias foi fundamental para a colonização do extremo norte do Brasil, região considerada estratégica pela Coroa Portuguesa.'
        },
        {
          x: 1300,
          y: 350,
          type: 'artifact',
          name: 'Ferradura dos Cavalos da Fazenda',
          description: 'Ferradura de ferro forjado artesanalmente, usada nos cavalos essenciais para o trabalho na fazenda.',
          points: 20,
          collected: false,
          educationalText: 'Os cavalos eram fundamentais para o transporte e trabalho na fazenda. Esta ferradura mostra como os colonos cuidavam de seus animais, essenciais para a sobrevivência na região isolada. Eram usados para conduzir o gado, transportar pessoas e mercadorias.',
          historicalContext: 'O gado e os cavalos eram a base da economia local. A pecuária foi a primeira atividade econômica importante da região que hoje é Boa Vista, estabelecendo as bases para o desenvolvimento futuro.',
          trivia: 'As ferraduras eram feitas pelos próprios colonos, que precisavam ser autossuficientes em quase tudo na vida isolada da fronteira.'
        },
        {
          x: 1650,
          y: 270,
          type: 'tool',
          name: 'Balde de Ordenha Colonial',
          description: 'Balde de madeira artesanal usado para ordenhar o gado leiteiro da fazenda.',
          points: 15,
          collected: false,
          educationalText: 'Este balde representa a autossuficiência dos colonos. O gado leiteiro fornecia alimento essencial para as famílias, e os baldes eram feitos pelos próprios moradores com madeira local. Cada família precisava produzir seus próprios utensílios.',
          historicalContext: 'A vida na fazenda exigia total autossuficiência. Os colonos produziam seu próprio alimento, faziam seus utensílios e dependiam uns dos outros para sobreviver no isolamento da fronteira norte do Brasil.',
          trivia: 'O leite era consumido fresco ou transformado em queijo e manteiga, produtos que podiam ser conservados por mais tempo no clima tropical.'
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
      name: 'Vila de Boa Vista (1890-1920)',
      background: vila1900,
      description: 'A transformação em vila e o crescimento urbano',
      colors: {
        primary: '#1E90FF',
        secondary: '#32CD32',
        accent: '#FFA500'
      },
      platforms: [
        { x: 0, y: 550, width: 2000, height: 50, type: 'stone' },
        { x: 200, y: 450, width: 300, height: 20, type: 'stone' },
        { x: 600, y: 400, width: 200, height: 20, type: 'stone' },
        { x: 900, y: 350, width: 250, height: 20, type: 'stone' },
        { x: 1300, y: 400, width: 200, height: 20, type: 'stone' },
        { x: 1600, y: 350, width: 300, height: 20, type: 'stone' },
      ],
      items: [
        {
          x: 250,
          y: 400,
          type: 'document',
          name: 'Decreto de Elevação à Vila',
          description: 'Documento oficial de 1890 que elevou Boa Vista à categoria de vila.',
          points: 20,
          collected: false,
          educationalText: 'Este decreto marca o reconhecimento oficial do crescimento da comunidade. A elevação à vila estabeleceu a primeira administração local organizada, com autoridades próprias e maior autonomia administrativa.',
          historicalContext: 'A transformação de fazenda em vila foi o primeiro passo para se tornar cidade. Isso aconteceu devido ao crescimento populacional e à importância econômica crescente da região na criação de gado.',
          trivia: 'Para ser elevada à vila, uma localidade precisava ter um número mínimo de habitantes e atividade econômica significativa.'
        },
        {
          x: 700,
          y: 350,
          type: 'artifact',
          name: 'Sino da Igreja do Divino Espírito Santo',
          description: 'Sino de bronze importado que chamava os fiéis para as missas na primeira igreja da vila.',
          points: 18,
          collected: false,
          educationalText: 'A igreja era o centro da vida social da vila. Este sino não só chamava para as missas, mas também anunciava eventos importantes, nascimentos, mortes e festividades. Era o meio de comunicação mais eficaz da época.',
          historicalContext: 'A religião católica foi fundamental na organização social das primeiras comunidades brasileiras. A igreja servia como escola, centro de reuniões e ponto de encontro da comunidade.',
          trivia: 'O sino foi trazido de barco pelo Rio Branco, uma viagem que podia durar semanas dependendo das condições do rio.'
        },
        {
          x: 1000,
          y: 320,
          type: 'artifact',
          name: 'Âncora do Vapor Rio Branco',
          description: 'Âncora de ferro dos primeiros barcos a vapor que conectaram Boa Vista ao mundo exterior.',
          points: 22,
          collected: false,
          educationalText: 'Os barcos a vapor revolucionaram a vida em Boa Vista. Eles conectaram a vila ao resto do Brasil via Rio Branco, trazendo mercadorias, pessoas, notícias e modernidade para a região isolada.',
          historicalContext: 'A navegação fluvial foi a primeira "estrada" de Boa Vista para o mundo. Antes dos barcos a vapor, a comunicação com outras regiões era extremamente difícil e demorada.',
          trivia: 'A viagem de barco a vapor de Boa Vista até Manaus levava cerca de 15 dias, mas era muito mais rápida que qualquer outra forma de transporte da época.'
        },
        {
          x: 1400,
          y: 350,
          type: 'coin',
          name: 'Réis do Período Imperial',
          description: 'Moeda de bronze do Império do Brasil, usada no comércio da vila.',
          points: 15,
          collected: false,
          educationalText: 'Esta moeda representa o início do comércio organizado na vila. Antes, muito era feito por escambo (troca direta), mas o crescimento trouxe a necessidade de uma economia monetária.',
          historicalContext: 'O desenvolvimento do comércio foi essencial para o crescimento urbano. A vila começou a atrair comerciantes, artesãos e prestadores de serviços, diversificando a economia local.',
          trivia: 'O real (réis no plural) foi a moeda brasileira por mais de 500 anos, desde o período colonial até 1994!'
        }
      ],
      enemies: [
        { x: 400, y: 500, type: 'explorer', name: 'Explorador Fantasmagórico', health: 2, damage: 1, movePattern: 'patrol' },
        { x: 1100, y: 500, type: 'explorer', name: 'Explorador Fantasmagórico', health: 2, damage: 1, movePattern: 'patrol' },
        { x: 1700, y: 500, type: 'explorer', name: 'Explorador Fantasmagórico', health: 2, damage: 1, movePattern: 'patrol' },
      ]
    },
    CAPITAL_1940: {
      id: 'capital_1940',
      name: 'Capital do Território Federal (1943-1988)',
      background: capital1940,
      description: 'A modernização e o planejamento urbano radial',
      colors: {
        primary: '#003366',
        secondary: '#DAA520',
        accent: '#F8F8FF'
      },
      platforms: [
        { x: 0, y: 550, width: 2000, height: 50, type: 'stone' },
        { x: 150, y: 450, width: 250, height: 20, type: 'stone' },
        { x: 500, y: 400, width: 300, height: 20, type: 'stone' },
        { x: 900, y: 350, width: 200, height: 20, type: 'stone' },
        { x: 1200, y: 300, width: 250, height: 20, type: 'stone' },
        { x: 1500, y: 250, width: 300, height: 20, type: 'stone' },
        { x: 1850, y: 200, width: 150, height: 20, type: 'stone' },
      ],
      items: [
        {
          x: 200,
          y: 400,
          type: 'document',
          name: 'Decreto-Lei nº 5.812 de 1943',
          description: 'Documento que criou o Território Federal de Roraima, elevando Boa Vista à capital.',
          points: 25,
          collected: false,
          educationalText: 'Este decreto do presidente Getúlio Vargas criou territórios federais para integrar regiões estratégicas do Brasil. Boa Vista ganhou importância nacional como capital territorial, recebendo investimentos e atenção do governo federal.',
          historicalContext: 'A criação do território foi estratégica para proteger as fronteiras norte do Brasil durante a Segunda Guerra Mundial. O governo queria maior controle sobre regiões fronteiriças consideradas vulneráveis.',
          trivia: 'Getúlio Vargas criou cinco territórios federais em 1943: Amapá, Roraima, Rondônia, Acre e Fernando de Noronha.'
        },
        {
          x: 600,
          y: 350,
          type: 'artifact',
          name: 'Planta Urbana Radial Original',
          description: 'Projeto urbanístico de 1944 que criou o famoso design radial de Boa Vista.',
          points: 30,
          collected: false,
          educationalText: 'Boa Vista foi uma das primeiras cidades planejadas do Brasil. O design radial, com avenidas saindo do centro como raios de uma roda, foi inovador e diferenciou a cidade de outras que cresceram sem planejamento.',
          historicalContext: 'O planejamento urbano foi parte da modernização trazida pelo status de capital territorial. Arquitetos e urbanistas foram trazidos para criar uma cidade moderna e funcional.',
          trivia: 'O centro cívico de Boa Vista foi inspirado em cidades europeias e americanas, sendo um dos primeiros exemplos de urbanismo moderno na Amazônia.'
        },
        {
          x: 1000,
          y: 320,
          type: 'artifact',
          name: 'Distintivo dos Servidores Territoriais',
          description: 'Distintivo oficial dos primeiros funcionários públicos federais do território.',
          points: 20,
          collected: false,
          educationalText: 'A chegada de funcionários federais de todo o Brasil trouxe conhecimento, modernização e profissionalização dos serviços públicos. Eles estabeleceram escolas, hospitais e repartições modernas.',
          historicalContext: 'A administração federal profissionalizou os serviços públicos locais. Chegaram médicos, professores, engenheiros e administradores que modernizaram a região.',
          trivia: 'Muitas famílias tradicionais de Boa Vista descendem desses funcionários federais que vieram trabalhar no território na década de 1940.'
        },
        {
          x: 1300,
          y: 250,
          type: 'radio',
          name: 'Rádio Roraima dos Anos 1940',
          description: 'Aparelho de rádio que conectava Boa Vista ao Brasil através das ondas radiofônicas.',
          points: 18,
          collected: false,
          educationalText: 'O rádio foi a primeira forma de comunicação rápida com o resto do país. Transmitia notícias, música, programas educativos e mantinha a população informada sobre os acontecimentos nacionais e mundiais.',
          historicalContext: 'As comunicações foram fundamentais para integrar Roraima ao Brasil. O rádio quebrou o isolamento secular da região, trazendo informação e cultura nacional.',
          trivia: 'A Rádio Roraima foi uma das primeiras emissoras da região Norte, sendo fundamental para a integração cultural da região.'
        }
      ],
      enemies: [
        { x: 350, y: 500, type: 'shadow', name: 'Sombra da Modernização', health: 3, damage: 2, movePattern: 'chase' },
        { x: 800, y: 500, type: 'shadow', name: 'Sombra da Modernização', health: 3, damage: 2, movePattern: 'chase' },
        { x: 1400, y: 500, type: 'shadow', name: 'Sombra da Modernização', health: 3, damage: 2, movePattern: 'chase' },
      ]
    },
    BOA_VISTA_MODERNA: {
      id: 'boa_vista_moderna',
      name: 'Estado de Roraima (1988-Presente)',
      background: boaVistaModerna,
      description: 'A cidade contemporânea: tecnologia, educação e sustentabilidade',
      colors: {
        primary: '#0066CC',
        secondary: '#00CC66',
        accent: '#FF6600'
      },
      platforms: [
        { x: 0, y: 550, width: 2000, height: 50, type: 'stone' },
        { x: 100, y: 450, width: 200, height: 20, type: 'stone' },
        { x: 400, y: 400, width: 250, height: 20, type: 'stone' },
        { x: 750, y: 350, width: 200, height: 20, type: 'stone' },
        { x: 1050, y: 300, width: 250, height: 20, type: 'stone' },
        { x: 1400, y: 250, width: 200, height: 20, type: 'stone' },
        { x: 1700, y: 200, width: 300, height: 20, type: 'stone' },
      ],
      items: [
        {
          x: 150,
          y: 400,
          type: 'document',
          name: 'Constituição do Estado de Roraima',
          description: 'Constituição estadual de 1989 que organizou o estado mais jovem do Brasil.',
          points: 25,
          collected: false,
          educationalText: 'Este documento marca a autonomia política de Roraima. A Constituição de 1988 transformou o território em estado, e a constituição estadual estabeleceu direitos, deveres e a organização política local.',
          historicalContext: 'Roraima é o estado mais novo do Brasil, criado pela Constituição de 1988. Isso trouxe maior autonomia política, recursos federais e representação no Congresso Nacional.',
          trivia: 'Roraima foi o último território a se tornar estado no Brasil, completando a atual configuração de 26 estados e 1 distrito federal.'
        },
        {
          x: 500,
          y: 350,
          type: 'artifact',
          name: 'Maquete da Orla Taumanan',
          description: 'Miniatura do complexo turístico e de lazer que se tornou cartão postal da cidade.',
          points: 20,
          collected: false,
          educationalText: 'A Orla Taumanan transformou a relação da cidade com o Rio Branco. Criou um espaço de lazer, cultura e turismo, mostrando como o planejamento urbano moderno valoriza a qualidade de vida.',
          historicalContext: 'O planejamento urbano moderno valoriza espaços públicos e qualidade de vida. A orla representa a Boa Vista contemporânea, que busca equilibrar desenvolvimento e bem-estar.',
          trivia: '"Taumanan" significa "grande" na língua indígena macuxi, homenageando os povos originários da região.'
        },
        {
          x: 850,
          y: 320,
          type: 'diploma',
          name: 'Diploma da UFRR',
          description: 'Primeiro diploma emitido pela Universidade Federal de Roraima em 1989.',
          points: 22,
          collected: false,
          educationalText: 'A criação da universidade federal marcou o desenvolvimento educacional e científico do estado. Formou profissionais locais e desenvolveu pesquisas sobre a Amazônia e questões regionais.',
          historicalContext: 'A educação superior foi fundamental para formar profissionais locais e desenvolver pesquisa na região. A UFRR se tornou centro de conhecimento sobre a Amazônia setentrional.',
          trivia: 'A UFRR desenvolve pesquisas importantes sobre biodiversidade amazônica, povos indígenas e sustentabilidade.'
        },
        {
          x: 1200,
          y: 270,
          type: 'solar',
          name: 'Painel Solar da Sustentabilidade',
          description: 'Placa fotovoltaica representando o compromisso com energia limpa e sustentabilidade.',
          points: 18,
          collected: false,
          educationalText: 'Boa Vista investe em energia solar aproveitando sua localização privilegiada próxima à linha do Equador. Representa o compromisso com sustentabilidade e tecnologias limpas.',
          historicalContext: 'Roraima tem grande potencial para energia solar devido à localização geográfica. O estado busca diversificar sua matriz energética com fontes renováveis.',
          trivia: 'Roraima recebe radiação solar intensa durante todo o ano, sendo ideal para geração de energia fotovoltaica.'
        },
        {
          x: 1500,
          y: 200,
          type: 'artifact',
          name: 'Marco da Tríplice Fronteira',
          description: 'Marco geodésico que delimita a fronteira Brasil-Venezuela-Guiana.',
          points: 25,
          collected: false,
          educationalText: 'Boa Vista é a única capital brasileira que faz fronteira com dois países. Isso traz desafios únicos de integração, comércio, imigração e cooperação internacional.',
          historicalContext: 'A posição geográfica estratégica faz de Boa Vista um portal de integração sul-americana. A cidade recebe imigrantes e é centro de comércio internacional.',
          trivia: 'Do centro de Boa Vista, é possível chegar à Venezuela em 1 hora e à Guiana em 2 horas de carro!'
        }
      ],
      enemies: [
        { x: 300, y: 500, type: 'ghost', name: 'Fantasma do Passado', health: 4, damage: 2, movePattern: 'teleport' },
        { x: 900, y: 500, type: 'ghost', name: 'Fantasma do Passado', health: 4, damage: 2, movePattern: 'teleport' },
        { x: 1600, y: 500, type: 'ghost', name: 'Fantasma do Passado', health: 4, damage: 2, movePattern: 'teleport' },
      ]
    }
  };

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
  const [showEducationalPopup, setShowEducationalPopup] = useState(false)
  const [currentEducationalItem, setCurrentEducationalItem] = useState(null)
  
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
    // Usar popup educativo ao invés de alert
    setCurrentEducationalItem({
      name: 'Desafio Histórico Concluído!',
      description: `Você ganhou ${points} pontos de conhecimento!`,
      educationalText: 'Parabéns por completar este desafio histórico! Cada puzzle resolvido aumenta seu conhecimento sobre a fascinante história de Boa Vista.',
      historicalContext: 'Os desafios históricos testam seu aprendizado sobre os diferentes períodos da história de Boa Vista, desde a fazenda colonial até a moderna capital de estado.',
      trivia: 'Continue explorando para descobrir mais segredos da história de Roraima!',
      points: points,
      type: 'achievement'
    });
    setShowEducationalPopup(true);
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
    console.log('🔍 App.handleItemCollect chamado:', { index, item });
    
    // Verificar se o item já foi coletado
    const itemKey = `${currentEra.id}_${index}`;
    if (collectedItems.includes(itemKey)) {
      console.log('Item já coletado:', itemKey);
      return;
    }
    
    // Marcar item como coletado
    setCollectedItems(prev => [...prev, itemKey]);
    
    // Adicionar ao inventário
    setInventory(prev => [...prev, { ...item, era: currentEra.name }]);
    
    // Mostrar popup educativo ao invés de alert
    setCurrentEducationalItem(item);
    setShowEducationalPopup(true);
    
    console.log('✅ Item coletado com sucesso:', item.name);
  }
  
  const handleInventoryToggle = () => {
    setShowInventory(!showInventory)
  }
  
  const handleCharacterChange = (index) => {
    setCurrentCharacterIndex(index)
  }
  
  const handleExitReached = () => {
    handleNextEra()
  }

  const handleEducationalPopupClose = () => {
    setShowEducationalPopup(false);
    setCurrentEducationalItem(null);
  }

  // Error boundary render
  if (hasError) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h1>🎮 Mistérios de Roraima</h1>
        <p>Ops! Algo deu errado. Recarregue a página para tentar novamente.</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '20px'
          }}
        >
          🔄 Recarregar Jogo
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      {gameState === GAME_STATES.MENU && (
        <MainMenu onStartGame={handleStartGame} />
      )}
      
      {gameState === GAME_STATES.INTRO && (
        <GameIntro 
          era={currentEra}
          character={CHARACTERS[currentCharacterIndex]}
          onContinue={handleContinueFromIntro}
        />
      )}
      
      {gameState === GAME_STATES.PLAYING && (
        <>
          <GameHUD 
            character={CHARACTERS[currentCharacterIndex]}
            era={currentEra}
            health={health}
            energy={energy}
            knowledge={knowledge}
            progress={progress}
            onInventoryClick={handleInventoryToggle}
            onDialogueClick={handleDialogueClick}
            onChallengeClick={handleChallengeClick}
            onCharacterChange={handleCharacterChange}
            characters={CHARACTERS}
            currentCharacterIndex={currentCharacterIndex}
          />
          
          <GameLevel 
            era={currentEra}
            character={CHARACTERS[currentCharacterIndex]}
            onItemCollect={handleItemCollect}
            onExitReached={handleExitReached}
            collectedItems={collectedItems}
          />
        </>
      )}
      
      {gameState === GAME_STATES.VICTORY && (
        <VictoryScreen 
          finalKnowledge={knowledge}
          collectedItems={inventory}
          onRestart={() => {
            setGameState(GAME_STATES.MENU)
            setCurrentEraIndex(0)
            setProgress(0)
            setKnowledge(0)
            setInventory([])
            setCollectedItems([])
          }}
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
      
      {showInventory && (
        <Inventory 
          items={inventory}
          knowledge={knowledge}
          onClose={handleInventoryToggle}
        />
      )}
      
      {showPuzzle && (
        <HistoricalPuzzle
          era={currentEra}
          onComplete={handlePuzzleComplete}
          onClose={handlePuzzleClose}
        />
      )}

      {showEducationalPopup && (
        <EducationalPopup
          isOpen={showEducationalPopup}
          item={currentEducationalItem}
          onClose={handleEducationalPopupClose}
          onKnowledgeGain={handleKnowledgeGain}
        />
      )}
      
      {/* Rodapé com controles e logos */}
      <GameFooter />
    </div>
  )
}

export default App

