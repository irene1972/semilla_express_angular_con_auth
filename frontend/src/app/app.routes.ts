import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Contacto } from './components/contacto/contacto';
import { C404 } from './components/c404/c404';
import { Registro } from './components/registro/registro';
import { Login } from './components/login/login';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'home'},
    {path:'home',component:Home},
    {path:'contacto',component:Contacto},
    {path:'registro',component:Registro},
    {path:'login',component:Login},
    {path:'**',component:C404}
];
