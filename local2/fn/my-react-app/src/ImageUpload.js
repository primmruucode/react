import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageUpload.css'; // Import your CSS file

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://34.126.142.20:5000/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setImages([...images, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://34.126.142.20:5000/images');
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://34.126.142.20:5000/images/${id}`);
      setImages(images.filter(image => image._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="image-upload">
      <h1>Image Upload</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <div className="image-grid">
        {images.map(image => (
          <div key={image._id} className="image-item">
            <img src={`data:${image.contentType};base64,${arrayBufferToBase64(image.imageData.data)}`} alt={image.imageName} />
            <button className="delete-button" onClick={() => handleDelete(image._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
