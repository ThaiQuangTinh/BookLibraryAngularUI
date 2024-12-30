import { HttpClient } from '@angular/common/http';
import { OverlayServiceService } from '../../../services/utilities/overlay-service.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { BaseOverlayComponent } from '../../base-overlay/base-overlay.component';
import { FormName } from '../../../enums/form-name.enum';
import { FormAction } from '../../../enums/form-action.enum';
import { ExportExcelTemplateService } from '../../../services/common/export-excel-template.service';

@Component({
  selector: 'app-export-template',
  templateUrl: './export-template.component.html',
  styleUrl: './export-template.component.css'
})
export class ExportTemplateComponent extends BaseOverlayComponent implements OnInit {

  // Variable contain id of user (admin: 1, librarian: 2, reader: 3)
  public roleId!: number;

  constructor(
    private exportExcelTemplateService: ExportExcelTemplateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.roleId = +(sessionStorage.getItem('role_id') || 0);
  }

  // Function to close form
  public override closeForm(): void {
    this.dataEvent.emit({ formName: FormName.AdminExportUserTemplate, action: FormAction.CLOSE });
  }

  // Function to download template base on role
  public downloadTemplate(): void {
    let field = null;

    if (this.roleId === 1) {
      field = ['username', 'email', 'fullname', 'roleId', 'phoneNumber'];
      this.exportExcelTemplateService.exportTemplate(field, 'User_Template.xlsx');
    } else if (this.roleId === 2) {
      field = ['bookname', 'email', 'fullname', 'roleId', 'phoneNumber'];
      this.exportExcelTemplateService.exportTemplate(field, 'Book_Template.xlsx');
    }
  }

}
