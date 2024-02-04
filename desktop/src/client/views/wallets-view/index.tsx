import React from 'react';

import { useWallets } from '../../queries/wallets-queries';
import WalletLink from './WalletLink';
import WalletHistory from './WalletHistory';

const WalletsView = () => {
  const {
    data: wallets,
    isError: isWalletsError,
    isLoading: isWalletsLoading,
  } = useWallets();

  const [selectedWalletId, setSelectedWalletId] = React.useState<string>('');

  if (isWalletsLoading) {
    return <div>Loading...</div>;
  }

  if (isWalletsError) {
    return <div>Error</div>;
  }

  return (
    <div className="w-full flex">
      <div className="px-2 h-full w-56 flex-grow-0 bg-slate-100">
        <h2 className="font-extrabold text-xl">Wallets</h2>
        <div className="pt-3 flex flex-col gap-2">
          {wallets?.map((wallet) => (
            <WalletLink
              key={`${wallet.id}`}
              name={wallet.name}
              currency={wallet.currency}
              latestBalance={wallet.latestBalance || 0}
              isActive={`${wallet.id}` === selectedWalletId}
              onClick={() => setSelectedWalletId(`${wallet.id}`)}
            />
          ))}
        </div>
      </div>

      <div className="px-2 pb-32 flex flex-grow">
        {selectedWalletId ? (
          <WalletHistory walletId={selectedWalletId} />
        ) : null}
      </div>
    </div>
  );
};

export default WalletsView;
