import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.page.html',
  styleUrls: ['./receipts.page.scss'],
})
export class ReceiptsPage implements OnInit {
  transactions: any[] = [
    {id: 1, vendor: 'Interes del primer mes', image: '', amount: 1500, time: '3:00PM'},
    {id: 2, vendor: 'Pago del primer mes', image: '', amount: -1200, time: '4:00PM'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
