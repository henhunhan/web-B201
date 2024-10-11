// src/components/FilterButtons.js
import React from 'react';
import './FilterButtons.css';

const FilterButtons = ({ onSortChange, isAscending, onShowAll, isShowAll }) => {
  return (
    <div className='buttons'>
      <div className="filter-buttons">
        <button onClick={() => onSortChange('name')}>
          Name {isAscending ? '↑' : '↓'}
        </button>
        <button onClick={() => onSortChange('size')}>
          Size {isAscending ? '↑' : '↓'}
        </button>
      </div>
    <div className={`button-showall`}>
      <button onClick={() => onShowAll()} className={`button-showall ${isShowAll ? 'active' : 'inactive'}`}>
         Show All
      </button>
    </div>
</div>
  );
};

export default FilterButtons;