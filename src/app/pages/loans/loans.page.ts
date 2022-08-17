import { ApplyLoanComponent } from './../../components/apply-loan/apply-loan.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimationController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.page.html',
  styleUrls: ['./loans.page.scss'],
})
export class LoansPage implements OnInit {
  form: FormGroup;
  loans: any[] = [
    { id: 1, vendor: 'Consumo', value: 0.08 },
    { id: 2, vendor: 'Microcredito', value: 0.12 },
    { id: 3, vendor: 'Vivienda', value: 0.15 },
    { id: 4, vendor: 'Vehiculo', value: 0.17 },
  ];
  frequency: any[] = [
    { id: 1, vendor: 'Mensual', value: 12 },
    { id: 2, vendor: 'Bimensual', value: 6 },
    { id: 3, vendor: 'Trimestral', value: 4 },
    { id: 4, vendor: 'Cuatrimestral', value: 3 },
    { id: 5, vendor: 'Semestral', value: 2 },
    { id: 6, vendor: 'Anual', value: 1 }
  ];
  tableLoan: any[] = [];

  constructor(
    private animationCtrl: AnimationController,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.buildForm();
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
    const {value : interes} = this.loans.find(element => element.id == this.form.get('loan').value); // valor del interes anual
    const {value : frecu} = this.frequency.find(element => element.id == this.form.get('frequency').value); //fruecuencia de pagos
    const numCuotas = this.form.get('share').value; // número de cuotas que el cliente pidió
    const monto = this.form.get('amount').value; // capital a prestar
    const n = interes / frecu; // interes efectivo

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
      this.tableLoan.push({ cuota: Number(cuotasPago.toFixed(2)), aporte: Number(aporte.toFixed(2)), interes: Number(i.toFixed(2)), saldo: Math.abs(Number(saldo?.toFixed(2))) })
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
    const {value : interes} = this.loans.find(element => element.id == this.form.get('loan').value); // valor del interes anual
    const {value : frecu} = this.frequency.find(element => element.id == this.form.get('frequency').value); //fruecuencia de pagos
    const numCuotas = this.form.get('share').value; // número de cuotas que el cliente pidió
    const monto = this.form.get('amount').value; // capital a prestar
    const n = interes / frecu; // interes efectivo

    const ixt = Math.pow(((1 + n)), numCuotas); // interes por el numero de cuotas
    const cuotasPago = monto * (n * ixt) / (ixt - 1);
    const {vendor : detallePre} = this.loans.find(element => element.id == this.form.get('loan').value);
    const {vendor : detalleFre} = this.frequency.find(element => element.id == this.form.get('frequency').value);
    const data = {
      monto,
      interes,
      tipoPrestampo: detallePre,
      frecuencia: detalleFre,
      cuotas: numCuotas,
      cuotaPago: cuotasPago
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
