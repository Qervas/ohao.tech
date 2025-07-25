import type { MiddlewareHandler } from 'astro';
import fs from 'fs';
import path from 'path';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { url, request } = context;

  // Check if this is an image request
  if (url.pathname.startsWith('/images/')) {
    try {
      // Get the file path relative to public directory
      const imagePath = url.pathname.substring(1); // Remove leading slash
      const filePath = path.join(process.cwd(), 'public', imagePath);

      // Check if file exists
      if (fs.existsSync(filePath)) {
        // Read the file
        const fileBuffer = fs.readFileSync(filePath);

        // Determine content type based on file extension
        const ext = path.extname(filePath).toLowerCase();
        let contentType = 'application/octet-stream';

        switch (ext) {
          case '.png':
            contentType = 'image/png';
            break;
          case '.jpg':
          case '.jpeg':
            contentType = 'image/jpeg';
            break;
          case '.gif':
            contentType = 'image/gif';
            break;
          case '.svg':
            contentType = 'image/svg+xml';
            break;
          case '.webp':
            contentType = 'image/webp';
            break;
          case '.ico':
            contentType = 'image/x-icon';
            break;
        }

        // Return the image with proper headers
        return new Response(fileBuffer, {
          status: 200,
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      // If file doesn't exist, log and continue to next
      console.log(`Image not found: ${filePath}`);
    } catch (error) {
      console.error(`Error serving image ${url.pathname}:`, error);
    }
  }

  // Continue to next middleware/page
  return next();
};
