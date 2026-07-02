export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-blue-700">
          Register
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded border p-3"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded border p-3"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded border p-3"
          />

          <button
            className="w-full rounded bg-green-600 py-3 text-white hover:bg-green-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}