import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">TaskMatrix</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Project management made simple</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}