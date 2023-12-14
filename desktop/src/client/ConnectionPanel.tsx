import React, { useState } from 'react';

import DbSourcesView from './views/db-sources-view';

const ConnectionPanel = () => {
  const [open, setOpen] = useState(false);

  const togglePanel = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`absolute ${
        open ? 'top-0' : ''
      } right-0 bottom-0 left-0 w-full bg-white shadow-black shadow-2xl`}
    >
      <header
        className="p-5 border-black border-b-2 cursor-pointer"
        onClick={togglePanel}
      >
        <button className="font-bold">Connection</button>
      </header>

      {open ? (
        <div className="p-5">
          <DbSourcesView />
        </div>
      ) : null}
    </div>
  );
};

export default ConnectionPanel;
