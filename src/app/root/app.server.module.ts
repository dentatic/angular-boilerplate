import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { provideAssetsInterceptor } from '@core/interceptor';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [provideAssetsInterceptor()],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
