"use client";
export default function ProductCard({ item }: any) {
  return (
    <div className="bg-gray-900 p-4 rounded-2xl shadow hover:shadow-lg transition">
      <img src={item.image} alt="" className="rounded-lg w-full h-40 object-cover" />
      <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
      <p className="text-gray-400 text-sm">{item.description}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="font-bold">${item.price}</span>
        <a
          href="https://discord.gg/B3vSU5P3Qz"
          target="_blank"
          className="bg-indigo-600 px-3 py-1 rounded text-sm"
        >
          Buy
        </a>
      </div>
    </div>
  );
}
