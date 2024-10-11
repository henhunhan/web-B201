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

      })
      .catch(err => {
        console.error('Failed to copy URL:', err);
      });
  };

  const formatFileSize = (sizeInBytes) => {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let size = sizeInBytes;
    let unitIndex = 0;
  
    // Loop untuk membagi size hingga mendapatkan ukuran yang sesuai (di bawah 1000)
    while (size >= 1024 && unitIndex < units.length - 1) {
      size = size / 1024;
      unitIndex++;
    }
  
    // Menggunakan Math.round atau toFixed untuk pembulatan
    return `${Math.round(size * 100) / 100} ${units[unitIndex]}`;
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
              <h2 className='image-name'>{file.name}</h2>
              <div className='test2'>
                <div className="tag-count">
                  <span className="tag-count">{file.tags.length}</span>
                </div>
                <p className='Size-text'>| {formatFileSize(file.sizeInBytes)}</p>
              </div>
            </div>

            {/* Only expand/collapse if the item index matches */}
            {expandedIndex === index && ( 
              <div className="tags-list">
                {file.tags.sort((a,b) => b.name.localeCompare(a.name))
                .map((tag, tagIndex) => (
                  <div 
                    key={tagIndex} 
                    className="tag-item"
                    onClick={(e) => {
                      e.stopPropagation(); // Stop click from triggering handleToggle
                      setSelectedTag({ file, tag });
                     
                    }}
                  >
                    <span className="tag-name">{tag.name}</span>
                    <span className="tag-size">{formatFileSize(tag.sizeInBytes)}</span>
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
            <h3 className='tag-details-text' >Tag Details</h3>

            <table className="tag-table">
              <tbody>
                <tr>
                  <td>Image Name</td>
                  <td>{selectedTag.file.name}</td>
                </tr>
                <tr>
                  <td>Tag Name</td>
                  <td>{selectedTag.tag.name}</td>
                </tr>
                <tr>
                  <td>Size</td>
                  <td>{formatFileSize(selectedTag.tag.sizeInBytes)}</td>
                </tr>
              </tbody>
            </table>

            <h3 className='quantitive-title'>Full Quantitative Name: </h3>
            
            <h3 className='quantitive-name'>10.3.142.201:5000/{selectedTag.file.name}:{selectedTag.tag.name}</h3>
            <div className='modal-button'>
              <button onClick={()=>handleTagClick(selectedTag.file,selectedTag.tag)}>Copy</button>
              <button onClick={closeModal}>Close</button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default DockerList;

