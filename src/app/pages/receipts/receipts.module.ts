import { HeaderModule } from './../../components/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiptsPageRoutingModule } from './receipts-routing.module';

import { ReceiptsPage } from './receipts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    ReceiptsPageRoutingModule
  ],
  declarations: [ReceiptsPage]
})
export class ReceiptsPageModule {}
