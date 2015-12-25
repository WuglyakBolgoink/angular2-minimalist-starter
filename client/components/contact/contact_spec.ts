import {provide, Injector, Component, View} from 'angular2/core';
import {BaseRequestOptions, ConnectionBackend, Http, Response,
ResponseOptions
} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';
import {TestComponentBuilder, expect, inject, it,
beforeEachProviders, fakeAsync, AsyncTestCompleter
} from 'angular2/testing_internal';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {ObjectUtil} from '../../core/util';
import {HttpClient} from '../../core/http_client';
import {Contact} from '../../core/dto';
import {ContactCmp} from './contact';
import {ContactService} from './contact_service';
import {contacts, buildContact} from './contact_mock';


export function main() {

  describe('Contact component', () => {
    
    // FIXME: make this test works again.
    
    // it('should work',
    //   inject([TestComponentBuilder, AsyncTestCompleter], (tcb: TestComponentBuilder, async: AsyncTestCompleter) => {
    //     tcb.overrideViewProviders(ContactCmp, [
    //       provide(ContactService, {useFactory: () => {
    //         return new ContactService(new HttpClient(new Http(new MockBackend(), new BaseRequestOptions())));
    //       }})
    //     ])
    //       .createAsync(ContactCmp).then((fixture) => {

    //         fixture.detectChanges();

    //         expect(true).toBe(false);

    //         const contactCmp: ContactCmp = fixture.debugElement.componentInstance;
    //         const compiled = fixture.debugElement.nativeElement;
    //         const itemsSelector = 'tbody tr';

    //         function obtainContactsLenght() {
    //           return compiled.querySelectorAll(itemsSelector).length;
    //         }

    //         const originalLength = obtainContactsLenght();
    //         let newLength = originalLength;
    //         expect(originalLength).toBe(contacts.length);
    //         contactCmp.resetForm({ name: `Some new task #: ${originalLength + 1}` });
    //         contactCmp.saveOne();

    //         fixture.detectChanges();

    //         newLength++;

    //         expect(obtainContactsLenght()).toBe(newLength);
    //         const existingContact = ObjectUtil.clone(contacts[0]);
    //         existingContact.name = `Changed attr ${Date.now()}`;
    //         contactCmp.resetForm(existingContact);
    //         contactCmp.saveOne();

    //         fixture.detectChanges();

    //         expect(obtainContactsLenght()).toBe(newLength);

    //         contactCmp.selectOne(existingContact._id);

    //         fixture.detectChanges();

    //         const selectedContact = contactCmp.contact;

    //         expect(selectedContact._id).toBe(existingContact._id);
    //         expect(selectedContact.name).toBe(existingContact.name);

    //         contactCmp.removeOne(new Event('mock'), existingContact);

    //         fixture.detectChanges();

    //         newLength--;

    //         expect(obtainContactsLenght()).toBe(newLength);

    //         async.done();
    //       });
    //   }));

  });

}

