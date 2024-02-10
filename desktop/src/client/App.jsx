import React from 'react';

// views
import ConnectionPanel from './ConnectionPanel';
import WalletsView from './views/wallets-view';

const App = () => {
  return (
    <div className="w-full h-screen overflow-hidden flex">
      <WalletsView />

      <ConnectionPanel />
    </div>
  );
};

export default App;
