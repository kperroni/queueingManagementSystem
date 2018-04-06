import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class ServiceService {

  constructor(private http: HttpClient) { }

  getServices() {
    return this.http.get('service/getServices');
  }

  updateService(service) {
    return this.http.post('service/updateService', service);
  }

  getServiceById(body) {
    return this.http.post('service/getServiceById', body);
  }
}
