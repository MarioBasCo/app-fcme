import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApplyLoanComponent } from './apply-loan.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';



@NgModule({
  declarations: [ApplyLoanComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [ApplyLoanComponent],
  providers: [DatePipe]
})
export class ApplyLoanModule { }
