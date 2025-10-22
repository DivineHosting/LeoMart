"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find(r => r.startsWith("discord_user="));
    if (cookie) {
      try {
        const data = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
        setUser(data);
      } catch {}
    }
  }, []);

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-gray-950 shadow">
      <Link href="/" className="font-bold text-xl text-white">
        TrustedStore
      </Link>
      <div className="flex items-center gap-4 text-gray-300">
        <Link href="/products" className="hover:text-white">Products</Link>
        <Link href="/admin" className="hover:text-white">Admin</Link>
        {user ? (
          <>
            <span className="text-sm text-gray-400">{user.username}#{user.discriminator}</span>
            <Link href="/api/auth/logout" className="hover:text-white">Logout</Link>
          </>
        ) : (
          <Link href="/api/auth" className="hover:text-white">Login</Link>
        )}
      </div>
    </nav>
  );
}
