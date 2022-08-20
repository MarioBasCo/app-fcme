import { LstorageService } from './../../services/lstorage.service';
import { LoanService } from './../../services/loan.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {
  loans: any[] = [];
  montoGeneral: number = 0;

  constructor(
    private serStorge: LstorageService,
    private serLoan: LoanService) { }

  ngOnInit() {
    let id_usuario = this.serStorge.get('user')?.id_usuario;
    this.serLoan.getLoanById(id_usuario).subscribe(
      resp => {
        if (resp.status) {
          this.loans = resp.data;
          this.montoGeneral = this.montoPrestado();
        }
      }
    )
  }

  montoPrestado() {
    return this.loans.map(d=> d.monto).reduce((a,b) => a +b);
  }
}
