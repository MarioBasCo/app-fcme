import { UtilsService } from './../../services/utils.service';
import { DatePipe } from '@angular/common';
import { LoanService } from './../../services/loan.service';
import { ModalViewComponent } from './../modal-view/modal-view.component';
import { ModalController, AnimationController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss'],
})
export class LoanListComponent implements OnInit {
  loans: any[] = [];
  listLoans: any[] = [];
  obs: string = "";
  selectId: string = 'pendientes';

  constructor(
    public datepipe: DatePipe,
    private serLoan: LoanService,
    private animationCtrl: AnimationController,
    private serUtil: UtilsService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.serLoan.getLoansAdmin().subscribe(
      resp => {
        if (resp.status) {
          this.listLoans = resp.data;
          this.loans = this.setFilterLoan(this.listLoans);
        }
      }
    )
  }

  segmentChanged(event) {
    this.selectId = event.target.value;
    document.getElementById(this.selectId).scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });

    this.loans = this.setFilterLoan(this.listLoans);
  }

  setFilterLoan(data: any) {
    let loan = [];
    if (this.selectId == 'pendientes') {
      loan = data.filter((item) => { return item.estado == 'P' });
    } else {
      loan = data.filter((item) => { return item.estado != 'P' });
    }
    return loan;
  }

  aprobarCredito(item: any) {
    let array = [];
    let fechaActual = new Date();
    let fechaAux = new Date();
    for (let index = 0; index < item.numCuotas; index++) {
      fechaActual.setMonth(fechaActual.getMonth() + (12 / item.tipofrecuencia));
      fechaAux = new Date(fechaActual);
      array.push(this.datepipe.transform(fechaAux, 'yyyy-MM-dd'));
      fechaActual = fechaAux;
    }
    console.log(array)
    const data = {
      fechaAprobacion: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      estado: 'A',
      pagos: JSON.stringify(array)
    }
    console.log(data);

    this.serLoan.approveLoan(item.idPrestamo, data).subscribe(resp => {
      if (resp.status) {
        console.log(resp);
        this.serUtil.showToast(resp.mensaje);
        let index = this.loans.findIndex(d => d.idPrestamo == item.idPrestamo);
        this.loans[index].estado = 'A';
        this.loans = this.setFilterLoan(this.listLoans);
      } else {
        this.serUtil.showToast(resp.mensaje);
      }
    })
  }

  rechazarCredito(item: any) {
    const data = {
      estado: 'R'
    }
    this.serLoan.rejectLoan(item.idPrestamo, data).subscribe(resp => {
      if (resp.status) {
        this.serUtil.showToast(resp.mensaje);
        let index = this.loans.findIndex(d => d.idPrestamo == item.idPrestamo);
        this.loans[index].estado = 'R';
        this.loans = this.setFilterLoan(this.listLoans);
      } else {
        this.serUtil.showToast(resp.mensaje);
      }
    })
  }

  async openModalViewDoc(data: any) {
    const modal = await this.modalCtrl.create({
      component: ModalViewComponent,
      showBackdrop: true,
      backdropDismiss: false,
      cssClass: 'small-modal',
      componentProps: {
        data
      },
      enterAnimation: this.enterAnimation,
      leaveAnimation: this.leaveAnimation
    });

    await modal.present();
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
}
