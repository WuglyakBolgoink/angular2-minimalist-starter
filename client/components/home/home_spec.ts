import {
  TestComponentBuilder,
  describe,
  expect,
  inject,
  it,
} from 'angular2/testing';
import {Component, View} from 'angular2/core';

import {HomeCmp} from './home';

export function main() {
  describe('Home component', () => {
    it('should work',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.overrideTemplate(TestComponent, '<div><home></home></div>')
          .createAsync(TestComponent).then((fixture) => {
            const compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('h2').textContent).toEqual('Home!');
          });
      }));
  });
}

@Component({selector: 'test-cmp'})
@View({directives: [HomeCmp]})
class TestComponent {}
