import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ngOnInit();
  }

  protected user: any = {};
  private data: any;
  protected errorMessage: string = '';
  protected successMessage: string = '';

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.userService
        .getUserById(parseInt(id))
        .pipe(
          tap((data) => {
            this.user = data;
            this.form.patchValue({
              email: this.user.email,
            });
          }),
          catchError((error) => {
            console.error('Ocorreu um erro ao obter o usuário:', error);
            this.errorMessage = 'Ocorreu um erro ao obter o usuário';
            return of(null);
          })
        )
        .subscribe();
    }
  }

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    currentPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  submit(): void {
    this.data = this.form.value;
    this.user.email = this.data.email;

    if (this.data.currentPassword === this.user.password) {
      if (
        this.data.password &&
        this.data.password === this.data.confirmPassword
      ) {
        this.user.password = this.data.password;

        this.userService
          .update(this.user?.id, this.user)
          .pipe(
            tap((data) => {
              console.log(data);
            }),
            catchError((error) => {
              console.error('Ocorreu um erro ao atualizar o usuário:', error);
              this.errorMessage = 'Ocorreu um erro ao atualizar o usuário';
              return of(null);
            })
          )
          .subscribe();

        this.successMessage = 'Senha alterada com sucesso!';
      } else {
        this.errorMessage =
          'A nova senha e a confirmação de senha devem ser iguais';
      }
    } else {
      this.errorMessage = 'A senha atual não corresponde à senha do usuário';
    }
  }

  deleteUser(id: number): void {
    this.userService
      .delete(id)
      .pipe(
        tap((data) => {
          this.router.navigate(['/']);
          localStorage.clear();
        }),
        catchError((error) => {
          console.log('Ocorreu um erro:', error.message);
          return of(null);
        })
      )
      .subscribe();
  }
}
