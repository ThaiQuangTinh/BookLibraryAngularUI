import { FormAction } from '../../enums/form-action.enum';
import { FormName } from './../../enums/form-name.enum';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-base-overlay',
  templateUrl: './base-overlay.component.html',
  styleUrl: './base-overlay.component.css'
})
export class BaseOverlayComponent {

  @Input() data: any;

  @Output() dataEvent: EventEmitter<{ formName: FormName, action: FormAction, data?: any }> = new EventEmitter();

  public closeForm(): void {

  }

}
