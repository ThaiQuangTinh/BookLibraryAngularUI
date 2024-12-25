import { HttpClient } from '@angular/common/http';
import { OverlayServiceService } from '../../../services/utilities/overlay-service.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-export-template',
  templateUrl: './export-template.component.html',
  styleUrl: './export-template.component.css'
})
export class ExportTemplateComponent implements OnInit {

  // Variable contain id of user (admin: 1, librarian: 2, reader: 3)
  public roleId!: number;

  constructor(
    private overlayService: OverlayServiceService,
    private http: HttpClient
  ) {

  }
  
  ngOnInit(): void {
      this.roleId = +(localStorage.getItem('role_id') || 0);
  }

  // Function to hide export template
  hideExportUserTemplateComponent() {
    this.overlayService.close();
  }

  // Function to download user template
  downloadUserTemplate(): void {
    const data = [
      ['username', 'email', 'fullname', 'roleId', 'phoneNumber'] 
    ];

    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Template': worksheet }, 
      SheetNames: ['Template']   
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(file, 'User_Template.xlsx');
  }

  // Function to download book template
  downloadBookTemplate(): void {
    const data = [
      ['bookname', 'email', 'fullname', 'roleId', 'phoneNumber'] 
    ];

    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Template': worksheet }, 
      SheetNames: ['Template']   
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(file, 'Book_Template.xlsx');
  }

  // Function to download template base on role
  public downloadTemplate(): void {
    if (this.roleId === 1) {
      this.downloadUserTemplate();
    } else if (this.roleId === 2) {
      this.downloadBookTemplate();
    }
  }

}
