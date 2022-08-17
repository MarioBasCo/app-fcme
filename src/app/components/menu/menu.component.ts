import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  optionsMenu: any[] = [];
  mostrarOpciones: boolean = true;
  user: any;

  constructor(
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {}

  cerrarSesion() {
    this.alertCtrl.create({
      header: "Cerrar Sesión",
      message: "¿Esta Seguro de Cerrar Sesión?",
      buttons: [
        {
          text: "Sí",
          handler: () => {
            localStorage.clear();            
            location.href = '/login';
            this.router.dispose();
          }
        },
        { text: "No" }
      ]
    }).then(alertEl => alertEl.present());
  }
}
