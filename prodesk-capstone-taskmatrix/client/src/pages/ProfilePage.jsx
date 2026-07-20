import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-2xl text-white font-bold">
            {user.firstName?.[0]}{user.lastName?.[0]}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user.firstName} {user.lastName}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Email</label><p className="text-gray-900 dark:text-white">{user.email}</p></div>
          <div><label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Role</label><p className="text-gray-900 dark:text-white capitalize">{user.role}</p></div>
        </div>
      </div>
    </div>
  );
}