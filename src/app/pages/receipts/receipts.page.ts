import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.page.html',
  styleUrls: ['./receipts.page.scss'],
})
export class ReceiptsPage implements OnInit {
  transactions: any[] = [
    {id: 1, vendor: 'Cuota N° 1', image: '33.33', amount: 4598.39, time: '401.61', state: 'T'},
    {id: 2, vendor: 'Pago del primer mes', image: '', amount: -1200, time: '4:00PM', state: 'I'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
