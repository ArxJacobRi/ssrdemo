import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // {
  //   path: 'news',
  //   renderMode: RenderMode.Server
  // },
  // {
  //   path: 'about',
  //   renderMode: RenderMode.Server
  // },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
