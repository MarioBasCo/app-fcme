import { ClientComponent } from './client.component';
import { SwiperModule } from 'swiper/angular';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule
  ],
  exports: [ClientComponent]
})
export class ClientModule { }
