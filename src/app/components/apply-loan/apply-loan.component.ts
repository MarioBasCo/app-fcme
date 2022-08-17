import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.scss'],
})
export class ApplyLoanComponent implements OnInit {
  @Input() data: any;
  form: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      idCategoria: ['', [Validators.required]],
      foto_producto: ['', [Validators.required]]
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('foto_producto').setValue(file);
    }
  }

  guardar(){

  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
}
