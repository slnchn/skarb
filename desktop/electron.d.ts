interface Window {
  electron: {
    ipcRenderer: {
      connections: {
        getDbSources: () => Promise<string[]>;
        addDbSource: (filePath: string) => Promise<string[]>;
        deleteDbSource: (filePath: string) => Promise<string[]>;
        connectToDb: (filePath: string) => Promise<void>;
        getCurrentConnection: () => Promise<string | null>;
      };
    };
  };
}
