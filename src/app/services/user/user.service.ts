import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {

  result:any;
  constructor(private http: Http) { }

    getUsers()
    {
      return this.http.get('/getUsers')
        .map(result => this.result = result.json().data);
    }
}