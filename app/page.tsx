import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <section className="p-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to TrustedStore</h1>
        <p className="text-gray-400">Buy digital goods securely — Login with Discord to get started.</p>
      </section>
    </main>
  );
}
