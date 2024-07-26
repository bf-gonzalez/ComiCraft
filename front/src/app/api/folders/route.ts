import { NextResponse } from 'next/server';
import cloudinary from '@/server/cloudinary';

export async function GET() {
  try {
    const result = await cloudinary.api.root_folders();
    const folders = await Promise.all(result.folders.map(async (folder) => {
      const images = await cloudinary.api.resources({
        type: 'upload',
        prefix: folder.name,
        max_results: 1
      });
      return {
        name: folder.name,
        firstImage: images.resources[0]?.secure_url || ''
      };
    }));
    return NextResponse.json(folders);
  } catch (error) {
    console.error('Error fetching folders:', error);
    return NextResponse.json({ error: 'Error fetching folders' }, { status: 500 });
  }
}