import { useAuth } from "../hooks/useAuth";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">Account Settings</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account preferences and notifications.</p>
      </div>
    </div>
  );
}