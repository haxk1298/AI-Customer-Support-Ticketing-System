export default function Navbar() {
  return (
    <nav className="w-full bg-blue-700 text-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold">
          AI Ticket System
        </h1>

        <div className="space-x-6">
          <a href="/" className="hover:text-gray-200">
            Home
          </a>

          <a href="/login" className="hover:text-gray-200">
            Login
          </a>

          <a href="/register" className="hover:text-gray-200">
            Register
          </a>
        </div>
      </div>
    </nav>
  );
}