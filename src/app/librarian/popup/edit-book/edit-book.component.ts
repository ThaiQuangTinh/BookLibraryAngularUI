import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayServiceService } from '../../../services/utilities/overlay-service.service';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';
import { Book } from '../../../models/book.model';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: [
    './edit-book.component.css',
    '../../../../assets/styles/form.css'
  ]
})
export class EditBookComponent implements OnInit {

  editBookForm!: FormGroup;

  // Share data to book management component
  @Output() dataEvent: EventEmitter<string> = new EventEmitter();

  // Inputs decorator for receive data from book management component
  @Input() isEditBookFormVisible: boolean = false;

  @Input() userData!: Book;

  // Variable constain categories
  categories = ['detective', 'science', 'discovery', 'study'];

  constructor(
    private fb: FormBuilder,
    private overlayService: OverlayServiceService,
    private toastService: ToastServiceService) {
    this.editBookForm = this.fb.group({
      title: ['', [Validators.required]],
      category: ['detective', Validators.required],
      description: ['', Validators.required],
      year: ['', Validators.required],
      pulisher: ['', Validators.required],
      totalCopies: [1, [Validators.required]],
      author: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }


  // Function to close edit book form
  public closeEditUserForm(): void {
    this.isEditBookFormVisible = false;
    this.dataEvent.emit('close');
  }

}
