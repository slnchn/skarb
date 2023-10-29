import React, { useEffect, useState } from 'react';

const Connection = () => {
  const [sources, setSources] = useState([]);
  const [activeSource, setActiveSource] = useState(null);
  const [whistory, setWhistory] = useState([]);

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

  const onConnect = async (source) => {
    await window.electron.ipcRenderer.connectToDb(source);
    setActiveSource(source);
  };

  const onDelete = async (source) => {
    const files = await window.electron.ipcRenderer.deleteDbSource(source);
    setSources(files);
  };

  const listWhistory = async () => {
    const whistory = await window.electron.ipcRenderer.whistory.list();
    setWhistory(whistory);
  };

  return (
    <div>
      <label htmlFor="db-file-input">
        Pick a database file
        <input id="db-file-input" type="file" onChange={onChange} />
      </label>

      <h2>Active source</h2>
      {activeSource ? <span>{activeSource}</span> : <span>Not connected</span>}

      <h3>Whistory</h3>
      <button onClick={listWhistory}>List whistory</button>
      <ul>
        {whistory.map((item) => (
          <li key={item.wh_id}>{JSON.stringify(item)}</li>
        ))}
      </ul>

      <h2>Sources</h2>
      <ul>
        {sources.map((source) => (
          <li key={source} style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => onDelete(source)}>Delete</button>
            <button onClick={() => onConnect(source)}>Connect</button>
            <span>{source}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connection;
