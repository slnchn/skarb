import React from 'react';

import { useWallets } from '../../queries/wallets-queries';
import WalletTile from './WalletTile';

const WalletsView = () => {
  const {
    data: wallets,
    isError: isWalletsError,
    isLoading: isWalletsLoading,
  } = useWallets();

  if (isWalletsLoading) {
    return <div>Loading...</div>;
  }

  if (isWalletsError) {
    return <div>Error</div>;
  }

  return (
    <div className="p-5">
      <h2 className="text-center font-extrabold text-2xl">Wallets</h2>
      <div className="pt-3 flex gap-2">
        {wallets?.map((wallet) => (
          <WalletTile
            key={`${wallet.id}`}
            id={`${wallet.id}`}
            name={wallet.name}
            currency={wallet.currency}
            latestBalance={wallet.latestBalance || 0}
            latestTimestamp={wallet.latestBalanceTs || ''}
          />
        ))}
      </div>
    </div>
  );
};

export default WalletsView;
