import { axiosInstance } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

async function checkAuth(request: NextRequest) {
  const cookies = request.cookies;
  const session = cookies.get(process.env.SESSION_NAME || "");
  console.log(session);
  if (session?.name && session?.value) {
    try {
      const res = await axiosInstance.get("/auth/profile", {
        headers: {
          Cookie: `${process.env.SESSION_NAME}=${session?.value}`,
        },
      });
      if (res.status === 200) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
  return false;
}

export async function middleware(request: NextRequest) {
   if (
    request.nextUrl.pathname == "/login" ||
    request.nextUrl.pathname == "/register" ||
    request.nextUrl.pathname == "/forgot-password" ||
    request.nextUrl.pathname == "/reset-password" ||
    request.nextUrl.pathname == "/confirm-email" ||
    request.nextUrl.pathname == "/password-change"
  ) {
    return NextResponse.redirect(
      process.env.NEXT_PUBLIC_DOMAIN + "/auth" + request.nextUrl.pathname
    );
  }

  if (request.url.includes("auth")) {
    if (await checkAuth(request)) {
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_DOMAIN + "/dashboard"
      );
    }
  }
  if (request.url.includes("dashboard")) {
    if (!(await checkAuth(request))) {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_DOMAIN + "/login");
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
