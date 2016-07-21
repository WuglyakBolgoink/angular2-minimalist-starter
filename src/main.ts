import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appRouterProviders } from './app/app.routes';
import { AppService } from './app/app.service';

if (process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [
  Title,
  appRouterProviders,
  AppService
]);

