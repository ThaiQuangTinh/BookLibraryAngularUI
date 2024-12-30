import { Injectable } from '@angular/core';
import { OverlayServiceService } from './overlay-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SprinnerLoadingService {

  constructor(
    private overlayService: OverlayServiceService
  ) {

  }

  // Service to open spinner loading
  public open(message: string, diameter: number = 50): void {
    this.overlayService.open(SpinnerComponent, {
      message: message,
      diameter: diameter,
    }, false);
  }

  // Service to close spinner loading
  public close(): void {
    this.overlayService.close();
  }

}
