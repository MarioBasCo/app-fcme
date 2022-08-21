import { LstorageService } from './../../services/lstorage.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-loans',
  templateUrl: './loans.page.html',
  styleUrls: ['./loans.page.scss'],
})
export class LoansPage implements OnInit {
  perfil: number;

  constructor(private serStorage: LstorageService) { }

  ngOnInit() {
    this.perfil = this.serStorage.get("user").perfil;
  }
}
