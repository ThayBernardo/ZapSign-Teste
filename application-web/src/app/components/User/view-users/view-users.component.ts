import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
})
export class ViewUsersComponent {
  constructor(private userService: UserService) {
    this.getUsers();
  }

  protected users: any | undefined;

  getUsers(): void {
    this.userService
      .getAllUsers()
      .pipe(
        tap((data) => {
          this.users = data;
        }),
        catchError((error) => {
          console.log('Ocorreu um erro:', error.message);
          return of(null);
        })
      )
      .subscribe();
  }

  deleteUser(id: number): void {
    this.userService
      .delete(id)
      .pipe(
        tap((data) => {
          console.log(data);
        }),
        catchError((error) => {
          console.log('Ocorreu um erro:', error.message);
          return of(null);
        })
      )
      .subscribe();
  }
}
