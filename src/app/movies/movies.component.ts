const R = require('ramda');

import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { Genre } from '../genre';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  filteredGenreString: string;
  
  allGenres: Set<string> = new Set();
  filteredGenres: any;
  
  getFiteredGenres(): any {
    let res = {full: new Set(), partial: new Set()};
    if (!this.filteredGenreString)
      return res;
    const keywords = this.filteredGenreString.split(' ');
    for (let k of keywords) {
      if (k !== "") {
        if (this.allGenres.has(k))
          res.full.add(k);
        else
          res.partial.add(k);
      }
    }
    this.filteredGenres = res;
    return res;
  }
  
  genresToString(genres: any): string {
    let res = "";
    genres.full.forEach(genre => {
      res += genre + " ";
    });
    genres.partial.forEach(genre => {
      res += genre + " ";
    });
    return res.trim();
  }
  
  getMovies(): void {
    this.movieService.getMovies()
      .subscribe(movies => {
        this.movies = movies.map(m => new Movie(m));
        R.map(R.compose(R.map(g => this.allGenres.add(g.value)), R.prop("genres")), this.movies);
      });
  }
  
  switchFilter(genre: string) {
    let filteredGenres = this.getFiteredGenres();
    if (filteredGenres.full.has(genre))
      filteredGenres.full.delete(genre);
    else
      filteredGenres.full.add(genre);
    
    this.filteredGenreString = this.genresToString(filteredGenres);
  }
  
  constructor(private movieService: MovieService) {
  }
  
  ngOnInit() {
    this.getMovies();
  }
}
