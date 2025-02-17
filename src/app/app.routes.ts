import { Routes } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { QuestionComponent } from './components/question/question.component';

export const routes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'questionnaire', component: QuestionComponent },
  { path: '**', redirectTo: '' }
];
