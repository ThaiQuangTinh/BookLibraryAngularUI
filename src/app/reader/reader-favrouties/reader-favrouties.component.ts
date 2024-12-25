import { Component, OnInit } from '@angular/core';
import { ToastServiceService } from '../../services/utilities/toast-service.service';
import { ConfirmationDialogService } from '../../services/utilities/confirmation-dialog.service';

@Component({
  selector: 'app-reader-favrouties',
  templateUrl: './reader-favrouties.component.html',
  styleUrls: [
    './reader-favrouties.component.css',
    '../../../assets/styles/table.css',
  ]
})
export class ReaderFavroutiesComponent implements OnInit {

  constructor(
    private toastMessageService: ToastServiceService,
    private confirmDialogService: ConfirmationDialogService
  ) {

  }

  ngOnInit(): void {
      
  }

}
