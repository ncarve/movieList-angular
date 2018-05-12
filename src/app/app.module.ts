import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { GenreFilterPipe } from './movies/genreFilter.pipe';
import { ColorPipe } from './movies/color.pipe';
import { GenreColorDirective } from './movies/genre-color.directive';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    GenreFilterPipe,
    ColorPipe,
    GenreColorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
