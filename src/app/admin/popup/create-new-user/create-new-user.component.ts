import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayServiceService } from '../../../services/utilities/overlay-service.service';
import { User } from '../../../models/user.model';
import { UserManagementServiceService } from '../../../services/user-management-service.service';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: [
    './create-new-user.component.css',
    '../../../../assets/styles/form.css'
  ]
})
export class CreateNewUserComponent {

  // Output to share data to admin dashboard component
  @Output() dataEvent: EventEmitter<string> = new EventEmitter();

  // Input to recieve data from admin dashboad component
  @Input() isCreateUserFormVisible!: boolean;

  createUserForm!: FormGroup;

  // Variable define roles of user
  roles: any[] = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Librarian' },
    { id: 3, name: 'Reader' },
  ]

  constructor(
    private fb: FormBuilder,
    private userManagementService: UserManagementServiceService,
    private toastService: ToastServiceService
  ) {
    this.createUserForm = this.fb.group({
      name: [``, [Validators.required, Validators.minLength(6)]],
      role: [`1`, [Validators.required]],
      username: [``, [Validators.required, Validators.minLength(6)]],
      email: [``, [Validators.required, Validators.email]],
      phoneNumber: [``, [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  // Function to close create user form
  public closeCreateUserForm(): void {
    this.isCreateUserFormVisible = false;
    this.dataEvent.emit('close');
  }

  // Function to submit form 
  public onSubmit(): void {
    if (this.createUserForm.valid) {
      // Get user data from form
      const newUser = new User({
        fullname: this.createUserForm.get('name')?.value,
        roleId: this.createUserForm.get('role')?.value,
        username: this.createUserForm.get('username')?.value,
        email: this.createUserForm.get('email')?.value,
        phoneNumber: this.createUserForm.get('phoneNumber')?.value,
      });

      console.log(newUser);

      // Call service to create new user
      this.userManagementService.createNewUser(newUser)
        .subscribe({
          next: (res) => {
            this.toastService.showSuccess('Create user succesfully!');
            this.isCreateUserFormVisible = false;
            this.dataEvent.emit('create_success');
          },
          error: (err) => {
            this.isCreateUserFormVisible = false;
            console.error(err.message);
          }
        });
    }
  }

}
