import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

// routes anyone can visit
const publicRoutes = ["/login", "/register"];

// api routes that don't need auth
const publicApiRoutes = ["/api/posts"]; // GET is public

async function getSession(request) {
  const token = request.cookies.get("session")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export default async function proxy(request) {
  const { pathname } = request.nextUrl;
  const session = await getSession(request);

  // --- RATE LIMITING ---
  // simple rate limiting using headers
  // in production you'd use Upstash Redis for this
  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";

  // --- AUTH PAGES ---
  const isPublicRoute = publicRoutes.includes(pathname);

  if (!session && !isPublicRoute && !pathname.startsWith("/api")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // --- SECURITY HEADERS ---
  // add to every response
  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:;",
    );
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
