import React from 'react';

import { useLinkDbSource } from '../../queries/db-source-queries';

const LinkSource = () => {
  const linkDbSourceMutation = useLinkDbSource();

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    const file = files[0];
    if (!file) {
      return;
    }

    await linkDbSourceMutation.mutateAsync(file.path);
  };
  return (
    <>
      <label className="cursor-pointer hover:underline" htmlFor="db-file-input">
        Link a Source
      </label>
      <input
        className="hidden"
        id="db-file-input"
        type="file"
        onChange={onChange}
      />
    </>
  );
};

export default LinkSource;
