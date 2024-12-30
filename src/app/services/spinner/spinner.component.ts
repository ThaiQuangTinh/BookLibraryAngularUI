import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {

  @Input() message: string = 'Loading...';

  @Input() diameter: number = 40;

  constructor(@Inject('OVERLAY_DATA') public data: any) {
    if (data) {
      this.message = data.message || this.message;
      this.diameter = data.diameter || this.diameter;
    }
  }

}
