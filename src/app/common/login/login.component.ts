import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OverlayServiceService } from '../../services/utilities/overlay-service.service';
import { AuthenServiceService } from '../../services/authen-service.service';
import { SprinnerLoadingService } from '../../services/utilities/sprinner-loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../../../assets/styles/form.css'
  ]
})
export class LoginComponent {

  loginForm!: FormGroup;

  // Variable control status of password (show/hide)
  passwordVisible: boolean = false;

  // Variable to validate form
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private overlayService: OverlayServiceService,
    private authenService: AuthenServiceService,
    private spinnerLoadingService: SprinnerLoadingService
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
        switch (decodedData.roleId) {
          case 1: {
            this.router.navigate(['./admin-dashboard']);
            break;
          }
          case 2: {
            this.router.navigate(['./librarian-dashboard/book-management']);
            break;
          }
          case 3: {
            this.router.navigate(['./reader-dashboard/home']);
            break;
          }
        }
      },
      error: (err) => {
        this.spinnerLoadingService.close();

        if (err.status === 404) {
          this.loginError = 'Wrong username or password!';
        } else {
          this.loginError = err;
        }
      }
    });
  }

}