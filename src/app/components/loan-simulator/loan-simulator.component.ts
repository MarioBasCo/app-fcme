import { LoanService } from './../../services/loan.service';
import { FrequencyService } from './../../services/frequency.service';
import { AnimationController, ModalController } from '@ionic/angular';
import { environment } from './../../../environments/environment';
import { ApplyLoanComponent } from './../apply-loan/apply-loan.component';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-simulator',
  templateUrl: './loan-simulator.component.html',
  styleUrls: ['./loan-simulator.component.scss'],
})
export class LoanSimulatorComponent implements OnInit {
  form: FormGroup;
  loans: any[] = [];
  frequency: any[] = [];
  tableLoan: any[] = [];
  pdfSrc: any;
  prestamos: any[] = [];

  constructor(
    private animationCtrl: AnimationController,
    private formBuilder: FormBuilder,
    private serFre: FrequencyService,
    private serLoan: LoanService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.buildForm();
    this.serFre.getFrecuency().subscribe(resp => {
      if (resp.status) {
        this.frequency = resp.data;
      }
    });
    this.serLoan.getLoan().subscribe(resp => {
      if (resp.status) {
        this.loans = resp.data;
      }
    });
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

  buildForm() {
    this.form = this.formBuilder.group({
      loan: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      frequency: ['', [Validators.required]],
      share: ['', [Validators.required]],
    });
  }

  calcular() {
    this.tableLoan = [];
    const { valor: interesAnual } = this.loans.find(element => element.idTipoPrestamo == this.form.get('loan').value); // valor del interes anual
    const { valor: frecu } = this.frequency.find(element => element.idFrecuencia == this.form.get('frequency').value); //fruecuencia de pagos
    const numCuotas = this.form.get('share').value; // n??mero de cuotas que el cliente pidi??
    const monto = this.form.get('amount').value; // capital a prestar
    const n = interesAnual / frecu; // interes efectivo

    const ixt = Math.pow(((1 + n)), numCuotas); // interes por el numero de cuotas
    const cuotasPago = monto * (n * ixt) / (ixt - 1);

    let vf = monto;
    let i = 0;
    let aporte = 0;
    let saldo = 0;
    for (let index = 0; index < numCuotas; index++) {
      i = vf * n;
      aporte = cuotasPago - i;
      saldo = vf - aporte;
      this.tableLoan.push({ cuota: cuotasPago.toFixed(2), aporte: Number(aporte.toFixed(2)), interes: Number(i.toFixed(2)), saldo: Math.abs(Number(saldo?.toFixed(2))) })
      //console.log(`cuota: ${cuotasPago.toFixed(2)}, aporte: ${aporte.toFixed(2)}, interes: ${i.toFixed(2)}, saldo: ${saldo.toFixed(2)}`);
      vf = saldo;
    }
    console.log(this.tableLoan);
  }

  resetMyForm(): void {
    this.buildForm(); //se reconstruye el formulario
    this.form.reset(this.form.value);
  }

  async openModalForm() {
    const id_prestamo = this.form.get('loan').value;
    const { valor: interesAnual } = this.loans.find(element => element.idTipoPrestamo == id_prestamo); // valor del interes anual
    const id_frecuencia = this.form.get('frequency').value;
    const { valor: frecu } = this.frequency.find(element => element.idFrecuencia == id_frecuencia); //fruecuencia de pagos
    const numCuotas = this.form.get('share').value; // n??mero de cuotas que el cliente pidi??
    const monto = this.form.get('amount').value; // capital a prestar
    const n = interesAnual / frecu; // interes efectivo

    const ixt = Math.pow(((1 + n)), numCuotas); // interes por el numero de cuotas
    const cuotasPago = monto * (n * ixt) / (ixt - 1);
    const { descripcion: detallePre } = this.loans.find(element => element.idTipoPrestamo == id_prestamo);
    const { descripcion: detalleFre } = this.frequency.find(element => element.idFrecuencia == id_frecuencia);
    console.log(cuotasPago)
    const data = {
      monto,
      interes: interesAnual,
      tipoPrestampo: { id_prestamo, detallePre },
      frecuencia: { id_frecuencia, detalleFre },
      cuotas: numCuotas,
      cuotaPago: cuotasPago.toFixed(2),
      pagos: this.tableLoan
    }

    const modal = await this.modalCtrl.create({
      component: ApplyLoanComponent,
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
}
