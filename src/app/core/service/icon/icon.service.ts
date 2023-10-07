import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { icons } from "src/assets/icons";
// import { isPlatformServer } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class IconService {
  //This comment for angular universal
  constructor(
    // @Inject(PLATFORM_ID) platformId: string,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {

  }
  initialize() {
    icons.forEach(icon => {
      // const domain = (isPlatformServer(platformId)) ? 'http://localhost:4200/' : '';
      this.iconRegistry.addSvgIcon(icon.name, this.sanitizer.bypassSecurityTrustResourceUrl(icon.url))
    });
  }
}
