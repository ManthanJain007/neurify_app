'use client';

import { useState } from 'react';

interface TranslationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTranslate: (language: string) => void;
}

const LANGUAGES = [
  { code: 'Spanish', name: 'Spanish', flag: '🇪🇸' },
  { code: 'French', name: 'French', flag: '🇫🇷' },
  { code: 'German', name: 'German', flag: '🇩🇪' },
  { code: 'Italian', name: 'Italian', flag: '🇮🇹' },
  { code: 'Portuguese', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'Russian', name: 'Russian', flag: '🇷🇺' },
  { code: 'Japanese', name: 'Japanese', flag: '🇯🇵' },
  { code: 'Korean', name: 'Korean', flag: '🇰🇷' },
  { code: 'Chinese', name: 'Chinese', flag: '🇨🇳' },
  { code: 'Arabic', name: 'Arabic', flag: '🇸🇦' },
  { code: 'Hindi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'Turkish', name: 'Turkish', flag: '🇹🇷' },
  { code: 'Dutch', name: 'Dutch', flag: '🇳🇱' },
  { code: 'Swedish', name: 'Swedish', flag: '🇸🇪' },
  { code: 'Polish', name: 'Polish', flag: '🇵🇱' },
];

export default function TranslationModal({ isOpen, onClose, onTranslate }: TranslationModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('Spanish');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Select Translation Language</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedLanguage === lang.code
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="text-3xl mb-2">{lang.flag}</div>
              <div className="text-sm font-medium text-gray-800">{lang.name}</div>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onTranslate(selectedLanguage);
              onClose();
            }}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Translate to {selectedLanguage}
          </button>
        </div>
      </div>
    </div>
  );
}
