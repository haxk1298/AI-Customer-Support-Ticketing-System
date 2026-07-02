"use client";

export default function CustomerDashboard() {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-blue-700">
        Customer Dashboard
      </h1>

      <div className="mt-8 rounded-lg bg-white p-6 shadow">
        <h2 className="text-2xl font-semibold text-black">
          Welcome {user?.name}
        </h2>

        <p className="mt-2 text-black">Email: {user?.email}</p>

        <p className="mt-2 text-black">Role: {user?.role}</p>
      </div>
    </div>
  );
}