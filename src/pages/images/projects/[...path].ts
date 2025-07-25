import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const url = new URL(request.url);
    console.log("Projects image API request:", url.pathname, "params:", JSON.stringify(params));

    // Handle the path parameter for projects
    let imagePath = "";
    if (params.path) {
      if (Array.isArray(params.path)) {
        imagePath = params.path.join("/");
      } else if (typeof params.path === "string") {
        imagePath = params.path;
      }
    }

    const filePath = path.join(process.cwd(), "public", "images", "projects", imagePath);

    console.log("Projects image path:", imagePath);
    console.log("Full file path:", filePath);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log("Projects image not found:", filePath);

      // List directory contents for debugging
      const dirPath = path.dirname(filePath);
      try {
        const files = fs.readdirSync(dirPath);
        console.log("Projects directory contents of", dirPath, ":", files);
      } catch (e) {
        console.log("Could not read projects directory:", dirPath, "Error:", e.message);
      }

      return new Response(`Projects image not found: ${imagePath} at ${filePath}`, {
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

    console.log("Successfully serving projects image:", filePath, "as", contentType);

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
    console.error("Error serving projects image:", error);
    return new Response(`Internal server error: ${error.message}`, {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
};

export const prerender = false;
