/**
 * Body Map component to indicate where physical harassment occurred
 */
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { BodyMapSelection } from '@/lib/api';
import './BodyMap.css';

interface BodyMapProps {
  onSelect: (points: BodyMapSelection[]) => void;
  selectedPoints?: BodyMapSelection[];
}

export function BodyMap({ onSelect, selectedPoints = [] }: BodyMapProps) {
  const [points, setPoints] = useState<BodyMapSelection[]>(selectedPoints);

  useEffect(() => {
    setPoints(selectedPoints);
  }, [selectedPoints]);

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Determine approximate body part
    const bodyPart = getBodyPart(x, y);

    const newPoint: BodyMapSelection = { x, y, bodyPart };
    const newPoints = [...points, newPoint];
    setPoints(newPoints);
    onSelect(newPoints);
  };

  const getBodyPart = (x: number, y: number): string => {
    if (y < 15) return 'head';
    if (y < 25) return 'neck';
    if (y < 40) return 'chest';
    if (y < 55) return 'stomach';
    if (y < 70) return 'arms';
    if (y < 85) return 'legs';
    return 'feet';
  };

  const removePoint = (index: number) => {
    const newPoints = points.filter((_, i) => i !== index);
    setPoints(newPoints);
    onSelect(newPoints);
  };

  return (
    <div className="body-map-container">
      <h3 className="text-lg font-semibold mb-4">Where were you touched?</h3>
      <div className="body-map-wrapper">
        <svg
          viewBox="0 0 200 400"
          className="body-map-svg"
          onClick={handleClick}
        >
          {/* Simplified silhouette */}
          <ellipse cx="100" cy="50" rx="30" ry="35" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" />
          <ellipse cx="100" cy="120" rx="50" ry="60" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" />
          <ellipse cx="100" cy="220" rx="45" ry="50" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" />
          <ellipse cx="70" cy="180" rx="20" ry="60" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" />
          <ellipse cx="130" cy="180" rx="20" ry="60" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" />
          <ellipse cx="100" cy="300" rx="25" ry="80" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" />

          {/* Selected points */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={(point.x / 100) * 200}
                cy={(point.y / 100) * 400}
                r="8"
                fill="#ef4444"
                stroke="#dc2626"
                strokeWidth="2"
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  removePoint(index);
                }}
              />
              <text
                x={(point.x / 100) * 200}
                y={(point.y / 100) * 400 - 15}
                textAnchor="middle"
                fontSize="10"
                fill="#dc2626"
                fontWeight="bold"
              >
                {index + 1}
              </text>
            </g>
          ))}
        </svg>
      </div>
      {points.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Selected points:</p>
          <div className="flex flex-wrap gap-2">
            {points.map((point, index) => (
              <button
                key={index}
                onClick={() => removePoint(index)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200"
              >
                {point.bodyPart} ×
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

