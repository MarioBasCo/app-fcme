import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
