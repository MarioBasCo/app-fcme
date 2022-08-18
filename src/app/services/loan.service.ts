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

  createLoan(data: any){
    const url = this.path_url + '/prestamo';
    return this.http.post<any>(url, this.serUtil.objectToFormData(data));
  }
}
