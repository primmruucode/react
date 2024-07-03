import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import './ImageUpload.css';

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

  return (
    <div className="image-upload">
      <h1>Your Wardrobe</h1>
      <div className="image-grid">
        {currentImages.map(image => (
          <LazyLoad key={image._id} height={200} once>
            <div
              className={`image-item ${selectedImageIds.includes(image._id) ? 'selected' : ''}`}
              onClick={() => handleImageClick(image._id)}
            >
              <img
                src={`data:${image.contentType};base64,${Buffer.from(image.imageData.data).toString('base64')}`}
                alt={image.imageName}
              />
            </div>
          </LazyLoad>
        ))}
      </div>
      <footer>
        {selectedImageIds.length > 0 && (
          <button className="delete-button" onClick={handleDelete}>Delete Selected</button>
        )}
      </footer>
    </div>
  );
};

export default ImageUpload;
