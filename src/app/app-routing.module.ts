import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*{
    path: 'login', // Ruta para la página de inicio de sesión
    loadChildren: () => import('./home/login.module').then(m => m.LoginPageModule)
  },*/
  {
    path: 'home', // Ruta para la página principal
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '', // Ruta por defecto, redirige a la página de inicio
    redirectTo: 'home', // Cambia a 'home' si deseas redirigir a la página principal
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
