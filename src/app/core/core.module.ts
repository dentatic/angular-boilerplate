import { NgModule } from '@angular/core';
import { IconService } from './service';


@NgModule({
  imports: [],
  exports: []
})
export class CoreModule {

  // Initialize Icon service to load icon file
  constructor(iconService: IconService) {
    iconService.initialize()
  }
}
