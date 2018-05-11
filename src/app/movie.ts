import { Genre } from './genre';

export class Movie {
  rank: number;
  title: string;
  foundTitle: string;
  imdb: string;
  year: number;
  genres: Genre[];
  
  constructor(m: any) {
    this.rank = m.rank;
    this.title = m.shortTitle;
    this.year = parseInt(m.year);
    this.imdb = m.imdb;
    this.genres = m.genres.map(g => new Genre(g));
  }
}
