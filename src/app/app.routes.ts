import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { ResultsComponent } from './pages/results/results.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz', component: QuestionsComponent },
  { path: 'results', component: ResultsComponent },
];
