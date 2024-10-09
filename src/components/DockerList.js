import React, { useState } from 'react';
import './DockerList.css';

const DockerList = ({ files }) => {
  const [expandedIndex, setExpandedIndex] = useState(null); // Tambahkan state untuk melacak index yang diperluas

  const handleToggle = (index) => {
    // Jika index yang sama diklik lagi, collapse item, jika tidak, expand item
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="docker-list">
      {files.length > 0 ? (
        files.map((file, index) => (
          <div
            key={file.id}
            className={`docker-item ${expandedIndex === index ? 'expanded' : ''}`}
            onClick={() => handleToggle(index)} // Ketika diklik, atur state untuk expand/collapse
          >
            <h2>{file.name}</h2>
            <p>Size: {Math.round(file.sizeInBytes / (1024 * 1024))} MB</p>
            <div className="tags-list">
              {file.tags.map((tag, tagIndex) => (
                <div key={tagIndex} className="tag-item">
                  <span className="tag-name">{tag.name}</span>
                  <span className="tag-size"> - {Math.round(tag.sizeInBytes / (1024 * 1024))} MB</span>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No files found.</p>
      )}
    </div>
  );
};

export default DockerList;
