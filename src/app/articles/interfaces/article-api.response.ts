export interface ArticleAPIResponse {
  _id:         string;
  title:       string;
  subtitle:    string;
  category:    ArticleCategory;
  author:      string;
  content:     string;
  imgUrl:      string;
  videoUrl:    string;
  date:        Date;
  status:      ArticleStatus;
  articleType: ArticleType;
  tags:        string[];
  slug:        string;
  createdAt:  Date;
  updatedAt:  Date;

}

export enum ArticleCategory{
  POLITICS = 'Politics',
  ECONOMY = 'Economy',
  SOCIETY = 'Society',
  SCIENCETECH = 'ScienceTechnology',
  CULTURE = 'Culture',
  SPORTS = 'Sports',
  INTERNATIONAL = 'International',
  OPINION = 'Opinion',
}

export enum ArticleStatus {

  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export enum ArticleType {
  FRONT_PAGE = 'cover',
  GENERAL = 'general',
  MINOR = 'minor',
}
