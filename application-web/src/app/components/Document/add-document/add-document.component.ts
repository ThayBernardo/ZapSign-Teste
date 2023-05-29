import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../../Company/company.service';
import { UserService } from '../../User/user.service';
import { DocumentService } from '../document.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css'],
})
export class AddDocumentComponent {
  constructor(
    private documentService: DocumentService,
    private router: Router,
    private userService: UserService,
    private companyService: CompanyService
  ) {
    this.getUsers();
    this.getCompanys();
  }

  private data: any;
  protected users: any | undefined;
  protected companys: any | undefined;
  private id: string = '';
  private email: string = '';
  protected user: any;

  ngOnInit() {
    const id = localStorage.getItem('UserId');
    const email = localStorage.getItem('email');
    if (id) {
      this.id = id;
    }
    if (email) {
      this.email = email;
    }
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    date_limit: new FormControl('', Validators.required),
    company_associated: new FormControl('', Validators.required),
    created_by: new FormControl('', Validators.required),
  });

  createDocument = () => {
    this.data = this.form.value;
    this.documentService
      .create(this.data)
      .pipe(
        tap((data) => {
          this.router.navigate(['/documents']);
        }),
        catchError((error) => {
          console.log('Ocorreu um erro:', error.message);
          return of(null);
        })
      )
      .subscribe();
  };

  getUsers = () => {
    this.userService
      .getAllUsers()
      .pipe(
        tap((data) => {
          this.users = data;
          this.user = data.find((user: any) => user.email === this.email);
        }),
        catchError((error) => {
          console.log('Ocorreu um erro:', error.message);
          return of([]);
        })
      )
      .subscribe();
  };

  getCompanys = () => {
    this.companyService
      .getAllCompanys()
      .pipe(
        tap((data) => {
          this.companys = data.filter(
            (company: any) => company.created_by === parseInt(this.id)
          );
        }),
        catchError((error) => {
          console.log('Ocorreu um erro:', error.message);
          return of([]);
        })
      )
      .subscribe();
  };
}
