import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AddCompanyComponent } from './components/Company/add-company/add-company.component';
import { UpdateCompanyComponent } from './components/Company/update-company/update-company.component';
import { ViewCompanysComponent } from './components/Company/view-companys/view-companys.component';
import { AddDocumentComponent } from './components/Document/add-document/add-document.component';
import { UpdateDocumentComponent } from './components/Document/update-document/update-document.component';
import { ViewDocumentsComponent } from './components/Document/view-documents/view-documents.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddUserComponent } from './components/User/add-user/add-user.component';
import { UpdateUserComponent } from './components/User/update-user/update-user.component';
import { ViewUsersComponent } from './components/User/view-users/view-users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: ViewUsersComponent },
  { path: 'create-user', component: AddUserComponent },
  {
    path: 'updateUser/:id',
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
  },
  { path: 'companys', component: ViewCompanysComponent },
  { path: 'create-company', component: AddCompanyComponent },
  { path: 'updateCompany/:id', component: UpdateCompanyComponent },
  { path: 'documents', component: ViewDocumentsComponent },
  { path: 'create-document', component: AddDocumentComponent },
  { path: 'updateDocument/:id', component: UpdateDocumentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
