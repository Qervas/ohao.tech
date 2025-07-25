import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const testImage = url.searchParams.get('image') || 'avatar.png';

  try {
    // Check if image exists in public directory
    const publicPath = path.join(process.cwd(), 'public', 'images', testImage);
    const exists = fs.existsSync(publicPath);

    // Check if image exists in dist directory
    const distPath = path.join(process.cwd(), 'dist', 'client', 'images', testImage);
    const distExists = fs.existsSync(distPath);

    // List all files in public/images
    const publicImagesPath = path.join(process.cwd(), 'public', 'images');
    let publicFiles: string[] = [];
    try {
      publicFiles = fs.readdirSync(publicImagesPath);
    } catch (e) {
      publicFiles = ['Error reading directory'];
    }

    // List all files in dist/client/images
    const distImagesPath = path.join(process.cwd(), 'dist', 'client', 'images');
    let distFiles: string[] = [];
    try {
      distFiles = fs.readdirSync(distImagesPath);
    } catch (e) {
      distFiles = ['Error reading directory'];
    }

    const response = {
      testImage,
      paths: {
        publicPath,
        distPath,
        publicImagesPath,
        distImagesPath,
        cwd: process.cwd()
      },
      exists: {
        inPublic: exists,
        inDist: distExists
      },
      files: {
        publicFiles: publicFiles.slice(0, 10), // First 10 files
        distFiles: distFiles.slice(0, 10)
      },
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL,
        VERCEL_ENV: process.env.VERCEL_ENV
      }
    };

    return new Response(JSON.stringify(response, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message,
      stack: error.stack,
      testImage,
      timestamp: new Date().toISOString()
    }, null, 2), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
