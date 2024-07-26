import React, { useState } from 'react';
import axios from 'axios';
import { CldImage } from 'next-cloudinary';

const ImageUpload = ({ folderName }) => {
  const [images, setImages] = useState<(File | null)[]>([null, null]);
  const [imageUrls, setImageUrls] = useState<(string | null)[]>([null, null]);

  const handleImageChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newImages = [...images];
      newImages[index] = e.target.files[0];
      setImages(newImages);
    }
  };

  const handleUpload = async () => {
    for (let i = 0; i < images.length; i++) {
      if (!images[i]) continue;

      const formData = new FormData();
      formData.append('file', images[i]);
      formData.append('upload_preset', 'ml_default'); // Reemplaza con tu upload preset de Cloudinary
      if (folderName) {
        formData.append('folder', folderName);
      }

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dx1kqmh8v/image/upload', formData);
        const newImageUrls = [...imageUrls];
        newImageUrls[i] = response.data.secure_url;
        setImageUrls(newImageUrls);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div>
      {images.map((_, index) => (
        <div key={index}>
          <input type="file" onChange={handleImageChange(index)} />
          {imageUrls[index] && (
            <CldImage
              src={imageUrls[index]}
              width="500"
              height="500"
              crop={{
                type: 'auto',
                source: true
              }}
            />
          )}
        </div>
      ))}
      <button onClick={handleUpload}>Upload Images</button>
    </div>
  );
};

export default ImageUpload;