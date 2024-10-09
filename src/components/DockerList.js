import React, { useState } from 'react';
import './DockerList.css';

const DockerList = ({ files }) => {
  const [expandedIndex, setExpandedIndex] = useState(null); // State to track which index is expanded

  const handleToggle = (index) => {
    // If the same index is clicked again, collapse it; otherwise, expand the clicked index
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="docker-list">
      {files.length > 0 ? (
        files.map((file, index) => (
          <div
            key={file.id}
            className={`docker-item ${expandedIndex === index ? 'expanded' : ''}`}
            onClick={() => handleToggle(index)} // Toggle expand/collapse on click
            style={{ height: expandedIndex === index ? `${80 + file.tags.length * 50}px` : '80px' }} // Adjust height based on tags
          >
            <h2>{file.name}</h2>

            {expandedIndex === index && ( // Only show tags if the item is expanded
              <div className="tags-list">
                {file.tags.map((tag, tagIndex) => (
                  <div key={tagIndex} className="tag-item">
                    <span className="tag-name">{tag.name} </span>
                    <span className="tag-size">{Math.round(tag.sizeInBytes / (1024 * 1024))} MB</span>
                  </div>
                ))}
                <p className='Size-text'>-{Math.round(file.sizeInBytes / (1024 * 1024))} MB</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No files found.</p>
      )}
    </div>
  );
};

export default DockerList;
