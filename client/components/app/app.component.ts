import {Component, ViewEncapsulation} from 'angular2/core';
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';

import {HomeComponent} from '../home/home.component';
import {ContactComponent} from '../contact/contact.component';
import {HttpUtil} from '../../core/http.util';
import {Notification} from '../../core/dto';


@Component({
  selector: 'app',
  templateUrl: './components/app/app.component.html',
  styleUrls: ['./components/app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  encapsulation: ViewEncapsulation.None
})
@RouteConfig([
  { path: '/', component: HomeComponent, as: 'Home' },
  { path: '/contact', component: ContactComponent, as: 'Contact' }
])
export class AppComponent {

  constructor(private httpUtil: HttpUtil) {
    this.httpUtil.requestNotifier.subscribe((notification: Notification) => {
      // Process Http request phases heres, also react to http errors.
      console.log('notification', notification);
    });
  }
}
