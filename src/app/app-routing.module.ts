import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ProfilsComponent } from './profils/profils.component';
import { UsersComponent } from './users/users.component';
import { PromosComponent } from './promos/promos.component';
import { ReferentielsComponent } from './referentiels/referentiels.component';
import { CompetencesComponent } from './competences/competences.component';
import { GrpeCompetencesComponent } from './grpe-competences/grpe-competences.component';
import { ListProfilSortiesComponent } from './profilSorties/list-profil-sorties/list-profil-sorties.component';
import { ListComponent } from './list/list.component';
import { AddCompetenceComponent } from './competences/add-competence/add-competence.component';
import { AddGrpeCompetenceComponent } from './grpe-competences/add-grpe-competence/add-grpe-competence.component';
import { AddReferentielComponent } from './referentiels/add-referentiel/add-referentiel.component';
import { AddPromoComponent } from './promos/add-promo/add-promo.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'list', component: ListComponent},
  {path: 'admin', component: AdminComponent,
  children:[
    {path: 'profils', component: ProfilsComponent},
    {path: 'users', component: UsersComponent },
    {path: 'add-users', component: AddUserComponent },
    {path: 'profils-sorties', component: ListProfilSortiesComponent },
    {path: 'groupe-competences', component: GrpeCompetencesComponent },
    {path: 'add-grpe-competences', component: AddGrpeCompetenceComponent },
    {path: 'competences', component: CompetencesComponent },
    {path: 'add-competences', component: AddCompetenceComponent },
    {path: 'referentiels', component: ReferentielsComponent },
    {path: 'add-referentiels', component: AddReferentielComponent },
    {path: 'promos', component: PromosComponent },
    {path: 'add-promos', component: AddPromoComponent }
  ]},
  {path: 'not-found', component: FourOhFourComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
