import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ApiModule, Configuration } from 'prx-client-lib';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectComponent } from './projects/project.component';
import { ActionAddComponent } from './action-add/action-add.component';
import { ActionListComponent } from './action-list/action-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    ProjectAddComponent,
    ActionAddComponent,
    ActionListComponent 
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ApiModule.forRoot(() => new Configuration({basePath:"/backend/api/v1"})) // /backend/api/v1
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
