export interface Wallet {
  id: number;
  name: string;
  currency: string;
  createdAt: string;
}

export interface DesktopWalletResponse extends Wallet {
  latestBalance: number | null;
  latestBalanceTs: string | null;
}
