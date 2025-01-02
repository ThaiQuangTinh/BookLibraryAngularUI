import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';
import { UserManagementServiceService } from '../../../services/admin/user-management-service.service';
import { BaseOverlayComponent } from '../../../common/base-overlay/base-overlay.component';
import { FormName } from '../../../enums/form-name.enum';
import { FormAction } from '../../../enums/form-action.enum';
import { FormManagementServiceService } from '../../../services/common/form-management-service.service';
import { RoleHeplperServiceService } from '../../../services/common/role-heplper-service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: [
    './edit-user.component.css',
    '../../../../assets/styles/form.css'
  ]
})
export class EditUserComponent extends BaseOverlayComponent implements OnInit {

  userData!: User;

  // editUserForm is FormGroup
  editUserForm!: FormGroup;

  // Variable define roles of user
  roles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userManagementService: UserManagementServiceService,
    private toastService: ToastServiceService,
    private formManagementService: FormManagementServiceService,
    private roleHelperService: RoleHeplperServiceService
  ) {
    super();
    this.roles = this.roleHelperService.getRoles();
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
    this.userData = this.formManagementService.getForm(FormName.AdminEditUser).data;
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
            this.dataEvent.emit({ formName: FormName.AdminEditUser, action: FormAction.EDIT });
            this.closeForm();
            this.toastService.showSuccess('Edit user successfully');
          },
          error: (err) => {
            this.closeForm();
            this.toastService.showError('Error editting profile');
          }
        });
    }
  }

  // Function to close this form
  public override closeForm(): void {
    this.formManagementService.closeForm(FormName.AdminEditUser);
  }

}
