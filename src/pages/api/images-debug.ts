import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";

function listImagesRecursively(dir: string, basePath = ""): string[] {
  const images: string[] = [];

  try {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        // Recursively list images in subdirectories
        const subImages = listImagesRecursively(
          fullPath,
          basePath ? `${basePath}/${item}` : item
        );
        images.push(...subImages);
      } else if (stats.isFile()) {
        // Check if it's an image file
        const ext = path.extname(item).toLowerCase();
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.bmp', '.tiff', '.tif'];

        if (imageExtensions.includes(ext)) {
          const imagePath = basePath ? `${basePath}/${item}` : item;
          images.push(imagePath);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }

  return images;
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const showDetails = url.searchParams.get('details') === 'true';

    const imagesDir = path.join(process.cwd(), "public", "images");
    console.log("Looking for images in:", imagesDir);

    if (!fs.existsSync(imagesDir)) {
      return new Response(JSON.stringify({
        error: "Images directory not found",
        path: imagesDir,
        cwd: process.cwd(),
        timestamp: new Date().toISOString()
      }, null, 2), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    const imageList = listImagesRecursively(imagesDir);

    let response: any = {
      total: imageList.length,
      images: imageList.sort(),
      timestamp: new Date().toISOString(),
      baseUrl: `${url.protocol}//${url.host}/images/`
    };

    if (showDetails) {
      // Add detailed information about each image
      response.details = {};

      for (const imagePath of imageList) {
        const fullPath = path.join(imagesDir, imagePath);
        try {
          const stats = fs.statSync(fullPath);
          response.details[imagePath] = {
            size: stats.size,
            lastModified: stats.mtime.toISOString(),
            url: `/images/${imagePath}`,
            exists: true
          };
        } catch (error) {
          response.details[imagePath] = {
            error: error.message,
            exists: false
          };
        }
      }
    }

    // Add some system info for debugging
    response.debug = {
      cwd: process.cwd(),
      imagesDir,
      nodeVersion: process.version,
      platform: process.platform
    };

    return new Response(JSON.stringify(response, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    });

  } catch (error) {
    console.error("Error in images debug endpoint:", error);

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
