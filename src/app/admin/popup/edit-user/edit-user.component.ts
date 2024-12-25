import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { UserManagementServiceService } from '../../../services/user-management-service.service';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: [
    './edit-user.component.css',
    '../../../../assets/styles/form.css'
  ]
})
export class EditUserComponent implements OnInit {

  // Share data to admin dashboard component
  @Output() dataEvent: EventEmitter<string> = new EventEmitter();

  // Inputs decorator for receive data from admin dashboard component
  @Input() isEditUserFormVisible: boolean = false;

  @Input() userData!: User;

  // editUserForm is FormGroup
  editUserForm!: FormGroup;

  // Variable define roles of user
  roles: any[] = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'librarian' },
    { id: 3, name: 'reader' },
  ];

  constructor(
    private fb: FormBuilder,
    private userManagementService: UserManagementServiceService,
    private toastService: ToastServiceService
  ) {
    // Initial form
    this.editUserForm = this.fb.group({
      username: [''],
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  public ngOnInit(): void {
    // Set value for form (with data receive from parent)
    this.editUserForm.setValue({
      username: this.userData.username,
      fullname: this.userData.fullname,
      email: this.userData.email,
      role: this.userData.roleId,
      phoneNumber: this.userData.phoneNumber,
    });
  }

  public onSubmit(): void {
    if (this.editUserForm.valid) {
      const newUser = new User({
        ...this.userData,
        email: this.editUserForm.value.email,
        fullname: this.editUserForm.value.fullname,
        phoneNumber: this.editUserForm.value.phoneNumber,
        roleId: this.editUserForm.value.role
      });

      // Update user profile and pass image if selected
      this.userManagementService.updateUserInfo(newUser)
        .subscribe({
          next: (res) => {
            this.isEditUserFormVisible = false;
            this.toastService.showSuccess('Edit user successfully');
            this.dataEvent.emit('edit_success');
          },
          error: (err) => {
            this.toastService.showError('Error editting profile');
          }
        });
    }
  }

  // Function to close this form
  public closeEditUserForm(): void {
    this.isEditUserFormVisible = false;
    this.dataEvent.emit('close');
  }

}
