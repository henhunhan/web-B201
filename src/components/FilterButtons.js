// src/components/FilterButtons.js
import React from 'react';
import './FilterButtons.css';

const FilterButtons = ({ onSortChange, isAscending }) => {
  return (
    <div className="filter-buttons">
      <button onClick={() => onSortChange('name')}>
        Name {isAscending ? '↑' : '↓'}
      </button>
      <button onClick={() => onSortChange('size')}>
        Size {isAscending ? '↑' : '↓'}
      </button>
    </div>
  );
};

export default FilterButtons;
