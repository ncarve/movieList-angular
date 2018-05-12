const R = require('ramda');
import { Movie } from '../movie';
import { Genre } from '../genre';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'color'})
export class ColorPipe implements PipeTransform {
  transform(genre: string, forced: Set<string>, forbidden: Set<string>): string {
    if(forced.has(genre))
      return "forced";
    else if(forbidden.has(genre))
      return "forbidden";
    else
      return "normal";
  }
}
