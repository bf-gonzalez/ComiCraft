"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { CldImage } from 'next-cloudinary';

const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'ml_default'); // Reemplaza con tu upload preset de Cloudinary

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dx1kqmh8v/image/upload', formData);
      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {imageUrl && (
        <CldImage
          src={imageUrl}
          width="500"
          height="500"
          crop={{
            type: 'auto',
            source: true
          }}
        />
      )}
    </div>
  );
};

export default ImageUpload;