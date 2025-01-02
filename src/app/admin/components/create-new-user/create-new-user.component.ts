import { FormName } from './../../../enums/form-name.enum';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';
import { BaseOverlayComponent } from '../../../common/base-overlay/base-overlay.component';
import { FormAction } from '../../../enums/form-action.enum';
import { UserManagementServiceService } from '../../../services/admin/user-management-service.service';
import { FormManagementServiceService } from '../../../services/common/form-management-service.service';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: [
    './create-new-user.component.css',
    '../../../../assets/styles/form.css'
  ]
})
export class CreateNewUserComponent extends BaseOverlayComponent {

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
    private formManagementService: FormManagementServiceService,
    private toastService: ToastServiceService
  ) {
    super();
    this.createUserForm = this.fb.group({
      name: [``, [Validators.required, Validators.minLength(6)]],
      role: [`1`, [Validators.required]],
      username: [``, [Validators.required, Validators.minLength(6)]],
      email: [``, [Validators.required, Validators.email]],
      phoneNumber: [``, [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  // Function to close form
  public override closeForm(): void {
    this.formManagementService.closeForm(FormName.AdminCreateUser);
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

      // Call service to create new user
      this.userManagementService.createNewUser(newUser)
        .subscribe({
          next: (res) => {
            this.dataEvent.emit({ formName: FormName.AdminCreateUser, action: FormAction.CREATE });
            this.toastService.showSuccess('Create user succesfully!');
            this.closeForm();
          },
          error: (err) => {
            console.error(err.message);
            this.closeForm();
          }
        });
    }
  }

}