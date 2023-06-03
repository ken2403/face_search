import React from 'react';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = "Nano-Materials Design Laboratory (NMDL)" }) => {
  return (
    <header style={{ 
        backgroundColor: '#000000',
        padding: '3px',
        fontSize: '8px',
        position: 'sticky',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 999
      }}>
      <h1 style={{ 
        color: '#30A2BE',
        textAlign: 'left',
        paddingLeft: '20px',
      }}>{title}</h1>
    </header>
  );
};

