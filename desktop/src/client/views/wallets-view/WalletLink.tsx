import React from 'react';

interface WalletTileProps {
  name: string;
  currency: string;
  latestBalance: number;
  isActive: boolean;
  onClick: () => void;
}

const WalletTile = ({
  name,
  currency,
  latestBalance,
  isActive,
  onClick,
}: WalletTileProps) => {
  return (
    <div
      className={`px-1 py-1 flex justify-between items-center gap-1 rounded-md cursor-pointer  ${
        isActive ? 'bg-slate-300' : ''
      } ${isActive ? 'hover:bg-slate-300' : 'hover:bg-slate-200'}`}
      onClick={onClick}
    >
      <h3 className="font-bold text-center">{name}</h3>
      <h4 className="text-center text-xs">
        ({latestBalance || '0'} {currency})
      </h4>
    </div>
  );
};

export default WalletTile;
