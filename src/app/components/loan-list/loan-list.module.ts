import { FormsModule } from '@angular/forms';
import { ModalViewModule } from './../modal-view/modal-view.module';
import { IonicModule } from '@ionic/angular';
import { LoanListComponent } from './loan-list.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';



@NgModule({
  declarations: [LoanListComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ModalViewModule
  ],
  exports: [LoanListComponent],
  providers: [DatePipe]
})
export class LoanListModule { }
