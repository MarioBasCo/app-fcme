import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { LstorageService } from 'src/app/services/lstorage.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  perfil:number;
  email: string = '';
  clave: string = '';
  showPassword = false;
  passwordToggleIcon = 'eye-off-outline';

  constructor(private router: Router,
    private servL:LoginService,
    private serStorage: LstorageService,
    private serUtil:UtilsService) { }

  ngOnInit() {
   
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye-off-outline') {
      this.passwordToggleIcon = 'eye-outline';
    } else {
      this.passwordToggleIcon = 'eye-off-outline';
    }
  }

  ingresar() {
    if(this.email == '' || this.clave == ''){
      return;
    }
    const objCredenciales = {
      email: this.email,
      clave: this.clave
    }
    this.servL.fun_login(objCredenciales).subscribe(
     res=> {
      if(res.id==0){
        this.serUtil.showToast(res.mensaje, "danger");
      }else{
        let objUser = res.info.items;
          delete objUser.clave
          this.serStorage.set('user', objUser);
          this.limpiarForm();
          this.router.navigateByUrl('/home', { replaceUrl: true }); 
      }
     }
    );
  }
  limpiarForm(){
    this.email = '';
    this.clave = '';
  }
}
