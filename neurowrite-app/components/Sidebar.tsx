'use client';

import { FEATURE_CATEGORIES } from '@/lib/features';

interface SidebarProps {
  activeFeature: string;
  setActiveFeature: (feature: string) => void;
}

export default function Sidebar({ activeFeature, setActiveFeature }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Neurify
        </h1>
        <p className="text-xs text-gray-500 mt-1">165+ AI Features</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {FEATURE_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFeature(category.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                activeFeature === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{category.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">{category.name}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </nav>

      {/* All Features Free */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-lg p-4">
          <h3 className="font-bold text-sm mb-1">🎉 All Features Free!</h3>
          <p className="text-xs opacity-90">165+ AI-powered features available to everyone</p>
        </div>
      </div>
    </div>
  );
}
