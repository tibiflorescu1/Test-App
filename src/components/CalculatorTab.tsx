import React, { useState, useEffect } from 'react';
import { Car, Calculator, FileText, Download } from 'lucide-react';

// Mock data for models
const mockModels = [
  {
    id: '1',
    name: 'Yamaha YFZ450R',
    years: '2020-2024',
    basePrice: 3200,
    coverageTypes: [
      { id: 'full', name: 'Acoperire completă', description: 'Protecție completă pentru vehicul' },
      { id: 'partial', name: 'Acoperire parțială', description: 'Protecție pentru zonele principale' },
      { id: 'sport', name: 'Acoperire sport', description: 'Design sportiv cu grafică agresivă' }
    ],
    extraOptions: [
      { id: 'fenders', name: 'Aripi', price: 280 },
      { id: 'tank', name: 'Rezervor', price: 320 },
      { id: 'plastics', name: 'Carene laterale', price: 450 }
    ]
  },
  {
    id: '2',
    name: 'Can-Am Maverick X3',
    years: '2021-2024',
    basePrice: 4500,
    coverageTypes: [
      { id: 'full', name: 'Acoperire completă', description: 'Protecție completă pentru vehicul' },
      { id: 'partial', name: 'Acoperire parțială', description: 'Protecție pentru zonele principale' },
      { id: 'racing', name: 'Acoperire racing', description: 'Design pentru competiții' }
    ],
    extraOptions: [
      { id: 'doors', name: 'Uși', price: 650 },
      { id: 'hood', name: 'Capotă', price: 380 },
      { id: 'roof', name: 'Acoperiș', price: 420 },
      { id: 'bumpers', name: 'Bare protecție', price: 290 }
    ]
  },
  {
    id: '3',
    name: 'Honda CRF450R',
    years: '2019-2024',
    basePrice: 2800,
    coverageTypes: [
      { id: 'full', name: 'Acoperire completă', description: 'Protecție completă pentru vehicul' },
      { id: 'minimal', name: 'Acoperire minimă', description: 'Doar elementele esențiale' },
      { id: 'custom', name: 'Acoperire personalizată', description: 'Design unic personalizat' }
    ],
    extraOptions: [
      { id: 'tank', name: 'Rezervor', price: 250 },
      { id: 'fender', name: 'Aripa față', price: 180 },
      { id: 'shrouds', name: 'Carene radiator', price: 320 },
      { id: 'airbox', name: 'Cutie filtru aer', price: 150 }
    ]
  }
];

// Mock data for print materials
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
      additionalCost: 280,
      description: 'Print cu alb pentru culori vibrante'
    }
  },
  {
    id: '3',
    name: 'Hexis HX30000 - Vinil Premium Cast',
    percentage: 38,
    allowsWhitePrint: true,
    whitePrintSettings: {
      additionalCost: 320,
      description: 'Print cu alb pentru culori vibrante'
    }
  }
];

// Mock data for lamination materials
const mockLaminationMaterials = [
  {
    id: '1',
    name: '3M 8518 - Laminat Gloss',
    calculationType: 'percentage',
    value: 18
  },
  {
    id: '2',
    name: '3M 8519 - Laminat Matt',
    calculationType: 'percentage',
    value: 20
  },
  {
    id: '3',
    name: 'Avery DOL 1460Z - Laminat Texturat',
    calculationType: 'fixed',
    value: 680
  }
];

interface Calculation {
  selectedModel: any;
  selectedCoverage: any;
  selectedExtras: any[];
  selectedPrintMaterial: any;
  selectedLaminationMaterial: any;
  whitePrintEnabled: boolean;
  subtotal: number;
  printCost: number;
  laminationCost: number;
  whitePrintCost: number;
  total: number;
}

const CalculatorTab: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [selectedCoverage, setSelectedCoverage] = useState<string>('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [selectedPrintMaterial, setSelectedPrintMaterial] = useState<any>(null);
  const [selectedLaminationMaterial, setSelectedLaminationMaterial] = useState<any>(null);
  const [whitePrintEnabled, setWhitePrintEnabled] = useState(false);
  const [calculation, setCalculation] = useState<Calculation | null>(null);

  const calculateQuote = () => {
    if (!selectedModel || !selectedPrintMaterial || !selectedLaminationMaterial || !selectedCoverage) {
      setCalculation(null);
      return;
    }

    const coverage = selectedModel.coverageTypes.find((c: any) => c.id === selectedCoverage);
    if (!coverage) {
      setCalculation(null);
      return;
    }

    const extras = selectedModel.extraOptions.filter((option: any) => 
      selectedExtras.includes(option.id)
    );

    const subtotal = selectedModel.basePrice + extras.reduce((sum: number, extra: any) => sum + extra.price, 0);
    const printCost = (subtotal * selectedPrintMaterial.percentage) / 100;
    
    let laminationCost = 0;
    if (selectedLaminationMaterial.calculationType === 'percentage') {
      laminationCost = (subtotal * selectedLaminationMaterial.value) / 100;
    } else {
      laminationCost = selectedLaminationMaterial.value;
    }

    let whitePrintCost = 0;
    if (whitePrintEnabled && selectedPrintMaterial.allowsWhitePrint && selectedPrintMaterial.whitePrintSettings) {
      whitePrintCost = selectedPrintMaterial.whitePrintSettings.additionalCost;
    }

    const total = subtotal + printCost + laminationCost + whitePrintCost;

    setCalculation({
      selectedModel,
      selectedCoverage: coverage,
      selectedExtras: extras,
      selectedPrintMaterial,
      selectedLaminationMaterial,
      whitePrintEnabled,
      subtotal,
      printCost,
      laminationCost,
      whitePrintCost,
      total
    });
  };

  useEffect(() => {
    calculateQuote();
  }, [selectedModel, selectedCoverage, selectedExtras, selectedPrintMaterial, selectedLaminationMaterial, whitePrintEnabled]);

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Calculator className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Calculator Oferte</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Model Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Car className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Selectare Model</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model Vehicul
                </label>
                <select
                  value={selectedModel?.id || ''}
                  onChange={(e) => {
                    const model = mockModels.find(m => m.id === e.target.value);
                    setSelectedModel(model || null);
                    setSelectedCoverage('');
                    setSelectedExtras([]);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selectează modelul...</option>
                  {mockModels.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name} ({model.years})
                    </option>
                  ))}
                </select>
              </div>

              {selectedModel && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tip Acoperire
                  </label>
                  <select
                    value={selectedCoverage}
                    onChange={(e) => setSelectedCoverage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selectează acoperirea...</option>
                    {selectedModel.coverageTypes.map((coverage: any) => (
                      <option key={coverage.id} value={coverage.id}>
                        {coverage.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedModel && selectedModel.extraOptions.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Opțiuni Extra
                  </label>
                  <div className="space-y-2">
                    {selectedModel.extraOptions.map((option: any) => (
                      <label key={option.id} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedExtras.includes(option.id)}
                          onChange={() => handleExtraToggle(option.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{option.name}</span>
                        <span className="text-sm font-medium text-blue-600">+{option.price} RON</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Materials Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Selectare Materiale</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material Print
                </label>
                <select
                  value={selectedPrintMaterial?.id || ''}
                  onChange={(e) => {
                    const material = mockPrintMaterials.find(m => m.id === e.target.value);
                    setSelectedPrintMaterial(material || null);
                    if (!material?.allowsWhitePrint) {
                      setWhitePrintEnabled(false);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selectează materialul...</option>
                  {mockPrintMaterials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.name} ({material.percentage}%)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material Laminare
                </label>
                <select
                  value={selectedLaminationMaterial?.id || ''}
                  onChange={(e) => {
                    const material = mockLaminationMaterials.find(m => m.id === e.target.value);
                    setSelectedLaminationMaterial(material || null);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selectează materialul...</option>
                  {mockLaminationMaterials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.name} ({material.calculationType === 'percentage' ? `${material.value}%` : `${material.value} RON`})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedPrintMaterial?.allowsWhitePrint && (
              <div className="mt-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={whitePrintEnabled}
                    onChange={(e) => setWhitePrintEnabled(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Print cu alb</span>
                  {selectedPrintMaterial.whitePrintSettings && (
                    <span className="text-sm font-medium text-blue-600">
                      +{selectedPrintMaterial.whitePrintSettings.additionalCost} RON
                    </span>
                  )}
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Quote Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Rezumat Ofertă</h3>
            </div>

            {calculation ? (
              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-200">
                  <h4 className="font-medium text-gray-900">{calculation.selectedModel.name}</h4>
                  <p className="text-sm text-gray-600">{calculation.selectedCoverage.name}</p>
                  <p className="text-sm text-gray-500">{calculation.selectedModel.years}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Preț de bază:</span>
                    <span className="text-sm font-medium">{calculation.selectedModel.basePrice} RON</span>
                  </div>

                  {calculation.selectedExtras.length > 0 && (
                    <>
                      {calculation.selectedExtras.map((extra) => (
                        <div key={extra.id} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{extra.name}:</span>
                          <span className="text-sm font-medium">+{extra.price} RON</span>
                        </div>
                      ))}
                    </>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Subtotal:</span>
                    <span className="text-sm font-bold">{calculation.subtotal} RON</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {calculation.selectedPrintMaterial.name} ({calculation.selectedPrintMaterial.percentage}%):
                    </span>
                    <span className="text-sm font-medium">+{calculation.printCost.toFixed(2)} RON</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {calculation.selectedLaminationMaterial.name}:
                    </span>
                    <span className="text-sm font-medium">+{calculation.laminationCost.toFixed(2)} RON</span>
                  </div>

                  {calculation.whitePrintEnabled && calculation.whitePrintCost > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Print cu alb:</span>
                      <span className="text-sm font-medium">+{calculation.whitePrintCost} RON</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t-2 border-blue-200">
                    <span className="text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-xl font-bold text-blue-600">{calculation.total.toFixed(2)} RON</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors mt-6">
                  <Download className="w-4 h-4" />
                  <span>Descarcă Oferta</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Selectează modelul și materialele pentru a calcula oferta</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorTab;