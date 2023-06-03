import React from 'react';

interface TitleProps {
  text: string;
  smallText?: string;
}

export const Title: React.FC<TitleProps> = ({ text, smallText='' }) => {
  return (
    <div style={{
            backgroundColor: '#30A2BE',
            color: '#FFFFFF',
            width: '100%',
            padding: '20px 0',
            textAlign: 'center'
        }}
    >
      <h1 style={{ margin: '0 auto' }}>{text}</h1>
      <h3 style={{ margin: '0 auto' }}> {smallText}</h3>
    </div>
  );
};
