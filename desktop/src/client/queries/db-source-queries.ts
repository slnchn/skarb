import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

export const useDbSources = (): UseQueryResult<string[]> => {
  return useQuery<string[]>('dbSources', () =>
    window.electron.ipcRenderer.connections.getDbSources(),
  );
};

export const useLinkDbSource = (): UseMutationResult<
  string[],
  unknown,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation(
    (filePath: string) =>
      window.electron.ipcRenderer.connections.addDbSource(filePath),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('dbSources');
      },
    },
  );
};

export const useRemoveDbSource = (): UseMutationResult<
  string[],
  unknown,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation(
    (filePath: string) =>
      window.electron.ipcRenderer.connections.deleteDbSource(filePath),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('dbSources');
      },
    },
  );
};

export const useConnectToDb = (): UseMutationResult<
  void,
  unknown,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation(
    (filePath: string) =>
      window.electron.ipcRenderer.connections.connectToDb(filePath),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('dbSources');
        queryClient.invalidateQueries('currentConnection');
      },
    },
  );
};

export const useCurrentConnection = (): UseQueryResult<string | null> => {
  return useQuery<string | null>('currentConnection', () =>
    window.electron.ipcRenderer.connections.getCurrentConnection(),
  );
};
