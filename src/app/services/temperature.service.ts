import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get() {
    let start = new Date();
    start.setHours(start.getHours() + 1);

    return this.httpClient.get<any[]>(environment.apiUrl + 'temperature', {
      params: { start: start.toISOString() }
    })
  }
}
