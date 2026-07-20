import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../services/api";

export default function CalendarPage() {
  const { projectId } = useParams();
  const [currentDate, setCurrentDate] = useState(dayjs());

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => api.get(`/tasks/project/${projectId}`).then((r) => r.data.data),
  });

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.day();

  const days = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= currentDate.daysInMonth(); i++) days.push(i);

  const getTasksForDay = (day) => {
    if (!day) return [];
    const date = currentDate.date(day).format("YYYY-MM-DD");
    return tasks.filter((t) => t.dueDate && dayjs(t.dueDate).format("YYYY-MM-DD") === date);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setCurrentDate(currentDate.subtract(1, "month"))} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"><ChevronLeft className="w-5 h-5" /></button>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{currentDate.format("MMMM YYYY")}</h2>
        <button onClick={() => setCurrentDate(currentDate.add(1, "month"))} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"><ChevronRight className="w-5 h-5" /></button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">{d}</div>
        ))}
        {days.map((day, i) => (
          <div key={i} className={`min-h-[80px] p-1 border border-gray-100 dark:border-gray-700 rounded ${day ? "" : "bg-gray-50 dark:bg-gray-900/50"}`}>
            {day && (
              <>
                <span className="text-xs text-gray-600 dark:text-gray-400">{day}</span>
                <div className="mt-1 space-y-0.5">
                  {getTasksForDay(day).slice(0, 3).map((t) => (
                    <div key={t._id} className="text-[10px] px-1 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 truncate">{t.title}</div>
                  ))}
                  {getTasksForDay(day).length > 3 && <div className="text-[10px] text-gray-400">+{getTasksForDay(day).length - 3} more</div>}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}