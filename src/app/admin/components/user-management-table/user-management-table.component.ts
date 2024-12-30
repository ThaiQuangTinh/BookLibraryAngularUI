import { Component, Input } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-management-table',
  templateUrl: './user-management-table.component.html',
  styleUrl: './user-management-table.component.css'
})
export class UserManagementTableComponent {

  @Input() allRoleList: User[] = [];
  @Input() adminList: User[] = [];
  @Input() librarianList: User[] = [];
  @Input() readerList: User[] = [];

  // Variable contain button tab list (for table)
  public buttonTabList = [
    { roleName: 'view all', id: 'btnViewAll', isActive: false },
    { roleName: 'admin', id: 'btnViewAdmin', isActive: false },
    { roleName: 'librarian', id: 'btnViewLibrarian', isActive: false },
    { roleName: 'reader', id: 'btnViewReader', isActive: false },
  ];

  constructor() {

  }

  //
  public onChangeTab(): void {
    
  }

}
