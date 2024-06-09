import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const JournalContainer = styled.div`
  text-align: center;
  margin: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  margin: 10px 0;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

function Journal() {
  const [entry, setEntry] = useState('');
  const [journalEntries, setJournalEntries] = useState(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  const handleSave = () => {
    const newEntries = [...journalEntries, { entry, date: new Date().toLocaleString() }];
    setJournalEntries(newEntries);
    setEntry('');
  };

  return (
    <JournalContainer>
      <h2>Daily Journal</h2>
      <TextArea value={entry} onChange={(e) => setEntry(e.target.value)} />
      <SaveButton onClick={handleSave}>Save Entry</SaveButton>
      <h3>Journal Entries</h3>
      <ul>
        {journalEntries.map((log, index) => (
          <li key={index}>
            <p>{log.date}: {log.entry}</p>
          </li>
        ))}
      </ul>
    </JournalContainer>
  );
}

export default Journal;
