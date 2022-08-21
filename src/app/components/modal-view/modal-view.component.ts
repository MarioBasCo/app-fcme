import { ModalController, RangeCustomEvent } from '@ionic/angular';
import { environment } from './../../../environments/environment';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss'],
})
export class ModalViewComponent implements OnInit {
  @Input() data: any;
  pdfSrc: any;
  zoomView: number = 0;

  constructor(
    private modalCtrl: ModalController,
    private changerf: ChangeDetectorRef) { }

  ngOnInit() {
    this.pdfSrc = environment.webService + '/documentos' + this.data;
    console.log(this.data);
  }

  pinFormatter(value: number) {
    return `${value}%`;
  }

  onIonChange(ev: Event) {
    this.changerf.detectChanges();
    this.zoomView = JSON.parse(JSON.stringify((ev as RangeCustomEvent).detail.value))*5/100;
    console.log(this.zoomView)
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
}
