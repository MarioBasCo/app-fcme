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
    private modalCtrl: ModalController, private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      pdfCedula: [''],
      pdfPlanilla: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('pdfCedula').setValue(file);
    }
  }

  guardar(){

    const data = {
      id_usuario: this.serStorge.get('user')?.id_usuario,
      idTipoPrestamo: this.data?.tipoPrestampo.id_prestamo,
      idFrecuencia: this.data?.frecuencia.id_frecuencia,
      monto: this.data?.monto,
      numCuotas: this.data?.cuotas,
      cuotaPago: this.data?.cuotaPago,
      fechaSolicitud: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      estado: 'P',
      pagos: JSON.stringify(this.data?.pagos)
    }
    console.log(data);
    this.serLoan.createLoan(data).subscribe(
      resp => {
        if(resp.status){
          this.serUtil.showToast(resp.mensaje)
        } else {
          this.serUtil.showToast(resp.mensaje, 'danger')
        }
      }
    );
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
}
