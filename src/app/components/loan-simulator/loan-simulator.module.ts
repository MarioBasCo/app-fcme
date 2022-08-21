import { LoanSimulatorComponent } from './loan-simulator.component';
import { ApplyLoanModule } from './../apply-loan/apply-loan.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [LoanSimulatorComponent],
  imports: [
    CommonModule,
    IonicModule,
    ApplyLoanModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [LoanSimulatorComponent]
})
export class LoanSimulatorModule { }
