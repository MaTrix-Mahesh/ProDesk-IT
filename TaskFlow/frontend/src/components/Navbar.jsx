import { useState } from 'react';

const Navbar = ({ user, onMenuClick, onNewTask }) => {
  const [isDark, setIsDark] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark', !isDark);
  };

  const notifications = [
    { id: 1, icon: '✅', text: 'Task completed', time: '2m ago', color: 'bg-emerald-50 text-emerald-600' },
    { id: 2, icon: '📅', text: 'Task due soon', time: '1h ago', color: 'bg-amber-50 text-amber-600' },
    { id: 3, icon: '📋', text: 'New task created', time: '3h ago', color: 'bg-primary-50 text-primary-600' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Left section */}
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight hidden sm:block">
              Task Management
            </h2>
            <p className="text-xs text-slate-400">{formatDate()}</p>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md ml-4">
            <div className="relative w-full">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* New Task button */}
          <button
            onClick={onNewTask}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            New Task
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors relative"
              aria-label="Notifications"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-scale-in">
                <div className="px-4 py-3 border-b border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                </div>
                <div className="divide-y divide-slate-50">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${notif.color}`}>
                        {notif.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 font-medium">{notif.text}</p>
                        <p className="text-xs text-slate-400">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-slate-100 text-center">
                  <button className="text-xs font-semibold text-primary-600 hover:text-primary-700">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="avatar w-9 h-9 text-xs">{getInitials(user?.name)}</div>
            <span className="hidden xl:block text-sm font-medium text-slate-700">
              {user?.name || 'User'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;