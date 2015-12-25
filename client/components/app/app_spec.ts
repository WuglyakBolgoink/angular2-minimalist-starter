import {
TestComponentBuilder,
describe,
expect,
inject,
it,
AsyncTestCompleter
} from 'angular2/testing_internal';
import {Component, View} from 'angular2/core';

import {AppCmp} from './app';

export function main() {
  describe('App component', () => {
    it('should work',
      inject([TestComponentBuilder, AsyncTestCompleter], (tcb: TestComponentBuilder, async: AsyncTestCompleter) => {
        tcb.overrideTemplate(TestComponent, '<div><home></home></div>')
          .createAsync(TestComponent).then((rootTC) => {

            const fixture = rootTC.debugElement.elementRef;
            // TODO: Add navigation testing?
            expect(fixture).not.toBeNull(true);

            async.done();
          });
      }));
  });
}

@Component({ selector: 'test-cmp' })
@View({ directives: [AppCmp] })
class TestComponent { }
