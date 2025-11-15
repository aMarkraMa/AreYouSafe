/**
 * Safety thermometer to indicate the level of safety felt
 */
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { SafetyThermometer } from '@/lib/api';
import './SafetyThermometer.css';

interface SafetyThermometerProps {
  onSelect: (safety: SafetyThermometer) => void;
  selectedSafety?: SafetyThermometer;
}

const safetyLevels = [
  { level: 1, feeling: 'very_safe', label: 'Very Safe', color: '#22c55e' },
  { level: 2, feeling: 'safe', label: 'Safe', color: '#84cc16' },
  { level: 3, feeling: 'neutral', label: 'Neutral', color: '#eab308' },
  { level: 4, feeling: 'unsafe', label: 'Unsafe', color: '#f97316' },
  { level: 5, feeling: 'very_unsafe', label: 'Very Unsafe', color: '#ef4444' },
];

export function SafetyThermometerComponent({ onSelect, selectedSafety }: SafetyThermometerProps) {
  const [selected, setSelected] = useState<number>(selectedSafety?.level || 0);

  useEffect(() => {
    if (selectedSafety) {
      setSelected(selectedSafety.level);
    }
  }, [selectedSafety]);

  const handleSelect = (level: number, feeling: string) => {
    setSelected(level);
    onSelect({ level, feeling });
  };

  return (
    <div className="safety-thermometer">
      <h3 className="text-lg font-semibold mb-4">Do you feel safe at school?</h3>
      
      <div className="thermometer-container">
        <div className="thermometer-bar">
          {safetyLevels.map((safety, index) => {
            const isSelected = selected >= safety.level;
            const isActive = selected === safety.level;
            
            return (
              <div
                key={safety.level}
                className={cn(
                  'thermometer-segment',
                  isSelected && 'filled',
                  isActive && 'active'
                )}
                style={{
                  backgroundColor: isSelected ? safety.color : '#e5e7eb',
                }}
                onClick={() => handleSelect(safety.level, safety.feeling)}
              >
                <div className="segment-label">{safety.level}</div>
              </div>
            );
          })}
        </div>
        
        <div className="thermometer-labels">
          {safetyLevels.map((safety) => (
            <button
              key={safety.level}
              onClick={() => handleSelect(safety.level, safety.feeling)}
              className={cn(
                'thermometer-label-btn',
                selected === safety.level && 'active'
              )}
            >
              {safety.label}
            </button>
          ))}
        </div>
      </div>

      {selected > 0 && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Safety level: {safetyLevels[selected - 1].label}
        </p>
      )}
    </div>
  );
}

