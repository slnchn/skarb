import { UseQueryResult, useQuery } from 'react-query';

import { DesktopWalletResponse } from '../types/wallets';

export const useWallets = (): UseQueryResult<DesktopWalletResponse[]> => {
  return useQuery<DesktopWalletResponse[]>('wallets', () =>
    window.electron.ipcRenderer.wallets.list(),
  );
};
