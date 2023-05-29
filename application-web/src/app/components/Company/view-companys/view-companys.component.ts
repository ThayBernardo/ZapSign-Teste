import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-view-companys',
  templateUrl: './view-companys.component.html',
  styleUrls: ['./view-companys.component.css'],
})
export class ViewCompanysComponent {
  constructor(private companyService: CompanyService, private router: Router) {
    this.getCompanys();
  }

  protected companys: any | undefined;
  private id: string = '';

  ngOnInit() {
    const id = localStorage.getItem('UserId');
    if (id) {
      this.id = id;
    }
  }

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

  deleteCompany = (id: number) => {
    this.companyService
      .delete(id)
      .pipe(
        tap((data) => {
          console.log(data);
          this.getCompanys();
        }),
        catchError((error) => {
          console.log('Ocorreu um erro:', error.message);
          return of(null);
        })
      )
      .subscribe();
  };

  redirect = () => {
    this.router.navigate(['/create-company']);
  };
}
