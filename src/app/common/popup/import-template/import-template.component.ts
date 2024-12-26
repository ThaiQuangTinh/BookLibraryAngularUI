import { User } from './../../../models/user.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OverlayServiceService } from '../../../services/utilities/overlay-service.service';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';
import { ExcelReaderService } from '../../../services/excel-reader.service';
import { UserManagementServiceService } from '../../../services/user-management-service.service';

@Component({
  selector: 'app-import-template',
  templateUrl: './import-template.component.html',
  styleUrl: './import-template.component.css'
})
export class ImportTemplateComponent {

  // Share data to admin dashboard component
  @Output() dataEvent: EventEmitter<any> = new EventEmitter();

  // Inputs decorator for receive data from admin dashboard component
  @Input() isImportTemplateFormVisible: boolean = false;

  // Variable contain name of file 
  selectedFileName: string = 'No file chosen';

  // Variable contain user information
  users: User[] = [];

  constructor(
    private overlayService: OverlayServiceService,
    private toastMessageService: ToastServiceService,
    private excelReaderService: ExcelReaderService,
    private userManagementService: UserManagementServiceService
  ) {

  }

  // Function to check change of input file
  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop()?.toLocaleLowerCase();

      if (fileExtension === 'xlsx') {
        this.selectedFileName = fileName;
        this.fectchDataFromFile(file);
      } else {
        this.toastMessageService.showWarning('Only .xlsx files are allowed');
        input.value = '';
        this.selectedFileName = 'No file chosen';
      }
    }
  }

  // Function to choose file
  public chooseFile(): void {
    document.getElementById('fileInput')?.click();
  }

  // Function to close this form
  public closeImportTemplateForm(): void {
    this.isImportTemplateFormVisible = false;
    this.dataEvent.emit('close');
  }

  // Function to call service to get data from excel file
  public fectchDataFromFile(file: File,): void {
    this.excelReaderService.readExcelFile(file, ['username', 'email']).then((data) => {
      this.users = this.convertDataToUsers(data);
    }).catch((error) => {
      console.error('Error reading Excel file:', error);
    });
  }

  // Function to convert object to User
  public convertDataToUsers(objectArr: any[]): User[] {
    let newUser: User[] = [];

    // Convert data to User
    objectArr.forEach(element => {
      newUser.push(new User({
        username: element.username,
        email: element.email,
        fullname: element.fullname,
        roleId: element.roleId,
        phoneNumber: element.phoneNumber
      }));
    });

    return newUser;
  }

  // Function to import users
  public onImportUserToApp(): void {
    this.userManagementService.createNewUser(this.users)
      .subscribe({
        next: (res) => {
          this.isImportTemplateFormVisible = false;
          this.dataEvent.emit('close');
          this.toastMessageService.showSuccess('Import user successfully');
        },
        error: (err) => {
          this.toastMessageService.showError(err.message);
        }
      })
  }

}
