import React from 'react';

import {
  useConnectToDb,
  useCurrentConnection,
  useDbSources,
  useRemoveDbSource,
} from '../../queries/db-source-queries';
import LinkSource from './LinkSource';

const DbSourcesView = () => {
  // queries
  const {
    data: fileNames = [],
    isLoading: isDbSourcesLoading,
    isError: isDbSourcesError,
  } = useDbSources();
  const {
    data: currentConnection,
    isLoading: isCurrentConnectionLoading,
    isError: isCurrentConnectionError,
  } = useCurrentConnection();

  // mutations
  const removeDbSourceMutation = useRemoveDbSource();
  const connectToDbMutation = useConnectToDb();

  if (isDbSourcesLoading || isCurrentConnectionLoading) {
    return <div>Loading...</div>;
  }

  if (isDbSourcesError || isCurrentConnectionError) {
    return <div>Error</div>;
  }

  const onConnect = async (fileName: string) => {
    await connectToDbMutation.mutateAsync(fileName);
  };

  const onDelete = async (fileName: string) => {
    await removeDbSourceMutation.mutateAsync(fileName);
  };

  return (
    <div className="w-full">
      <h1 className="text-center font-extrabold text-2xl">Sources</h1>

      <div className="mt-10 w-full flex justify-center">
        <LinkSource />
      </div>

      <table className="mt-3 w-full border border-black">
        <thead>
          <tr>
            <th className="border border-black">File Name</th>
            <th className="border border-black">Controls</th>
          </tr>
        </thead>
        <tbody>
          {fileNames.map((fileName) => (
            <tr key={fileName}>
              <td className="px-3 border border-black">{fileName}</td>
              <td className="px-3 border border-black">
                <span className="w-full inline-flex justify-center gap-5">
                  {currentConnection === fileName ? (
                    <button className="hover:underline">Disconnect</button>
                  ) : (
                    <button
                      className="hover:underline"
                      onClick={() => onConnect(fileName)}
                    >
                      Connect
                    </button>
                  )}

                  <button
                    className="hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:no-underline"
                    onClick={() => onDelete(fileName)}
                    disabled={currentConnection === fileName}
                  >
                    Delete
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DbSourcesView;
