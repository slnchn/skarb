interface Window {
  electron: {
    ipcRenderer: {
      getDbSources: () => Promise<string[]>;
      addDbSource: (filePath: string) => Promise<string[]>;
      deleteDbSource: (filePath: string) => Promise<string[]>;
    };
  };
}
