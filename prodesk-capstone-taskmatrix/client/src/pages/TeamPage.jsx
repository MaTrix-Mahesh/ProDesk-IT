import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Mail, UserCheck } from "lucide-react";
import api from "../services/api";

export default function TeamPage() {
  const { orgId } = useParams();
  const { data: org } = useQuery({
    queryKey: ["organization", orgId],
    queryFn: () => api.get(`/organizations/${orgId}`).then((r) => r.data.data),
  });
  const { data: members = [] } = useQuery({
    queryKey: ["members", orgId],
    queryFn: () => api.get(`/organizations/${orgId}/members`).then((r) => r.data.data),
    enabled: false,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team {org?.name}</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <p className="text-gray-500 dark:text-gray-400">Team management coming soon. Invite members to collaborate.</p>
      </div>
    </div>
  );
}