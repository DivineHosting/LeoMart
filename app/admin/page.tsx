"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default function Admin() {
  const [allowed, setAllowed] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "", image: "" });

  useEffect(() => {
    const cookie = document.cookie.split("; ").find(r => r.startsWith("discord_user="));
    if (cookie) {
      try {
        const user = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
        if (user.id === "1310257878296170619") setAllowed(true);
      } catch {}
    }
  }, []);

  useEffect(() => {
    axios.get("/api/products").then(r => setProducts(r.data));
  }, []);

  if (!allowed) return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <Navbar />
      <p className="text-gray-400">You are not authorized.</p>
    </main>
  );

  const handleAdd = async () => {
    await axios.post("/api/products", form);
    setForm({ name: "", description: "", price: "", category: "", image: "" });
    const res = await axios.get("/api/products");
    setProducts(res.data);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <div className="grid gap-2 max-w-md">
          {Object.keys(form).map(k => (
            <input
              key={k}
              placeholder={k}
              className="bg-gray-800 p-2 rounded"
              value={(form as any)[k]}
              onChange={e => setForm({ ...form, [k]: e.target.value })}
            />
          ))}
          <button onClick={handleAdd} className="bg-indigo-600 py-2 rounded font-semibold">Add Product</button>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(p => (
            <div key={p._id} className="bg-gray-900 p-3 rounded-lg">
              <p className="font-bold">{p.name}</p>
              <p>${p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
