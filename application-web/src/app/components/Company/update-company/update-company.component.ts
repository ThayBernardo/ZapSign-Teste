import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../User/user.service';
import { CompanyService } from '../company.service';
import * as moment from 'moment-timezone';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css'],
})
export class UpdateCompanyComponent {
  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.ngOnInit();
  }

  private company: any = {};
  private data: any;
  protected users: any | undefined;
  protected timeZones: { offset: string }[] = [];
  protected user: any;
  protected email: string = '';

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.companyService
      .getCompanyById(id)
      .pipe(
        tap((data) => {
          this.company = data;

          this.form.patchValue({
            name: this.company.name,
            time_zone: this.company.time_zone,
            language: this.company.language,
            guest_users: this.company.guest_users,
            created_by: this.company.created_by,
          });
        }),
        catchError((error) => {
          console.log('Ocorreu um erro:', error.message);
          return of(null);
        })
      )
      .subscribe();

    const email = localStorage.getItem('email');
    if (email) {
      this.email = email;
    }

    this.getTimeZones();
    this.getUsers();
  }

  form = new FormGroup({
    name: new FormControl(''),
    time_zone: new FormControl(''),
    language: new FormControl(''),
    guest_users: new FormControl([]),
    created_by: new FormControl(''),
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

  submit = () => {
    this.data = this.form.value;
    this.company.name = this.data.name;
    this.company.time_zone = this.data.time_zone;
    this.company.language = this.data.language;
    this.company.guest_users = this.data.guest_users;
    this.company.created_by = this.data.created_by;
    console.log(this.data);

    this.companyService
      .update(this.company?.id, this.company)
      .pipe(
        tap((data) => {
          console.log('Empresa atualizada com sucesso');
        }),
        catchError((error) => {
          console.log('Ocorreu um erro:', error.message);
          return of(null);
        })
      )
      .subscribe();

    this.router.navigate(['/companys']);
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
}
