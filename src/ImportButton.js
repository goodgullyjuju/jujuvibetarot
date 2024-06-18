import React, { useState } from 'react';

function ImportButton() {
  const [importedData, setImportedData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);
      setImportedData(data);
    };
    reader.readAsText(file);
  };

  const importData = () => {
    if (importedData) {
      localStorage.setItem('journalEntries', JSON.stringify(importedData));
      alert('Journal entries imported successfully!');
    } else {
      alert('No data to import.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={importData}>Import Journal Entries</button>
    </div>
  );
}

export default ImportButton;
