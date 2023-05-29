import { Component } from '@angular/core';
import { UserService } from '../User/user.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private userService: UserService) {
    this.ngOnInit();
  }

  protected user: any = {};

  ngOnInit = (): void => {
    let id = localStorage.getItem('UserId');
    if (id) {
      this.userService
        .getUserById(parseInt(id))
        .pipe(
          tap((data) => {
            this.user = data;
          }),
          catchError((error) => {
            console.log('Ocorreu um erro:', error.message);
            return of(null);
          })
        )
        .subscribe();
    }
  };

  logout() {
    localStorage.clear();
  }
}
