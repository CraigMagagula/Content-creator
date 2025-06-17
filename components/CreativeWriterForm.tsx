
import React from 'react';
import { GenerationOptions, ContentType } from '../types';
import { 
  CONTENT_TYPES_OPTIONS, 
  STORY_GENRES, 
  POEM_GENRES, 
  POEM_STRUCTURES, 
  LENGTH_OPTIONS, 
  TONE_OPTIONS, 
  RHYME_SCHEMES 
} from '../constants';

interface CreativeWriterFormProps {
  options: GenerationOptions;
  onOptionsChange: (newOptions: Partial<GenerationOptions>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const FormLabel: React.FC<{ htmlFor: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-300 mb-1">
    {children}
  </label>
);

const SelectInput: React.FC<{ id: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[] | {value: string, label: string}[] }> = ({ id, value, onChange, options }) => (
  <select
    id={id}
    value={value}
    onChange={onChange}
    className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-slate-700 border-slate-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-slate-200"
  >
    {options.map(opt => {
      const val = typeof opt === 'string' ? opt : opt.value;
      const label = typeof opt === 'string' ? opt : opt.label;
      return <option key={val} value={val}>{label}</option>;
    })}
  </select>
);

const TextInput: React.FC<{ id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string }> = ({ id, value, onChange, placeholder }) => (
  <input
    type="text"
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-200"
  />
);

const TextAreaInput: React.FC<{ id: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder?: string; rows?: number }> = ({ id, value, onChange, placeholder, rows = 3 }) => (
 <textarea
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-200 resize-y"
  />
);


export const CreativeWriterForm: React.FC<CreativeWriterFormProps> = ({ options, onOptionsChange, onSubmit, isLoading }) => {
  const currentGenres = options.contentType === ContentType.STORY ? STORY_GENRES : POEM_GENRES;

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FormLabel htmlFor="contentType">Content Type</FormLabel>
          <SelectInput
            id="contentType"
            value={options.contentType}
            onChange={(e) => {
                const newContentType = e.target.value as ContentType;
                onOptionsChange({ 
                    contentType: newContentType,
                    // Reset genre if content type changes, to avoid mismatches
                    genre: newContentType === ContentType.STORY ? STORY_GENRES[0] : POEM_GENRES[0] 
                });
            }}
            options={CONTENT_TYPES_OPTIONS}
          />
        </div>
        <div>
          <FormLabel htmlFor="length">Length</FormLabel>
          <SelectInput
            id="length"
            value={options.length}
            onChange={(e) => onOptionsChange({ length: e.target.value })}
            options={LENGTH_OPTIONS}
          />
        </div>
      </div>

      <div>
        <FormLabel htmlFor="userPrompt">Topic / Prompt</FormLabel>
        <TextAreaInput
          id="userPrompt"
          value={options.userPrompt}
          onChange={(e) => onOptionsChange({ userPrompt: e.target.value })}
          placeholder={`e.g., "A brave knight on a quest to find a mythical creature" or "A poem about the colors of autumn"`}
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FormLabel htmlFor="genre">Genre</FormLabel>
          <SelectInput
            id="genre"
            value={options.genre}
            onChange={(e) => onOptionsChange({ genre: e.target.value })}
            options={currentGenres}
          />
        </div>
        <div>
          <FormLabel htmlFor="tone">Tone</FormLabel>
          <SelectInput
            id="tone"
            value={options.tone}
            onChange={(e) => onOptionsChange({ tone: e.target.value })}
            options={TONE_OPTIONS}
          />
        </div>
      </div>

      <div>
        <FormLabel htmlFor="keywords">Keywords (optional, comma-separated)</FormLabel>
        <TextInput
          id="keywords"
          value={options.keywords}
          onChange={(e) => onOptionsChange({ keywords: e.target.value })}
          placeholder="e.g., magic, dragon, friendship, betrayal"
        />
      </div>

      {options.contentType === ContentType.POEM && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-slate-700 rounded-md bg-slate-700/30">
          <div>
            <FormLabel htmlFor="poemStructure">Poem Structure (optional)</FormLabel>
            <SelectInput
              id="poemStructure"
              value={options.poemStructure}
              onChange={(e) => onOptionsChange({ poemStructure: e.target.value })}
              options={POEM_STRUCTURES}
            />
          </div>
          <div>
            <FormLabel htmlFor="rhymeScheme">Rhyme Scheme (optional)</FormLabel>
            <SelectInput
              id="rhymeScheme"
              value={options.rhymeScheme}
              onChange={(e) => onOptionsChange({ rhymeScheme: e.target.value })}
              options={RHYME_SCHEMES}
            />
          </div>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h5a.75.75 0 0 0 0-1.5h-4.25V5Z" clipRule="evenodd" />
           </svg>
          )}
          {isLoading ? 'Generating...' : 'Spark Creativity'}
        </button>
      </div>
    </form>
  );
};
