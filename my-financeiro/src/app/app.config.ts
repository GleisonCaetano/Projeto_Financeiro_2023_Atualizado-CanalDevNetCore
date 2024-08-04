import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthGuard } from './services/auth-guard.service';
import { HttpStatus, LoaderInterceptor } from './interceptor/loader.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserModule } from '@angular/platform-browser';

const RxJS = [LoaderInterceptor, HttpStatus];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),
    AuthGuard,
    HttpStatus,
    RxJS,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    importProvidersFrom(NgxSpinnerModule, BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule)
  ]
};