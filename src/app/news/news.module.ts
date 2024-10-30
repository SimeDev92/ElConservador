import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NewsRoutingModule } from './news.routing.module';

import { MaterialModule } from '../material/material.module';

import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CardComponent } from './components/card/card.component';
import { NewImagePipe } from './pipes/new-image.pipe';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    CardComponent,
    // Pipes
    NewImagePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NewsRoutingModule,
    MaterialModule,
    SharedModule
  ],

})
export class NewsModule { }
