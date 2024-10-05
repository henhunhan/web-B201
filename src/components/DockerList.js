// src/components/DockerList.js
import React from 'react';
import './DockerList.css';

const DockerList = ({ files }) => {
  return (
    <div className="docker-list">
      {files.length > 0 ? (
        files.map((file) => (
          <div key={file.id} className="docker-item">
            <h2>{file.name}</h2>
            <p>Size: {Math.round(file.sizeInBytes / (1024 * 1024))} MB</p>
            <div className="tags-list">
              {file.tags.map((tag, index) => (
                <div key={index} className="tag-item">
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
