import { LstorageService } from './../../services/lstorage.service';
import { PaymentService } from './../../services/payment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.page.html',
  styleUrls: ['./receipts.page.scss'],
})
export class ReceiptsPage implements OnInit {
  transactions: any[] = [];

  mispagos: any[] = [];

  constructor(
    private serStorge: LstorageService,
    private serPay: PaymentService) { }

  ngOnInit() {
    let id_usuario = this.serStorge.get('user')?.id_usuario;
    this.serPay.getPagosByIdUser(id_usuario).subscribe(resp => {
      if (resp.status) {
        this.mispagos = resp.data;
        this.mispagos = this.mispagos.filter(d => d.estado == 'A');
      }
    })
  }

  cargarCuotas(event) {
    let id = event.detail.value;
    this.transactions = [];
    this.serPay.getCuotasById(id).subscribe(resp => {
      if (resp.status) {
        this.transactions = resp.data;
      }
    })
  }
}
