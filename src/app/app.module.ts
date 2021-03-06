import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, ɵNgSelectMultipleOption } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RequestsInterceptorProvider } from './interceptors/request.interceptor';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { PromosComponent } from './promos/promos.component';
import { ListProfilSortiesComponent } from './profilSorties/list-profil-sorties/list-profil-sorties.component';
import { ProfilsComponent } from './profils/profils.component';
import { ListComponent } from './list/list.component';
import { CompetencesComponent } from './competences/competences.component';
import { GrpeCompetencesComponent } from './grpe-competences/grpe-competences.component';
import { ReferentielsComponent } from './referentiels/referentiels.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { AddReferentielComponent } from './referentiels/add-referentiel/add-referentiel.component';
import { AddCompetenceComponent } from './competences/add-competence/add-competence.component';
import { ListProfilsComponent } from './profils/list-profils/list-profils.component';
import { ListCompetencesComponent } from './competences/list-competences/list-competences.component';
import { AddGrpeCompetenceComponent } from './grpe-competences/add-grpe-competence/add-grpe-competence.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { ListGrpeCompetencesComponent } from './grpe-competences/list-grpe-competences/list-grpe-competences.component';
import { ListItemGrpeCompetenceComponent } from './grpe-competences/list-grpe-competences/list-item-grpe-competence/list-item-grpe-competence.component';
import { ListReferentielsComponent } from './referentiels/list-referentiels/list-referentiels.component';
import { ListItemReferentielComponent } from './referentiels/list-referentiels/list-item-referentiel/list-item-referentiel.component';
import { SummarizePipe } from './pipes/summarize.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { DetailUserComponent } from './users/detail-user/detail-user.component';
import { QRCodeModule } from 'angularx-qrcode';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from './chips/chips.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    AdminComponent,
    GrpeCompetencesComponent,
    CompetencesComponent,
    ProfilsComponent,
    PromosComponent,
    UsersComponent,
    ReferentielsComponent,
    ListComponent,
    ListProfilSortiesComponent,
    ListProfilsComponent,
    ListCompetencesComponent,
    ListUsersComponent,
    AddCompetenceComponent,
    AddReferentielComponent,
    AddUserComponent,
    AddGrpeCompetenceComponent,
    FourOhFourComponent,
    ListGrpeCompetencesComponent,
    ListItemGrpeCompetenceComponent,
    ListReferentielsComponent,
    ListItemReferentielComponent,
    SummarizePipe,
    CapitalizePipe,
    DetailUserComponent,
    UnauthorizedComponent,
    ChipsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule,
    RouterModule,
    InfiniteScrollModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    RequestsInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
