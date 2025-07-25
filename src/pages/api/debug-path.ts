import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const url = new URL(request.url);

  const response = {
    url: url.href,
    pathname: url.pathname,
    params: params,
    searchParams: Object.fromEntries(url.searchParams),
    timestamp: new Date().toISOString()
  };

  return new Response(JSON.stringify(response, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
};
