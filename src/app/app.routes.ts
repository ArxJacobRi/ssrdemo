import { Routes } from '@angular/router';
import { NewsPageComponent } from './pages/news.component';
import { AboutPageComponent } from './pages/about.component';
import {AppComponent} from './app.component';

export const routes: Routes = [
  {
    path: 'home',
    component: AppComponent,
    pathMatch: 'full'
  },
  {
    path: 'news',
    component: NewsPageComponent,
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];
