import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 text-amber-900">
      <h2 className="text-4xl font-bold mb-4">Not Found</h2>
      <p className="text-xl mb-8">Could not find requested resource</p>
      <Link
        href="/"
        className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
