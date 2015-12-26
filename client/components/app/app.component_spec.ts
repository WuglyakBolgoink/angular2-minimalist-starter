import {
  TestComponentBuilder,
  describe,
  expect,
  inject,
  it,
  beforeEachProviders,
  AsyncTestCompleter
} from 'angular2/testing_internal';
import {Component, View, provide, DirectiveResolver} from 'angular2/core';

import {Location, Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import {SpyLocation} from 'angular2/src/mock/location_mock';
import {RootRouter} from 'angular2/src/router/router';

import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {AppComponent} from './app.component';

export function main() {

  describe('AppComponent', () => {
    
    // FIXME: make this works again.

    // Support for testing component that uses Router
    // beforeEachProviders(() => [
    //   RouteRegistry,
    //   DirectiveResolver,
    //   provide(Location, {useClass: SpyLocation}),
    //   provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
    //   provide(Router, {useClass: RootRouter})
    // ]);

    // it('should work',
    //   inject([TestComponentBuilder, AsyncTestCompleter], (tcb: TestComponentBuilder, async: AsyncTestCompleter) => {
    //     tcb.overrideTemplate(TestComponent, '<div><app></app></div>')
    //       .createAsync(TestComponent)
    //       .then(rootTC => {
    //         rootTC.detectChanges();
    //         let appDOMEl = rootTC.debugElement.componentViewChildren[0].nativeElement;
    //         expect(DOM.querySelectorAll(appDOMEl, 'section > nav > a')[1].href).toMatch(/http:\/\/localhost:\d+\/about/);
    //         async.done();
    //       });
    //   }));
  });
}

@Component({selector: 'test-cmp'})
@View({directives: [AppComponent]})
class TestComponent {}