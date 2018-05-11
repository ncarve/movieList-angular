export class Genre {
  value: string;
  partial: boolean;
  
  constructor(g: string, partial = false) {
    this.value = g;
    this.partial = partial;
  }
}
