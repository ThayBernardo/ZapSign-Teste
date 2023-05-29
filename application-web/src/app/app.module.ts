import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './components/User/add-user/add-user.component';
import { UpdateUserComponent } from './components/User/update-user/update-user.component';
import { ViewUsersComponent } from './components/User/view-users/view-users.component';
import { HttpClientModule } from '@angular/common/http';
import { AddCompanyComponent } from './components/Company/add-company/add-company.component';
import { UpdateCompanyComponent } from './components/Company/update-company/update-company.component';
import { ViewCompanysComponent } from './components/Company/view-companys/view-companys.component';
import { AddDocumentComponent } from './components/Document/add-document/add-document.component';
import { UpdateDocumentComponent } from './components/Document/update-document/update-document.component';
import { ViewDocumentsComponent } from './components/Document/view-documents/view-documents.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    UpdateUserComponent,
    ViewUsersComponent,
    AddCompanyComponent,
    UpdateCompanyComponent,
    ViewCompanysComponent,
    AddDocumentComponent,
    UpdateDocumentComponent,
    ViewDocumentsComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
