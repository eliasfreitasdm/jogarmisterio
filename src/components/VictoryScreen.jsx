import React from 'react';
import anaImg from '../assets/personagens/ana-personagem.png';
import lucasImg from '../assets/personagens/lucas-personagem.png';
import sofiaImg from '../assets/personagens/sofia-personagem.png';
import zeImg from '../assets/personagens/ze-papagaio.png';

export default function VictoryScreen({ knowledge, onRestart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex items-center justify-center">
      <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl max-w-2xl mx-4">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
          Parabéns!
        </h1>
        <h2 className="text-2xl text-gray-600 mb-8">
          Você completou a jornada através da história de Boa Vista!
        </h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Conhecimento Adquirido</h3>
          <div className="text-4xl font-bold text-blue-600 mb-2">{knowledge} pontos</div>
          <p className="text-gray-600">
            Você aprendeu muito sobre a fascinante história de Boa Vista, desde a fazenda original 
            até a moderna capital de Roraima!
          </p>
        </div>
        
        <div className="flex justify-center space-x-4 mb-8">
          <img src={anaImg} alt="Ana" className="w-16 h-16 object-contain" />
          <img src={lucasImg} alt="Lucas" className="w-16 h-16 object-contain" />
          <img src={sofiaImg} alt="Sofia" className="w-16 h-16 object-contain" />
          <img src={zeImg} alt="Zé" className="w-16 h-16 object-contain" />
        </div>
        
        <button 
          onClick={onRestart}
          className="text-xl px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-full shadow-lg"
        >
          🔄 Jogar Novamente
        </button>
      </div>
    </div>
  );
}

