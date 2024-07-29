import { NextResponse } from 'next/server';
import cloudinary from '@/server/cloudinary';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get('folder');

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder || '', // Filtra por carpeta si se proporciona
    });
    return NextResponse.json(result.resources);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Error fetching images' }, { status: 500 });
  }
}