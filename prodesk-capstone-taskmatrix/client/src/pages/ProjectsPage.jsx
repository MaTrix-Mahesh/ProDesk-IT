import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Plus, FolderKanban } from "lucide-react";
import api from "../services/api";
import { toast } from "sonner";

export default function ProjectsPage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", key: "", description: "", organization: "" });
  const queryClient = useQueryClient();

  const { data: orgs } = useQuery({ queryKey: ["organizations"], queryFn: () => api.get("/organizations").then((r) => r.data.data) });
  const { data: projects } = useQuery({ queryKey: ["projects"], queryFn: () => api.get("/projects").then((r) => r.data.data), enabled: false });

  const createMutation = useMutation({
    mutationFn: (data) => api.post("/projects", data).then((r) => r.data.data),
    onSuccess: () => { toast.success("Project created"); setShowForm(false); queryClient.invalidateQueries({ queryKey: ["projects"] }); setForm({ name: "", key: "", description: "", organization: "" }); },
    onError: (err) => toast.error(err.response?.data?.message || "Failed"),
  });

  const handleCreate = (e) => { e.preventDefault(); createMutation.mutate(form); };
  const update = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const projectsData = projects || [];
  const hasOrg = orgs && orgs.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
        {hasOrg && <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"><Plus className="w-4 h-4" /> New Project</button>}
      </div>
      {!hasOrg && <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl text-center"><Link to="/organizations" className="text-indigo-600 hover:underline">Create an organization</Link> to start a project.</div>}
      {showForm && (
        <form onSubmit={handleCreate} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label><input type="text" value={form.name} onChange={update("name")} required className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" /></div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Key</label><input type="text" value={form.key} onChange={update("key")} required maxLength={10} placeholder="PROJ" className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Organization</label><select value={form.organization} onChange={update("organization")} required className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">{orgs?.map((o) => <option key={o._id} value={o._id}>{o.name}</option>)}</select></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label><textarea value={form.description} onChange={update("description")} rows={3} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" /></div>
          <div className="flex gap-3"><button type="submit" disabled={createMutation.isPending} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50">{createMutation.isPending ? "Creating..." : "Create"}</button><button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">Cancel</button></div>
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projectsData.map((p) => (
          <Link key={p._id} to={`/projects/${p._id}`} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3"><FolderKanban className="w-6 h-6 text-indigo-500" /><h3 className="font-semibold text-gray-900 dark:text-white">{p.name}</h3><span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-400">{p.key}</span></div>
            {p.description && <p className="text-sm text-gray-500 dark:text-gray-400">{p.description}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}