import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../Company/company.service';
import { UserService } from '../../User/user.service';
import { DocumentService } from '../document.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.css'],
})
export class UpdateDocumentComponent {
  constructor(
    private documentService: DocumentService,
    private router: Router,
    private userService: UserService,
    private companyService: CompanyService,
    private route: ActivatedRoute
  ) {
    this.ngOnInit();
    this.getCompanys();
  }

  protected document: any = {};
  private data: any;
  protected users: any | undefined;
  protected companys: any | undefined;
  protected user: any;
  private email: string = '';
  protected id: string = '';
  private idLocal: string = '';

  ngOnInit = (): void => {
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.documentService
        .getDocumentById(parseInt(id))
        .pipe(
          tap((data) => {
            this.document = data;
            this.form.patchValue({
              name: this.document.name,
              date_limit: this.document.date_limit,
              company_associated: this.document.company_associated,
              created_by: this.document.created_by,
            });
          }),
          catchError((error) => {
            console.log('Ocorreu um erro:', error.message);
            return of(null);
          })
        )
        .subscribe();
    }

    const idLocal = localStorage.getItem('UserId');
    if (idLocal) {
      this.idLocal = idLocal;
    }

    const email = localStorage.getItem('email');
    if (email) {
      this.email = email;
    }

    this.getUsers();
    this.getCompanys();
  };

  form = new FormGroup({
    name: new FormControl(''),
    date_limit: new FormControl(''),
    company_associated: new FormControl(''),
    created_by: new FormControl(''),
  });

  submit = () => {
    this.data = this.form.value;
    this.document.name = this.data.name;
    this.document.date_limit = this.data.date_limit;
    this.document.company_associated = this.data.company_associated;
    this.document.created_by = this.data.created_by;
    console.log(this.data);

    this.documentService
      .update(this.document?.id, this.document)
      .pipe(
        tap((data) => {
          console.log('Documento Atualizado');
        }),
        catchError((error) => {
          console.log('Ocorreu um erro:', error.message);
          return of(null);
        })
      )
      .subscribe();

    this.router.navigate(['/documents']);
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
            (company: any) => company.created_by === parseInt(this.idLocal)
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
