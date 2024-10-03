// src/components/SearchBar.js
import React from 'react';
import './SearchBar.css';

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search Docker files..."
      className="search-bar"
    />
  );
};

export default SearchBar;
