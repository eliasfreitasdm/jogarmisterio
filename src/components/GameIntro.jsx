import React from 'react';

export default function GameIntro({ onContinue }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center text-white max-w-4xl mx-4">
        <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-12">
          <h2 className="text-4xl font-bold mb-8">Era uma tarde chuvosa em Boa Vista...</h2>
          
          <div className="text-lg leading-relaxed space-y-6 mb-8">
            <p>
              Ana, Lucas e Sofia buscavam abrigo na biblioteca municipal quando descobriram 
              um antigo livro empoeirado: <span className="text-yellow-300 font-bold">"Mistérios de Roraima"</span>.
            </p>
            <p>
              Quando abriram o livro, uma aura mágica os envolveu e as páginas começaram a brilhar intensamente...
            </p>
            <p className="text-yellow-300 text-xl font-semibold">
              ✨ A aventura através do tempo está prestes a começar! ✨
            </p>
          </div>
          
          <button 
            onClick={onContinue}
            className="text-xl px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-lg"
          >
            Continuar →
          </button>
        </div>
      </div>
    </div>
  );
}

