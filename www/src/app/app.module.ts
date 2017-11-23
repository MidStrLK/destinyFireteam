import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule }   from '@angular/common/http';


import { AppComponent } from './app.component';
import { CategoryComponent }     from './category/category.component';


@NgModule({
  declarations: [
      AppComponent,
      CategoryComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
