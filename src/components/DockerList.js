import React, { useState } from 'react';
import './DockerList.css';

const DockerList = ({ files }) => {
  const [expandedIndex, setExpandedIndex] = useState(null); // State to track which index is expanded
  const [selectedTag, setSelectedTag] = useState(null); // State to track selected tag for modal
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

  const closeModal = () => {
    setSelectedTag(null); // Close the modal by setting selectedTag to null
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
            <div className='test'>
              <h2>{file.name}</h2>
              <div className='test2'>
                <div className="tag-count">
                  <span className="tag-count">Total Tags: {file.tags.length}</span>
                </div>
                <p className='Size-text'>-{Math.round(file.sizeInBytes / (1024 * 1024))} MB</p>
              </div>
            </div>

            {/* Hanya expand/collapse jika index item cocok */}
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

      {/* Modal for tag details */}
      {selectedTag && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Tag Details</h3>
            <p>Image Name : {selectedTag.file.name}</p>
            <p>Tag Name : {selectedTag.tag.name}</p>
            <p>Size : {Math.round(selectedTag.tag.sizeInBytes / (1024 * 1024))} MB</p>
            <p>Full Quantitative name : 10.3.142.201:5000/{selectedTag.file.name}:{selectedTag.tag.name} </p>
            <button onClick={() => handleCopyUrl(selectedTag.file, selectedTag.tag)}>Copy URL</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DockerList;
