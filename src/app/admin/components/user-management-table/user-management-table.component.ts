import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../models/user.model';
import { Role } from '../../../enums/role-enum';
import { FormName } from '../../../enums/form-name.enum';
import { FormManagementServiceService } from '../../../services/common/form-management-service.service';
import { RoleHeplperServiceService } from '../../../services/common/role-heplper-service.service';

@Component({
  selector: 'app-user-management-table',
  templateUrl: './user-management-table.component.html',
  styleUrl: './user-management-table.component.css'
})
export class UserManagementTableComponent implements OnInit {

  @Input() totalAllRoles: number = 0;

  @Input() users: User[] = [];

  @Input() currentTab: Role = Role.All;

  @Output() changeTabEvent: EventEmitter<Role> = new EventEmitter<Role>;

  @Output() editUserEvent: EventEmitter<User> = new EventEmitter<User>;

  @Output() eleteUserEvent: EventEmitter<string[]> = new EventEmitter<string[]>;

  public Role = Role;

  public FormName = FormName;

  public searchQuery: string = '';

  public filteredUsers: User[] = [];

  public usernamesForDelete: string[] = [];

  // Variable contain button tab list (for table)
  public buttonTabList = [
    { roleName: Role.All, id: 'btnViewAll', isActive: false },
    { roleName: Role.Admin, id: 'btnViewAdmin', isActive: false },
    { roleName: Role.Librarian, id: 'btnViewLibrarian', isActive: false },
    { roleName: Role.Reader, id: 'btnViewReader', isActive: false },
  ];

  constructor(
    public formManagementService: FormManagementServiceService,
    public roleHelperService: RoleHeplperServiceService
  ) {

  }

  ngOnInit(): void {
    this.buttonTabList[0].isActive = true;
  }

  // Function to change tab
  public onChangeTab(role: Role): void {
    for (let item of this.buttonTabList) {
      if (item.roleName == role) {
        item.isActive = true;
        this.currentTab = role;
        this.changeTabEvent.emit(role);
      } else {
        item.isActive = false;
      }
    }
  }

  // Function to save data to edit user
  public saveDataToEditUserForm(user: User): void {
    this.formManagementService.setForm(FormName.AdminEditUser, true, user);
  }

  public searchUsers(): void {
    const searchQueryLower = this.searchQuery.trim().toLowerCase();
    const currentTabId = this.roleHelperService.getRoleIdByName(this.currentTab);

    if (searchQueryLower === '') {
    
    }
  }

  // Function to save data to delete user
  public saveDataToDeleteUserForm(usernames: string | string[]): void {
    const usernameArray = Array.isArray(usernames) ? usernames : [usernames];
    this.formManagementService.setForm(FormName.AdminDeleteUserDialog, true, usernameArray);
  }

}
