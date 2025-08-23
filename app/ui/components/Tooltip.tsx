import React, { useState, ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative flex items-center">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 text-sm text-white bg-gray-800 rounded-md whitespace-pre-line z-50">
          {content}
        </div>
      )}
    </div>
  );
};
