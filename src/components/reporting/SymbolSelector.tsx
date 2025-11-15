/**
 * Symbol selector for visual reporting
 */
import { useState, useEffect } from 'react';
import { getSymbols, type Symbol, type SymbolSelection } from '@/lib/api';
import { cn } from '@/lib/utils';
import './SymbolSelector.css';

interface SymbolSelectorProps {
  onSelect: (symbols: SymbolSelection[]) => void;
  selectedSymbols?: SymbolSelection[];
}

const categoryIcons: Record<string, string> = {
  physical: '👊',
  verbal: '💬',
  social: '👥',
  cyber: '💻',
};

export function SymbolSelector({ onSelect, selectedSymbols = [] }: SymbolSelectorProps) {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [selected, setSelected] = useState<SymbolSelection[]>(selectedSymbols);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    loadSymbols();
  }, []);

  useEffect(() => {
    onSelect(selected);
  }, [selected, onSelect]);

  const loadSymbols = async () => {
    try {
      const data = await getSymbols();
      setSymbols(data);
    } catch (error) {
      console.error('Error loading symbols:', error);
    }
  };

  const toggleSymbol = (symbol: Symbol) => {
    const isSelected = selected.some((s) => s.id === symbol.id);
    if (isSelected) {
      setSelected(selected.filter((s) => s.id !== symbol.id));
    } else {
      setSelected([...selected, { id: symbol.id, label: symbol.label, category: symbol.category }]);
    }
  };

  const categories = Array.from(new Set(symbols.map((s) => s.category)));

  const filteredSymbols = activeCategory
    ? symbols.filter((s) => s.category === activeCategory)
    : symbols;

  return (
    <div className="symbol-selector">
      <h3 className="text-lg font-semibold mb-4">What happened?</h3>

      {/* Category filters */}
      <div className="category-filters mb-4">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            'category-filter-btn',
            !activeCategory && 'active'
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              'category-filter-btn',
              activeCategory === category && 'active'
            )}
          >
            {categoryIcons[category] || '📌'} {category}
          </button>
        ))}
      </div>

      {/* Grille de symboles */}
      <div className="symbols-grid">
        {filteredSymbols.map((symbol) => {
          const isSelected = selected.some((s) => s.id === symbol.id);
          return (
            <button
              key={symbol.id}
              onClick={() => toggleSymbol(symbol)}
              className={cn(
                'symbol-card',
                isSelected && 'selected'
              )}
            >
              <div className="symbol-icon">
                {categoryIcons[symbol.category] || '📌'}
              </div>
              <div className="symbol-label">{symbol.label}</div>
            </button>
          );
        })}
      </div>

      {/* Selected symbols */}
      {selected.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium mb-2">Selected:</p>
          <div className="flex flex-wrap gap-2">
            {selected.map((symbol) => (
              <span
                key={symbol.id}
                className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm"
              >
                {symbol.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

