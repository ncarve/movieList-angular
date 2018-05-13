const R = require('ramda');

import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { Genre } from '../genre';
import { MovieService } from '../movie.service';
import { GenreFilterPipe } from './genreFilter.pipe';

@Component({
  selector: 'app-heroes',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [GenreFilterPipe]
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  filteredMovies: Movie[];
  allGenres: Set<string> = new Set();
  genreClasses: Map<string, string> = new Map();

  forcedGenreString = '';
  forbiddenGenreString = '';
  
  forcedGenres: any = {full: new Set(), partial: new Set()};
  forbiddenGenres: any = {full: new Set(), partial: new Set()};

  noForced: boolean = true;
  noForbidden: boolean = true;
  
  getFilteredGenres(filteredGenreString: string): any {
    let res = {full: new Set(), partial: new Set()};
    if (!filteredGenreString)
      return res;
    const keywords = filteredGenreString.split(' ');
    for (let k of keywords) {
      if (k !== "") {
        if (this.allGenres.has(k))
          res.full.add(k);
        else
          res.partial.add(k);
      }
    }
    this.forcedGenres = res;
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
        this.filteredMovies = this.movies;
        R.map(R.compose(R.map(g => this.allGenres.add(g.value)), R.prop("genres")), this.movies);
      });
  }

  private update() {
    this.filteredMovies = this.genreFilterPipe.transform(this.movies, this.forcedGenres, this.forbiddenGenres);
    this.forcedGenreString = this.genresToString(this.forcedGenres);
    this.forbiddenGenreString = this.genresToString(this.forbiddenGenres);
    this.noForbidden = this.forbiddenGenres.full.size == 0;
    this.noForced = this.forcedGenres.full.size == 0;
  }

  switchFilter(genre: string) {
    if (this.forcedGenres.full.has(genre)) {
      this.forcedGenres.full.delete(genre);
      this.genreClasses.delete(genre);
    }
    else if (this.forbiddenGenres.full.has(genre)) {
      this.forcedGenres.full.delete(genre);
      this.genreClasses.delete(genre);
    }
    else {
      this.forcedGenres.full.add(genre);
      this.genreClasses.set(genre, 'forced');
    }
    this.update();
  }
  
  switchForcedFilter(genre: string) {
    if (this.forcedGenres.full.has(genre)) {
      this.forcedGenres.full.delete(genre);
      this.genreClasses.delete(genre);
    }
    else {
      if (this.forbiddenGenres.full.has(genre)) {
        this.forbiddenGenres.full.delete(genre);
      }
      this.forcedGenres.full.add(genre);
      this.genreClasses.set(genre, 'forced');
    }
    this.update();
  }

  switchForbiddenFilter(genre: string) {
    if (this.forbiddenGenres.full.has(genre)) {
      this.forbiddenGenres.full.delete(genre);
      this.genreClasses.delete(genre);
    }
    else {
      this.forbiddenGenres.full.add(genre);
      this.genreClasses.set(genre, 'forbidden');
      if (this.forcedGenres.full.has(genre)) {
        this.forcedGenres.full.delete(genre);
      }
    }
    this.update();
  }

  constructor(private movieService: MovieService, private genreFilterPipe: GenreFilterPipe) {
  }
  
  ngOnInit() {
    this.getMovies();
  }
}
