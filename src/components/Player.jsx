import { useState, useEffect, useRef } from 'react';

// Importar assets dos personagens
import anaImg from '../assets/personagens/ana-personagem.png';
import lucasImg from '../assets/personagens/lucas-personagem.png';
import sofiaImg from '../assets/personagens/sofia-personagem.png';
import zeImg from '../assets/personagens/ze-papagaio.png';

// Constantes de física
const GRAVITY = 0.6;
const JUMP_FORCE = -15;
const MOVE_SPEED = 5;
const FRICTION = 0.85;

export default function Player({ 
  character, 
  initialPosition = { x: 100, y: 100 },
  boundaries = { left: 0, right: 800, top: 0, bottom: 600 },
  platforms = [],
  onPositionChange,
  onInventoryToggle,
  onEnergyChange,
  onUseItem
}) {
  // Estado do jogador
  const [position, setPosition] = useState(initialPosition);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [isGrounded, setIsGrounded] = useState(false);
  const [facingDirection, setFacingDirection] = useState('right');
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  
  // Referências para teclas pressionadas
  const keysPressed = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
    i: false,
    q: false
  });
  
  // Carregar imagem do personagem com caminho correto
  const getCharacterImage = (character) => {
    try {
      switch(character) {
        case 'ana':
          return anaImg;
        case 'lucas':
          return lucasImg;
        case 'sofia':
          return sofiaImg;
        case 'ze':
          return zeImg;
        default:
          return anaImg;
      }
    } catch (error) {
      console.error('Erro ao carregar imagem do personagem:', error);
      return null;
    }
  };
  
  const characterImage = getCharacterImage(character);
  
  // Configurar event listeners para controles
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevenir comportamento padrão das teclas
      if (['w', 'a', 's', 'd', ' ', 'i', 'q'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
      
      switch (e.key.toLowerCase()) {
        case 'w':
          keysPressed.current.w = true;
          break;
        case 'a':
          keysPressed.current.a = true;
          setFacingDirection('left');
          break;
        case 's':
          keysPressed.current.s = true;
          break;
        case 'd':
          keysPressed.current.d = true;
          setFacingDirection('right');
          break;
        case ' ':
          keysPressed.current.space = true;
          if (isGrounded) {
            setVelocity(prev => ({ ...prev, y: JUMP_FORCE }));
            setIsJumping(true);
            setIsGrounded(false);
            
            // Consumir energia ao pular
            if (onEnergyChange) {
              onEnergyChange(-5);
            }
          }
          break;
        case 'i':
          keysPressed.current.i = true;
          if (onInventoryToggle) {
            onInventoryToggle();
          }
          break;
        case 'q':
          keysPressed.current.q = true;
          if (onUseItem) {
            onUseItem();
          }
          break;
        default:
          break;
      }
    };
    
    const handleKeyUp = (e) => {
      // Prevenir comportamento padrão das teclas
      if (['w', 'a', 's', 'd', ' ', 'i', 'q'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
      
      switch (e.key.toLowerCase()) {
        case 'w':
          keysPressed.current.w = false;
          break;
        case 'a':
          keysPressed.current.a = false;
          break;
        case 's':
          keysPressed.current.s = false;
          break;
        case 'd':
          keysPressed.current.d = false;
          break;
        case ' ':
          keysPressed.current.space = false;
          break;
        case 'i':
          keysPressed.current.i = false;
          break;
        case 'q':
          keysPressed.current.q = false;
          break;
        default:
          break;
      }
    };
    
    // Adicionar listeners com captura para garantir que funcionem
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('keyup', handleKeyUp, true);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('keyup', handleKeyUp, true);
    };
  }, [isGrounded]);
  
  // Loop de física do jogo
  useEffect(() => {
    const gameLoop = setInterval(() => {
      // Aplicar movimento horizontal
      let newVelocityX = velocity.x;
      
      if (keysPressed.current.a) {
        newVelocityX = -MOVE_SPEED;
        setCurrentAnimation('run');
        
        // Consumir energia ao correr
        if (onEnergyChange) {
          onEnergyChange(-0.1);
        }
      } else if (keysPressed.current.d) {
        newVelocityX = MOVE_SPEED;
        setCurrentAnimation('run');
        
        // Consumir energia ao correr
        if (onEnergyChange) {
          onEnergyChange(-0.1);
        }
      } else {
        newVelocityX *= FRICTION;
        if (Math.abs(newVelocityX) < 0.1) newVelocityX = 0;
        setCurrentAnimation(isJumping ? 'jump' : 'idle');
      }
      
      // Aplicar gravidade
      let newVelocityY = velocity.y + GRAVITY;
      
      // Calcular nova posição
      let newPositionX = position.x + newVelocityX;
      let newPositionY = position.y + newVelocityY;
      
      // Verificar colisões com limites do mundo
      if (newPositionX < boundaries.left) {
        newPositionX = boundaries.left;
        newVelocityX = 0;
      } else if (newPositionX > boundaries.right) {
        newPositionX = boundaries.right;
        newVelocityX = 0;
      }
      
      // Verificar colisões com plataformas
      let onGround = false;
      for (const platform of platforms) {
        // Verificar se o jogador está acima da plataforma e caindo
        if (
          position.y + 64 <= platform.y && // Estava acima da plataforma
          newPositionY + 64 >= platform.y && // Vai colidir com a plataforma
          newPositionX + 32 >= platform.x && // Está dentro da largura da plataforma
          newPositionX <= platform.x + platform.width
        ) {
          newPositionY = platform.y - 64; // Posicionar em cima da plataforma
          newVelocityY = 0;
          onGround = true;
          break;
        }
      }
      
      // Verificar colisão com o chão
      if (newPositionY > boundaries.bottom - 64) {
        newPositionY = boundaries.bottom - 64;
        newVelocityY = 0;
        onGround = true;
      }
      
      // Atualizar estado
      setPosition({ x: newPositionX, y: newPositionY });
      setVelocity({ x: newVelocityX, y: newVelocityY });
      setIsGrounded(onGround);
      if (onGround) setIsJumping(false);
      
      // Notificar mudança de posição
      if (onPositionChange) {
        onPositionChange({ x: newPositionX, y: newPositionY });
      }
    }, 1000 / 60); // 60 FPS
    
    return () => clearInterval(gameLoop);
  }, [position, velocity, isGrounded, isJumping, boundaries, platforms, onPositionChange]);
  
  // Determinar classe de animação
  const animationClass = `player-${currentAnimation} player-facing-${facingDirection}`;
  
  return (
    <div 
      className={`player ${animationClass}`}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '64px',
        height: '64px',
        backgroundImage: characterImage ? `url(${characterImage})` : 'none',
        backgroundColor: 'transparent', // Remover debug vermelho
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        transform: facingDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
        transition: 'transform 0.1s ease',
        zIndex: 500, // Manter z-index alto
        // border: '2px solid yellow', // Remover debug amarelo
        boxSizing: 'border-box'
      }}
    >
      {/* Remover debug de posição para versão final */}
    </div>
  );
}

