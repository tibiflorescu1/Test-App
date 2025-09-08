import React, { useState } from 'react';
import { Plus, Edit, Trash2, Car, Bike, Truck } from 'lucide-react';

// Mock data inline
const mockVehicleModels = [
  {
    id: '1',
    name: 'BMW X5',
    category: 'ATV' as const,
    years: '2019-2023',
    basePrice: 2500,
    coverageTypes: [
      { id: 'full', name: 'Acoperire completă', description: 'Protecție completă pentru vehicul' },
      { id: 'partial', name: 'Acoperire parțială', description: 'Protecție pentru zonele principale' }
    ],
    extraOptions: [
      { id: 'mirrors', name: 'Oglinzi', price: 150 },
      { id: 'handles', name: 'Mânere', price: 100 }
    ]
  },
  {
    id: '2',
    name: 'Audi Q7',
    category: 'SSV' as const,
    years: '2020-2024',
    basePrice: 2800,
    coverageTypes: [
      { id: 'full', name: 'Acoperire completă', description: 'Protecție completă pentru vehicul' },
      { id: 'partial', name: 'Acoperire parțială', description: 'Protecție pentru zonele principale' }
    ],
    extraOptions: [
      { id: 'mirrors', name: 'Oglinzi', price: 180 },
      { id: 'handles', name: 'Mânere', price: 120 }
    ]
  }
];

const ModelsTab: React.FC = () => {
  const [models, setModels] = useState(mockVehicleModels);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || model.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Motocicleta': return Bike;
      case 'ATV': return Car;
      case 'SSV': return Truck;
      default: return Car;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Motocicleta': return 'bg-blue-100 text-blue-800';
      case 'ATV': return 'bg-green-100 text-green-800';
      case 'SSV': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestiune Modele</h2>
          <p className="text-gray-600">Administrează modelele de vehicule disponibile</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Adaugă Model</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Caută modele..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Toate categoriile</option>
            <option value="Motocicleta">Motociclete</option>
            <option value="ATV">ATV-uri</option>
            <option value="SSV">SSV-uri</option>
          </select>
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => {
          const Icon = getCategoryIcon(model.category);
          return (
            <div key={model.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{model.name}</h3>
                    <p className="text-sm text-gray-500">{model.years}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(model.category)}`}>
                  {model.category}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Preț de bază:</span>
                  <span className="text-lg font-bold text-blue-600">{model.basePrice} RON</span>
                </div>

                {model.extraOptions.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Opțiuni extra:</p>
                    <div className="space-y-1">
                      {model.extraOptions.slice(0, 2).map((option) => (
                        <div key={option.id} className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">{option.name}</span>
                          <span className="text-gray-900 font-medium">+{option.price} RON</span>
                        </div>
                      ))}
                      {model.extraOptions.length > 2 && (
                        <p className="text-xs text-gray-500">+{model.extraOptions.length - 2} opțiuni...</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {model.coverageTypes.length} tipuri acoperire
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 p-1">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredModels.length === 0 && (
        <div className="text-center py-12">
          <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Nu au fost găsite modele.</p>
        </div>
      )}
    </div>
  );
};

export default ModelsTab;