interface Window {
  electron: {
    ipcRenderer: {
      connection: {
        getDbSources: () => Promise<string[]>;
        addDbSource: (filePath: string) => Promise<string[]>;
        deleteDbSource: (filePath: string) => Promise<string[]>;
        connectToDb: (filePath: string) => Promise<void>;
        getCurrentConnection: () => Promise<string | null>;
      };
    };
  };
}
