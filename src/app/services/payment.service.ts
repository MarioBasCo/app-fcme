import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private path_url = environment.webService;

  constructor(private http: HttpClient) { }

  getPagosByIdUser(id: any) {
    const url = this.path_url + '/pagos/' + id;
    return this.http.get<any>(url);
  }

  getCuotasById(id: any) {
    const url = this.path_url + '/cuotas/' + id;
    return this.http.get<any>(url);
  }
}
