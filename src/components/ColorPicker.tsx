
import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  label?: string;
}

const predefinedColors = [
  '#000000', '#1f2937', '#374151', '#6b7280', '#9ca3af',
  '#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d',
  '#16a34a', '#059669', '#0891b2', '#0284c7', '#2563eb',
  '#4f46e5', '#7c3aed', '#9333ea', '#c026d3', '#db2777',
  '#e11d48', '#f43f5e', '#fb7185', '#fda4af', '#fecaca'
];

export function ColorPicker({ selectedColor, onColorChange, label = "Color" }: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <div 
            className="w-4 h-4 rounded border"
            style={{ backgroundColor: selectedColor }}
          />
          <Palette className="w-4 h-4" />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid grid-cols-5 gap-2">
          {predefinedColors.map((color) => (
            <button
              key={color}
              className="w-8 h-8 rounded border-2 hover:scale-110 transition-transform"
              style={{ 
                backgroundColor: color,
                borderColor: selectedColor === color ? '#2563eb' : '#e5e7eb'
              }}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
        <div className="mt-4">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-full h-8 rounded border"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
