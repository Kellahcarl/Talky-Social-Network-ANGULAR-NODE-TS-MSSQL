import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  passwordResetForm!: FormGroup;

  token: string | null = localStorage.getItem('token');
  profilePic: string | null = localStorage.getItem('profilePic');
  userName: string | null = localStorage.getItem('user_name');
  user_id: string | null = localStorage.getItem('user_id');

  ngOnInit() {}

  constructor(
    private formBuilder: FormBuilder,

    private userService: UserService
  ) {
    this.passwordResetForm = this.formBuilder.group(
      {
        user_id: '',
        oldPassword: ['', [Validators.required, Validators.minLength(6)]],
        newPassword: ['', Validators.required],
        newPassword2: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword');
    const confirmPassword = form.get('newPassword2');

    if (password!.value !== confirmPassword!.value) {
      confirmPassword!.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword!.setErrors(null);
    }
  }

  onSubmit() {
    console.log(this.passwordResetForm.value);

    if (this.passwordResetForm) {
      if (!this.token) {
        console.log('there is no token');
        return;
      }

      if (this.user_id !== null) {
        this.passwordResetForm.value.user_id = this.user_id;
      } else {
        console.log('There is no token or user_id');
        return;
      }
      const { newPassword2, ...userDetails } = this.passwordResetForm.value;

      this.userService.updateUserPassword(userDetails, this.token).subscribe(
        (response) => {
          if (response.message) {
            Swal.fire({
              icon: 'success',
              title: 'Your Password of ',
              text: `${response.message}`,
              timer: 2000,
              didRender: () => {
                const successMessage = document.querySelector('.swal2-title');
                successMessage!.setAttribute(
                  'data-cy',
                  'updatepassword-success-popup'
                );
              },
            });
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Please try Again',
            text: `${error.error.error}`,
            didRender: () => {
              const errorMessage = document.querySelector('.swal2-title');
              errorMessage!.setAttribute(
                'data-cy',
                'updatePassword-error-popup'
              );
            },
          });
          console.log('Error from server:', error.error.error);
        }
      );
    }
  }
}
