export class Genre {
  value: string;
  partial: boolean;
  
  constructor(g: string, partial = false) {
    this.value = g;
    this.partial = partial;
  }

  isIncluded(genres: Genre[]): boolean {
    genres.forEach(g => {
      if(g.value == this.value)
        return true;
    });
    return false;
  }
}
