import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/Rx'


@Injectable()
export class ConnectApiService {

  constructor(private http: Http) {

  }

  createLink(params?: string) {
    const startUrl: string = 'https://www.googleapis.com/youtube/v3/search?part=snippet';

    if (params) {
      return startUrl + params;
    } else {
      return startUrl;
    }
  }



  getResponse(params?: string) {
    const apiKey: string = 'Here pass your api key';
    const keyParam: string = '&key=' + apiKey;
    const queryUrl: string = this.createLink(params);
    return this.http.get(queryUrl + keyParam);
  }

}

