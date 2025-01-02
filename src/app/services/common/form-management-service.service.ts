import { FormName } from './../../enums/form-name.enum';
import { Injectable } from '@angular/core';
import { FormAction } from '../../enums/form-action.enum';

@Injectable({
  providedIn: 'root'
})
export class FormManagementServiceService {

  constructor() { }

  // Varible contain sate of forms
  private forms = {
    [FormName.UserProfile]: { visible: false, data: null },
    [FormName.AdminExportUserTemplate]: { visible: false, data: null },
    [FormName.AdminCreateUser]: { visible: false, data: null },
    [FormName.AdminImportUsers]: { visible: false, data: null },
    [FormName.AdminEditUser]: { visible: false, data: null },
    [FormName.AdminDeleteUserDialog]: { visible: false, data: null },
  };

  // Function to get form
  public getForm(formName: FormName): any {
    return this.forms[formName];
  }

  // Function to get state of form
  public getFormState(formName: FormName): boolean {
    return this.forms[formName].visible || false;
  }

  // Function to set state of form
  public setForm(formName: FormName, visible: boolean, data?: any) {
    this.forms[formName] = { visible, data };
  }

  // Function to open form
  public openForm(formName: FormName): void {
    this.forms[formName].visible = true;
  }

  // Function to close form
  public closeForm(formName: FormName): void {
    this.forms[formName].visible = false;
  }

  // Function to receive data from forms
  public onReceiveDataFromForm(formName: FormName, action: FormAction, data?: any,
    callBack?: {
      onCreate?: (formName: FormName, data: any) => void;
      onEdit?: (formName: FormName, data: any) => void;
      onDelete?: (formName: FormName, data: any) => void;
    }
  ): void {
    switch (action) {
      case FormAction.CLOSE:
        this.closeForm(formName);
        break;

      case FormAction.CREATE:
        if (callBack?.onCreate) {
          callBack.onCreate(formName, data);
        }
        break;

      case FormAction.EDIT:
        if (callBack?.onEdit && data) {
          callBack.onEdit(formName, data);
        }
        break;

      case FormAction.DELETE:
        if (callBack?.onDelete && data) {
          callBack.onDelete(formName, data);
        }
        break;

      default:
        console.warn(`Unhandled action "${action}" for form "${formName}"`);
    }
  }

}
