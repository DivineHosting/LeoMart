import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken, getUserInfo } from "@/lib/discordAuth";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) return NextResponse.redirect("/");

  try {
    const tokenData = await exchangeCodeForToken(code);
    const user = await getUserInfo(tokenData.access_token);

    const res = NextResponse.redirect("/");
    res.cookies.set("discord_user", JSON.stringify(user), { httpOnly: false, path: "/" });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.redirect("/");
  }
}
