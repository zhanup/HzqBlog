export interface ResponseData<T> {
  list: Array<T>;
  total?: number;
  aid?: string;
}

export interface Article {
  _id: string;
  title: string;
  desc?: string;
  content?: string;
  img_url?: string;
  origin?: number;
  tags?: Array<Tag>;
  category?: Category;
  views?: number;
  date?: string | Date;
}

export interface Archives {
  [propName: string]: Array<Article>
}

export interface Comments {
  _id: string;
  name: string;
  content: string;
  avatar: string;
  date: string;
  ua: string;
  replies: Array<Reply>;
}

export interface Reply {
  _id: string;
  to_whom: string;
  name: string;
  content: string;
  avatar: string;
  ua: string;
  date: string;
}

export interface Category {
  _id: string;
  name: string;
  date: string;
}

export interface Tag {
  _id: string;
  name: string;
  date: string;
}

export interface Link {
  _id: string;
  name: string;
  desc: string;
  url: string;
  icon: string;
}