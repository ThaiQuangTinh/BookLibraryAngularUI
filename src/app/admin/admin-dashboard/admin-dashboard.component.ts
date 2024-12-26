import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { OverlayServiceService } from '../../services/utilities/overlay-service.service';
import { ToastServiceService } from '../../services/utilities/toast-service.service';
import { ExportTemplateComponent } from '../../common/popup/export-template/export-template.component';
import { ImportTemplateComponent } from '../../common/popup/import-template/import-template.component';
import { ConfirmationDialogService } from '../../services/utilities/confirmation-dialog.service';
import { UserManagementServiceService } from '../../services/user-management-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  // Varial contain total and percent for each user
  public totalAndPercentUser = [
    { role: "Admin", total: 0, percent: 0 },
    { role: "Librarian", total: 0, percent: 0 },
    { role: "Reader", total: 0, percent: 0 },
  ];

  // Variable contain button tab list (for table)
  public buttonTabList = [
    { roleName: 'view all', id: 'btnViewAll', isActive: false },
    { roleName: 'admin', id: 'btnViewAdmin', isActive: false },
    { roleName: 'librarian', id: 'btnViewLibrarian', isActive: false },
    { roleName: 'reader', id: 'btnViewReader', isActive: false },
  ];

  // Variable constain data of user in table
  public allUsersData: User[] = [];

  public usersData: User[] = [];

  public selectedRole: string = '';

  public searchKeyword: string = '';

  // List username is selected
  public selectedUsernames: string[] = [];

  // Variable contains status of check box (all)
  public isAllChecked: boolean = false;


  //  ==== VARIABLES FOR EDIT USER FORM ====
  // Variable contain data from edit user component
  public recievedDataFromEditUserForm: any;

  // Varriables to show/hiden edit user component
  public isEditUserFormVisible: boolean = false;

  // Variable to contain data of user (send to edit user form)
  public userDataToEditUserForm!: User;


  //  ==== VARIABLES FOR CREATE NEW USER FORM ====
  // Variable contain data from create user component
  public recievedDataFromCreateUserForm: any;

  // Varriables to show/hiden create user component
  public isCreateUserFormVisible: boolean = false;


  //  ==== VARIABLES FOR IMPORT TEMPLATE FORM ====
  // Variable contain data from export template component
  public recievedDataFromImportTemplateForm: any;

  // Varriables to show/hiden export template component
  public isImportTemplateFormVisible: boolean = false;


  //  ==== VARIABLES FOR DELETE DIALOG FORM ====
  // Variable contain data from delete dialog component
  public recievedDataFromDeleteDialogForm: any;

  // Varriables to show/hiden delete dialog component
  public isDeleteDialogVisible: boolean = false;

  // Variable to contain data of user (send to delete dialog form)
  public usernamesDataToDeleteDialog!: any;


  // Function to initial component
  constructor(
    private overlayService: OverlayServiceService,
    private toastMessage: ToastServiceService,
    private confirmDialog: ConfirmationDialogService,
    private userManagementService: UserManagementServiceService
  ) {
    // Active animation when page is loaded
    this.buttonTabList[0].isActive = true;
  }

  // Function is called when this component has been initialized
  ngOnInit(): void {
    this.fetchAllUsers();
    this.onChangTab(this.buttonTabList[0]);
    this.fectchTotalCount();
  }

  // Function to change tab when click to button tab 
  public onChangTab(button: any): void {
    this.buttonTabList.forEach(btn => btn.isActive = false);
    button.isActive = true;
    this.selectedRole = button.roleName;
    this.updateUsersData();
  }

  // Function to convert role id to role name
  public getRoleNameById(roleId: number): string {
    if (roleId === 1) {
      return 'admin';
    } else if (roleId === 2) {
      return 'librarian';
    } else {
      return 'reader';
    }
  }

  // Function to toggle checkbox (all)
  public toggleAllCheckboxes(): void {
    this.isAllChecked = !this.isAllChecked;
    this.usersData.forEach(user => {
      user.isChecked = this.isAllChecked;
      if (user.isChecked) {
        this.addToSelectedUsers(user.username);
      } else {
        this.removeFromSelectedUsers(user.username);
      }
    });
  }

  // Function to update usernames list when checkbox row modifier
  public updateSelectedUser(user: User): void {
    if (user.isChecked) {
      this.addToSelectedUsers(user.username);
    } else {
      this.removeFromSelectedUsers(user.username);
    }

    this.isAllChecked = this.usersData.every(user => user.isChecked);
  }

  // Function to add username to list
  private addToSelectedUsers(username: string): void {
    if (!this.selectedUsernames.includes(username)) {
      this.selectedUsernames.push(username);
    }
  }

  // Function to remove username to list
  private removeFromSelectedUsers(username: string): void {
    this.selectedUsernames = this.selectedUsernames.filter(u => u !== username);
  }

  // ===== FUNCTIONS FOR EDIT USER FORM ====
  // Functions to show/hide edit component 
  public onShowEditUserForm(): void {
    this.isEditUserFormVisible = true;
  }

  // Functions to recive data from child component
  public onReceiveDataFromEditUserForm(data: string): void {
    this.recievedDataFromEditUserForm = data;

    if (data === 'close') {
      this.isEditUserFormVisible = false;
    } else if (data === 'edit_success') {
      this.updateUsersData();
    }
  }

  // Function to send data to edit user form
  public sendDataToEditUserForm(user: User): void {
    this.onShowEditUserForm();
    this.userDataToEditUserForm = user;
  }


  // ===== FUNCTIONS FOR CREATE USER FORM ====
  public onShowCreateUserForm(): void {
    this.isCreateUserFormVisible = true;
  }

  // Functions to recive data from child component
  public onReceiveDataFromCreateUserForm(data: string): void {
    this.recievedDataFromCreateUserForm = data;

    if (data === 'close') {
      this.isCreateUserFormVisible = false;
    } else if (data === 'create_success') {
      this.isCreateUserFormVisible = false;
      this.updateUsersData();
    }
  }

  // Function to send data to create user form (option)
  public sendDataToCreateUserForm(user: User): void {
    this.onShowEditUserForm();
    this.userDataToEditUserForm = user;
  }

  // ===== FUNCTIONS FOR IMPORT TEMPLATE FORM ====
  public onShowImportTemplateForm(): void {
    this.isImportTemplateFormVisible = true;
  }

  // Functions to recive data from child component
  public onReceiveDataFromImportTemplateForm(data: string): void {
    this.recievedDataFromImportTemplateForm = data;

    if (data === 'close') {
      this.isImportTemplateFormVisible = false;
    } else if (data === 'create_success') {
      this.isImportTemplateFormVisible = false;
      this.updateUsersData();
    }
  }

  // ===== FUNCTIONS FOR DELETE DIALOG FORM ====
  // Functions to show/hide delete dialog component 
  public onShowDeleteDialog(): void {
    this.isDeleteDialogVisible = true;
  }

  // Functions to recive data from child component
  public onReceiveDataFromDeleteDialog(data: string): void {
    this.recievedDataFromEditUserForm = data;

    if (data === 'close') {
      this.isDeleteDialogVisible = false;
    } else if (data === 'delete_success') {
      this.isAllChecked = false;

      const checkbox = document.getElementById('checkbox_all') as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = false;
      }

      this.isDeleteDialogVisible = false;
      this.updateUsersData();
      this.fectchTotalCount();
    }
  }

  // Function to send data to delete dialog form
  public sendDataToDeleteDialog(usernames: any): void {
    this.onShowDeleteDialog();
    this.usernamesDataToDeleteDialog = usernames;
  }


  // ==== FUNCTION TO SHOW EXPORT TEMPLATE USER (EXECL) ====
  public showExportTemplateUser(): void {
    this.overlayService.open(ExportTemplateComponent);
  }


  // ==== FUNCTION TO SHOW EXPORT TEMPLATE USER (EXECL) ====
  public showImportTemplateUser(): void {
    this.overlayService.open(ImportTemplateComponent);
  }

  // ==== FUNCTIONS TO CALL SERVICES ====

  private fetchAllUsers(): void {
    this.userManagementService.getUsersInfoByRoleName('all', 1, 100)
      .subscribe({
        next: (res) => {
          this.allUsersData = res;
          this.updateUsersData();
        },
        error: (err) => console.error(err.message)
      });
  }

  public updateUsersData(): void {
    if (this.selectedRole === 'view all') {
      this.usersData = this.allUsersData;
    } else {
      this.usersData = this.allUsersData.filter(user =>
        this.getRoleNameById(user.roleId) === this.selectedRole
      );
    }
  }

  // Function to get total count of each user type
  public fectchTotalCount(): void {
    this.userManagementService.getTotalCount()
      .subscribe({
        next: (res) => {
          const data = res.data;
          this.totalAndPercentUser = [
            { role: "Admin", total: data.total.adminTotal, percent: data.percent.adminPercent },
            { role: "Librarian", total: data.total.librarianTotal, percent: data.percent.librarianPercent },
            { role: "Reader", total: data.total.readerTotal, percent: data.percent.readerPercent },
          ];
        },
        error: (err) => {
          console.error(err.message);
        }
      });
  }

  // Function is used to search user via fullname
  public searchUsers(): void {
    const keyword = this.searchKeyword.trim().toLowerCase();

    if (this.selectedRole === 'view all') {
      this.usersData = this.allUsersData.filter(user =>
        user.fullname.toLowerCase().includes(keyword)
      );
    } else {
      this.usersData = this.allUsersData.filter(user =>
        this.getRoleNameById(user.roleId) === this.selectedRole &&
        user.fullname.toLowerCase().includes(keyword)
      );
    }

    if (this.usersData.length === 0) {
      this.usersData = []; 
    }
  }



}
