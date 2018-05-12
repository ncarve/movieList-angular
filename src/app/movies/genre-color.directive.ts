import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appGenreColor]'
})
export class GenreColorDirective {
  @Input('appGenreColor') genreColor: string;

  constructor(private el: ElementRef) {
  }

  update() {
    this.el.nativeElement.style.color = this.genreColor;
  }
}
