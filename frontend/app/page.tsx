import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="text-5xl font-bold text-emerald-700">
          AI Customer Support Ticketing System
        </h1>

        <p className="mt-5 text-lg text-gray-600">
          Smart AI Powered Customer Support Platform
        </p>

        <div className="mt-10 flex gap-4">
          <a
            href="/login"
            className="rounded bg-emerald-700 px-6 py-3 text-white hover:bg-emerald-700"
          >
            Login
          </a>

          <a
            href="/register"
            className="rounded border border-emerald-700 px-6 py-3 text-emerald-700 hover:bg-emerald-50"
          >
            Register
          </a>
        </div>
      </main>
    </>
  );
}