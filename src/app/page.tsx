import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <article className="min-w-[400px] text-center">
        <h1>Pages</h1>
        <Link href="/inventory" className="text-lg">
          Inventory 📦
        </Link>
      </article>
    </main>
  );
}
