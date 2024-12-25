import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  // Toast Service is a service in Angular, it is used to show toast notification
  constructor(private toastr: ToastrService) { }

  // Show toast notification with status is success
  showSuccess(description: String) {
    this.toastr.success(`${description}`, 'Success');
  }

  // Show toast notification with status is error
  showError(description: String) {
    this.toastr.error(`${description}`, 'Error');
  }

  // Show toast notification with status is warning
  showWarning(description: String) {
    this.toastr.warning(`${description}`, 'Warning');
  }

  showInfo(description: String) {
    this.toastr.info(`${description}`, 'Info');
  }

}
