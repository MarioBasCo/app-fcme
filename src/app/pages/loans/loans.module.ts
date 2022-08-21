import { LoanListModule } from './../../components/loan-list/loan-list.module';
import { LoanSimulatorModule } from './../../components/loan-simulator/loan-simulator.module';
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
    LoanSimulatorModule,
    LoanListModule,
    ReactiveFormsModule,
    LoansPageRoutingModule
  ],
  declarations: [LoansPage]
})
export class LoansPageModule {}
