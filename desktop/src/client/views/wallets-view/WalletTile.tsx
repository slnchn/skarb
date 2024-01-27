import React from 'react';

interface WalletTileProps {
  id: string;
  name: string;
  currency: string;
  latestBalance: number;
  latestTimestamp: string;
}

const WalletTile = ({
  id,
  name,
  currency,
  latestBalance,
  latestTimestamp,
}: WalletTileProps) => {
  return (
    <div className="p-5 flex flex-col justify-center items-center border-2 border-black rounded-md">
      <h3 className="font-bold text-center">{name}</h3>
      <h4 className="text-center text-sm">
        {latestBalance || 'No Data'} {currency}
      </h4>
      <p className="text-center text-xs">{latestTimestamp}</p>
    </div>
  );
};

export default WalletTile;
