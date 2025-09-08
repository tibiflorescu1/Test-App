export interface VehicleModel {
  id: string;
  name: string;
  category: 'ATV' | 'SSV' | 'Motocicleta';
  years: string;
  basePrice: number;
  coverageTypes: CoverageType[];
  extraOptions: ExtraOption[];
}

export interface CoverageType {
  id: string;
  name: string;
  description: string;
}

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
}

export interface PrintMaterial {
  id: string;
  name: string;
  percentage: number;
  allowsWhitePrint: boolean;
  whitePrintSettings?: {
    enabled: boolean;
    additionalCost: number;
  };
}

export interface LaminationMaterial {
  id: string;
  name: string;
  calculationType: 'percentage' | 'fixed';
  value: number;
}

export interface QuoteCalculation {
  selectedModel: VehicleModel;
  selectedCoverage: CoverageType;
  selectedExtras: ExtraOption[];
  selectedPrintMaterial: PrintMaterial;
  selectedLaminationMaterial: LaminationMaterial;
  whitePrintEnabled: boolean;
  subtotal: number;
  printCost: number;
  laminationCost: number;
  whitePrintCost: number;
  total: number;
}