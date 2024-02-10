import { UseQueryResult, useQuery } from 'react-query';

import { DesktopWhistoryResponse } from '../types/whistory';

export const useWhistory = (
  walletId: string,
): UseQueryResult<DesktopWhistoryResponse[]> => {
  return useQuery<DesktopWhistoryResponse[]>('whistory', () =>
    window.electron.ipcRenderer.whistory.list(walletId),
  );
};
