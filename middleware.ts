import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/account/:path*"],
};

export function middleware(req: NextRequest) {
  console.log("MIDLEWARE run...");

  return NextResponse.next();
}
