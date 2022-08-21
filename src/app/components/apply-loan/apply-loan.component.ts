import { Router } from '@angular/router';
import { UtilsService } from './../../services/utils.service';
import { LoanService } from './../../services/loan.service';
import { LstorageService } from './../../services/lstorage.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.scss'],
})
export class ApplyLoanComponent implements OnInit {
  @Input() data: any;
  form: FormGroup;

  constructor(
    public datepipe: DatePipe,
    private serLoan: LoanService,
    private serUtil: UtilsService,
    private serStorge: LstorageService,
    private modalCtrl: ModalController, 
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      pdfCedula: ['', [Validators.required]],
      pdfPlanilla: ['', [Validators.required]]
    });
  }

  onFileSelectCed(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('pdfCedula').setValue(file);
    }
  }

  onFileSelectPla(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('pdfPlanilla').setValue(file);
    }
  }

  guardar() {
    const formData = new FormData();
    formData.append('id_usuario', this.serStorge.get('user')?.id_usuario);
    formData.append('idTipoPrestamo', this.data?.tipoPrestampo.id_prestamo);
    formData.append('idFrecuencia', this.data?.frecuencia.id_frecuencia);
    formData.append('monto', this.data?.monto);
    formData.append('numCuotas', this.data?.cuotas);
    formData.append('cuotaPago', this.data?.cuotaPago);
    formData.append('fechaSolicitud', this.datepipe.transform(new Date(), 'yyyy-MM-dd'));
    formData.append('estado', 'P');
    formData.append('pagos', JSON.stringify(this.data?.pagos));
    formData.append('pdfCedula', this.form.get('pdfCedula').value);
    formData.append('pdfPlanilla', this.form.get('pdfPlanilla').value);


    this.serLoan.createLoan(formData).subscribe(
      resp => {
        if (resp.status) {
          this.modalCtrl.dismiss();
          this.router.navigateByUrl('/home', { replaceUrl: true }); 
          this.serUtil.showToast(resp.mensaje);
        } else {
          this.serUtil.showToast(resp.mensaje, 'danger');
        }
      }
    );
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
