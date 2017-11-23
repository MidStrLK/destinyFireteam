import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule }   from '@angular/common/http';
import { FormsModule }          from '@angular/forms';


import { AppComponent } from './app.component';
import { CategoryComponent }     from './category/category.component';

import { InteractionService }          from './shared/interaction.service';

@NgModule({
  declarations: [
      AppComponent,
      CategoryComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule
  ],
  providers: [InteractionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
