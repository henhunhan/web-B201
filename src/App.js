// src/App.js
import React, { useState, useEffect } from 'react';
import { getDockerFiles } from './api/dockerApi';
import DockerList from './components/DockerList';
import SearchBar from './components/SearchBar';
import FilterButtons from './components/FilterButtons';
import Footer from './components/Logo';
import './App.css';


const App = () => {
  const [dockerFiles, setDockerFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [displayAll, setDisplayAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [isAscending, setIsAscending] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const files = await getDockerFiles();
        setDockerFiles(files.api1);
        setAllFiles(files.api2);
      } catch (error) {
        console.error('Failed to fetch files:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setIsAscending(!isAscending); // Toggle ascending/descending when a sort button is clicked
  };

  const handleToggleShowAll = () => {
    setDisplayAll(!displayAll);  // Toggle antara API1 dan API2
  };

  const filesToDisplay = displayAll ? allFiles : dockerFiles; // Pilih API berdasarkan toggle

  const filteredFiles = filesToDisplay
    .filter((file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'name':
          return isAscending
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case 'lastUpdated':
          return isAscending
            ? new Date(a.lastUpdated) - new Date(b.lastUpdated)
            : new Date(b.lastUpdated) - new Date(a.lastUpdated);
        case 'size':
          return isAscending ? a.sizeInBytes - b.sizeInBytes : b.sizeInBytes - a.sizeInBytes;
        default:
          return 0;
      }
    });

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
      <header className="app-header">
          <Footer />
          <SearchBar value={searchTerm} onChange={handleSearchChange} />
          <FilterButtons
            onSortChange={handleSortChange}
            isAscending={isAscending}
            onShowAll={handleToggleShowAll}
            displayAll={displayAll}
          />
        <div className='filter-button'>
          <button className="theme-toggle" onClick={handleThemeToggle}>
            {isDarkMode ? '🌙' : '☀️'}
          </button>
        </div>
      </header>
      <div className="search-filter-container">
          <h1>Docker Image Repository Teknik Komputer ITS</h1>
      </div>
      <main className="main-content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DockerList files={filteredFiles} />
        )}
      </main>
    </div>
  );
};

export default App;
