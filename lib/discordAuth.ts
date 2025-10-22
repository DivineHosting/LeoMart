import axios from "axios";

const CLIENT_ID = process.env.DISCORD_CLIENT_ID!;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!;
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI!;

export function getDiscordAuthUrl() {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: "identify"
  });
  return `https://discord.com/oauth2/authorize?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string) {
  const data = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    scope: "identify"
  });

  const res = await axios.post("https://discord.com/api/oauth2/token", data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });
  return res.data;
}

export async function getUserInfo(token: string) {
  const res = await axios.get("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
    }
