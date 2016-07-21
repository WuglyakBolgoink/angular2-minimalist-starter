import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, NavigationEnd } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  directives: [ROUTER_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(private router: Router, private appService: AppService) {
  }

  ngOnInit() {
    this.router.events.subscribe(navEvt => {
      if (navEvt instanceof NavigationEnd) {
        this.appService.inferTitleFromUrl(navEvt.urlAfterRedirects);
      }
    });
  }

}
