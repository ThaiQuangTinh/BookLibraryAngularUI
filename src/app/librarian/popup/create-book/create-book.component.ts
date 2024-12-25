import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayServiceService } from '../../../services/utilities/overlay-service.service';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';
import { UserManagementServiceService } from '../../../services/user-management-service.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: [
    './create-book.component.css',
    '../../../../assets/styles/form.css'
  ]
})
export class CreateBookComponent {

  createBookForm!: FormGroup;

  // Output to share data to admin dashboard component
  @Output() dataEvent: EventEmitter<string> = new EventEmitter();

  // Input to recieve data from admin dashboad component
  @Input() isCreateBookFormVisible!: boolean;

  // Variables contain category list
  categories = ['detective', 'science', 'entertaining', 'discovery', 'study'];

  constructor(
    private fb: FormBuilder,
    private overlayService: OverlayServiceService,
    private toastService: ToastServiceService,
    private userManagementService: UserManagementServiceService
  ) {
    this.createBookForm = this.fb.group({
      title: ['', [Validators.required]],
      category: ['detective', Validators.required],
      description: ['', Validators.required],
      year: ['', Validators.required],
      pulisher: ['', Validators.required],
      totalCopies: [1, [Validators.required]],
      author: ['', [Validators.required]]
    });
  }


  // Function to close create user form
  public closeCreateBookForm(): void {
    this.isCreateBookFormVisible = false;
    this.dataEvent.emit('close');
  }

}
