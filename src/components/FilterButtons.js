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

    <div className='button-showall'>
      <button onClick={() => onShowAll()} className='button-showall'>
         Show All
      </button>
    </div>

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