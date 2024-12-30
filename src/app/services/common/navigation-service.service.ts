import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastServiceService } from '../utilities/toast-service.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationServiceService {

  constructor(
    private router: Router,
    private toastService: ToastServiceService
  ) {

  }

  // Service to navigate to component 
  public navigate(url: string): void {
    this.router.navigate([url]);
  }

  // Service to navigate to component and use reload
  public navigateAndReload(url: string): void {
    this.router.navigate([`${url}`]).then(() => {
      window.location.reload()
    });
  }

  // Service to navigate to component base on role id
  public navigateByRoleId(roleId: number): void {
    // Navigate base on role
    if (roleId === 1) {
      this.navigateAndReload('./admin-dashboard')
    }
    else if (roleId === 2) {
      this.navigateAndReload('./librarian-dashboard/book-management');
    }
    else {
      this.navigateAndReload('./reader-dashboard/home');
    }
  }

}
