import React from 'react';

const Connection = () => {
  const onChange = async (e) => {
    const [pickedFile] = e.target.files;
    if (pickedFile) {
      const files = await window.electron.ipcRenderer.addDbSource(
        pickedFile.path,
      );

      console.log(files);
    }
  };

  return (
    <div>
      <label htmlFor="db-file-input">
        Pick a database file
        <input id="db-file-input" type="file" onChange={onChange} />
      </label>
    </div>
  );
};

export default Connection;
