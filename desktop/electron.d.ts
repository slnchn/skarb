interface Wallet {
  id: number;
  name: string;
  currency: string;
  createdAt: string;
}

interface DesktopWalletResponse extends Wallet {
  latestBalance: number | null;
  latestBalanceTs: string | null;
}

interface DesktopWhistoryResponse {
  id: number;
  amount: number;
  date: string;
  wallet: string;
  walletId: number;
}

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

      wallets: {
        list: () => Promise<DesktopWalletResponse[]>;
      };

      whistory: {
        list: (walletId: string) => Promise<DesktopWhistoryResponse[]>;
      };
    };
  };
}
