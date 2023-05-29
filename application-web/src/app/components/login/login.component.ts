import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../User/user.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  private users: any[] = [];
  protected email: string = '';
  protected password: string = '';
  protected errorMessage: string = '';

  ngOnInit() {
    const id = localStorage.getItem('UserId');
    if (id) {
      this.router.navigate(['/companys']);
    }
  }

  getUserByEmail(): void {
    const user = this.users.find((user) => user.email === this.email);

    if (user && user.password === this.password) {
      localStorage.setItem('email', this.email);
      localStorage.setItem('UserId', user.id);

      this.router.navigate(['/companys']);
    } else {
      this.errorMessage = 'Email ou senha incorretos';
    }
  }

  onSubmit(): void {
    this.userService
      .getAllUsers()
      .pipe(
        tap((data) => {
          this.users = data;
          this.getUserByEmail();
        }),
        catchError((error) => {
          console.log('Ocorreu um erro:', error.message);
          return of(null);
        })
      )
      .subscribe();
  }
}
