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
  const [selectedImageIds, setSelectedImageIds] = useState([]);
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

  const handleDelete = async () => {
    try {
      await Promise.all(selectedImageIds.map(id => axios.delete(`http://34.126.142.20:5000/images/${id}`)));
      setImages(images.filter(image => !selectedImageIds.includes(image._id)));
      setSelectedImageIds([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageClick = (id) => {
    setSelectedImageIds(prevSelectedIds => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter(imageId => imageId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

/*   const handleNextPage = () => {
    if (currentPage < Math.ceil(images.length / imagesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }; */

  return (
    <div className="image-upload">
      <h1>Your Wardrobe</h1>
      <div className="image-grid">
        {currentImages.map(image => (
          <div
            key={image._id}
            className={`image-item ${selectedImageIds.includes(image._id) ? 'selected' : ''}`}
            onClick={() => handleImageClick(image._id)}
          >
            <img
              src={`data:${image.contentType};base64,${arrayBufferToBase64(image.imageData.data)}`}
              alt={image.imageName}
              onLoad={(e) => e.target.classList.add('loaded')}
            />
          </div>
        ))}
      </div>
      <footer>
{/*         <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
          <button onClick={handleNextPage} disabled={currentPage === Math.ceil(images.length / imagesPerPage)}>Next</button>
        </div> */}
        <form className="upload-form" onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit" class="button-50" role="button">Upload</button>
        </form>
        {selectedImageIds.length > 0 && (
          <button className="delete-button" onClick={handleDelete}>Delete Selected</button>
        )}
      </footer>
    </div>
  );
};

export default ImageUpload;
