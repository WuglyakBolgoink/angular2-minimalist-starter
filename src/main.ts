import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { appRouterProviders } from './app/app.routes';
import { AppService } from './app/app.service';

if (process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [
  Title,
  disableDeprecatedForms(),
  provideForms(),
  appRouterProviders,
  AppService
]).catch(err => console.error(err));

