import React, { useState } from 'react';
import { X, Info } from 'lucide-react';

// Componente para o sistema de inventário
export default function Inventory({ 
  items = [], 
  onClose, 
  onUseItem 
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  
  // Filtrar itens por categoria
  const filteredItems = activeTab === 'all' 
    ? items 
    : items.filter(item => item.type === activeTab);
  
  // Determinar o ícone com base no tipo de item
  const getItemIcon = (type) => {
    switch (type) {
      case 'artifact':
        return '🏺';
      case 'document':
        return '📜';
      case 'tool':
        return '🔧';
      case 'book':
        return '📚';
      case 'relic':
        return '✨';
      default:
        return '❓';
    }
  };
  
  // Função para usar um item
  const handleUseItem = (item) => {
    if (onUseItem) {
      onUseItem(item);
    }
    setSelectedItem(null);
  };
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Inventário</h2>
          <button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Abas de categorias */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          <button 
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            className="whitespace-nowrap"
          >
            Todos os Itens
          </button>
          <button 
            variant={activeTab === 'artifact' ? 'default' : 'outline'}
            onClick={() => setActiveTab('artifact')}
            className="whitespace-nowrap"
          >
            🏺 Artefatos
          </button>
          <button 
            variant={activeTab === 'document' ? 'default' : 'outline'}
            onClick={() => setActiveTab('document')}
            className="whitespace-nowrap"
          >
            📜 Documentos
          </button>
          <button 
            variant={activeTab === 'tool' ? 'default' : 'outline'}
            onClick={() => setActiveTab('tool')}
            className="whitespace-nowrap"
          >
            🔧 Ferramentas
          </button>
          <button 
            variant={activeTab === 'book' ? 'default' : 'outline'}
            onClick={() => setActiveTab('book')}
            className="whitespace-nowrap"
          >
            📚 Livros
          </button>
          <button 
            variant={activeTab === 'relic' ? 'default' : 'outline'}
            onClick={() => setActiveTab('relic')}
            className="whitespace-nowrap"
          >
            ✨ Relíquias
          </button>
        </div>
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">🔍</div>
            <p>Nenhum item {activeTab !== 'all' ? 'desta categoria' : ''} encontrado. Explore os níveis para encontrar itens!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item, index) => (
              <div 
                key={`inv-item-${index}`}
                className={`bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer ${selectedItem === item ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setSelectedItem(item === selectedItem ? null : item)}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="text-2xl">
                    {getItemIcon(item.type)}
                  </div>
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <div className="text-xs text-blue-600 font-semibold">+{item.points || 0} pontos de conhecimento</div>
              </div>
            ))}
          </div>
        )}
        
        {/* Detalhes do item selecionado */}
        {selectedItem && (
          <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-start space-x-4">
              <div className="text-4xl bg-white p-4 rounded-xl shadow-sm">
                {getItemIcon(selectedItem.type)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedItem.name}</h3>
                <p className="text-gray-600 mb-4">{selectedItem.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {selectedItem.type === 'artifact' ? 'Artefato' : 
                     selectedItem.type === 'document' ? 'Documento' :
                     selectedItem.type === 'tool' ? 'Ferramenta' :
                     selectedItem.type === 'book' ? 'Livro' :
                     selectedItem.type === 'relic' ? 'Relíquia' : 'Item'}
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    +{selectedItem.points || 0} conhecimento
                  </div>
                  {selectedItem.era && (
                    <div className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {selectedItem.era}
                    </div>
                  )}
                </div>
                
                {selectedItem.usable && (
                  <button 
                    onClick={() => handleUseItem(selectedItem)}
                    className="bg-gradient-to-r from-blue-500 to-green-500 text-white"
                  >
                    Usar Item
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Estatísticas do inventário */}
        <div className="mt-6 flex justify-between text-sm text-gray-500">
          <div>Total de itens: {items.length}</div>
          <div>Pontos de conhecimento: {items.reduce((total, item) => total + (item.points || 0), 0)}</div>
        </div>
      </div>
    </div>
  );
}

