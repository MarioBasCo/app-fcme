import { Component } from '@angular/core';
import { LstorageService } from 'src/app/services/lstorage.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  perfil:number;
  constructor( private serUtil:UtilsService,private serStorage:LstorageService) {

  }

  ngOnInit() {
    this.perfil=this.serStorage.get("user").perfil; 
  }
  
}
