import { IonicModule } from '@ionic/angular';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
