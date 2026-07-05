"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
const COLORS = [
  "#10B981",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const loadDashboard = async () => {
    try {
      const statsRes = await api.get("/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const usersRes = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const analyticsRes = await api.get("/admin/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAnalytics(analyticsRes.data);
      setStats(statsRes.data.stats);
      setUsers(usersRes.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const updateRole = async (id: string, role: string) => {
    try {
      await api.put(
        `/admin/users/${id}`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadDashboard();
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) return <h1 className="p-10">Loading...</h1>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="mb-8 text-4xl font-bold text-emerald-700">
        Admin Dashboard
      </h1>

      {/* Statistics Cards */}

      <div className="grid grid-cols-3 gap-6">

        <div className="rounded bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-black">
            Total Users
          </h2>

          <p className="mt-4 text-4xl font-bold text-green-600">
            {stats.totalUsers}
          </p>
        </div>

        <div className="rounded bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-black">
            Total Tickets
          </h2>

          <p className="mt-4 text-4xl font-bold text-blue-600">
            {stats.totalTickets}
          </p>
        </div>

        <div className="rounded bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-black">
            Agents
          </h2>

          <p className="mt-4 text-4xl font-bold text-purple-600">
            {stats.totalAgents}
          </p>
        </div>

        <div className="rounded bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-black">
            Customers
          </h2>

          <p className="mt-4 text-4xl font-bold text-orange-600">
            {stats.totalCustomers}
          </p>
        </div>

        <div className="rounded bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-black">
            Open Tickets
          </h2>

          <p className="mt-4 text-4xl font-bold text-red-600">
            {stats.openTickets}
          </p>
        </div>

        <div className="rounded bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-black">
            Resolved
          </h2>

          <p className="mt-4 text-4xl font-bold text-emerald-700">
            {stats.resolvedTickets}
          </p>
        </div>

      </div>

      {/* Users Table */}

      <div className="mt-10 rounded bg-white shadow">

        <h2 className="p-6 text-2xl font-bold text-black">
          User Management
        </h2>

        <table className="w-full">

          <thead>

            <tr className="bg-emerald-700 text-white">

              <th className="p-4">Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Change Role</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="border-b text-center text-black"
              >

                <td className="p-4">
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.role}
                </td>

                <td>

                  <select
                    value={user.role}
                    onChange={(e) =>
                      updateRole(user._id, e.target.value)
                    }
                    className="rounded border p-2 text-black"
                  >

                    <option value="customer">
                      Customer
                    </option>

                    <option value="agent">
                      Agent
                    </option>

                    <option value="admin">
                      Admin
                    </option>

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
      {analytics && (
        <div className="mt-10 grid grid-cols-2 gap-8">

          <div className="rounded bg-white p-6 shadow">

            <h2 className="mb-4 text-xl font-bold text-black">
              Tickets by Category
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.categoryChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#0658a9" />
              </BarChart>
            </ResponsiveContainer>

          </div>

          <div className="rounded bg-white p-6 shadow">

            <h2 className="mb-4 text-xl font-bold text-black">
              Ticket Status
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.statusChart}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {analytics.statusChart.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

              </PieChart>
            </ResponsiveContainer>

          </div>

          <div className="rounded bg-white p-6 shadow">

            <h2 className="text-lg font-semibold text-black">

              SLA Compliance

            </h2>

            <p className="mt-4 text-4xl font-bold text-green-600">

              {stats.slaCompliance}%

            </p>

          </div>

        </div>
      )}
    </div>
  );
}