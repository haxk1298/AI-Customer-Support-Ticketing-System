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
    category: "General",
    priority: "Low",
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
        category: "General",
        priority: "Low",
      });

      loadTickets();

    } catch (error: any) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-blue-700">
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

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded border p-3 text-black"
          >
            <option>General</option>
            <option>Technical</option>
            <option>Billing</option>
            <option>Account</option>
            <option>Refund</option>
          </select>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded border p-3 text-black"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          <button
            className="rounded bg-blue-600 px-8 py-3 text-white"
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

            <tr className="bg-blue-600 text-white">

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