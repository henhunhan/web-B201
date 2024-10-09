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
            style={{ height: expandedIndex === index ? `${80 + file.tags.length * 50}px` : '80px' }} // Mengatur tinggi sesuai jumlah tags
          >
          
            <h2>{file.name}</h2> 

            <div className="tags-list">
              {file.tags.slice(-1).map((tag, tagIndex) => (
                <div key={tagIndex} className="tag-item">
                  <span className="tag-name">{tag.name} </span>
                </div>
              ))}
              {file.tags.map((tag, tagIndex) => (
                <div key={tagIndex} className="tag-item">
                  <span className="tag-name">{tag.name} </span>
                  <span className="tag-size">{Math.round(tag.sizeInBytes / (1024 * 1024))} MB</span>
                </div>
              ))}
              <p className='Size-text'>-{Math.round(file.sizeInBytes / (1024 * 1024))} MB</p>
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
