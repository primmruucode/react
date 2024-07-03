import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageSelection.css'; // Import your CSS file

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

const ImageSelection = () => {
  const [images, setImages] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://34.126.142.20:5000/images');
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="image-selection">
      <h1>Select an Image</h1>
      <div className="image-grid">
        {images.map(image => (
          <div 
            key={image._id} 
            className={`image-item ${selectedImageId === image._id ? 'selected' : ''}`} 
            onClick={() => setSelectedImageId(image._id)}
          >
            <img 
              src={`data:${image.contentType};base64,${arrayBufferToBase64(image.imageData.data)}`} 
              alt={image.imageName} 
            />
          </div>
        ))}
      </div>
      {selectedImageId && <button onClick={() => alert(`Selected image ID: ${selectedImageId}`)}>Confirm Selection</button>}
    </div>
  );
};

export default ImageSelection;
