import React, { useEffect, useState } from 'react';

const Connection = () => {
  const [sources, setSources] = useState([]);

  useEffect(() => {
    const getSources = async () => {
      const sources = await window.electron.ipcRenderer.getDbSources();

      setSources(sources);
    };

    getSources();
  }, []);

  const onChange = async (e) => {
    const [pickedFile] = e.target.files;
    if (pickedFile) {
      const files = await window.electron.ipcRenderer.addDbSource(
        pickedFile.path,
      );

      setSources(files);
    }
  };

  const onDelete = async (source) => {
    const files = await window.electron.ipcRenderer.deleteDbSource(source);
    setSources(files);
  };

  return (
    <div>
      <label htmlFor="db-file-input">
        Pick a database file
        <input id="db-file-input" type="file" onChange={onChange} />
      </label>

      <h2>Sources</h2>
      <ul>
        {sources.map((source) => (
          <li key={source}>
            <button onClick={() => onDelete(source)}>Delete</button>
            <span>{source}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connection;
