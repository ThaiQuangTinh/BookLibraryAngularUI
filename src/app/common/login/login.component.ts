import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenServiceService } from '../../services/common/authen-service.service';
import { SprinnerLoadingService } from '../../services/utilities/sprinner-loading.service';
import { NavigationServiceService } from '../../services/common/navigation-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../../../assets/styles/form.css'
  ]
})
export class LoginComponent {

  // Variable to store form
  loginForm!: FormGroup;

  // Variable control status of password (show/hide)
  passwordVisible: boolean = false;

  // Variable to validate form
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenService: AuthenServiceService,
    private spinnerLoadingService: SprinnerLoadingService,
    public navigationService: NavigationServiceService
  ) {
    // Initial form
    this.loginForm = this.fb.group({
      username: [``, [Validators.required]],
      password: [``, [Validators.required, Validators.minLength(7)]]
    });
  }

  // Fucntion to show or hide password
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Function to login
  async onSubmit() {
    // Get username and password from form
    let username = this.loginForm.get('username')?.value;
    let password = this.loginForm.get('password')?.value;

    // Show spinner loadng while validating account
    this.spinnerLoadingService.open('Logging in, please wait...');

    this.authenService.login(username, password).subscribe({
      next: (res) => {
        this.spinnerLoadingService.close();

        // Decode data from token (sent from server)
        const decodedData = this.authenService.decodeToken(res!.token);
        // Save token to session storage
        this.authenService.saveToken(res!.token, decodedData);

        // Check verfiy account
        if (!decodedData.isActivated) {
          this.router.navigate(['./verify-account']);
          return;
        }

        // Navigate base on role
        this.navigationService.navigateByRoleId(decodedData.roleId);
      },
      error: (err) => {
        this.spinnerLoadingService.close();

        if (err.status === 404) {
          this.loginError = 'Wrong username or password!';
        } else {
          console.error(err);
          this.loginError = 'Login failed. Please try again!';
        }
      }
    });
  }

}