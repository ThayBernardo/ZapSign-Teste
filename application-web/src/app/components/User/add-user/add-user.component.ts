import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  constructor(private userService: UserService, private router: Router) {}

  private data: any;
  protected form!: FormGroup;
  protected errorMessage: string = '';

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  createUser(): void {
    this.data = this.form.value;
    localStorage.setItem('email', this.data.email);

    if (this.data.password === this.data.confirmPassword) {
      this.userService
        .create(this.data)
        .pipe(
          tap((user) => {
            localStorage.setItem('UserId', user.id.toString());
            this.router.navigate(['/companys']);
          }),
          catchError((error) => {
            if (error.error.email) {
              this.errorMessage = 'O email já está cadastrado';
            } else {
              this.errorMessage = 'Ocorreu um erro ao criar o usuário';
            }
            return throwError(error);
          })
        )
        .subscribe();
    } else {
      this.errorMessage = 'As senhas devem ser iguais';
    }
  }
}
