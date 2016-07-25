import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Injectable()
export class AppService {

  baseTitle = 'Angular 2 minimalist starter';
  titleSeparator = ' | ';

  constructor(private titleService: Title) {
  }

  inferTitleFromUrl(url: string) {
    let newTitle = '';
    if (url !== '/') {
      newTitle += url.split('/').map(word => word.length ? word[0].toUpperCase() + word.substring(1)
        : word).reverse().join(' ');
    }
    this.setTitle(newTitle);
  }

  setTitle(title: string) {
    let newTitle = '';
    if (title) {
      newTitle += `${title}${this.titleSeparator}`;
    }
    newTitle += this.baseTitle;
    this.titleService.setTitle(newTitle);
  }

  getTitle() {
    return this.titleService.getTitle();
  }

}
