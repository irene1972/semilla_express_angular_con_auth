import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { C404 } from './components/c404/c404';
import { Registro } from './components/registro/registro';
import { Login } from './components/login/login';
import { Confirmar } from './components/confirmar/confirmar';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'home'},
    {path:'home',component:Home},
    {path:'registro',component:Registro},
    {path:'login',component:Login},
    {path:'confirmar/:token',component:Confirmar},
    {path:'**',component:C404}
];
