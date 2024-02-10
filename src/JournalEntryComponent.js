function JournalEntryComponent({ entry, onSave }) {
    const [comments, setComments] = useState(entry.comments);
  
    const handleCommentsChange = (event) => {
      setComments(event.target.value);
    };
  
    const saveComments = () => {
      // Assuming onSave updates the entry in the journal and persists it
      onSave({ ...entry, comments });
    };
  
    return (
      <div>
        {/* Display other parts of the entry */}
        <textarea value={comments} onChange={handleCommentsChange} onBlur={saveComments} />
      </div>
    );
  }
  