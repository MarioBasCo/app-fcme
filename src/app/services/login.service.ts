import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from './utils.service';
import { __classPrivateFieldGet } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private URL_API: string = 'http://localhost/fcme/';

  constructor(private http:HttpClient, private serUtil: UtilsService) { }

  fun_login(data:any){
    let URL= this.URL_API+"login";
    return this.http.post<any>(URL,this.serUtil.objectToFormData(data));
  }

  registro(data: any){
    const URL = this.URL_API + "singup";
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }
}
