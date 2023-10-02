import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/pages/home/home.component';
import { RecordsComponent } from './marathon/pages/./participants/records.component';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';

/*
Considere una vista de tipo page-not-found para el caso de rutas de navegación no
soportadas. Dicha vista debe mostrar un mensaje incluyendo la ruta especificada que no se
encontró y debe ofrecer un botón para retornar a Home.
• La vista Home es accesible desde la ruta de navegación /home.
• La vista Records es accesible desde la ruta de navegación /marathon/participants.
• La vista raíz (accesible desde la ruta de navegación tanto /) debe redirigir al usuario a la vista
/home.
*/
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'marathon/participants', component: RecordsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
