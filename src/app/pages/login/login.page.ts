import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  passwordToggleIcon = 'eye-off-outline';

  constructor(private router: Router) { }

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
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
