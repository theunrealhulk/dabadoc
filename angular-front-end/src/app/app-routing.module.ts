import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', component:SigninComponent},
  { path: 'questions', component: QuestionsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
