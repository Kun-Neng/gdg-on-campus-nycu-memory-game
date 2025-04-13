import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/main/main.component').then(m => m.MainComponent)
  },
  {
    path: 'playground',
    loadComponent: () => import('./components/playground/playground.component').then(m => m.PlaygroundComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
