/* import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); */

  import { bootstrapApplication } from '@angular/platform-browser';
  import { importProvidersFrom } from '@angular/core';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import { appConfig } from './app/app.config';
  import { AppComponent } from './app/app.component';
  
  bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
      ...appConfig.providers!,
      importProvidersFrom(BrowserAnimationsModule)
    ]
  })
  .catch((err) => console.error(err));