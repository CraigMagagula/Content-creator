
export enum ContentType {
  STORY = 'Story',
  POEM = 'Poem',
}

export interface GenerationOptions {
  contentType: ContentType;
  userPrompt: string;
  length: string;
  genre: string;
  keywords: string;
  tone: string;
  // Poem specific
  rhymeScheme: string;
  poemStructure: string;
}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web: GroundingChunkWeb;
}

export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
}

export interface Candidate {
  groundingMetadata?: GroundingMetadata;
  // other candidate properties
}

export interface GenerateContentResponseWithGrounding {
  text: string;
  candidates?: Candidate[];
  // other response properties
}
