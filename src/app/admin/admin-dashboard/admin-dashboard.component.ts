import { FormAction } from '../../enums/form-action.enum';
import { Component, OnInit } from '@angular/core';
import { FormName } from '../../enums/form-name.enum';
import { UserManagementServiceService } from '../../services/admin/user-management-service.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  public FormName = FormName;

  // Variable to share data to admin banner component
  public userRoleStatistics = [
    { role: "Admin", total: 0, percent: 0 },
    { role: "Librarian", total: 0, percent: 0 },
    { role: "Reader", total: 0, percent: 0 },
  ];

  public totalAllRoles: number = 0;

  // Variable to contain data of each role
  public allRoleList: User[] = [];

  public adminList: User[] = [];

  public librarianList: User[] = [];

  public readerList: User[] = [];

  // Varibale commons to control display status and data of form
  public formState = {
    [FormName.AdminExportUserTemplate]: { visible: false, data: null },
    [FormName.AdminCreateUser]: { visible: false, data: null },
    [FormName.AdminImportUsers]: { visible: false, data: null },
    [FormName.AdminEditUser]: { visible: false, data: null },
    [FormName.AdminDeleteDialog]: { visible: false, data: null }
  };

  constructor(
    private userManagementService: UserManagementServiceService
  ) {

  }

  ngOnInit(): void {
    this.loadUserRoleStatistics();
  }

  // Function to open form (receive request from item management actions component)
  public openForm(adminFormName: FormName): void {
    this.formState[adminFormName].visible = true;
  }

  // Function to receive data from forms
  public onReceiveDataFromForm(adminFormName: FormName, action: FormAction, data?: any): void {
    switch (action) {
      case FormAction.CLOSE:
        this.formState[adminFormName].visible = false;
        break;

      case FormAction.UPDATE:
        console.log(`Updating data for ${adminFormName}:`, data);
        break;

      default:
        console.warn(`Unhandled action "${action}" for form "${adminFormName}"`);
    }
  }

  // Test
  public test(): void {
    this.userManagementService.getTotalCount().subscribe({
      next: (res) => {
        console.log(res);
      }
    })
  }

  // Call api and update data for admin banner
  public loadUserRoleStatistics(): void {
    this.userManagementService.getTotalCount().subscribe({
      next: (res) => {
        const data = res.data;
        this.userRoleStatistics = [
          { role: "Admin", total: data.total.adminTotal, percent: data.percent.adminPercent },
          { role: "Librarian", total: data.total.librarianTotal, percent: data.percent.librarianPercent },
          { role: "Reader", total: data.total.readerTotal, percent: data.percent.readerPercent },
        ];

        this.totalAllRoles = data.total.adminTotal + data.total.librarianTotal + data.total.readerTotal;
      }
    });
  }

}
