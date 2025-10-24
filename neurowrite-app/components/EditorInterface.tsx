'use client';

import { useState } from 'react';
import { FEATURES } from '@/lib/features';
import { executeFeature } from '@/lib/api';

interface EditorInterfaceProps {
  text: string;
  setText: (text: string) => void;
}

export default function EditorInterface({ text, setText }: EditorInterfaceProps) {
  const [processing, setProcessing] = useState(false);
  const quickFeatures = FEATURES.slice(0, 8); // Show first 8 features (all are free now)

  const handleQuickAction = async (featureId: string) => {
    if (!text.trim()) {
      alert('Please write something first!');
      return;
    }
    setProcessing(true);
    try {
      const response = await executeFeature(featureId, text);
      if (response.success) {
        setText(response.data);
      } else {
        alert(response.data);
      }
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing... or paste your text here for instant AI suggestions"
            className="w-full min-h-[600px] p-6 text-lg leading-relaxed border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none text-black placeholder-gray-400"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {quickFeatures.map((feature) => (
              <button
                key={feature.id}
                onClick={() => handleQuickAction(feature.id)}
                disabled={processing}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-purple-500 hover:text-purple-600 transition-colors disabled:opacity-50"
                title={feature.description}
              >
                <span className="mr-2">{feature.icon}</span>
                {feature.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
        <h3 className="text-lg font-bold text-gray-800 mb-4">AI Suggestions</h3>
        {!text || text.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">?</div>
            <p className="text-gray-500 text-sm">Start typing to get real-time AI suggestions!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Writing Score</span>
                <span className="text-2xl font-bold text-green-600">98</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{ width: '98%' }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-gray-800">{text ? text.split(' ').filter(w => w).length : 0}</div>
                <div className="text-xs text-gray-600">Words</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-gray-800">{text ? text.length : 0}</div>
                <div className="text-xs text-gray-600">Characters</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Quick Actions</h4>
              <button onClick={() => handleQuickAction('auto-fix-all')} disabled={processing} className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50">? Fix All Issues</button>
              <button onClick={() => handleQuickAction('humanize')} disabled={processing} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-purple-500 disabled:opacity-50">?? Humanize</button>
              <button onClick={() => handleQuickAction('paraphrase')} disabled={processing} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-purple-500 disabled:opacity-50">?? Paraphrase</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
