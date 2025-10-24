'use client';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📝</span>
            <h2 className="text-lg font-semibold text-gray-800">Untitled Document</h2>
          </div>
          <span className="text-sm text-gray-500">Auto-saved</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Stats */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Words:</span>
              <span className="font-semibold text-gray-800">0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Characters:</span>
              <span className="font-semibold text-gray-800">0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Score:</span>
              <span className="font-semibold text-green-600">100</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Export
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity">
              Share
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
