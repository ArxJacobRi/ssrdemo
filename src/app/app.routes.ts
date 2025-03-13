import { Routes } from '@angular/router';
import { NewsPageComponent } from './pages/news.component';
import { AboutPageComponent } from './pages/about.component';

export const routes: Routes = [
  {
    path: 'news',
    component: NewsPageComponent,
  },
  {
    path: 'about',
    component: AboutPageComponent
  }
];
