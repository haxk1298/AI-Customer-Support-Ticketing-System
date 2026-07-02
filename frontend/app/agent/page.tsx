"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import {
  assignTicket,
  updateTicketStatus,
} from "@/services/authService";

export default function AgentDashboard() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const loadTickets = async () => {
    const res = await api.get("/tickets/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTickets(res.data.tickets);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleAssign = async (id: string) => {
    await assignTicket(id);
    loadTickets();
  };

  const handleStatus = async (
    id: string,
    status: string
  ) => {
    await updateTicketStatus(id, status);
    loadTickets();
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      ticket.customer?.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      ticket.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="mb-8 text-4xl font-bold text-blue-700">
        Agent Dashboard
      </h1>

      <div className="mb-6 flex gap-4">

        <input
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded border p-3 text-black w-80"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="rounded border p-3 text-black"
        >
          <option>All</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>

      </div>

      <table className="w-full bg-white shadow rounded">

        <thead>

          <tr className="bg-blue-700 text-white">

            <th className="p-4">Title</th>

            <th>Customer</th>

            <th>Priority</th>

            <th>Status</th>

            <th>Assign</th>

            <th>Update Status</th>

          </tr>

        </thead>

        <tbody>

          {filteredTickets.map((ticket) => (

            <tr
              key={ticket._id}
              className="border-b text-center text-black"
            >

              <td className="p-4">
                {ticket.title}
              </td>

              <td>
                {ticket.customer?.name}
              </td>

              <td>
                {ticket.priority}
              </td>

              <td>
                {ticket.status}
              </td>

              <td>

                {ticket.assignedAgent ? (

                  <span className="text-green-600 font-bold">
                    Assigned
                  </span>

                ) : (

                  <button
                    onClick={() =>
                      handleAssign(ticket._id)
                    }
                    className="rounded bg-green-600 px-4 py-2 text-white"
                  >
                    Assign To Me
                  </button>

                )}

              </td>

              <td>

                <select
                  value={ticket.status}
                  onChange={(e) =>
                    handleStatus(
                      ticket._id,
                      e.target.value
                    )
                  }
                  className="rounded border p-2 text-black"
                >

                  <option>Open</option>

                  <option>In Progress</option>

                  <option>Resolved</option>

                  <option>Closed</option>

                </select>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}