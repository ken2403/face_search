import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export const BaseContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '10px',
      }}
    >
      {children}
    </div>
  );
};
