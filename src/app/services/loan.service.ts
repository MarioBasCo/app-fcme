import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private path_url = environment.webService + '/tipoprestamos';

  constructor(private http: HttpClient) { }

  getLoan(){
    return this.http.get<any>(this.path_url);
  }
}
