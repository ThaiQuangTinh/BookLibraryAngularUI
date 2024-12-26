import { ConfirmationDialogService } from '../../services/utilities/confirmation-dialog.service';
import { Router } from '@angular/router';
import { OverlayServiceService } from '../../services/utilities/overlay-service.service';
import { UserProfileComponent } from '../popup/user-profile/user-profile.component';
import { Component, Input, OnInit } from '@angular/core';
import { ToastServiceService } from '../../services/utilities/toast-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenServiceService } from '../../services/authen-service.service';
import { SprinnerLoadingService } from '../../services/utilities/sprinner-loading.service';
import { User } from '../../models/user.model';
import { UserManagementServiceService } from '../../services/user-management-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  @Input() sidenav!: MatSidenav;

  // Variable contain user information form token
  user: User = new User({ roleId: 0 });

  // Variable control status of edit user component
  isUserProfileFormVisible: boolean = false;

  // Variable contain data from edit user component
  recievedDataFromUserProfileForm: any;

  constructor(
    private router: Router,
    public overlayService: OverlayServiceService,
    private toastService: ToastServiceService,
    private authenService: AuthenServiceService,
    private confirmDialogService: ConfirmationDialogService,
    private spinnerLoadingService: SprinnerLoadingService,
    private userManagementService: UserManagementServiceService
  ) {
  
  }

  ngOnInit(): void {
    this.fetchUserInfor();
  }

  public toggleSidenav() {
    this.sidenav.toggle();  
  }

  // Function to show user profile through overlay service
  public showUserProfileService() {
    this.isUserProfileFormVisible = true;
  }

  // Function to log out 
  public onLogout(): void {
    this.confirmDialogService.confirmAction(
      'Confirm sign out',
      'Are you sure you want to sign out?',
      'Logout',
      'Cancel',
      () => {
        // Logic logout
        this.spinnerLoadingService.open("Logging out, please wait");

        // Clear token/data on local storage
        this.authenService.clearToken();

        setTimeout(() => {
          this.overlayService.close();
          this.router.navigate(['\login']);
        }, 300);
      }
    );
  }

  // Function to fetch user infromation via request of user (token)
  public fetchUserInfor(): void {
    this.userManagementService.getUserInfoByToken()
      .subscribe({
        next: (res) => {
          this.user = res;
        },
        error: (err) => {
          console.error(err.message);
        }
      });
  }

  // Functions to recive data from child component
  public onReceiveDataFromUserProfileForm(data: string): void {
    this.recievedDataFromUserProfileForm = data;

    if (data === 'close') {
      this.isUserProfileFormVisible = false;
    } else if (data === 'update_success') {
      this.isUserProfileFormVisible = false;
      this.fetchUserInfor();
    }
  }
}
