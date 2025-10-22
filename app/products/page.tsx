import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, { cache: "no-store" });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {products.map((p: any) => (
          <ProductCard key={p._id} item={p} />
        ))}
      </div>
    </main>
  );
}
