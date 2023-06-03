import React, { useState } from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  caption?: string
  backColor?: string;
  fontColor?: string;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, caption='', backColor='#30A2BE', fontColor='#FFFFFF' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div style={{
      textAlign: 'center',
      display: 'flex',
      flexDirection: "column",
      color: fontColor,
      backgroundColor: isHovered ? '#888888' : backColor,
      borderRadius: '4px',
      padding: '10px 20px',
      border: 'none',
      cursor: 'pointer',
    }}>
      <button style={{
              backgroundColor: isHovered ? '#888888' : backColor,
              color: fontColor,
              fontWeight: 'bold',
              fontSize: '22px',
              border: 'none',
              cursor: 'pointer',
        }}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </button>
      <button style={{
              backgroundColor: isHovered ? '#888888' : backColor,
              color: fontColor,
              fontSize: '15px',
              border: 'none',
              cursor: 'pointer',
        }}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} 
      >
        {caption}
      </button>
    </div>
  );
};
