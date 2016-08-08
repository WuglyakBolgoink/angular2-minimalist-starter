import {
  beforeEach,
  addProviders,
  describe,
  inject,
  it
} from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

import { AppService } from './app.service';

describe('AppService', () => {

  beforeEach(() => addProviders([
    Title,
    AppService
  ]));

  it('setTitle() works', inject([AppService], (appService: AppService) => {
    let newTitle = '';
    appService.setTitle(newTitle);
    expect(appService.getTitle()).toEqual(`${appService.baseTitle}`);
    newTitle = 'abc';
    appService.setTitle(newTitle);
    expect(appService.getTitle()).toEqual(`${newTitle}${appService.titleSeparator}${appService.baseTitle}`);
  }));

  it('inferTitleFromUrl() works', inject([AppService], (appService: AppService) => {
    const newTitle = 'Question Add';
    appService.inferTitleFromUrl('question/add');
    expect(appService.getTitle()).toEqual(`${newTitle}${appService.titleSeparator}${appService.baseTitle}`);
  }));

});
