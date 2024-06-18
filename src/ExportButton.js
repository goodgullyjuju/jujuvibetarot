import React from 'react';

function ExportButton() {
  const exportData = () => {
    const journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    const dataStr = JSON.stringify(journalEntries, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'journalEntries.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return <button onClick={exportData}>Export Journal Entries</button>;
}

export default ExportButton;
