import { Component } from '@angular/core';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../User/user.service';
import * as moment from 'moment-timezone';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css'],
})
export class AddCompanyComponent {
  constructor(
    private companyService: CompanyService,
    private router: Router,
    private userService: UserService
  ) {
    this.getUsers();
    this.getTimeZones();
  }

  protected timeZones: { offset: string }[] = [];
  private data: any;
  protected users: any | undefined;
  private email: string = '';
  protected filteredUser: any | undefined;
  protected user: any;

  ngOnInit() {
    const email = localStorage.getItem('email');
    if (email) {
      this.email = email;
    }
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    time_zone: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required),
    guest_users: new FormControl([]),
    created_by: new FormControl('', Validators.required),
  });

  getTimeZones() {
    const timeZoneNames = moment.tz.names();
    const offsetSet = new Set<string>();

    timeZoneNames.forEach((name) => {
      const offset = moment.tz(name).format('Z');
      offsetSet.add(offset);
    });

    this.timeZones = Array.from(offsetSet).map((offset) => ({ offset }));
  }

  createCompany = () => {
    this.data = this.form.value;
    this.companyService
      .create(this.data)
      .pipe(
        tap((data) => {
          this.router.navigate(['/companys']);
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
          if (!localStorage.getItem('UserId')) {
            localStorage.setItem('UserId', this.user.id);
          }
        }),
        catchError((error) => {
          console.log('Ocorreu um erro:', error.message);
          return of([]);
        })
      )
      .subscribe();
  };
}
