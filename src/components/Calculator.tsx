import React, { useState } from 'react';
import { Calculator as CalcIcon, Delete, Plus, Minus, X, Divide, Equal } from 'lucide-react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const buttons = [
    { label: 'C', action: clear, className: 'bg-red-500 hover:bg-red-600 text-white col-span-2' },
    { label: '⌫', action: () => setDisplay(display.slice(0, -1) || '0'), className: 'bg-gray-500 hover:bg-gray-600 text-white' },
    { label: '/', action: () => performOperation('/'), className: 'bg-blue-500 hover:bg-blue-600 text-white', icon: Divide },
    
    { label: '7', action: () => inputNumber('7'), className: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300' },
    { label: '8', action: () => inputNumber('8'), className: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300' },
    { label: '9', action: () => inputNumber('9'), className: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300' },
    { label: '*', action: () => performOperation('*'), className: 'bg-blue-500 hover:bg-blue-600 text-white', icon: X },
    
    { label: '4', action: () => inputNumber('4'), className: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300' },
    { label: '5', action: () => inputNumber('5'), className: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300' },
    { label: '6', action: () => inputNumber('6'), className: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300' },
    { label: '-', action: () => performOperation('-'), className: 'bg-blue-500 hover:bg-blue-600 text-white', icon: Minus },
    
    { label: '1', action: () => inputNumber('1'), className: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300' },
    { label: '2', action: () => inputNumber('2'), className: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300' },
    { label: '3', action: () => inputNumber('3'), className: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300' },
    { label: '+', action: () => performOperation('+'), className: 'bg-blue-500 hover:bg-blue-600 text-white', icon: Plus },
    
    { label: '0', action: () => inputNumber('0'), className: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 col-span-2' },
    { label: '.', action: inputDecimal, className: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300' },
    { label: '=', action: handleEquals, className: 'bg-green-500 hover:bg-green-600 text-white', icon: Equal },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calculator</h1>
          <p className="text-gray-600 mt-1">Calculator integrat pentru calcule rapide</p>
        </div>
        <CalcIcon className="w-8 h-8 text-blue-600" />
      </div>

      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          {/* Display */}
          <div className="mb-4">
            <div className="bg-gray-900 text-white p-4 rounded-lg text-right">
              <div className="text-3xl font-mono font-bold overflow-hidden">
                {display}
              </div>
              {operation && previousValue !== null && (
                <div className="text-sm text-gray-400 mt-1">
                  {previousValue} {operation}
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {buttons.map((button, index) => {
              const Icon = button.icon;
              return (
                <button
                  key={index}
                  onClick={button.action}
                  className={`h-12 rounded-lg font-semibold transition-colors flex items-center justify-center ${button.className}`}
                >
                  {Icon ? <Icon className="w-5 h-5" /> : button.label}
                </button>
              );
            })}
          </div>

          {/* Quick calculations */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Calcule rapide</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDisplay(String(Math.sqrt(parseFloat(display))))}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
              >
                √x
              </button>
              <button
                onClick={() => setDisplay(String(Math.pow(parseFloat(display), 2)))}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
              >
                x²
              </button>
              <button
                onClick={() => setDisplay(String(parseFloat(display) / 100))}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
              >
                %
              </button>
              <button
                onClick={() => setDisplay(String(-parseFloat(display)))}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
              >
                ±
              </button>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Istoric calcule</h3>
          <div className="text-sm text-gray-500">
            <p>Calculele recente vor apărea aici...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;