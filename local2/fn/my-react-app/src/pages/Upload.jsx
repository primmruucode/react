import React, { useState } from 'react';
import axios from 'axios';
import './ImageUpload.css';

function ImageUploadPage1() {
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://34.126.142.20:5000/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Image uploaded:', res.data);
      // Clear file input and preview
      setFile(null);
      setPreviewImage(null);
      // Optionally handle success response or update other state
    } catch (err) {
      console.error('Error uploading image:', err);
      // Handle error response
    }
  };

  return (
    <div className="image-upload-page1">
      <h1>Upload Image</h1>
      <form className="upload-form" onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        {previewImage && (
          <div className="image-preview">
            <img src={previewImage} alt="Preview" />
          </div>
        )}
        <button type="submit" disabled={!file}>Upload</button>
      </form>
    </div>
  );
}

export default ImageUploadPage1;