import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

// TODO: only import only the specific components from RxJs being used for reducing overhead.
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
import 'rxjs/Rx';

import {HttpClient} from './core/http_client';
import {AppCmp} from './components/app/app';

bootstrap(AppCmp, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  HttpClient
]);
