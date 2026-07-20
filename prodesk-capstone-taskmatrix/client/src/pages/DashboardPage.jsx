import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import api from "../services/api";
import useAuthStore from "../store/authStore";

const COLORS = { backlog: "#6B7280", todo: "#3B82F6", in_progress: "#F59E0B", in_review: "#8B5CF6", done: "#10B981", cancelled: "#EF4444" };
const PRIORITY_COLORS = { none: "#9CA3AF", low: "#3B82F6", medium: "#F59E0B", high: "#F97316", urgent: "#EF4444" };

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { data: orgs } = useQuery({ queryKey: ["organizations"], queryFn: () => api.get("/organizations").then((r) => r.data.data) });
  const orgId = orgs?.[0]?._id;

  const { data: stats } = useQuery({
    queryKey: ["dashboard", orgId],
    queryFn: () => api.get(`/dashboard/${orgId}/stats`).then((r) => r.data.data),
    enabled: !!orgId,
  });

  if (!user) return null;

  const statusData = stats?.tasksByStatus ? Object.entries(stats.tasksByStatus).map(([name, value]) => ({ name, value })) : [];
  const priorityData = stats?.tasksByPriority ? Object.entries(stats.tasksByPriority).map(([name, value]) => ({ name, value })) : [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Tasks" value={stats?.totalTasks || 0} />
        <StatCard label="Members" value={stats?.memberCount || 0} />
        <StatCard label="Projects" value={stats?.projectCount || 0} />
        <StatCard label="Welcome" value={`${user.firstName}`} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tasks by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart><Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>{statusData.map((e) => <Cell key={e.name} fill={COLORS[e.name] || "#6B7280"} />)}</Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tasks by Priority</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value">{priorityData.map((e) => <Cell key={e.name} fill={PRIORITY_COLORS[e.name] || "#9CA3AF"} />)}</Bar></BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {stats?.recentActivities?.length ? stats.recentActivities.map((a) => (
            <div key={a._id} className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <span className="text-gray-600 dark:text-gray-400">{a.actor?.firstName} {a.actor?.lastName}</span>
              <span className="text-gray-500 dark:text-gray-500">{a.action.replace(/\./g, " ")}</span>
            </div>
          )) : <p className="text-gray-500 text-sm">No recent activity</p>}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
    </div>
  );
}