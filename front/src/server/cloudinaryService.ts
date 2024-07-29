import cloudinary from './cloudinary';

export const getImages = async () => {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: '', // Puedes especificar un prefijo si quieres filtrar por carpeta
    });
    return result.resources;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};