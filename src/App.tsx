import React, { useState } from 'react';
import { Car, Palette, Calculator } from 'lucide-react';
import ModelsTab from './components/ModelsTab';
import MaterialsTab from './components/MaterialsTab';
import CalculatorTab from './components/CalculatorTab';

function App() {
  const [activeTab, setActiveTab] = useState('models');

  const tabs = [
    { id: 'models', label: 'Modele', icon: Car },
    { id: 'materials', label: 'Materiale', icon: Palette },
    { id: 'calculator', label: 'Calculator', icon: Calculator },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'models':
        return <ModelsTab />;
      case 'materials':
        return <MaterialsTab />;
      case 'calculator':
        return <CalculatorTab />;
      default:
        return <ModelsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Grafică Vehicule</h1>
                <p className="text-sm text-gray-600">Aplicație de Gestiune și Ofertare</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              ATV • SSV • Motociclete
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              © 2024 Grafică Vehicule - Aplicație de gestiune și ofertare
            </div>
            <div className="text-sm text-gray-500">
              Versiunea 1.0.0
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;