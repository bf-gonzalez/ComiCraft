import { NextResponse } from 'next/server';
import cloudinary from '@/server/cloudinary';

export async function GET() {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: '', // Puedes especificar un prefijo si quieres filtrar por carpeta
    });
    return NextResponse.json(result.resources);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Error fetching images' }, { status: 500 });
  }
}