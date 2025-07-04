import React from 'react';
import anaImg from '../assets/personagens/ana-personagem.png';
import lucasImg from '../assets/personagens/lucas-personagem.png';
import sofiaImg from '../assets/personagens/sofia-personagem.png';
import zeImg from '../assets/personagens/ze-papagaio.png';

export default function MainMenu({ onStartGame }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-green-400 to-yellow-400 flex items-center justify-center">
      <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl max-w-2xl mx-4">
        <h1 className="text-6xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Mistérios de Roraima
        </h1>
        <h2 className="text-2xl text-gray-600 mb-8">
          A Aventura Animada de Boa Vista
        </h2>
        
        <div className="flex justify-center space-x-4 mb-8">
          <img src={anaImg} alt="Ana" className="w-20 h-20 object-contain" />
          <img src={lucasImg} alt="Lucas" className="w-20 h-20 object-contain" />
          <img src={sofiaImg} alt="Sofia" className="w-20 h-20 object-contain" />
          <img src={zeImg} alt="Zé" className="w-20 h-20 object-contain" />
        </div>
        
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Junte-se a Ana, Lucas e Sofia em uma jornada mágica através da história de Boa Vista. 
          Descubra os mistérios de Roraima e aprenda sobre a fascinante evolução da capital!
        </p>
        
        <button 
          onClick={onStartGame}
          className="text-xl px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          🎮 Começar Aventura
        </button>
      </div>
    </div>
  );
}

