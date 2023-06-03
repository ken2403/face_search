import React from 'react';

export interface NobelData {
  item: string;
  itemLabel: string;
  year: number;
  nobelPrizeLabel: string;
  article_en: string;
  article_ja: string;
  pic: string;
  sexOrGenderLabel: string;
  dateOfBirth: string;
  dateOfDeath: string | number;
  countryOfCitizenshipLabel: string;
}

interface NobelPrizeWinnerProps {
  winner: NobelData;
  size?: string;
  message?: number;
}

export const NobelPrizeWinner: React.FC<NobelPrizeWinnerProps> = ({ winner, size='200px', message=1}) => {
  var suffix = 'th'
  if (message === 1) {
    suffix = 'st'
  } else if (message === 2) {
    suffix = 'nd'
  } else if (message === 3) {
    suffix = 'rd'
  }
  return (
  <div style={{
      alignItems: 'center',
      marginBottom: '50px',
      justifyContent: 'center',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '10',
      }}>
        <h2 style={{ marginBottom: '0' }}>{message}番目に似ているノーベル賞受賞者</h2>
        <p style={{ margin: '0' }}>{message}{suffix} similar Nobel Prize winner</p>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{marginRight: '10px'}}><h3>{winner.itemLabel}</h3></div>
        <p>{winner.nobelPrizeLabel}</p>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <a href={winner.article_ja}>
          <img src={winner.pic} alt={winner.itemLabel} style={{
            width: `${size}`,
            height:  `${size}`,
            objectFit: 'cover',
            justifyContent: 'center',
            }}/>
        </a>
      </div>
    </div>
  );
};
