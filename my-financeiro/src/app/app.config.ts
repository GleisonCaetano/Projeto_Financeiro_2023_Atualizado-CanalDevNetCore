import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthGuard } from './services/auth-guard.service';
import { HttpStatus, LoaderInterceptor } from './interceptor/loader.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),
    AuthGuard,
    HttpStatus,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    importProvidersFrom(NgxSpinnerModule, FormsModule, ReactiveFormsModule, CommonModule)
  ]
};
