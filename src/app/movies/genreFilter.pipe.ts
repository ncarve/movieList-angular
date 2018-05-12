const R = require('ramda');
const escapeStringRegexp = require('escape-string-regexp');
import { Movie } from '../movie';
import { Genre } from '../genre';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'genreFilter'})
export class GenreFilterPipe implements PipeTransform {
  private matchesGenre = (keyword: string) => {
    return R.pipe(R.prop("value"), R.toLower, R.test(RegExp(keyword)));
  };

  private containsGenre = (genres: Genre[], keyword: string): boolean => {
    return R.any(this.matchesGenre(keyword), genres);
  };

  private missesGenre = (genres: Genre[], keyword: string): boolean => {
    return R.none(this.matchesGenre(keyword), genres);
  };

  private genresSatisfy = (movie: Movie, genreSet: Set<string>, predicate): boolean => {
    const fulls = genreSet.entries();
    for(let [g] of fulls) {
      if(predicate(movie.genres, R.toLower(g)))
        return true;
    }
    return false;
  };

  private hasAnyGenre = (genreFilter: any): ((m: Movie) => boolean) => {
    return movie => (this.genresSatisfy(movie, genreFilter.full, this.containsGenre) || this.genresSatisfy(movie, genreFilter.partial, this.containsGenre));
  };

  private hasAllGenres = (genreFilter: any): ((m: Movie) => boolean) => {
    return movie => (!this.genresSatisfy(movie, genreFilter.full, this.missesGenre) && !this.genresSatisfy(movie, genreFilter.partial, this.missesGenre));
  };

  transform(allMovies: Movie[], forcedGenres: any, forbiddenGenres: any): Movie[] {
    //console.log(forcedGenres, forbiddenGenres);
    return  R.filter(this.hasAllGenres(forcedGenres),
              R.reject(this.hasAnyGenre(forbiddenGenres),
                allMovies
              )
            );
  }
}
