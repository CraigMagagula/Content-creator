
import React from 'react';

interface GeneratedContentDisplayProps {
  content: string;
}

export const GeneratedContentDisplay: React.FC<GeneratedContentDisplayProps> = ({ content }) => {
  return (
    <div className="mt-8 p-6 bg-slate-700 rounded-lg shadow-inner">
      <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 mb-4">
        Your AI-Generated Creation
      </h2>
      <div 
        className="prose prose-invert max-w-none text-slate-300 whitespace-pre-wrap selection:bg-purple-500 selection:text-white"
        dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} // Basic rendering of newlines
      />
       {/* A more robust markdown parser could be used here if needed */}
    </div>
  );
};
