export function GET(request: Request) {
  return new Response('root catchall ok: ' + new URL(request.url).pathname);
}
