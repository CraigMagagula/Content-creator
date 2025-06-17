
import { ContentType, GenerationOptions } from './types';

export const APP_TITLE = "Creative Spark AI";

export const CONTENT_TYPES_OPTIONS = [
  { value: ContentType.STORY, label: 'Story' },
  { value: ContentType.POEM, label: 'Poem' },
];

export const STORY_GENRES = ['Any', 'Fantasy', 'Sci-Fi', 'Mystery', 'Thriller', 'Romance', 'Historical Fiction', 'Humor', 'Adventure', 'Contemporary', 'Dystopian', 'Fairy Tale'];
export const POEM_GENRES = ['Any', 'Lyric', 'Narrative', 'Descriptive', 'Reflective', 'Elegy', 'Ode', 'Ballad']; // Generic genres for poems
export const POEM_STRUCTURES = ['Any', 'Haiku (3 lines, 5-7-5 syllables)', 'Sonnet (14 lines, specific rhyme)', 'Limerick (5 lines, AABBA rhyme)', 'Free Verse (no strict rules)', 'Acrostic', 'Villanelle'];
export const RHYME_SCHEMES = ['Any', 'AABB', 'ABAB', 'ABCB', 'AA BB CC', 'AABA', 'None (Free Verse)'];

export const LENGTH_OPTIONS = [
    'Brief (a few sentences)', 
    'Short (approx. 100-200 words)', 
    'Medium (approx. 300-500 words)', 
    'Long (approx. 600-800 words)', 
    'Epic (approx. 1000+ words)'
];
export const TONE_OPTIONS = ['Any', 'Neutral', 'Joyful', 'Serious', 'Humorous', 'Whimsical', 'Melancholic', 'Suspenseful', 'Inspiring', 'Romantic', 'Dark', 'Satirical', 'Nostalgic', 'Hopeful'];

export const DEFAULT_SYSTEM_INSTRUCTION = "You are an expert creative writing assistant. Your goal is to generate high-quality, engaging, and imaginative content based precisely on the user's specifications. Pay close attention to the requested content type, length, genre, keywords, tone, and any structural requirements (like rhyme scheme or poem structure). If 'Any' is selected for a parameter, feel free to choose what fits best or interpret it broadly.";

export const DEFAULT_GENERATION_OPTIONS: GenerationOptions = {
  contentType: ContentType.STORY,
  userPrompt: '',
  length: LENGTH_OPTIONS[1],
  genre: STORY_GENRES[0],
  keywords: '',
  tone: TONE_OPTIONS[0],
  rhymeScheme: RHYME_SCHEMES[0],
  poemStructure: POEM_STRUCTURES[0],
};

export const MODEL_NAME = 'gemini-2.5-flash-preview-04-17';
