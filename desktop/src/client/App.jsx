import React from 'react';

// views
import DbSourcesView from './views/db-sources-view';

const App = () => {
  return (
    <div className="p-4 w-full h-full overflow-auto">
      <DbSourcesView />
    </div>
  );
};

export default App;
