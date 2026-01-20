
export enum SportCategory {
  ALL = 'Барлығы',
  FOOTBALL = 'Футбол',
  BOXING = 'Бокс',
  TENNIS = 'Теннис',
  BASKETBALL = 'Баскетбол',
  MMA = 'MMA',
  LOCAL = 'Қазақстан спорты'
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: SportCategory;
  date: string;
  author: string;
}

export interface LiveScore {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  time: string;
  status: 'LIVE' | 'FINISHED' | 'UPCOMING';
  league: string;
}
