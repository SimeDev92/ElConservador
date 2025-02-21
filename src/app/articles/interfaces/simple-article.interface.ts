import { ArticleCategory } from "./article-api.response";

export interface SimpleArticle {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  tags: string[];
  slug: string;
  category: ArticleCategory;  // Ahora usamos el enum
}
