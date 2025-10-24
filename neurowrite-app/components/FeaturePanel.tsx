'use client';

import { useState } from 'react';
import { getFeaturesByCategory, Feature, FEATURE_CATEGORIES } from '@/lib/features';

interface FeaturePanelProps {
  feature: string;
  text: string;
  setText: (text: string) => void;
}

export default function FeaturePanel({ feature, text, setText }: FeaturePanelProps) {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string>('');
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const features = getFeaturesByCategory(feature);
  const category = FEATURE_CATEGORIES.find(c => c.id === feature);

  const processFeature = async (feat: Feature) => {
    if (!text.trim()) {
      alert('Please enter some text first!');
      return;
    }

    setProcessing(true);
    setSelectedFeature(feat);
    setResult('');
    
    try {
      // Import the API function dynamically
      const { executeFeature } = await import('@/lib/api');
      const response = await executeFeature(feat.id, text);
      
      if (response.success) {
        setResult(response.data);
      } else {
        setResult(`Error: ${response.data}`);
      }
    } catch (error: any) {
      setResult(`Error: ${error.message}. Make sure the AI backend is running on port 8001.`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex h-full">
      {/* Feature List */}
      <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-3xl">{category?.icon}</span>
            {category?.name}
          </h2>
          <p className="text-sm text-gray-600 mt-2">{features.length} features available</p>
        </div>

        <div className="space-y-2">
          {features.map((feat) => (
            <button
              key={feat.id}
              onClick={() => processFeature(feat)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedFeature?.id === feat.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{feat.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-gray-800">{feat.name}</h3>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{feat.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {!selectedFeature ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">{category?.icon}</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{category?.name}</h2>
              <p className="text-lg text-gray-600 mb-8">
                Select a feature from the left to get started
              </p>
              <div className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg">
                {features.length} powerful features available
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Feature Header */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="text-5xl">{selectedFeature.icon}</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {selectedFeature.name}
                    </h2>
                    <p className="text-gray-700">{selectedFeature.description}</p>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Input Text
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter or paste your text here..."
                  className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none text-black placeholder-gray-400"
                />
              </div>

              {/* Process Button */}
              <button
                onClick={() => processFeature(selectedFeature)}
                disabled={processing || !text}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Apply ${selectedFeature.name}`
                )}
              </button>

              {/* Result Area */}
              {result && (
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Result
                  </label>
                  <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700 font-semibold mb-3">
                      <span>✓</span>
                      <span>Success!</span>
                    </div>
                    <p className="text-gray-700">{result}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setText(result)}
                      className="flex-1 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Use This Result
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(result)}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}

              {/* Feature Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-sm text-blue-900 mb-2">💡 How it works</h4>
                <p className="text-sm text-blue-800">
                  This feature uses advanced AI to {selectedFeature.description.toLowerCase()}. 
                  It connects to the Neurify AI backend powered by Google Gemini.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
