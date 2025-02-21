import { ArticleCategory, ArticleStatus, ArticleType } from "./article-api.response";

export interface Article {
  _id:        string;
  title:      string;
  subtitle:   string;
  category:   ArticleCategory;
  author:     string;
  content:    string;
  imgUrl:     string;
  videoUrl:   string;
  date:       Date;
  status:     ArticleStatus;
  articleType: ArticleType;
  tags:       string[];
  views:      number;
  slug:       string;
  createdAt:  Date;
  updatedAt:  Date;
  __v:        number;
}
