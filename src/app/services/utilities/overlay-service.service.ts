import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class OverlayServiceService {

  // This object is represent for instance of Overlay (Overlay service)
  private overlayRef: OverlayRef | null = null;

  // Overlay is a service suport for .....(below)
  constructor(private overlay: Overlay, private injector: Injector) { }

  // Function to open overly with component specified
  open(component: any, data?: any, closeOnBackdropClick: boolean = true): void {
    if (this.overlayRef) {
      this.close();
    }

    // Config for overlay
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'custom-backdrop',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });

    // Create inject (conatain data of component)
    const injector = this.createInjector(data);
    // ComponentPortal is a class represent port to embedded and display component into container
    const componentPortal = new ComponentPortal(component, null, injector); 
    // Mounted ComponentPortal to Overlay
    this.overlayRef.attach(componentPortal);

    // Close overay when click to backdrop
    if (closeOnBackdropClick) {
      this.overlayRef.backdropClick().subscribe(() => this.close());
    }
  }

  //  Function is used to cloe overlay
  close(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  // Function is used to create injector (purpose to share data between components)
  private createInjector(data: any): Injector {
    return Injector.create({
      providers: [{ provide: "OVERLAY_DATA", useValue: data }],
      parent: this.injector,
    });
  }

}
