import React from 'react';

import {
  useDbSources,
  useRemoveDbSource,
} from '../../queries/db-source-queries';
import LinkSource from './LinkSource';

const DbSourcesView = () => {
  const { data: fileNames = [], isLoading, isError } = useDbSources();
  const removeDbSourceMutation = useRemoveDbSource();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

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
                  <button className="hover:underline">Open</button>
                  <button
                    className="hover:underline"
                    onClick={() => onDelete(fileName)}
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
