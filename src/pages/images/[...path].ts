import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const url = new URL(request.url);
    console.log(
      "Image API request:",
      url.pathname,
      "params:",
      JSON.stringify(params),
    );

    // Handle the path parameter properly
    let imagePath = "";
    if (params.path) {
      if (Array.isArray(params.path)) {
        imagePath = params.path.join("/");
      } else if (typeof params.path === "string") {
        imagePath = params.path;
      }
    }

    // Construct the full file path
    const filePath = path.join(process.cwd(), "public", "images", imagePath);

    console.log("Requested image path:", imagePath);
    console.log("Full file path:", filePath);
    console.log("Current working directory:", process.cwd());

    // Security check: ensure the path is within the public/images directory
    const publicImagesDir = path.join(process.cwd(), "public", "images");
    const resolvedPath = path.resolve(filePath);
    const resolvedPublicDir = path.resolve(publicImagesDir);

    if (!resolvedPath.startsWith(resolvedPublicDir)) {
      console.log("Security violation: path outside images directory");
      return new Response("Forbidden", { status: 403 });
    }

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log("File not found:", filePath);

      // Enhanced debugging: list directory contents
      const dirPath = path.dirname(filePath);
      console.log("Looking in directory:", dirPath);

      try {
        if (fs.existsSync(dirPath)) {
          const files = fs.readdirSync(dirPath);
          console.log("Directory contents:", files);
        } else {
          console.log("Directory does not exist:", dirPath);

          // Try to find the closest existing parent directory
          let currentDir = dirPath;
          while (currentDir !== path.dirname(currentDir)) {
            if (fs.existsSync(currentDir)) {
              const parentFiles = fs.readdirSync(currentDir);
              console.log(
                `Closest existing directory ${currentDir}:`,
                parentFiles,
              );
              break;
            }
            currentDir = path.dirname(currentDir);
          }
        }
      } catch (e) {
        console.log("Error reading directory:", e.message);
      }

      return new Response(`Image not found: ${imagePath}`, {
        status: 404,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    const stats = fs.statSync(filePath);

    console.log("File size:", stats.size, "bytes");

    // Determine content type based on file extension
    const ext = path.extname(filePath).toLowerCase();
    let contentType = "application/octet-stream";

    switch (ext) {
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
      case ".jpeg":
        contentType = "image/jpeg";
        break;
      case ".gif":
        contentType = "image/gif";
        break;
      case ".svg":
        contentType = "image/svg+xml";
        break;
      case ".webp":
        contentType = "image/webp";
        break;
      case ".ico":
        contentType = "image/x-icon";
        break;
      case ".bmp":
        contentType = "image/bmp";
        break;
      case ".tiff":
      case ".tif":
        contentType = "image/tiff";
        break;
    }

    console.log(
      "Successfully serving image:",
      filePath,
      "as",
      contentType,
      "size:",
      stats.size,
    );

    // Return the image with proper headers
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
        "Content-Length": stats.size.toString(),
        "Last-Modified": stats.mtime.toUTCString(),
        ETag: `"${stats.mtime.getTime()}-${stats.size}"`,
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new Response(`Internal server error: ${error.message}`, {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
};

export const prerender = false;
