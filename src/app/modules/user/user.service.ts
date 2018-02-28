import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {

  result:any;
  constructor(private http: HttpClient) { }

  getUsers()
  {
    return this.http.get('/getUsers');
  }

  login(body)
  {
    return this.http.post('/login', body);
//    return this.http.post('/login', body);
  }
}