import { Component, EventEmitter, Output } from '@angular/core';
import { FormName } from '../../enums/form-name.enum';
import { FormManagementServiceService } from '../../services/common/form-management-service.service';

@Component({
  selector: 'app-item-management-actions',
  templateUrl: './item-management-actions.component.html',
  styleUrl: './item-management-actions.component.css'
})
export class ItemManagementActionsComponent {

  public FormName = FormName;

  constructor(
    public formManagementService: FormManagementServiceService
  ) {

  }

  // Function to open form by name
  public openFormByName(formName: FormName): void {
    switch (formName) {
      case FormName.AdminExportUserTemplate:
        this.formManagementService.openForm(FormName.AdminExportUserTemplate);
        break;
      case FormName.AdminImportUsers:
        this.formManagementService.openForm(FormName.AdminImportUsers);
        break;
      case FormName.AdminCreateUser:
        this.formManagementService.openForm(FormName.AdminCreateUser);
        break;
    }
  }

}
