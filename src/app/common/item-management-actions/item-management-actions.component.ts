import { Component, EventEmitter, Output } from '@angular/core';
import { FormName } from '../../enums/form-name.enum';

@Component({
  selector: 'app-item-management-actions',
  templateUrl: './item-management-actions.component.html',
  styleUrl: './item-management-actions.component.css'
})
export class ItemManagementActionsComponent {

  @Output() dataEvent: EventEmitter<FormName> = new EventEmitter();

  public FormName = FormName;

  constructor() {

  }

  public openForm(formName: FormName): void {
    this.dataEvent.emit(formName);
  }

}
