import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserManagementServiceService } from '../../../services/user-management-service.service';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent implements OnInit {

  // Share data to admin dashboard component
  @Output() dataEvent: EventEmitter<string> = new EventEmitter();

  // Inputs decorator for receive data from admin dashboard component
  @Input() isDeleteDialogVisible: boolean = false;

  @Input() usernames!: any;


  constructor(
    private userManagementService: UserManagementServiceService,
    private toastService: ToastServiceService
  ) {

  }

  public ngOnInit(): void {

  }

  public onSubmit(): void {
    this.userManagementService.deleteUser(this.usernames)
      .subscribe({
        next: (res) => {
          this.isDeleteDialogVisible = false;
          this.toastService.showSuccess('Delete successfully');
          this.dataEvent.emit('delete_success');
        },
        error: (err) => {
          this.isDeleteDialogVisible = false;
          console.error(err.message);
        }
      });
  }

  // Function to close this form
  public closeDeleteDialogForm(): void {
    this.isDeleteDialogVisible = false;
    this.dataEvent.emit('close');
  }

}
