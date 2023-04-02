import React, { useState, useEffect } from 'react';
import '../src/bulma.min.css';

function App() {
  const [data, setData] = useState({});
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedBook, setSelectedBook] = useState('');

  useEffect(() => {
    fetch('https://api.npoint.io/8006441b3f5c483a170f')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
    setSelectedSubject('');
    setSelectedBook('');
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setSelectedBook('');
  };

  const handleBookChange = (event) => {
    setSelectedBook(event.target.value);
  };

  const levels = Object.keys(data);
  const subjects = selectedLevel ? Object.keys(data[selectedLevel]) : [];
  const books = selectedSubject ? Object.values(data[selectedLevel][selectedSubject]) : [];

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline">
          <div className="column is-4">
            <div className="field">
              <label className="label" htmlFor="level">Select level:</label>
              <div className="control">
                <div className="select">
                  <select id="level" value={selectedLevel} onChange={handleLevelChange}>
                    <option value="">-- Select level --</option>
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="column is-4">
            <div className="field">
              <label className="label" htmlFor="subject">Select subject:</label>
              <div className="control">
                <div className="select">
                  <select id="subject" value={selectedSubject} onChange={handleSubjectChange} disabled={!selectedLevel}>
                    <option value="">-- Select subject --</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="column is-4">
            <div className="field">
              <label className="label" htmlFor="book">Select book:</label>
              <div className="control">
                <div className="select">
                  <select id="book" value={selectedBook} onChange={handleBookChange} disabled={!selectedSubject}>
                    <option value="">-- Select book --</option>
                    {books.map((book) => (
                      <option key={book.name} value={book.bookLink}>
                        {book.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {selectedBook && (
            <div className="column is-12">
              <a href ={selectedBook}  >Download</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
