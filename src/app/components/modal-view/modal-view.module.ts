import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ModalViewComponent } from './modal-view.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ModalViewComponent],
  imports: [
    CommonModule,
    IonicModule,
    PdfViewerModule
  ],
  exports: [ModalViewComponent]
})
export class ModalViewModule { }
