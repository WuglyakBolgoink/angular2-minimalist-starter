import {provide, Injector, Component, View} from 'angular2/core';
import {BaseRequestOptions, ConnectionBackend, Http, Response,
ResponseOptions
} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';
import {TestComponentBuilder, expect, inject, it,
beforeEachProviders, fakeAsync, AsyncTestCompleter
} from 'angular2/testing_internal';

import {Observable} from 'rxjs/Observable';

import {ObjectUtil} from '../../core/object.util';
import {HttpUtil} from '../../core/http.util';
import {Contact} from '../../core/dto';
import {ContactComponent} from './contact.component';
import {ContactService} from './contact.service';


export function main() {

  describe('ContactComponent', () => {
    
    // FIXME: make this test works again.
    
    // it('should work',
    //   inject([TestComponentBuilder, AsyncTestCompleter], (tcb: TestComponentBuilder, async: AsyncTestCompleter) => {
    //     tcb.overrideViewProviders(ContactComponent, [
    //       provide(ContactService, {useFactory: () => {
    //         return new ContactService(new HttpClient(new Http(new MockBackend(), new BaseRequestOptions())));
    //       }})
    //     ])
    //       .createAsync(ContactComponent).then((fixture) => {

    //         fixture.detectChanges();

    //         expect(true).toBe(false);

    //         const ContactComponent: ContactComponent = fixture.debugElement.componentInstance;
    //         const compiled = fixture.debugElement.nativeElement;
    //         const itemsSelector = 'tbody tr';

    //         function obtainContactsLenght() {
    //           return compiled.querySelectorAll(itemsSelector).length;
    //         }

    //         const originalLength = obtainContactsLenght();
    //         let newLength = originalLength;
    //         expect(originalLength).toBe(contacts.length);
    //         ContactComponent.resetForm({ name: `Some new task #: ${originalLength + 1}` });
    //         ContactComponent.saveOne();

    //         fixture.detectChanges();

    //         newLength++;

    //         expect(obtainContactsLenght()).toBe(newLength);
    //         const existingContact = ObjectUtil.clone(contacts[0]);
    //         existingContact.name = `Changed attr ${Date.now()}`;
    //         ContactComponent.resetForm(existingContact);
    //         ContactComponent.saveOne();

    //         fixture.detectChanges();

    //         expect(obtainContactsLenght()).toBe(newLength);

    //         ContactComponent.selectOne(existingContact._id);

    //         fixture.detectChanges();

    //         const selectedContact = ContactComponent.contact;

    //         expect(selectedContact._id).toBe(existingContact._id);
    //         expect(selectedContact.name).toBe(existingContact.name);

    //         ContactComponent.removeOne(new Event('mock'), existingContact);

    //         fixture.detectChanges();

    //         newLength--;

    //         expect(obtainContactsLenght()).toBe(newLength);

    //         async.done();
    //       });
    //   }));

  });

}
