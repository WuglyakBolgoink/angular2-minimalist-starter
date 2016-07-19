import { Component , ChangeDetectionStrategy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import '../assets/css/styles.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  directives: [ROUTER_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  title = 'Hello from Angular 2 minimalist starter';

}
