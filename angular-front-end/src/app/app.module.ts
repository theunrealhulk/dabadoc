import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

import { UserActionsComponent } from './components/user-actions/user-actions.component';
import { ShowQuestionComponent } from './components/show-question/show-question.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    QuestionsComponent,
    FavoritesComponent,
    UserActionsComponent,
    ShowQuestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
