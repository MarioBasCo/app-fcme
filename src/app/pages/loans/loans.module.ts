import { ApplyLoanModule } from './../../components/apply-loan/apply-loan.module';
import { ApplyLoanComponent } from './../../components/apply-loan/apply-loan.component';
import { HeaderModule } from './../../components/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoansPageRoutingModule } from './loans-routing.module';

import { LoansPage } from './loans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    ApplyLoanModule,
    ReactiveFormsModule,
    LoansPageRoutingModule
  ],
  declarations: [LoansPage]
})
export class LoansPageModule {}
