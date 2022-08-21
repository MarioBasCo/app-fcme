import { UtilsService } from './utils.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private path_url = environment.webService;

  constructor(
    private serUtil: UtilsService,
    private http: HttpClient) { }

  getLoan(){
    const url = this.path_url + '/tipoprestamos';
    return this.http.get<any>(url);
  }

  getLoansAdmin(){
    const url = this.path_url + '/prestamos';
    return this.http.get<any>(url);
  }

  createLoan(data: any){
    const url = this.path_url + '/prestamo';
    return this.http.post<any>(url, data);
  }

  getLoanById(id: any){
    const url = this.path_url + '/prestamocliente/' + id;
    return this.http.get<any>(url);
  }

  rejectLoan(id: any, data: any) {
    const url = this.path_url + '/rechazarprestamo/' + id;
    return this.http.post<any>(url, this.serUtil.objectToFormData(data));
  }

  approveLoan(id: any, data: any) {
    const url = this.path_url + '/aprobarprestamo/' + id;
    return this.http.post<any>(url, this.serUtil.objectToFormData(data));
  }
}
