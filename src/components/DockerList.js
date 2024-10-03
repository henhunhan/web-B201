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
            <p>Last Updated: {new Date(file.lastUpdated).toLocaleDateString()}</p>
            <p>Size: {file.size} MB</p>
          </div>
        ))
      ) : (
        <p>No files found.</p>
      )}
    </div>
  );
};

export default DockerList;
