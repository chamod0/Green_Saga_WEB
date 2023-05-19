import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidatorForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginForm.reset();
          console.log(res);
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodedToken();
          this.userStore.setUserIdFormStore(tokenPayload.certserialnumber);
          this.userStore.setFullNameFormStore(tokenPayload.unique_name);
          this.userStore.setRoleFormStore(tokenPayload.role);
          this.toast.success({
            detail: 'SUCCESS',
            summary: res.message,
            duration: 5000,
          });

          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          console.log(err.error.message);

          this.toast.error({
            detail: 'Error',
            summary: err.error.message,
            duration: 5000,
          });
        },
      });
    } else {
      ValidatorForm.validateAllFormFildes(this.loginForm);
    }
  }
}
