import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { appRouterProviders } from './app/app.routes';
import { AppService } from './app/app.service';
import { QuestionService } from './app/question/question.service';

if (process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [
  Title,
  HTTP_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  appRouterProviders,
  AppService,
  QuestionService
]).catch(err => console.error(err));

