import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export default function OrganizationPage() {
  const { orgId } = useParams();
  const { data: org } = useQuery({
    queryKey: ["organization", orgId],
    queryFn: () => api.get(`/organizations/${orgId}`).then((r) => r.data.data),
  });

  if (!org) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{org.name}</h1>
      <p className="text-gray-500 dark:text-gray-400">{org.description || "No description"}</p>
    </div>
  );
}