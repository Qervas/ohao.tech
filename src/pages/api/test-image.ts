import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const testImage = url.searchParams.get('path') || 'avatar.png';

    const imagePath = path.join(process.cwd(), "public", "images", testImage);

    const response = {
      requestedPath: testImage,
      fullPath: imagePath,
      cwd: process.cwd(),
      exists: fs.existsSync(imagePath),
      timestamp: new Date().toISOString()
    };

    if (response.exists) {
      const stats = fs.statSync(imagePath);
      response.fileInfo = {
        size: stats.size,
        lastModified: stats.mtime.toISOString(),
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory()
      };

      // Test if we can read the file
      try {
        const buffer = fs.readFileSync(imagePath);
        response.readable = true;
        response.bufferSize = buffer.length;
      } catch (readError) {
        response.readable = false;
        response.readError = readError.message;
      }
    } else {
      // Try to find what's in the parent directory
      const parentDir = path.dirname(imagePath);
      try {
        if (fs.existsSync(parentDir)) {
          const files = fs.readdirSync(parentDir);
          response.parentDirContents = files;
        } else {
          response.parentDirExists = false;
        }
      } catch (error) {
        response.parentDirError = error.message;
      }
    }

    return new Response(JSON.stringify(response, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    }, null, 2), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};

export const prerender = false;
