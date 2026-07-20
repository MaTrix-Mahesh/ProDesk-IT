import { useParams, Link, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const { data: project } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => api.get(`/projects/${projectId}`).then((r) => r.data.data),
  });

  if (!project) return <div className="text-gray-500">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{project.key} - {project.description}</p>
        </div>
      </div>
      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
        <Link to={`/projects/${projectId}`} className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Board</Link>
        <Link to={`/projects/${projectId}/calendar`} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600">Calendar</Link>
      </div>
      <Outlet />
    </div>
  );
}