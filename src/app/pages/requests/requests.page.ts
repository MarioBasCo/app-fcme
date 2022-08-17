import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {
  features: any[] = [
    {id: 1, name: 'Top Up', src: 'assets/icons/top-up.png', background: 'rgba(27,150,181, 0.1)', page: ''},
    {id: 2, name: 'Withdraw', src: 'assets/icons/cash-withdrawal.png', background: 'rgba(106,100,255, 0.1)', page: ''},
    {id: 3, name: 'Send', src: 'assets/icons/send.png', background: 'rgba(255, 196, 9, 0.1)', page: ''},
    {id: 4, name: 'Pay', src: 'assets/icons/debit-card.png', background: 'rgba(27,150,181, 0.1)', page: ''},
  ];

  transactions: any[] = [
    {id: 1, vendor: 'Received from PhonePe', image: '', amount: 1500, time: '3:00PM'},
    {id: 2, vendor: 'Flaticons', image: '', amount: -1200, time: '4:00PM'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
