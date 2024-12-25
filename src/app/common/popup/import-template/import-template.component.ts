import { Component } from '@angular/core';
import { OverlayServiceService } from '../../../services/utilities/overlay-service.service';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';

@Component({
  selector: 'app-import-template',
  templateUrl: './import-template.component.html',
  styleUrl: './import-template.component.css'
})
export class ImportTemplateComponent {

  // Variable contain name of file 
  selectedFileName: string = 'No file chosen';

  constructor(
    private overlayService: OverlayServiceService,
    private toastMessageService: ToastServiceService
  ) {
    
  }

  // Function to hide export user template 
  public hideExportUserTemplateComponent() {
    this.overlayService.close();
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
  
  
}
