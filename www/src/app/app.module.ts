import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient }   from '@angular/common/http';
import { FormsModule }          from '@angular/forms';


import { AppComponent } from './app.component';
import { CategoryComponent }     from './category/category.component';

import { InteractionService }          from './shared/interaction.service';


import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/*function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}*/

@NgModule({
  declarations: [
      AppComponent,
      CategoryComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: function(http: HttpClient) {
                  return new TranslateHttpLoader(http);
              },
              deps: [HttpClient]
          }
      })
  ],
  providers: [InteractionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
