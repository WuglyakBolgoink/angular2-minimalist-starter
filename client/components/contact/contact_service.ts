import {Injectable} from 'angular2/core';

import {Contact} from '../../core/dto';
import {HttpClient} from '../../core/http_client';
import {BaseResourceService} from '../../core/base_service';


@Injectable()
export class ContactService extends BaseResourceService<Contact> {

  constructor(http: HttpClient) {
    super(http, 'contact');
  }

}

