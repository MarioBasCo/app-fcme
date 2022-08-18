import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FrequencyService {
  private path_url = environment.webService + '/frecuencias';

  constructor(private http: HttpClient) { }

  getFrecuency(){
    return this.http.get<any>(this.path_url);
  }
}
