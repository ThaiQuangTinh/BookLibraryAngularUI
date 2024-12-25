import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ToastServiceService } from '../../services/utilities/toast-service.service';
import { ConfirmationDialogService } from '../../services/utilities/confirmation-dialog.service';
import { OverlayServiceService } from '../../services/utilities/overlay-service.service';
import { ExportTemplateComponent } from '../../common/popup/export-template/export-template.component';
import { ImportTemplateComponent } from '../../common/popup/import-template/import-template.component';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: [
    './book-management.component.css',
    '../../../assets/styles/table.css'
  ]
})
export class BookManagementComponent implements OnInit {

  //  ==== VARIABLES FOR CREATE NEW BOOK FORM ====
  // Varriables to show/hiden create book component
  isCreateBookFormVisible: boolean = false;

  // Variable contain data from create book component
  recievedDataFromCreateBookForm: any;

  //  ==== VARIABLES FOR EDIT BOOK FORM ====
  // Varriables to show/hiden edit book component
  isEditBookFormVisible: boolean = false;

  // Variable contain data from edit book component
  recievedDataFromEditBookForm: any;

  // Variable to contain data of book (send to edit book form)
  bookDataToEditBookForm!: Book;

  constructor(
    private toastService: ToastServiceService,
    private confirmDialogService: ConfirmationDialogService,
    private overlayService: OverlayServiceService
  ) {

  }

  ngOnInit(): void {

  }

  // ===== FUNCTIONS FOR EDIT BOOK FORM ====
  // Functions to show/hide edit book component 
  public onShowEditBookForm(): void {
    this.isEditBookFormVisible = true;
  }

  // Functions to recive data from child component
  public onReceiveDataFromEditBookForm(data: string): void {
    this.recievedDataFromEditBookForm = data;

    if (data === 'close') {
      this.isEditBookFormVisible = false;
    }
  }

  // Function to send data to edit book form
  public sendDataToEditBookForm(book: Book): void {
    this.onShowEditBookForm();
    this.bookDataToEditBookForm = book;
  }

  // ===== FUNCTIONS FOR CREATE BOOK FORM ====
  public onShowCreateBookForm(): void {
    this.isCreateBookFormVisible = true;
  }

  // Functions to recive data from child component
  public onReceiveDataFromCreateBookForm(data: string): void {
    this.recievedDataFromCreateBookForm = data;

    if (data === 'close') {
      this.isCreateBookFormVisible = false;
    }
  }

  // Function to send data to edit book form (option)
  public sendDataToCreateBookForm(book: Book): void {
    this.onShowCreateBookForm();
    this.bookDataToEditBookForm = book;
  }


  // Function to show export book template
  public onShowExportBookTemplate(): void {
    this.overlayService.open(ExportTemplateComponent);
  }

  // Function to show import books template
  public onShowImportBookTemplate(): void {
    this.overlayService.open(ImportTemplateComponent);
  }

}
