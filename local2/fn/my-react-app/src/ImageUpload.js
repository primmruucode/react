import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      const res = await axios.post('http://localhost:5000/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setImages([...images, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/images');
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/images/${id}`);
      setImages(images.filter(image => image._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <h1>Image Upload</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <div>
        {images.map(image => (
          <div key={image._id}>
            <h2>{image.imageName}</h2>
            <img src={`data:${image.contentType};base64,${btoa(String.fromCharCode(...new Uint8Array(image.imageData.data)))}`} alt={image.imageName} />
            <button onClick={() => handleDelete(image._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;