'use client';

import { useState } from 'react';
import EditorInterface from '@/components/EditorInterface';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import FeaturePanel from '@/components/FeaturePanel';

export default function Home() {
  const [activeFeature, setActiveFeature] = useState<string>('editor');
  const [text, setText] = useState<string>('');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto">
          {activeFeature === 'editor' && (
            <EditorInterface text={text} setText={setText} />
          )}
          {activeFeature !== 'editor' && (
            <FeaturePanel feature={activeFeature} text={text} setText={setText} />
          )}
        </main>
      </div>
    </div>
  );
}
