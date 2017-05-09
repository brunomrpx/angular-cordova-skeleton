import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';

export class HttpServiceConfig {
  public static defaultRequestOptions: RequestOptionsArgs = {};
}

@Injectable()
export class HttpService {
  constructor(private http: Http) {}

  public get(url: string, options: RequestOptionsArgs = {}) {
    const requestOptions = Object.assign({}, HttpServiceConfig.defaultRequestOptions, options);
    return this.http.get(url, requestOptions);
  }

  public post(url: string, options: RequestOptionsArgs = {}) {
    const requestOptions = Object.assign({}, HttpServiceConfig.defaultRequestOptions, options);
    return this.http.post(url, requestOptions);
  }
}
