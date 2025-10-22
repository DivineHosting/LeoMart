import { NextResponse } from "next/server";
import { getDiscordAuthUrl } from "@/lib/discordAuth";

export async function GET() {
  const url = getDiscordAuthUrl();
  return NextResponse.redirect(url);
}
