import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CounterService {

  constructor(private http: HttpClient) { }

  getQueueCounters(body){
    return this.http.get('counter/getQueueCounters/'+body);
  }
}
