"use client";

import { useEffect, useState } from "react";
import { createTicket, getMyTickets } from "@/services/authService";

export default function CustomerDashboard() {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const [tickets, setTickets] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const loadTickets = async () => {
    try {
      const data = await getMyTickets();
      setTickets(data.tickets);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createTicket(formData);

      alert("Ticket Created Successfully");

      setFormData({
        title: "",
        description: "",
      });

      loadTickets();

    } catch (error: any) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-emerald-700">
        Welcome {user?.name}
      </h1>

      <div className="mt-8 rounded bg-white p-6 shadow">

        <h2 className="mb-4 text-2xl font-bold text-black">
          Create Ticket
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="title"
            placeholder="Ticket Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded border p-3 text-black"
          />

          <textarea
            name="description"
            placeholder="Describe your problem..."
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded border p-3 text-black"
          />

          <button
            className="rounded bg-emerald-600 px-8 py-3 text-white"
          >
            Create Ticket
          </button>

        </form>
      </div>

      <div className="mt-10 rounded bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-bold text-black">
          My Tickets
        </h2>

        <table className="w-full border">

          <thead>

            <tr className="bg-emerald-600 text-white">

              <th className="p-3">Title</th>

              <th>Status</th>

              <th>Priority</th>

              <th>Category</th>

            </tr>

          </thead>

          <tbody>

            {tickets.map((ticket) => (

              <tr
                key={ticket._id}
                className="border text-center text-black"
              >

                <td className="p-3">{ticket.title}</td>

                <td>{ticket.status}</td>

                <td>{ticket.priority}</td>

                <td>{ticket.category}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}