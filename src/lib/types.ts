export type Optional<T> = T|undefined;
export type LyricsXmlFile = string|URL|Request;

export type LyricsHeader = {
  title: string|null,
  author: string|null,
  theme: string|null
}

export type LyricsResult = {
  header: string,
  content: string
}

export type Lyrics = {
  header: LyricsHeader,
  results: LyricsResult[]
}