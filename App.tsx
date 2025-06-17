
import React, { useState, useCallback } from 'react';
import { CreativeWriterForm } from './components/CreativeWriterForm';
import { GeneratedContentDisplay } from './components/GeneratedContentDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorAlert } from './components/ErrorAlert';
import { generateCreativeContent } from './services/geminiService';
import { GenerationOptions, ContentType } from './types';
import { APP_TITLE, DEFAULT_GENERATION_OPTIONS } from './constants';

const App: React.FC = () => {
  const [generationOptions, setGenerationOptions] = useState<GenerationOptions>(DEFAULT_GENERATION_OPTIONS);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOptionsChange = useCallback((newOptions: Partial<GenerationOptions>) => {
    setGenerationOptions(prevOptions => ({ ...prevOptions, ...newOptions }));
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!generationOptions.userPrompt.trim()) {
      setError("Please enter a prompt or topic.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedContent('');
    try {
      const content = await generateCreativeContent(generationOptions);
      setGeneratedContent(content);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [generationOptions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100 flex flex-col items-center p-4 sm:p-8">
      <header className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-2">
          {APP_TITLE}
        </h1>
        <p className="text-lg text-slate-400">Unleash your imagination. Generate stories and poems with AI.</p>
      </header>

      <main className="w-full max-w-4xl bg-slate-800 shadow-2xl rounded-lg p-6 sm:p-10">
        <CreativeWriterForm
          options={generationOptions}
          onOptionsChange={handleOptionsChange}
          onSubmit={handleGenerate}
          isLoading={isLoading}
        />

        {isLoading && (
          <div className="mt-8 flex flex-col items-center">
            <LoadingSpinner />
            <p className="mt-2 text-slate-400">Generating your masterpiece...</p>
          </div>
        )}

        {error && (
          <div className="mt-8">
            <ErrorAlert message={error} onClose={() => setError(null)} />
          </div>
        )}

        {generatedContent && !isLoading && (
          <GeneratedContentDisplay content={generatedContent} />
        )}
      </main>

      <footer className="w-full max-w-4xl mt-12 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Creative Spark AI. Powered by Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
