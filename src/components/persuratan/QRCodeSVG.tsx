'use client';

import React from 'react';

// Generates a decorative, functional-looking verification QR code in pure SVG
export const QRCodeSVG: React.FC<{ value: string; size?: number; className?: string }> = ({
  value,
  size = 72,
  className = ""
}) => {
  // Deterministic pseudo-random pattern based on string hash for authentic matrix look
  const hash = Array.from(value).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) | 0, 0);
  
  const cells: boolean[][] = Array(15).fill(null).map((_, r) => 
    Array(15).fill(null).map((_, c) => {
      // Corner finder patterns (Top-Left, Top-Right, Bottom-Left)
      if ((r < 4 && c < 4) || (r < 4 && c > 10) || (r > 10 && c < 4)) {
        if (r === 0 || r === 3 || c === 0 || c === 3 || r === 11 || r === 14 || (r < 4 && (c === 11 || c === 14))) return true;
        if (r > 0 && r < 3 && c > 0 && c < 3) return true;
        if (r > 0 && r < 3 && c > 11 && c < 14) return true;
        if (r > 11 && r < 14 && c > 0 && c < 3) return true;
        return false;
      }
      // Inner pattern pseudo-randomized with hash
      return ((hash ^ (r * 17 + c * 23)) & 1) === 1;
    })
  );

  const cellSize = size / 15;

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={`0 0 ${size} ${size}`} 
      className={`bg-white p-1 rounded border border-slate-300 shadow-xs ${className}`}
    >
      {cells.map((row, r) =>
        row.map((active, c) =>
          active ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize - 0.2}
              height={cellSize - 0.2}
              fill="#0B2545"
            />
          ) : null
        )
      )}
    </svg>
  );
};
