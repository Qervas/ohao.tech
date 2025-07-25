import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const url = new URL(request.url);
    console.log("Image API request:", url.pathname, "params:", params);

    const imagePath = Array.isArray(params.path)
      ? params.path.join("/")
      : params.path || "";
    const filePath = path.join(process.cwd(), "public", "images", imagePath);

    console.log("Image request for:", imagePath);
    console.log("Looking for image at:", filePath);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log("File not found:", filePath);

      // List what's actually in the directory for debugging
      const dirPath = path.dirname(filePath);
      try {
        const files = fs.readdirSync(dirPath);
        console.log("Directory contents:", files);
      } catch (e) {
        console.log("Could not read directory:", dirPath);
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
    }

    console.log("Successfully serving image:", filePath, "as", contentType);

    // Return the image with proper headers
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
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
