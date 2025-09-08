import React, { useState } from 'react';
import { Plus, Edit, Trash2, Palette, Shield, Percent, DollarSign } from 'lucide-react';

// Mock data inline
const mockPrintMaterials = [
  {
    id: '1',
    name: '3M IJ180Cv3 - Vinil Cast Premium',
    percentage: 35,
    allowsWhitePrint: false,
    whitePrintSettings: null
  },
  {
    id: '2',
    name: 'Avery Dennison MPI 1105 - Vinil Cast',
    percentage: 32,
    allowsWhitePrint: true,
    whitePrintSettings: {
      enabled: true,
      additionalCost: 280
    }
  },
  {
    id: '3',
    name: 'Oracal 3651 - Vinil Calendered',
    percentage: 22,
    allowsWhitePrint: false,
    whitePrintSettings: null
  },
  {
    id: '4',
    name: 'Hexis HX30000 - Vinil Premium Cast',
    percentage: 38,
    allowsWhitePrint: true,
    whitePrintSettings: {
      enabled: true,
      additionalCost: 320
    }
  },
  {
    id: '5',
    name: 'Arlon DPF 4500LX - Vinil Texturat',
    percentage: 42,
    allowsWhitePrint: true,
    whitePrintSettings: {
      enabled: true,
      additionalCost: 380
    }
  }
];

const mockLaminationMaterials = [
  {
    id: '1',
    name: '3M 8518 - Laminat Gloss',
    calculationType: 'percentage' as const,
    value: 18
  },
  {
    id: '2',
    name: '3M 8519 - Laminat Matt',
    calculationType: 'percentage' as const,
    value: 20
  },
  {
    id: '3',
    name: 'Avery DOL 1460Z - Laminat Texturat',
    calculationType: 'percentage' as const,
    value: 25
  },
  {
    id: '4',
    name: 'Oracal 290 - Laminat Standard',
    calculationType: 'fixed' as const,
    value: 450
  },
  {
    id: '5',
    name: 'Hexis BODYFENCE - Laminat Protecție',
    calculationType: 'fixed' as const,
    value: 680
  },
  {
    id: '6',
    name: 'Arlon SLX+ - Laminat Premium',
    calculationType: 'percentage' as const,
    value: 28
  }
];

const MaterialsTab: React.FC = () => {
  const [printMaterials, setPrintMaterials] = useState(mockPrintMaterials);
  const [laminationMaterials, setLaminationMaterials] = useState(mockLaminationMaterials);
  const [activeSection, setActiveSection] = useState<'print' | 'lamination'>('print');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestiune Materiale</h2>
          <p className="text-gray-600">Administrează materialele de print și laminare</p>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveSection('print')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeSection === 'print'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Palette className="w-4 h-4" />
              <span>Materiale Print</span>
            </div>
          </button>
          <button
            onClick={() => setActiveSection('lamination')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeSection === 'lamination'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Materiale Laminare</span>
            </div>
          </button>
        </div>

        <div className="p-6">
          {activeSection === 'print' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Materiale de Print</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Adaugă Material</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {printMaterials.map((material) => (
                  <div key={material.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Palette className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{material.name}</h4>
                          <div className="flex items-center space-x-1 mt-1">
                            <Percent className="w-3 h-3 text-gray-500" />
                            <span className="text-sm text-gray-600">{material.percentage}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button className="text-blue-600 hover:text-blue-800 p-1">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Print cu alb:</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          material.allowsWhitePrint 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {material.allowsWhitePrint ? 'Disponibil' : 'Indisponibil'}
                        </span>
                      </div>

                      {material.allowsWhitePrint && material.whitePrintSettings && (
                        <div className="bg-white rounded p-3 border border-gray-200">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Cost adițional:</span>
                            <span className="font-medium text-gray-900">
                              +{material.whitePrintSettings.additionalCost} RON
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'lamination' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Materiale de Laminare</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Adaugă Material</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {laminationMaterials.map((material) => (
                  <div key={material.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Shield className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{material.name}</h4>
                          <div className="flex items-center space-x-1 mt-1">
                            {material.calculationType === 'percentage' ? (
                              <>
                                <Percent className="w-3 h-3 text-gray-500" />
                                <span className="text-sm text-gray-600">{material.value}%</span>
                              </>
                            ) : (
                              <>
                                <DollarSign className="w-3 h-3 text-gray-500" />
                                <span className="text-sm text-gray-600">{material.value} RON</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button className="text-blue-600 hover:text-blue-800 p-1">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Tip calcul:</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          material.calculationType === 'percentage'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {material.calculationType === 'percentage' ? 'Procentual' : 'Sumă fixă'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaterialsTab;