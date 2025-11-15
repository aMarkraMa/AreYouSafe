/**
 * Emotional scale to express how the student feels
 */
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { EmotionScale } from '@/lib/api';
import './EmotionScale.css';

const emotionLevels = [
  { level: 1, color: 'green', label: 'Very Good', emoji: '😊', feeling: 'very_good' },
  { level: 2, color: 'yellow', label: 'Good', emoji: '🙂', feeling: 'good' },
  { level: 3, color: 'orange', label: 'Neutral', emoji: '😐', feeling: 'neutral' },
  { level: 4, color: 'red', label: 'Bad', emoji: '😟', feeling: 'bad' },
  { level: 5, color: 'dark-red', label: 'Very Bad', emoji: '😢', feeling: 'very_bad' },
];

const colorClasses: Record<string, string> = {
  green: 'bg-green-500 hover:bg-green-600',
  yellow: 'bg-yellow-500 hover:bg-yellow-600',
  orange: 'bg-orange-500 hover:bg-orange-600',
  red: 'bg-red-500 hover:bg-red-600',
  'dark-red': 'bg-red-700 hover:bg-red-800',
};

interface EmotionScaleProps {
  onSelect: (emotion: EmotionScale) => void;
  selectedEmotion?: EmotionScale;
}

export function EmotionScaleComponent({ onSelect, selectedEmotion }: EmotionScaleProps) {
  const [selected, setSelected] = useState<number>(selectedEmotion?.level || 0);

  useEffect(() => {
    if (selectedEmotion) {
      setSelected(selectedEmotion.level);
    }
  }, [selectedEmotion]);

  const handleSelect = (level: number, color: string) => {
    setSelected(level);
    onSelect({ level, color });
  };

  return (
    <div className="emotion-scale">
      <h3 className="text-lg font-semibold mb-4">How do you feel?</h3>
      <div className="emotion-buttons">
        {emotionLevels.map((emotion) => (
          <button
            key={emotion.level}
            onClick={() => handleSelect(emotion.level, emotion.color)}
            className={cn(
              'emotion-button',
              colorClasses[emotion.color],
              selected === emotion.level && 'ring-4 ring-offset-2 ring-blue-400 scale-110'
            )}
            title={emotion.label}
          >
            <span className="emotion-emoji">{emotion.emoji}</span>
            <span className="emotion-label">{emotion.label}</span>
          </button>
        ))}
      </div>
      {selected > 0 && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Selected level: {emotionLevels[selected - 1].label}
        </p>
      )}
    </div>
  );
}

