import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
