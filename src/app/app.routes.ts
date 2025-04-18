import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/main/main.component').then(m => m.MainComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
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
