const R = require('ramda');
const escapeStringRegexp = require('escape-string-regexp');
import { Movie } from '../movie';
import { Genre } from '../genre';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'genreFilter'})
export class GenreFilterPipe implements PipeTransform {
  transform(allMovies: Movie[], genre: string): Movie[] {
    if (!genre)
      return allMovies;
    const keywords = R.map(escapeStringRegexp, genre.split(' '));
    
    return R.filter(movie =>
      R.all(keyword =>
        R.any(
          R.pipe(R.prop("value"), R.test(RegExp(keyword))),
          movie.genres
        ),
        keywords
      ),
      allMovies
    );
  }
}
