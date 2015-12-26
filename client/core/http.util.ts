import {Injectable, EventEmitter} from 'angular2/core';
import {Http, RequestOptionsArgs, Response} from 'angular2/http';

import {Observable} from 'rxjs/Observable';

import {Notification} from './dto';


@Injectable()
export class HttpUtil {

	requestNotifier = new EventEmitter();

	constructor(private http: Http) {
	}

	get(url: string, options?: RequestOptionsArgs): Observable<Response> {
		this._notify({type: 'start'});
		return this.http.get(url, options)
			.do(res => this._notify({type: 'done'}),
				err => this._notify({type: 'error', data: err}),
				() => this._notify({type: 'complete'}));
	}

	post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
		this._notify({type: 'start'});
		return this.http.post(url, body, options)
			.do(res => this._notify({type: 'done'}),
				err => this._notify({type: 'error', data: err}),
				() => this._notify({type: 'complete'}));
	}

	put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
		this._notify({type: 'start'});
		return this.http.put(url, body, options)
			.do(res => this._notify({type: 'done'}),
				err => this._notify({type: 'error', data: err}),
				() => this._notify({type: 'complete'}));
	}

	delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
		this._notify({type: 'start'});
		return this.http.delete(url, options)
			.do(res => this._notify({type: 'done'}),
				err => this._notify({type: 'error', data: err}),
				() => this._notify({type: 'complete'}));
	}

  patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    this._notify({type: 'start'});
    return this.http.patch(url, body, options)
      .do(res => this._notify({type: 'done'}),
        err => this._notify({type: 'error', data: err}),
        () => this._notify({type: 'complete'}));
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this._notify({type: 'start'});
    return this.http.head(url, options)
      .do(res => this._notify({type: 'done'}),
        err => this._notify({type: 'error', data: err}),
        () => this._notify({type: 'complete'}));
  }

	private _notify(data: Notification) {
		this.requestNotifier.emit(data);
	}

}
