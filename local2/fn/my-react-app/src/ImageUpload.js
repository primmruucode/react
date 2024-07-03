import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageUpload.css';

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
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 9;

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
      setSelectedImageId(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(images.length / imagesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="image-upload">
      <h1>Image Upload</h1>
      <div className="image-grid">
        {currentImages.map(image => (
          <div
            key={image._id}
            className={`image-item ${selectedImageId === image._id ? 'selected' : ''}`}
            onClick={() => setSelectedImageId(image._id)}
          >
            <img
              src={`data:${image.contentType};base64,${arrayBufferToBase64(image.imageData.data)}`}
              alt={image.imageName}
              onLoad={(e) => e.target.classList.add('loaded')}
            />
            {selectedImageId === image._id && (
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(image._id);
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(images.length / imagesPerPage)}>Next</button>
      </div>
      <form className="upload-form" onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImageUpload;
