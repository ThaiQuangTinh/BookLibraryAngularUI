import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor() { }

  // Function to show confim dialog
  confirmAction(
    title: string,
    message: string,
    confirmButtonText: string,
    cancelButtonText: string,
    confirmCallback: () => void,
    cancelCallback?: () => void
  ): void {
    // Swal is a librayr, that help create popup or dialog (notification)
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    }).then((result) => {
      // Result is a object after user interact with popup or dialog
      // Code block below is used to handle when user click to confirm or cancel
      if (result.isConfirmed) {
        confirmCallback();
      } else if (result.dismiss === Swal.DismissReason.cancel && cancelCallback) {
        cancelCallback();
      }
    });
  }

}
