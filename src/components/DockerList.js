import React, { useState } from 'react';
import './DockerList.css';

const DockerList = ({ files }) => {
  const [expandedIndex, setExpandedIndex] = useState(null); // State to track which index is expanded
  const [copiedUrl, setCopiedUrl] = useState(''); // State to track the copied URL

  const handleToggle = (index) => {
    // If the same index is clicked again, collapse it; otherwise, expand the clicked index
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleTagClick = (file, tag) => {
    const ip = "10.3.142.201"; // Replace with appropriate IP address
    const url = `${ip}:5000/${file.name}:${tag.name}`;

    // Copy the URL to clipboard
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopiedUrl(url); // Update the state to show which URL was copied
        alert(`URL copied to clipboard: ${url}`);
      })
      .catch(err => {
        console.error('Failed to copy URL:', err);
      });
  };

  return (
    <div className="docker-list">
      {files.length > 0 ? (
        files.map((file, index) => (
          <div
            key={file.id}
            className={`docker-item ${expandedIndex === index ? 'expanded' : ''}`}
            onClick={() => handleToggle(index)} // Toggle expand/collapse on click
          >
            {/* Click on this area only to handle toggle */}
            <div className='file-header' onClick={() => handleToggle(index)}>
              <h2>{file.name}</h2>
              <div className='file-info'>
                <div className="tag-count">
                  <span>Total Tags: {file.tags.length} | </span>
                </div>

                <p className='size-text'> {Math.round(file.sizeInBytes / (1024 * 1024))} MB</p>
              </div>
            </div>

            {/* Only expand/collapse if the item index matches */}
            {expandedIndex === index && (
              <div className="tags-list">
                {file.tags.map((tag, tagIndex) => (
                  <div
                    key={tagIndex}
                    className="tag-item"
                    onClick={(e) => {
                      e.stopPropagation(); // Stop click from triggering handleToggle
                      handleTagClick(file, tag); // Copy URL to clipboard
                    }}
                  >
                    <span className="tag-name">{tag.name}</span>
                    <span className="tag-size">{Math.round(tag.sizeInBytes / (1024 * 1024))} MB</span>
                  </div>
                ))}
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
