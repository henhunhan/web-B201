// src/components/FilterButtons.js
import React from 'react';
import './FilterButtons.css';

const FilterButtons = ({ onSortChange, isAscending, onShowAll, isShowAll }) => {
  return (
    <div className="filter-buttons">
      <button onClick={() => onSortChange('name')}>
        Name {isAscending ? '↑' : '↓'}
      </button>
      <button onClick={() => onSortChange('size')}>
        Size {isAscending ? '↑' : '↓'}
      </button>
      <button onClick={() => onShowAll()}>
        Show All
      </button>
    </div>
  );
};

// const ShowAllButtons = ({ onShowAll , isShowAll }) => {
//   return (
//     <div className="filter-buttons">
//       <button onClick={() => onShowAll('name')}>
//         Show All {isShowAll ? '✅' : '❌'}
//       </button>
//     </div>
//   )
// }

export default FilterButtons;