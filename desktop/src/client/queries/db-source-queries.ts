import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

export const useDbSources = (): UseQueryResult<string[]> => {
  return useQuery<string[]>('dbSources', () =>
    window.electron.ipcRenderer.getDbSources(),
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
    (filePath: string) => window.electron.ipcRenderer.addDbSource(filePath),
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
    (filePath: string) => window.electron.ipcRenderer.deleteDbSource(filePath),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('dbSources');
      },
    },
  );
};
