export interface BrowserPageArticle {
  title: string;
  abstract: string;
  url: string;
  image: string;
}

export interface TopStoriesAPI {
  status: string;
  copyright: string;
  section: string;
  last_updated: string;
  num_results: number;
  results: Article[];
}

export interface ArticleAPI {
  id: number;
  url: string;
  title: string;
  header: string;
  summary: string;
  imageURL: string;
  figcaption: string;
  paragraphs: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ArticlePageDoc {
  url: string;
  title: string;
  header: string;
  summary: string;
  imageURL: string;
  figcaption: string;
  paragraphs: string[];
}

export interface Article {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  uri: string;
  byline: string;
  item_type: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  material_type_facet: string;
  kicker: string;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: string[];
  multimedia: Multimedia[];
  short_url: string;
}

export interface ArticleSearchAPI {
  status: string;
  copyright: string;
  response: Response;
}

export interface Document {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  print_section: string;
  print_page: string;
  source: string;
  multimedia: any[];
  headline: Headline;
  keywords: Keyword[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  subsection_name: string;
  byline: Byline;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
}

export interface ArticleAnnotationsAPI {
  id: number;
  userEmail: string;
  articleUrl: string;
  title: string;
  selectedText: string;
  color: string;
  note: string;
  createdAt: string; 
  updatedAt: string;
}

export interface ArticleAnnotation {
  id: number;
  userEmail: string;
  articleUrl: string;
  title: string;
  selectedText: string;
  color: string;
  note: string;
}

interface Multimedia {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
  short_url: string;
}

interface Response {
  docs: Document[];
}

interface Keyword {
  name: string;
  value: string;
  rank: number;
  major: string;
}

interface BylinePerson {
  firstname: string;
  middlename: string | null;
  lastname: string;
  qualifier: string | null;
  title: string | null;
  role: string;
  organization: string;
  rank: number;
}

interface Byline {
  original: string;
  person: BylinePerson[];
  organization: string | null;
}

interface Headline {
  main: string;
  kicker: string | null;
  content_kicker: string | null;
  print_headline: string;
  name: string | null;
  seo: string | null;
  sub: string | null;
}
