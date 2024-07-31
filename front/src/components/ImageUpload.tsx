import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CldImage } from 'next-cloudinary';
import Swal from 'sweetalert2';

const ImageUpload = ({ folderName }) => {
  const [images, setImages] = useState<(File | null)[]>([null]);
  const [imageUrls, setImageUrls] = useState<(string | null)[]>([null]);
  const [previewUrls, setPreviewUrls] = useState<(string | null)[]>([null]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('decodedUser'));
    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);

  const handleImageChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newImages = [...images];
      newImages[index] = e.target.files[0];
      setImages(newImages);

      const newPreviewUrls = [...previewUrls];
      newPreviewUrls[index] = URL.createObjectURL(e.target.files[0]);
      setPreviewUrls(newPreviewUrls);

      // Agregar un nuevo formulario si es el último
      if (index === images.length - 1) {
        setImages([...newImages, null]);
        setPreviewUrls([...newPreviewUrls, null]);
        setImageUrls([...imageUrls, null]);
      }
    }
  };

  const handleUpload = async () => {
    Swal.fire({
      title: 'Se está subiendo tu cómic',
      html: 'Por favor espera...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    let allUploaded = true;
    for (let i = 0; i < images.length; i++) {
      if (!images[i]) continue;

      const formData = new FormData();
      formData.append('file', images[i]);
      formData.append('upload_preset', 'ml_default');
      const fullFolderName = `${folderName} @${userName}`;
      formData.append('folder', fullFolderName);
      formData.append('public_id', `${fullFolderName}/${i + 1}`); // Asigna un nombre secuencial

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dx1kqmh8v/image/upload', formData);
        const newImageUrls = [...imageUrls];
        newImageUrls[i] = response.data.secure_url;
        setImageUrls(newImageUrls);
      } catch (error) {
        console.error('Error uploading image:', error);
        allUploaded = false;
      }
    }

    Swal.close();

    if (allUploaded) {
      try {
        const user = JSON.parse(localStorage.getItem('decodedUser'));
        const comicData = {
          title: folderName,
          author: user.name,
          url: `${folderName} @${user.name}`
        };
        await axios.post('http://localhost:3000/comics', comicData);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cómic subido con éxito',
          showConfirmButton: true,
          timer: undefined
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error('Error saving comic data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un problema al guardar los datos del cómic!',
        });
      }
    }
  };

  return (
    <div>
      <div className="flex flex-wrap space-x-4">
        {images.map((_, index) => (
          <div key={index} className="relative w-48 h-64 border-2 border-gray-400 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 m-2">
            <input
              type="file"
              onChange={handleImageChange(index)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {!previewUrls[index] && !imageUrls[index] && (
              <span className="text-4xl text-gray-400">+</span>
            )}
            {previewUrls[index] && !imageUrls[index] && (
              <img
                src={previewUrls[index]}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            {imageUrls[index] && (
              <CldImage
                src={imageUrls[index]}
                width="500"
                height="500"
                crop={{
                  type: 'auto',
                  source: true
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
      <button onClick={handleUpload} className="mt-4 px-4 py-2 bg-[#F5C702] text-gray-800 rounded hover:bg-blue-700 hover:text-white transition-colors duration-300">Subir Cómic</button>
    </div>
  );
};

export default ImageUpload;